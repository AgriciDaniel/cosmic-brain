Formats used to upload data to payroll accounting

1  Formats used to Upload Data to  Payroll Accounting
This document describes the formats that HYDRA supports for the different payroll accounting systems.
The format is usually specified in the HYDRA configuration. This configuration is made by the person
implementing the system or the HR consultant.
1.1  HYDRA standard format
The format outlined in this chapter is issued if the customer does not set up their own format.  The HYDRA
standard format contains the uploads for monthly wage types and absences.
 Upload of monthly wage types
The entries in the following columns for data type have the following meaning:
Type  Description
Cx  Character field with length x; left-justified; missing digit is filled with blanks;
| Nx.y  Numeric field of the length x and y decimal places.  |     |     |
| ---------------------------------------------------------- | --- | --- |
Example: 123 in the format N7.2: 0012300
"  "
Constant value

The format has the following structure:
| Field            | Item  Type  | Description                      |
| ---------------- | ----------- | -------------------------------- |
| Record type      | 1  C3       | Always "760"                     |
| Company          | 4  C3       | Company from the HR master data  |
| Area             | 7  C8       | Area from the HR master data     |
| Accounting year  | 15  N4      |                                  |
| Accounting       | 19  N2      |                                  |
month
| Accounting  | 21  C1  | Always empty  |
| ----------- | ------- | ------------- |
number
| Personnel  | 22  C8  | Left-aligned, filled with blanks  |
| ---------- | ------- | --------------------------------- |
number
Last  day  30  N2  Last day of the configured monthly period. Configuration of
evaluated  evaluation periods of the monthly evaluation in calendar months,
e.g. "30" or "31".

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 1 of 89

Formats used to upload data to payroll accounting
Wage type 32 C4 Left-aligned, filled with blanks
Wage type from HYDRA-PZE. Also a Payment day type can be
entered here used in HYDRA for absence planning. You can
differentiate whether this is a wage type or a payment day type
using the assignment options for the fields Hours to wage type,
Full days absent and Partial days absent described in more
detail below:
- If a value is only available in Hours, then it is a wage type.
- If a value is only available in full or partial days, then it is a
payment day type.
- If a value is available in Hours and in full or partial days,
then it is a wage type and a payment day type. In this case,
the wage type of an absence is identical to the payment
day type used for planning.
Algebraic sign 36 C1 For "Hours of a wage type", always use "+"
Hours of a wage 37 N5.2 The two decimal places are stored in industrial minutes.
type
Full days of 42 N3 Number of days with a full day absence. In field Wage type, the
absence number of the payment day type used is uploaded. If a wage type
with the same number exists, a common data record is used for the
transfer.
Partial days of 45 N3 Number of days with a partial absence. In field Wage type, the
absence number of the payment day type used is uploaded. If a wage type
with the same number exists, a common data record is used for the
transfer.
Different wage 48 C3 Always empty
group
Different hourly 51 N5 Always 0
rate
Amount 56 N7 Always 0
Year of 63 N4 Always empty
successive
payment
Month of 67 N2 Always empty
successive
payment
Exec. cost center 69 C8 The person's regular cost center at the end of the accounting period
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 2 of 89

    Formats used to upload data to payroll accounting

Debited  Cost  77  C8  Cost center of the daily wage type postings The sum total of the
center  wage types is transferred separately for each cost center.
| Order number   | 85   | C10  Always empty  |
| -------------- | ---- | ------------------ |
| Work sequence  | 95   | C4  Always empty   |
| Comment        | 99   | C18  Always empty  |
| Reserved for   | 117  | C25  Always empty  |
incentive wage
data
| Document  | 142  | C5  Always empty  |
| --------- | ---- | ----------------- |
number
| Administrative  | 147  | C1  Always "1"  |
| --------------- | ---- | --------------- |
reference

Example file
1       10        20        30        40        50        60        70        80        90       100       110       120       130       140    147
760BSPBEREICH 199808.5001....31100.-13950000000...00000.......19980854310...54310.................................................................1
760BSPBEREICH 199808.5001....31100.+14050000000...00000.............54310...54310.................................................................1
760BSPBEREICH 199808.5001....31200.+00550000001...00000.............54310...42120.................................................................1
760BSPBEREICH 199808.5001....3130..+01600002000...00000.............54310...54310.................................................................1
760BSPBEREICH 199808.5002....31100.+19750000000...00000.............33570...33570.................................................................1

The dots stand for blanks. Each data record consists of one row. The first rows are for orientation purposes
in the data record.
| 1.1.1.1  | Interface configuration  |     |
| -------- | ------------------------ | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |
| --------- | -------- | --- |
| Section   | OPTIONS  |     |
| Key       | xxxxxx   |     |
| Value     | xxxxxx   |     |

| Active    |    |     |
| --------- | --- | --- |
Key  Value
FORMAT  HYDRA
Output format

 Upload of absences
A separate interface file is provided for the absence times. This file is provided with the monthly wage types.
It is stored on the HYDRA server in the HYDRA directory under the name "hyfehl.dat".

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 3 of 89

    Formats used to upload data to payroll accounting

The interface is made available as an ASCII file.  The interface has not column with.  The separator between
the columns is the semicolon.  The file complies with the CSV format and can be easily imported into
spreadsheets and other office applications.
The maximal length of the column can increase for future HYDRA versions.
| Field  | Type /  | Comment  |
| ------ | ------- | -------- |
Max. length
| Company           | C4        | Company from the HR master data            |
| ----------------- | --------- | ------------------------------------------ |
| Personnel number  | N8        | Without leading zeros                      |
| Start date        | YYYYMMTT  | First day of absence                       |
| End date          | YYYYMMTT  | Last day of absence                        |
| Reason            | N4        | Number of the payment day type of absence  |
times
Short name  C6  Abbreviation of the remuneration day type for
absence
| Name            | C40  | Name of the remuneration day type for absence   |
| --------------- | ---- | ----------------------------------------------- |
| Absence reason  | C10  | Reserved, always empty                          |

Additional notes
  The absence periods are transferred as one data record including weekends and days off.
  If the absence period includes a change of month, the period is divided. This means: If the
absences include several months, they are divided into several periods.
  If you have configured a period of continued pay in HYDRA (LFZ), the LFZ period is finished when
the specified time has expired and a period with another absence reason is transferred.
  Using the Control of absences, you can control which absences are transferred.
  You can transfer full-day absences and partial absences.

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 4 of 89

    Formats used to upload data to payroll accounting

1.2  Abacus
 Upload of monthly wage types
When the monthly wage types are uploaded in abacus format, the columns are separated by commas and
have no fixed width.
Example: „L001,99999,31/12/2010,1,201,,CHF,,87.1250,1,,,105,,,L001"
| No.  Column        | Contents                     |     |
| ------------------ | ---------------------------- | --- |
| 1  Identification  | Fixed „L001“                 |     |
| 2  Personnel       | Personnel number from HYDRA  |     |
number
3  Date  First day of the consecutive month in format DD/MM/YY
4  1 (consecutive  Average type from the wage type configuration
number)
| 5  Wage type  | Wage type from HYDRA  |     |
| ------------- | --------------------- | --- |
| 6  empty      | empty                 |     |
| 7  Currency   | ISO code CHF          |     |
| 8  empty      | empty                 |     |
9  Hours  In decimal notation with period as decimal separator, with 4 decimal
places.
| 10  1            | Fixed „1“    |     |
| ---------------- | ------------ | --- |
| 11  empty        | empty        |     |
| 12  empty        | empty        |     |
| 13  Cost center  | Cost center  | >   |
of the wage type posting
| 14  empty  | empty  |     |
| ---------- | ------ | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 5 of 89

    Formats used to upload data to payroll accounting

| 15  empty           |     | empty         |
| ------------------- | --- | ------------- |
| 16  Identification  |     | Fixed „L001“  |

| 1.2.1.1  | Interface configuration  |     |
| -------- | ------------------------ | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |
| --------- | -------- | --- |
| Section   | OPTIONS  |     |
| Key       | xxxxxx   |     |
| Value     | xxxxxx   |     |

| Active    |    |     |
| --------- | --- | --- |
Key  Value
FORMAT  ABACUS
Output format

| 1.3  Exakt LohnXL / XXL  |     |     |
| ------------------------ | --- | --- |
This chapter outlines the upload process of monthly wage types to the payroll accounting system Exact
LohnXL / XXL.
 Upload of monthly wage types

Legend:
A(n)  Alphanumeric, maximum with n digits
N(n)  Numeric with digits
N(n,i) Numeric with n digits, of which i are decimal places. The dot is the decimal separator.
  Total length of the field is then n+1.
  Example: A field N(4,2) reads "03.21". This is the number 3,21.

K(n)  Constant text of length n

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 6 of 89

    Formats used to upload data to payroll accounting

| Field name  | Data  type  | /  Item  Contents  | Example  |
| ----------- | ----------- | ------------------ | -------- |
format
Personnel number  N(6)  1  Personnel number with leading zeros  014234
Entry date  YYYYMMD 7  First day of the consecutive month   19990901
D
Accounting date  YYYYMMD 15  First day of the consecutive month   19990901
D
| Wage type       | A(3)  | 23  Wage type     | "035"  |
| --------------- | ----- | ----------------- | ------ |
| Processing ID   | K(2)  | 26  always "99"   | "99"   |
| Algebraic sign  | K(1)  | 28  constant "+"  | "+"    |
Einheit  N(11,3)  29  Duration of the wage type with 8 places  00000138.250
before and 3 after the decimal point and a
period as separator.
Record per entry  K(12)  41  constant "+00000000.00"  "00000000.00"
| Amount       | K(12)  | 53  constant "+00000000.00"  | "00000000.00"  |
| ------------ | ------ | ---------------------------- | -------------- |
| Cost center  | A(8)   | 65  Cost center              | "4711    "     |
Cost object  K(12)  73  constant "             "  "              "
| Unit 2  | K(13)  | 85  constant "+0000000.000"  | "00000000.000"  |
| ------- | ------ | ---------------------------- | --------------- |
Space bar  K(30)  98  constant "                        "  "                         "
| Line feed  | K(1)  | 128  constant line feed  |     |
| ---------- | ----- | ------------------------ | --- |

Note:
Wage types are alphanumeric in HYDRA and are transferred to the interface how they are
created in HYDRA.  If leading zeros are required before the wage type, the user has to
enter these in HYDRA.
| 1.3.1.1  Interface configuration  |     |     |     |
| --------------------------------- | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 7 of 89

    Formats used to upload data to payroll accounting

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |
| Active    |         |     |     |     |
Key  Value
FORMAT  C wage
Output format

| 1.4  CSS fixed wage   |     |     |     |     |
| --------------------- | --- | --- | --- | --- |
 Upload of monthly wage types

Data set to transfer monthly wage types to the CSS fixed wage has to following structure:
| Field name  |     | Data  type  | /  Contents  | Example  |
| ----------- | --- | ----------- | ------------ | -------- |
format
| Company number  |     | N(4)  | Company number of the person  | 1111  |
| --------------- | --- | ----- | ----------------------------- | ----- |
Personnel number  N(5)  Personnel number from HYDRA. (The personnel  12345
number has 8 digits in HYDRA and only the last
5 digits are transferred.
Period of accounting  DDMMYYY Accounting period = last of the month  2009-02-28
Y
| Wage type  |     | N(4)  | Wage type number  | 100  |
| ---------- | --- | ----- | ----------------- | ---- |
Record date of the  DDMMYYY Record date of the document  2009-02-01
| document  |     | Y   |     |     |
| --------- | --- | --- | --- | --- |
Valid from  DDMMYYY Reference start of the the wage type  2009-02-01
Y
Valid until  DDMMYYY Reference end of the wage type  2009-02-28
Y

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 8 of 89

    Formats used to upload data to payroll accounting

| Account no.   |     | N(8)  | Financial accounting /fixed "0"  | 0   |
| ------------- | --- | ----- | -------------------------------- | --- |
| Cost type     |     | N(8)  | Cost type / fixed "0"            | 0   |
Executing cost center  N(8)  Cost center of the person  48723
Cost center  N(8)  Cost center of the wage type postings  48723
| Cost object  |     | A(16)  | Cost object / fixed„0“  | 0   |
| ------------ | --- | ------ | ----------------------- | --- |
OP 1  N(7,2)  Monthly sum total of time posted for the wage  128.00
type.
| OP 2  |     | N(7,2)  | Fixed "0.0"           | 0.0  |
| ----- | --- | ------- | --------------------- | ---- |
| OP 3  |     | N(7,2)  | Fixed "0.0"           | 0.0  |
| OP 4  |     | N(7,2)  | Fixed "0.0"           | 0.0  |
| OP 5  |     | N(7,2)  | Fixed "0.0"           | 0.0  |
| RKZ   |     | N(1)    | Error ID / fixed "0"  | 0    |

The data record is finished via carriage return and linefeed (CRLF).
Example:
101^906000^2009-03-31^100^2009-02-01^2009-02-01^2009-02-28^0^0^    5187^    5187^0^3.00^0.0^0.0^0.0^0.0^0^
101^906000^2009-03-31^142^2009-02-01^2009-02-01^2009-02-28^0^0^    5187^    5187^0^2.00^0.0^0.0^0.0^0.0^0^
101^906000^2009-03-31^470^2009-02-01^2009-02-01^2009-02-28^0^0^    5187^    5187^0^4.00^0.0^0.0^0.0^0.0^0^
| 1.4.1.1  | Interface configuration  |     |     |     |
| -------- | ------------------------ | --- | --- | --- |

The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |
| Active    |         |     |     |     |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 9 of 89

Formats used to upload data to payroll accounting
Key Value
FORMAT CSSFIX
Output format
1.5 DATEV (LODAS)
The header interface provides the following information:
[General]
Target=LODAS (target)
ConsultantNo=<xxx> (tax consultant)
ClientNo=<xxx> (client)
Field separator=; (field separator)
Number comma=, (number separator)
Date format=DD. MM.YYYY (date format)
Record description]1
1;u_lod_bwd_buchung_standard;pnr#bwd;abrechnung_zeitraum#bwd;la_eigene#bwd;bs_wert_bu
tab#bwd;bs_nr#bwd;kostenstelle#bwd;
You can set the tax consultant number and the client number per customer via the HYDRA configurator.
Legend:
A(n) Alphanumeric, maximum with n digits
N(n) Numeric with digits
N(n,i) Numeric with n digits, of which i are decimal places Example A field N(4,2) contains "13,21". This is
the number 13,21.
K constant text
Upload of monthly wage types
The monthly wage types are uploaded with the following format:
Field name Data type / Contents Example
format
Record type N (=night) Number of the record type in relation to the 1
formats in the [Record Description] section
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 10 of 89

Formats used to upload data to payroll accounting
Table name K For monthly wage types constant "u_lod…"
"u_lod_bwd_buchung_standard"
Personnel number N(5) Personnel number (max. 5 digits, if the 41
personnel number are greater, then the last 5
digits are transferred).
Accounting DDMMYYYY Accounting month date 2007-12-01
time
Processing key N(2) The processing key can be set in the 01
configuration of wage types in the control
identifier field with 'BS' in the front (e.g. BS02,
available from hylobu version 8.1.1.212).
The specification is 01 = hours
Wage type N(3) The wage type must be numeric and can have "100"
a maximum of 3 digits.
Value N(11,2) Duration of the wage type with 2 decimal 173.75
numbers
Cost center A(8) Cost center (max. 8 digits) "415687"
The data is in the section [transaction data]. The different fields are separated by a semicolon (;). This
separator also appears at the end of the row.
Example:
[transaction data]
1;96665;01.01.2008;01;100;85,90;5187;
1;96665;01.01.2008;01;450;80,00;5187;
1;96665;01.01.2008;01;526;11,00;5187;
1;96665;01.01.2008;01;600;8,00;5187;
1.5.1.1 Interface configuration
The interface format is then enabled via INi data configuration (System administration  System settings
 INi data configuration). The following settings are made:
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 11 of 89

    Formats used to upload data to payroll accounting

| INI name  | HYD-LUG  |     |
| --------- | -------- | --- |
| Section   | OPTIONS  |     |
| Key       | xxxxxx   |     |
| Value     | xxxxxx   |     |
| Active    |         |     |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 12 of 89

Formats used to upload data to payroll accounting
Key Value
FORMAT DATEV
Output format
CUSTOMER or COMPANY For DATEV formats, the client to be transferred
or COMPANY_NONSALARIED_EMPLOYEES and must be set using this key.
COMPANY_SALARIED_EMPLOYEES
CONTRACT or CONSULTANT With FORMAT=DATEV, the tax consultant
number that must be transferred must be set
via this key.
LEAVE_DAYS The number of holidays is confirmed using the
wage type set here. In the case of DATEV, the
entry LEAVE_DAYS=BS71 causes the
holidays to be transferred without a wage type
with processing key 71.
ILLNESS_DAYS The number of sick days is determined by the
number set here. In the case of DATEV, the
entry ILLNESS_DAYS=BS72 causes the sick
days to be transferred without a wage type with
the processing key 72. Whole and half days of
absence are uploaded, whereby an absence of
3.5 hours or more counts as half a day. Illness
is interpreted as all absences that are assigned
to one of the two categories LFZ (sickness with
continued pay) or LFZ (sickness without
continued pay) when processing the absences.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 13 of 89

Formats used to upload data to payroll accounting
ROUND_MODE If you use interfaces FORMAT= DATEV the
hours are rounded commercially. If required,
you can enable the option
ROUND_MODE=FLOOR to cut off the decimal
places of the hours of a wage type (cut off =
round down).
Upload of absences
The following fields are transferred with the absence times:
Field name Data type / Contents Example
format
Record type N (=night) Number of the record type in relation to the 2
formats in the [Record Description] section
Table name K For absences constant "u_lod_bwd_fehlzeiten" "u_lod…"
Personnel number N(5) Personnel number (max. 5 digits, if the 41
personnel number are greater, then the last 5
digits are transferred).
Date from DDMMYYYY Start date of the absence 2007-12-14
Date to DDMMYYYY End date of the absence 2007-12-17
Reason N(3) Absence reason (number of the payed leave, 450
may. 3 digits)
There is a separate entry with record type 2 for absences in the section [Record description].
The data is in the section [transaction data]. The different fields are separated by a semicolon (;). This
separator also appears at the end of the row.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 14 of 89

Formats used to upload data to payroll accounting
Example:
[record description]
2;u_lod_bwd_fehlzeiten;pnr#bwd;datum_von_ttmmjjjj#bwd;datum_bis_ttmmjjjj#bwd;grund_fe
hlzeiten#bwd;
[Bewegungsdaten]
2;96665;01.01.2008;01.01.2008;600;
2;96665;07.01.2008;11.01.2008;450;
2;96665;14.01.2008;18.01.2008;450;
1.5.2.1 Interface configuration
Key Value
FORMAT DATEV
The key of the monthly wage types also
specifies the format. A manufacturer-specific
format for the absence interface is only
available for the format DATEV_COMFORT.
The other formats issue the HYDRA standard
format.
ABSENCES_SEPARATE_FILE ON
In case of the DATEV format, the absences are
written in the same file as the wage types. You
can use this option to specify that also with
these formats the absences are written in a
separate file using the name hyfehl.dat.
1.6 DATEV comfort
When the "DATEV Lohn und Gehalt Comfort" interface is called up, 2 files are written to the Hydra
system directory on the shop floor scheduling. In addition to the file with the wage type postings, an INI
file with the format description is created. The interface files are text files containing one record per row:
datev_comfort.ini
INI file with format descriptions for importing time management data.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 15 of 89

Formats used to upload data to payroll accounting
hylobu.dat
Interface file to transfer the wage types. The file contains contains coummulated data for one
calendar month and for each person.
Upload of monthly wage types
There are the following formats for the separate field types:
A(n) Alphanumeric, with n digits
N(n) Numeric with n digits
N(n,i) Numeric with n digits, of which i are decimal places
Example A field N(7,2) contains "3,21".
Datev_comfort.ini
INI file with format descriptions for importing time management data.
[General]
Field number = 11
Field separator = semicolon
Record separator = enter/return
Number separator = ,
Date separator = /
[Field content]
Field1 = Personnel number
Field2 = Calendar day
Feld3 = Downtime key
Field4 = Wage type numbers
Field5 = Number of hours
Field6 = Number of days
Field7 = Value
Field8 = Deviating factor
Field9 = Deviating wage change
Field10 = Cost center number
Field11 = Cost object
hylobu.dat
Only postings for monthly data entry are output - for this reason the fields "Downtime key, "Calendar day",
"Number of hours" and "Number of days" are empty.
The Datev interface has separated fields due to the semicolon.
The file contains a header line so that the time management data of several clients and different accounting
months can be recognized in a tax office:
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 16 of 89

    Formats used to upload data to payroll accounting

| Field                  | Type  | Meaning                                  |
| ---------------------- | ----- | ---------------------------------------- |
| Tax consultant number  | N7    | Unique identifier for a tax consultant,  |
value range from 1000 to 9999999
Client number  N5  Unique identifier of a client in a tax office, value range from 1 to
99999
Accounting date  C7  Month and year for which transaction data is provided. Format:
MM/YYYY

Data format of the wage transaction data
| Field  | Type  | Meaning  |
| ------ | ----- | -------- |
Personnel number  N5  Unique indicator for an employee of a client, value range from 1
to 99999. HYDRA possible transfers the last five digits.
| Calendar day  | N2  | Must remain empty to collect the month.   |
| ------------- | --- | ----------------------------------------- |
| Downtime key  | C2  | Must remain empty to collect the month.   |
| Wage type     | N4  | Wage type from HYDRA                      |
The Datev value range is from 1 to 5999 and from 9000 to 9999.
The value range must be included in the configuration of wage
types.
Number of hours  N  Must remain empty to collect the month.
(=night)
| Number of days  | N   | Must remain empty to collect the month.   |
| --------------- | --- | ----------------------------------------- |
(=night)
Value  N5.2  Duration of the wage type The last two digits are decimal places.
Example: 30 hours and 45 minutes result in a field content of
"+030.75".
| Deviating factor  | N5.2        | Empty  |
| ----------------- | ----------- | ------ |
| Deviating         | wage  N5.2  | Empty  |
changes
Cost center number  C8  Assignement of cost center for posting
| Cost object  | C8  | Empty  |
| ------------ | --- | ------ |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 17 of 89

    Formats used to upload data to payroll accounting

| Note: Errors in DATEV  |     |     |
| ---------------------- | --- | --- |
If the maximum field length is exceeded or if the contents of mandatory fields are incorrect,
the incorrect data records are not read in Datev. The relevant place in the file is output as
row (and column) number in a log record in Datev. Data records with correct format, but
incorrect contents are read and can be displayed and corrected in a dialog in Datev.
|     | Example file  |     |
| --- | ------------- | --- |
253154;1000;01/2009
9;;;1000;;;150.00;;;5187;
9;;;1100;;;2.00;;;4711;
9;;;41;;;13.50;;;4711;
9;;;450;;;4.00;;;5187;
9;;;51;;;0.08;;;4711;
9;;;600;;;16.00;;;5187;
| 1.6.4.1  | Interface configuration  |     |
| -------- | ------------------------ | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |
| --------- | -------- | --- |
| Section   | OPTIONS  |     |
| Key       | xxxxxx   |     |
| Value     | xxxxxx   |     |

| Active    |    |     |
| --------- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 18 of 89

Formats used to upload data to payroll accounting
Key Value
FORMAT DATEV_COMFORT
Output format
CUSTOMER or COMPANY For DATEV formats, the client to be transferred
or COMPANY_NONSALARIED_EMPLOYEES must be set using this key.
and COMPANY_SALARIED_EMPLOYEES
CONTRACT or CONSULTANT With FORMAT=DATEV, the tax consultant number
that must be transferred must be set via this key.
ROUND_MODE If using the interface FORMAT=
DATEV_COMFORT, the hours are rounded
(arithmetic rounding). If required, you can enable
the option ROUND_MODE=FLOOR to cut off the
decimal places of the hours of a wage type (cut
off = round down).
1.6.4.2 Interface configuration
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 19 of 89

Formats used to upload data to payroll accounting
Key Value
FORMAT DATEV_COMFORT
The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the format
DATEV_COMFORT. The other formats issue the
HYDRA standard format.
ABSENCES_SEPARATE_DAYS ON
If this option is enabled, the absences are
uploaded as separate days and not as periods
from...to. If the absences are transferred in the
format PROLOHN and DATEV_COMFORT, this
option must be enabled because the interface
format only provides a date field.
1.7 eGecko (CSS)
eGecko is the follow-up product of CSS Fixlohn. The interfaces are similar.
The different fields are separated by a semicolon (;). The data record is finished via carriage return and
linefeed (CRLF).
Important:
To separate fields, HYDRA uses the semicolon (;), which is different to the standard settings of eGecko. In
eGecko, you must therefore change the default field separator circumflex (^) to a semicolon in the interface
import settings.
To encode characters, HYDRA uses UTF-8 without BOM. You can configure the character encoding in the
eGecko interface program. Here, the default is CP1252 (Windows-1252).
Upload of monthly wage types
Column P – Mandatory field Y (yes) / N (no)
The data record to transfer monthly wage types to eGecko has the following structure:
Field / attribute Type P Description Example
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 20 of 89

Formats used to upload data to payroll accounting
FIRMANR String N HYDRA’s company number of the person BSP
(=n
igh
t)
MITARBEITERNR String J Personnel number from HYDRA 12345
(employee number)
APER String J Date of accounting period DD.MM.YYYY 2012-02-01
The contents can be configured in
HYDRA. By default, it is the first day of the
consecutive month.
LOHNARTNR (wage String J Wage type number 100
type number)
DATE Date J Document date DD.MM.YYYY. Last day of 2012-01-31
the accounting month
Date from Date N Date from. The date must be included in the <empty>
(=n month/year of APER. Is not filled by
igh HYDRA.
t)
Date to Date N Date to. The date must be included in the <empty>
(=n month/year of APER. Is not filled by
igh HYDRA.
t)
PLATZHALTER String N Is ignored <empty>
(placeholder) (=n
igh
t)
KOSTENART (wage String N Empty <empty>
type) (=n
igh
t)
PLATZHALTER String N Is ignored <empty>
(placeholder) (=n
igh
t)
KOSTENSTELLE (cost String N Cost center of the wage type postings 48723
center) (=n
igh
t)
KOSTENTRAEGER String N Cost object <empty>
(cost object) (=n
igh
t)
PARAMETER1 Decimal J Monthly sum total of time posted for the 128.75
wage type.
PARAMETER2 Decimal N Parameter 2 of the wage type <empty>
(=n
igh
t)
PARAMETER3 Decimal N Parameter 3 of the wage type <empty>
(=n
igh
t)
PARAMETER4 Decimal N Parameter 4 of the wage type <empty>
(=n
igh
t)
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 21 of 89

Formats used to upload data to payroll accounting
PARAMETER5 Decimal N Parameter 5 of the wage type <empty>
(=n
igh
t)
HKZ Decimal N Not used <empty>
(=n
igh
t)
Example:
001;1006;2016-02-01;099;2016-01-31;;;;;;419012;;133.20;;;;;;
001;1006;2016-02-01;101;2016-01-31;;;;;;419012;;133.20;;;;;;
001;1006;2016-02-01;221;2016-01-31;;;;;;419012;;37.00;;;;;;
001;1006;2016-02-01;223;2016-01-31;;;;;;419012;;7.40;;;;;;
001;1006;2016-02-01;330;2016-01-31;;;;;;419012;;7.40;;;;;;
001;1006;2016-02-01;331;2016-01-31;;;;;;419012;;14.80;;;;;;
001;1007;2016-02-01;330;2016-01-31;;;;;;419072;;7.40;;;;;;
001;1007;2016-02-01;331;2016-01-31;;;;;;419072;;148.00;;;;;;
001;1008;2016-02-01;093;2016-01-31;;;;;;7000;;148.00;;;;;;
001;1008;2016-02-01;101;2016-01-31;;;;;;7000;;148.00;;;;;;
001;1008;2016-02-01;330;2016-01-31;;;;;;7000;;7.40;;;;;;
001;1015;2016-02-01;099;2016-01-31;;;;;;419011;;140.60;;;;;;
001;1015;2016-02-01;101;2016-01-31;;;;;;419011;;140.60;;;;;;
001;1015;2016-02-01;221;2016-01-31;;;;;;419011;;37.00;;;;;;
001;1015;2016-02-01;223;2016-01-31;;;;;;419011;;7.40;;;;;;
001;1015;2016-02-01;234;2016-01-31;;;;;;419011;;7.40;;;;;;
001;1015;2016-02-01;330;2016-01-31;;;;;;419011;;7.40;;;;;;
001;1021;2016-02-01;099;2016-01-31;;;;;;419011;;148.00;;;;;;
001;1021;2016-02-01;101;2016-01-31;;;;;;419011;;148.00;;;;;;
001;1021;2016-02-01;221;2016-01-31;;;;;;419011;;74.00;;;;;;
001;1021;2016-02-01;330;2016-01-31;;;;;;419011;;7.40;;;;;;
001;1022;2016-02-01;099;2016-01-31;;;;;;419098;;133.20;;;;;;
1.7.1.1 Interface configuration
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:
INI name HYD-LUG
Section OPTIONS
Key xxxxxx
Value xxxxxx
Active 
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 22 of 89

Formats used to upload data to payroll accounting
Key Value
FORMAT C wage
Output format
ABSENCES ON
MONTH CURRENT
DAY LAST
Upload of absences
Column P – Mandatory field Y (yes) / N (no)
HYDRA does not support to cancel data records.
The data record to transfer absences to eGecko has the following structure:
Field / attribute Type P Description Example
MITARBEITERNR String J Personnel number from HYDRA 12345
(employee number)
ZEITART (time type) String J Absence reason. Number of the payment URL
day type or absence reason defined in the
Control of absences for the payroll
accounting.
VONDATUM (date Date J Date from DD.MM.YYYY 2016-02-15
from)
VONDATUM (date Date J Date to DD.MM.YYYY 2016-02-29
from)
STORNO (cancellation String N Is left empty by HYDRA. (D is reserved for
record) (=n cancellations).
igh
t)
Additional notes
 The absence periods are transferred as one data record including weekends and days off.
 If the absence period includes a change of month, the period is divided. This means: If the
absences include several months, they are divided into several periods.
 If you have configured a period of continued pay in HYDRA (LFZ), the LFZ period is finished when
the specified time has expired and a period with another absence reason is transferred.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 23 of 89

Formats used to upload data to payroll accounting
 Using the Control of absences, you can control which absences are transferred.
 You can transfer full-day absences and partial absences.
Example:
1006;LFZ krank;28.01.2016;31.01.2016;;
1007;LFZ krank;04.01.2016;08.01.2016;;
1007;LFZ krank;09.01.2016;22.01.2016;;
1007;LFZ krank;25.01.2016;29.01.2016;;
1015;234;2016-01-15;2016-01-15;;
1022;700;2016-01-25;2016-01-25;;
1031;LFZ krank;18.01.2016;22.01.2016;;
1033;700;2016-01-25;2016-01-25;;
1042;Krankengel;01.01.2016;08.01.2016;;
1042;Krankengel;09.01.2016;15.01.2016;;
1042;Krankengel;16.01.2016;25.01.2016;;
1.8 FOSS-Lohn (ORDAT)
Upload of monthly wage types
The interface for transferring monthly wage types to FOSS Lohn (wage accounting system) from ORDAT
contains fields with a fixed record length. For each person, one header record and one or more data records
are written to the interface file.
There are the following formats for the separate field types:
- <x>n:
Numeric- with leading zeros
- <x>a:
Alphanumeric x-digits followed by a space.
Note:
When using this interface, only numeric companies, cost centers and wage types are
allowed in HYDRA.
The header record has the following structure:
Field name Data typ/ Contents Example
format
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 24 of 89

    Formats used to upload data to payroll accounting

| Record type  | 2a  | constant "SE"  |     | SE  |
| ------------ | --- | -------------- | --- | --- |
Company number  6n  Company number with leading zerors (the  000100
company number has four digits in HYDRA).
| Filler  | 17n  | constant 17 zeros  |     | 00000000000000 |
| ------- | ---- | ------------------ | --- | -------------- |
000
Company number  6n  Company number with leading zerors (the  000100
company number has four digits in HYDRA).
| Filler  | 1a  | constant 1 space           |     | " "     |
| ------- | --- | -------------------------- | --- | ------- |
| Filler  | 1n  | constant 0                 |     | 0       |
| Filler  | 4n  | constant 9999              |     | 9999    |
| Filler  | 4n  | constant 0000              |     | 0000    |
| Filler  | 2n  | constant 11                |     | 11      |
| Filler  | 1n  | constant 4                 |     | 4       |
| Filler  | 6n  | constant 000000            |     | 000000  |
| Month   | 2n  | Payroll month              |     | 07      |
| Year    | 2n  | Payroll year (two digits)  |     | 00      |
| Filler  | 4n  | constant 0000              |     | 0000    |

The data record has the following structure:
| Field name  | Data type/  | Contents  |     | Example  |
| ----------- | ----------- | --------- | --- | -------- |
format
| Record type  | 2a  | constant "S5"  |     | S5  |
| ------------ | --- | -------------- | --- | --- |
Company number  6n  Company number with leading zerors (the  000100
company number has four digits in HYDRA).
| Filler        | 5n  | constant 00000         |     | 00000     |
| ------------- | --- | ---------------------- | --- | --------- |
| Filler        | 2n  | constant 00            |     | 00        |
| Change field  | 8n  | Deviating hour record  |     | 00000000  |
constant 00000000
Decimal  value  /  8n  Duration of the wage type in decimal hours  00003250
| hours  |     | with two decimal places.   |     |     |
| ------ | --- | -------------------------- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 25 of 89

|     |     |     |   Formats used to upload data to payroll accounting  |     |
| --- | --- | --- | ---------------------------------------------------- | --- |

| Algebraic sign  | 1a  | constant 1 space  |     | " "  |
| --------------- | --- | ----------------- | --- | ---- |
Wage type  5n  Wage type with leading zeros (the wage type  01100
has 4 characters in HYDRA)
| Cost center  | 8n  | Cost center with leading zeros  |     | 00234511  |
| ------------ | --- | ------------------------------- | --- | --------- |
Personnel number  5n  Personnel number (The personnel number  08142
has 8 digits in HYDRA. The last five digits of
|     |     | the  personnel  | are  transferred).  |   HYDRA  |
| --- | --- | --------------- | ------------------- | -------- |
possible transfers the last five digits.
| Date from  | 4n  | constant 0000  |     | 0000  |
| ---------- | --- | -------------- | --- | ----- |
| Date to    | 4n  | constant 0000  |     | 0000  |

| 1.8.1.1  | Interface configuration  |     |     |     |
| -------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active       |    |     |                                                 |     |
| ------------ | --- | --- | ----------------------------------------------- | --- |
| Key          |     |     | Value                                           |     |
| FORMAT       |     |     | FOSS                                            |     |
|              |     |     | Output format                                   |     |
| ROUND_MODE   |     |     | With the interface FORMAT= FOSS, the hours are  |     |
rounded (arithmetic rounding). If required, you can
enable the option ROUND_MODE=FLOOR to cut
off the decimal places of the hours of a wage type
(cut off = round down).

| 1.9  GENERIC  |     |     |     |     |
| ------------- | --- | --- | --- | --- |
 Upload of monthly wage types
Available as of hylobu version 8.1.1.220.

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 26 of 89

Formats used to upload data to payroll accounting
This format is a generic standard format in the HYDRA PDM list format. A large number of data columns
are output, which can be provided by HYDRA PZW.
The primary purpose of this format is used by MPDV as a starting point for further processing of
customizations. However, this format can also be used by customers for further processing by customer-
specific software or payroll accounting programs.
The file consists of a header line with column names and the following data rows:
The columns have no specific width and separator is the pipe "|". Date fields are in the format:
MM/DD/YYYY. Decimal separator for floating point numbers is the point. The maximal length of the column
can increase for future HYDRA versions.
Note: The order is not fixed. MPDV can at all times enter additional columns or change the
order. Therefore, bear in mind the header row when evaluating data.
Field Type Contents
PNR N HR master data: pesonnel number
(=night)
PNAME A HR master data: last name
PVORNAME A HR master data: first name of a person
PVORNAME_2 A HR master data: middle name of the person
PFIR A HR master data: company
PBER A HR master data: area
PKST A HR master data: cost center
PABT A HR master data: department
PKREIS A HR master data: employee subgroup
Entry D Master data: date of entry
Leaving D HR master data: leaving date
BESCHVERH A HR master data: employment relationship
GEBDAT D HR master data: date of birth
INFOTXT_1 A HR master data: free configurable info field from the HR master data
INFOTXT_2 A HR master data: free configurable info field from the HR master data
INFOTXT_3 A HR master data: free configurable info field from the HR master data
INFOTXT_4 A HR master data: free configurable info field from the HR master data
INFOTXT_5 A HR master data: free configurable info field from the HR master data
INFOTXT_6 A HR master data: free configurable info field from the HR master data
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 27 of 89

Formats used to upload data to payroll accounting
INFOTXT_7 A HR master data: free configurable info field from the HR master data
INFOTXT_8 A HR master data: free configurable info field from the HR master data
INFOTXT_9 A HR master data: free configurable info field from the HR master data
INFOTXT_10 A HR master data: free configurable info field from the HR master data
INFOTXT_11 A HR master data: free configurable info field from the HR master data
INFOTXT_12 A HR master data: free configurable info field from the HR master data
INFOTXT_13 A HR master data: free configurable info field from the HR master data
INFOTXT_14 A HR master data: free configurable info field from the HR master data
INFOTXT_15 A HR master data: free configurable info field from the HR master data
INFOTXT_16 A HR master data: free configurable info field from the HR master data
INFOTXT_17 A HR master data: free configurable info field from the HR master data
INFOTXT_18 A HR master data: free configurable info field from the HR master data
INFOTXT_19 A HR master data: free configurable info field from the HR master data
INFOTXT_20 A HR master data: free configurable info field from the HR master data
INFOWERT_1 N HR master data: free configurable info field from the HR master data
(=night)
INFOWERT_2 N HR master data: free configurable info field from the HR master data
(=night)
INFOWERT_3 N HR master data: free configurable info field from the HR master data
(=night)
INFOWERT_4 N HR master data: free configurable info field from the HR master data
(=night)
INFOWERT_5 N HR master data: free configurable info field from the HR master data
(=night)
INFODAT_1 D HR master data: free configurable info field from the HR master data
INFODAT_2 D HR master data: free configurable info field from the HR master data
INFODAT_3 D HR master data: free configurable info field from the HR master data
INFODAT_4 D HR master data: free configurable info field from the HR master data
INFODAT_5 D HR master data: free configurable info field from the HR master data
LART A Wage type from HYDRA-PZE. Also a Payment day type can be entered
here that is used in HYDRA for absence planning. You can differentiate
between a wage type and a remuneration day type by referring to the
fields TERM_ANW, TERM_FEAR, FEARDAYS and
PARTIAL_FEARDAYS described below:
- If there is only a value in DAUER_ANW und DAUER_FEHL ,
then it is a wage type.
- If a value is only available in full or half days, then it is a
payment day type.
- If a value exists in DURATION_ANW, DURATION_FEHL as
well as in the full or half days, then it is both a wage type and a
remuneration day type. In this case, the wage type of an
absence is identical to the payment day type used for
planning.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 28 of 89

Formats used to upload data to payroll accounting
LGRP A Wage group (not used in the standard)
KST A Cost center
DAUER_ANW N Duration from attendance times in seconds
(=night)
DAUER_FEHL N Duration from absences in seconds
(=night)
ZEITGRAD N Performance efficiency rate multiplied by factor 1000 (not used in the
(=night) standard system)
FEHLTAGE N Number of days with a full day absence. In field Wage type, the number
(=night) of the payment day type used is uploaded. If a wage type with the same
number exists, a common data record is used for the transfer.
TEILFEHLTAGE N Number of days with a partial absence. In field Wage type, the number
(=night) of the payment day type used is uploaded. If a wage type with the same
number exists, a common data record is used for the transfer.
DAT_VON D Start date of the accounting period
DAT_BIS D Last date of the accounting period
LOHNSATZ N Wage record (constant 0 in the standard)
(=night)
LOHNBETRAG N Wage amount (0 constant in the standard)
(=night)
DATE D Posting date of the data Default is the start of the accounting period
LART_AVGART A Average type from the wage type master data
LART_LOBU_MOD A Control characteristic for payroll accounting from the wage type master
data
KST_ORIG A Original cost center from the monthly wage type (not replaced by the
cost center for payroll accounting from the cost center master data)
KST_LOBU_KST A Cost center for the payroll accounting from the master data cost center
KST_LOBU_MOD A Control characteristic for payroll accounting from the cost center master
data
ANR A Order and operation number (empty in the standard)
KTOSTAND_1 N Account balance of the person from account no. 1 at the end of the
(=night) accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_2 N Account balance of the person from account no. 2 at the end of the
(=night) accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_3 N Account balance of the person from account no. 3 at the end of the
(=night) accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_4 N Account balance of the person from account no. 4 at the end of the
(=night) accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_5 N Account balance of the person from account no. 5 at the end of the
(=night) accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 29 of 89

|     |     |     | Formats used to upload data to payroll accounting  |     |
| --- | --- | --- | -------------------------------------------------- | --- |

KTOSTAND_6  N  Account balance of the person from account no. 6 at the end of the
(=night)  accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_7  N  Account balance of the person from account no. 7 at the end of the
(=night)  accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_8  N  Account balance of the person from account no. 8 at the end of the
(=night)  accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
TAGE_ANW  N  Total number of attendance days for the person in the payroll period
(=night)
AZ_ANW  N  Total number of attendance time of the person in the accounting period
(=night)  in seconds.

Example file
PF666666666666666 NO666666666666666 RD777777777777777 |A||||||||||||||| NTSSSSSSSSSSSSSSS A_ccccccccccccccc M4hhhhhhhhhhhhhhh E|uuuuuuuuuuuuuuu |Illlllllllllllll PNzzzzzzzzzzzzzzz VF||||||||||||||| OOCCCCCCCCCCCCCCCh RDhhhhhhhhhhhhhhr NArrrrrrrrrrrrrr ATiiiiiiiiiiiiiii M_sssssssssssssss E5ttttttttttttttti ||iiiiiiiiiiiiiia PLaaaaaaaaaaaaaa VAnnnnnnnnnnnnnnn OR||||||||||||||| RT||||||||||||||| N|BBBBBBBBBBBBBBB ALSSSSSSSSSSSSSSS MGPPPPPPPPPPPPPPP ER||||||||||||||| _PVVVVVVVVVVVVVVV 2|IIIIIIIIIIIIIII |K||||||||||||||| PS555555555555555 FT111111111111111 I|888888888888888 RD777777777777777 |A||||||||||||||| PUVVVVVVVVVVVVVVV BEIIIIIIIIIIIIIII --------------- ERVVVVVVVVVVVVVVV R_BBBBBBBBBBBBBBB |A111111111111111 PN||||||||||||||| KWAAAAAAAAAAAAAAA S|zzzzzzzzzzzzzzz TDuuuuuuuuuuuuuuu |Abbbbbbbbbbbbbbb PUiiiiiiiiiiiiiii AE||||||||||||||| BR000000000000000 T_444444444444444 |F/////////////// PE000000000000000 KH111111111111111 RL/////////////// E| 1111 IZ 9999 SE999999999999999 |I 3333 ET||||||||||||||| IG||||||||||||||| NR AAAA TA||||||||||||||| RD1111111 I|111111111111111 TF/////// TE 22222 |H444444444444444 AL/////// UT11 SA99 TG7 RE1 I|| TTD TEI |I--------------- BLCCCCCCCCCCCCCCC EFSSSSSSSSSSSSSSS SE                CH999999999999999 HL 333333333 VT||||||||||||||| EA888888888888888 RG444444444444444 HE||||||||||||||| || 111111111 GD555555555555555 EA 666666666 BT||||||||||||||| D_444444444444444 AV||||||||||||||| TOMMMMMMMMMMMMMMM |Niiiiiiiiiiiiiii I|ttttttttttttttt NDttttttttttttttt FAlllllllllllllll OTeeeeeeeeeeeeeee T_rrrrrrrrrrrrrrr XBeeeeeeeeeeeeeee TI                _SR 1|eeeeeeeeeeeeeee |Liiiiiiiiiiiiiii IO f NHeeeeeeeeeeeeeee FN | OSTA--------------- XT||||||||||||||| TZ||||||||||||||| _|||||||||||||||| 2L||||||||||||||| |O||||||||||||||| IH||||||||||||||| NN||||||||||||||| FB||||||||||||||| OE||||||||||||||| TT||||||||||||||| XR||||||||||||||| TA||||||||||||||| _G||||||||||||||| 3|||||||||||||||| |D||||||||||||||| IA888888888888888 NT888888888888888 FU888888888888888 OM||||||||||||||| T|--------------- XA999999999999999 666666666666666 TV_G555555555555555 A||||||||||||||| 4|R555555555555555 IT555555555555555 ||||||||||||||| N|FL--------------- OO999999999999999 TB666666666666666 UX ||||||||||||||| T_||||||||||||||| _M||||||||||||||| O5 ||||||||||||||| |D||||||||||||||| |I ||||||||||||||| NK||||||||||||||| FS111444444555666 TO 000000555222000 T_000000000666000 XO||||||||||||||| TR||||||||||||||| _I455455455455455 6G711711711711711 || 138138138138138 IK237237237237237 SN l||l||l||l||l|| TF o58o00o00o61o00 O_b16b||b||b40b|| TLu84u81u12u88u12 XO|40|64|78|00|78 TB3000440284|0028 _U4|||00|8034||80 _7 5005|0100237100 K| 6||70|1||0221|| IS0006|0500|00500 NT|||00|2||2|02|| F|005||100280|002 OK|||00||||8|0||| TS000||000000|001 TX |||00||||||0||| _T 000|1000000|000 _L|110/1|11||0|11 8O0//|0/0//00|0// |B|00010|00|10|00 IU0111/10110/1011 N_1///2/1//|0/1// FM/22002/22010/22 OO0001100001/1000 DT 111/31111/2/111 |X /332|3/33002/33 TA2||00|2||1102|| _N000110000/31000 9R1113/11112|3111 ||3//|3/3//00|3// IK|33013|33110|33 NT0111/10113/1011 FO1///2/1//|3/1// OS/22302/22013/22 TT3001103001/1300 XA111/31111/2/111 TN/332|3/33302/33 2||00|2||1102|| _D0001|0000/31000 1_011||30|1||2|31|| ||300||030000|300 IK|||00||||1|0||| NT000|1000030|000 FO|110/1|11||0|11 OS0//|0/0//00|0// |00010|00|10|00 TT0111/10110/1011 XATN1///2/1//|0/1// _D/22002/22010/22 1_0001100001/1000 12111/31111/2/111 ||/332|3/33002/33 IK2||0||2||1102|| 0dd1||0||/310|| NT1||35|1||2|31|| FOOS311|153550||355 TT|00|31|111|||11 XAd00|38|3835||38 TN|__4|7|37|15|37 _D1LL7||4|||314|| 1_0OO1||7|||387|| 0BB2||1||4|71|| 23_UU| || IKL__4 NTOKK7 FOB||1 OSU552 TT_11l XAK38o |37b TN 4||u _D 1_7||| 341||4 ||2||7 IK| NT4 FO7 1 OS 2 TT XAl TNo _Db _1 u 45| || 4 IK7 TN 1 FO2 SO _ TTk AX z|||0606602|066 TN_00000|00 D_ l||| 1_o 65 | ||| KI -||6 NT877 FO1 S0 O TT011| XA0660 N|00| T D000 _ _| 1 670||0 |||  | IK2 T6 N FO0 OS| TT0 XA| N0 T D| _ 1_0 78| |0 | T| I A7 N FG| OE2 T_1A6 XN0 TW0 _1|0 8A|Z|  _IANNFWO|TX T_19|INFOTXT_20|INFOWERT_1|INFOWERT_2|INFOWERT_3|INFOWERT_4|INFOWERT_5|INFODAT_1|INFODAT_2|INFODAT_3|IN
|     | 1111 9999 7777 11111 || DDDDDDDD IIIII I RRRRRRRR                             | ffffffffffffff |||||||||||||| | -- 88 11 00 00 00 || 00 || 00 ||-|0 2287|-|| 661 00                                                                                       | ||012 000610111| 000| ||| |0||0 002 ||| 220 00|                                               |
| --- | ----------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
|     | 1 9 3 A |||                                                                   |                               | - 8- 18 01 0 00 |0 0| |0 0 |0 2| 1 62 2 0 _ | k 0| z |0 _ 0| l |0 o 0 | |0 | 0| | 0 2|                                                    | 0 0 0 7 | 2 1 6 0 0 0 |                                                                       |
|     | 1111111111 9999999999 3333333333 AAAAAAAAAA 2 222222222 1 9 77 1 |            |                               | |2||7||2|| | 4 7 1 0 2 l o b u | | 4 7 1 6 2 0 _ k z _ l | o | | 7877 1                                                                   | 0 0000 0|00  |  | 2 6 0 | 0 | 0 | 0 | 0 | 7 | 2 1 6 0 0 0 |                                   |
|     | 1111111 1 /////// / // / 11 1 9 9 77 7 1 1 | | I I                            |                               | -- 88 11 00 00 00 || 00 || 00 || 22 66 00 || 00 || 00 || 00 || 00 ||                                                                      | 228                                                                                           |
|     | //// / 1111 1 9 9999 9 77 1 11 | || D DD I II 3 33333 1 11111 6 66666 R RRRRR |                               | 1||| 2||4 | |7 - 4 8- 7 18 1 01 2 0 0 l 00 o |0 b 0| u |0 | 7| 0 4 |0 7 2| 1 62 2 06 _ |0 k 0| z |0 _ 0| l |0 o || 0 | |0-|| | 0|877 -|01 | 7|0 7 12|00 0 61000 0 06|00 | 00 00 |02 0  |6 | 2   6 0 | 0 | 0 | 0 | 0 | 7 | 2 1 6 0 0 0 |   |
|     | 777 111 ||| DDD III                                                           |                               | -- 88 11 1 00 2 00 l 00 o || b 00 u || | 00 4 || 22 1 66 2 00 _ || k 00 z || _ 00 l || o 00 | || 00 ||                                    | 22 011 0|| |   0 | 0 | 0 | 0 | 0 | 7 | 2 1 6 0 0 0 |                                          |

| 1.9.1.1  | Interface configuration  |     |     |     |
| -------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |     |          |     |
| --------- | --- | --- | -------- | --- |
| Key       |     |     | Value    |     |
| FORMAT    |     |     | GENERIC  |     |
Output format

 Upload of absences
Available as of hylobu version 8.1.1.220.
A separate interface file is provided for the absence times. This file is provided with the monthly wage types.
It is stored on the HYDRA server in the HYDRA directory under the name "hyfehl.dat".

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 30 of 89

    Formats used to upload data to payroll accounting

The interface is made available as an ASCII file.  This format is a generic standard format in the HYDRA
PDM list format.
The file consists of a header row with column names and the following data rows:
The  columns  have  no  specific  width  and  separator  is  the  pipe  "|".  Date  fields  are  in  the  format:
MM/DD/YYYY. Decimal separator for floating point numbers is the point.  The maximal length of the column
can increase for future HYDRA versions.
Note: The order is not fixed.  MPDV can at all times enter additional columns or change the
order.  Therefore, bear in mind the header row when evaluating data.

| Field  | Type /  | Comment  |
| ------ | ------- | -------- |
Max. length
| FIR   | A           | Company from the HR master data         |
| ----- | ----------- | --------------------------------------- |
| PNR   | N (=night)  | Personnel number without leading zeros  |
| DATB  | D           | First day of absence                    |
| DATE  | D           | Last day of absence                     |
GRUND  N (=night)  Number of the payment day type of absence
times
| BEZK  | A   | Abbreviation of the remuneration day type for  |
| ----- | --- | ---------------------------------------------- |
absence
| BEZAUSF  | A   | Name of the remuneration day type for absence   |
| -------- | --- | ----------------------------------------------- |

Additional notes
  The absence periods are transferred as one data record including weekends and days off.
  If the absence period includes a change of month, the period is divided. This means: If the
absences include several months, they are divided into several periods.
  If you have configured a period of continued pay in HYDRA (LFZ), the LFZ period is finished when
the specified time has expired and a period with another absence reason is transferred.
  The Processing of absence times can be used to control which absence times are transferred.

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 31 of 89

|     |     |   Formats used to upload data to payroll accounting  |     |
| --- | --- | ---------------------------------------------------- | --- |

  You can transfer full-day absences and partial absences.
1.10  HANSALOG (record type V1)
  Upload of monthly wage types
Uploading the monthly wage types is performed with the following data record structure:
| Field  | Type  Positi | Max.  Decimal  | Contents  |
| ------ | ------------ | -------------- | --------- |
on  length  places
| Record type       | alpha  1  | 2    | V1                                 |
| ----------------- | --------- | ---- | ---------------------------------- |
| Company           | num  3    | 3    | HYDRA company, the first 3 digits  |
| Personnel number  | num  6    | 5    | HYDRA personnel number             |
| Accounting key    | num  11   | 1    | 0 (zero)                           |
| Monat             | num  12   | 2    | Monat                              |
| Wage type         | num  14   | 3    | HYDRA wage type (converted to      |
three numeric digits)
| Time             | num  17    | 6  2  | HHHHII                         |
| ---------------- | ---------- | ----- | ------------------------------ |
| Factor           | num  23    | 5  2  | Empty (blanks)                 |
| Amount           | num  28    | 8  2  | Empty (blanks)                 |
| Percentage       | num  36    | 5  2  | Empty (blanks)                 |
| Cost center      | num  41    | 6     | Cost center wage type posting  |
| Cost object      | num  47    | 6     | HR master data cost center     |
| Free field 1     | alpha  53  | 38    | blanks                         |
| Accounting year  | num  91    | 4     | Year                           |
| Free field 2     | alpha  95  | 34    | blanks                         |

The total record length is 128 characters. Numeric fields are transferred with leading zeros.
Negative content only exists for the fields Time and Amount. In this case, the first character in the field is
not a leading zero, but a minus sign.
1.10.1.1  Interface configuration
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 32 of 89

|     |     |     |   Formats used to upload data to payroll accounting  |
| --- | --- | --- | ---------------------------------------------------- |

| INI name  | HYD-LUG  |     |           |
| --------- | -------- | --- | --------- |
| Section   | OPTIONS  |     |           |
| Key       | xxxxxx   |     |           |
| Value     | xxxxxx   |     |           |
| Active    |         |     |           |
| Key       |          |     | Value     |
| FORMAT    |          |     | HANSALOG  |
Output format

| 1.11  HANSALOG (record type V3)  |     |     |     |
| -------------------------------- | --- | --- | --- |
  Upload of monthly wage types
The wage type totals determined at the end of the month are transferred to Hansalog Payroll Accounting
via V3 records (and imported there as file LGT.BEWEG). When the interface file is created, the file is stored
in the HYDRA directory of the HYDRA shop floor scheduling with the name "hylobu.dat".
| Field             |     | Type  | Item  Contents           |
| ----------------- | --- | ----- | ------------------------ |
| Record type       |     | C2    | 1  V3                    |
| System            |     | N2    | 3  00 constant           |
| Company           |     | N3    | 5  HYDRA company number  |
| Personnel number  |     | N10   | 8  Personnel number      |
Accounting key  N1  18  Constant 0. ( 0: for running month, 3 for previous
month)
Accounting date  N6  19  YYYYMM from the start of the accounting period
| Wage type  |     | N4  | 25  HYDRA wage type  |
| ---------- | --- | --- | -------------------- |
Time  N 8.2  29  Time for the wage type in the format HHHHHHII
| Factor       |     | N 5.2         | 37  Empty              |
| ------------ | --- | ------------- | ---------------------- |
| Amount       |     | N 9.2         | 42  Empty              |
| Percentage   |     | N 5.2         | 51  Empty              |
| Cost center  |     | N 12 or C 12  | 56  HYDRA cost center  |
| Cost object  |     | N12           | 68  Empty              |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 33 of 89

|     |     |     |   Formats used to upload data to payroll accounting  |
| --- | --- | --- | ---------------------------------------------------- |

| Internal field 1  |     | C72  | 80  Empty                           |
| ----------------- | --- | ---- | ----------------------------------- |
| Created date      |     | N8   | 152  YYYYMMDD of the interface run  |
| Created system    |     | C8   | 160  "HYDRA P" for data from PZE    |
(„HYDRA L" for data from LLE)
| User              |     | C8   | 168  HYDRA  |
| ----------------- | --- | ---- | ----------- |
| Internal field 2  |     | C25  | 176  Empty  |
The total length that can be used is 200 byte.
Numeric fields can be set blank or 0 if not needed. At least one of the fields time, factor, amount or
percentage must be filled.
The cost center in Hansalog can only be administered numeric or alphanumeric.
The fields creation date, creation system, creation user can be used in Hansalog to delete the transferred
data.
If there is a negative numeric value, the minus is put in front instead of a leading zero.  That means the field
length is shorter.
Example:
V300  0         90200701 100   93.00                            123                                                                                    20070202 HYDRA PHYDRA
V300  0         90200701 400    8.00                            105                                                                                    20070202 HYDRA PHYDRA
V300  0         90200701 400   80.00                            123                                                                                    20070202 HYDRA PHYDRA
V300  0         90200701 888   24.00                            123                                                                                    20070202 HYDRA PHYDRA
V300  0        100200701 100   24.00                            123                                                                                    20070202 HYDRA PHYDRA
V300  0        100200701 410  160.00                            123                                                                                    20070202 HYDRA PHYDRA
V300  0        100200701 888    6.00                            123                                                                                    20070202 HYDRA PHYDRA

| 1.11.1.1  | Interface configuration of the monthly wage types  |     |     |
| --------- | -------------------------------------------------- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 34 of 89

    Formats used to upload data to payroll accounting

| Key     |     |     | Value        |     |     |
| ------- | --- | --- | ------------ | --- | --- |
| FORMAT  |     |     | HANSALOG_V3  |     |     |
Output format
CUSTOMER or COMPANY  With the formats HANSALOG_V3, you can use
these options to specify the company.
or  COMPANY_NONSALARIED_EMPLOYEES
and COMPANY_SALARIED_EMPLOYEES

| ABREKZ  |     |     | With  FORMAT=  | HANSALOG_V3,  | you  can  use  |
| ------- | --- | --- | -------------- | ------------- | -------------- |
these options to specify the accounting key.

1.12  INTEGRA
  Upload of monthly wage types
The interface to transfer the monthly wage types have the following format:
| Field name  | Posi Data  | typ/  Contents  |     |     | Example  |
| ----------- | ---------- | --------------- | --- | --- | -------- |
tion  format
| FIRMENNR  | 1  C(4)   | Company           |     |     | TER     |
| --------- | --------- | ----------------- | --- | --- | ------- |
| ABRJAHR   | 5  C(4)   | Payroll year      |     |     | 2005    |
| ABRMONAT  | 9  C(2)   | Accounting month  |     |     | 06      |
| PERSNR    | 11  N(6)  | Personnel number  |     |     | 142356  |
| SATZART   | 17  C(1)  | constant 1        |     |     | 1       |
| LANR      | 18  C(3)  | Wage type         |     |     | 100     |
| LFDNR     | 21  N(4)  | Always 0          |     |     | 0000    |
STDTAGE  25  N(10,2)  Duration (10 digits with 2 decimal places)  00000058.23
| FAKTOR   | 35  C(10)  | Constant empty  |     |     |     |
| -------- | ---------- | --------------- | --- | --- | --- |
| PROZENT  | 45  C(10)  | Constant empty  |     |     |     |
(percentage)
| BETRAG (amount)  | 55  C(10)  | Constant empty  |     |     |         |
| ---------------- | ---------- | --------------- | --- | --- | ------- |
| KST              | 65  C(10)  | Cost center     |     |     | 22-105  |
| KTR              | 75  C(10)  | Constant empty  |     |     |         |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 35 of 89

    Formats used to upload data to payroll accounting

| PROJEKT   | 85  | C(10)  Constant empty        |     |
| --------- | --- | ---------------------------- | --- |
| TAG       | 30  | C(2)  Constant empty         |     |
| VERARBKZ  | 32  | C(1)  Processing ID 0 = new  | 0   |
| FREE      | 35  | C(21)  Reserve               |     |
At the end of each row is CR/LF
Example:
001 200503000002110000000000107.33                              0                               0
001 200503000002110100000000038.75                              0                               0
001 200503000002120000000000000.33                              0                               0
001 200503000002120500000000009.58                              0                               0
001 200503000002130100000000010.00                              0                               0
BSP 200503000009110000000000013.00                              22-1                            0
BSP 200503000009141000000000004.00                              22-1                            0
BSP 200503000009157500000000008.00                              22-1                            0

| 1.12.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |
Key  Value
FORMAT  INTEGRA
Output format

| 1.13  KASPAR  |     |     |     |
| ------------- | --- | --- | --- |
  Upload of monthly wage types
To upload the monthly wage types, the semicolon ";" is used as column separator.
Data types:
| Type  Meaning                 |     | Formatting          |     |
| ----------------------------- | --- | ------------------- | --- |
| Cn  Character (string, text)  |     | with max. length n  |     |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 36 of 89

|     |     |     |   Formats used to upload data to payroll accounting  |     |
| --- | --- | --- | ---------------------------------------------------- | --- |

Nn  Integer  The maximum number of digits n. Negative values are preceded by the
sign "-".
Nx.y  Decimal number  with "." (Point) as decimal separator and maximum x total digits and y
decimal places. Negative values are preceded by the sign "-".

Structure:
| Field/meaning                          |     |     | Column name         | Data type  |
| -------------------------------------- | --- | --- | ------------------- | ---------- |
| Customer number (Fix)                  |     |     | Kundennr            | C5         |
| Personnel number (with leading zeros)  |     |     | Pnr                 | C7         |
| Year (YYYY)                            |     |     | Jahr                | C4         |
| Month (MM)                             |     |     | Monat               | C2         |
| Wage type (with leading zeros)         |     |     | Lohnartenschlüssel  | C4         |
| Hours (or day) for wage type           |     |     | Einheit             | N8.2       |
| Temporary field (fixed value 0)        |     |     | Temp1               | C15        |
| Start date absence (YYYYMMDD)          |     |     | Startdatum          | C8         |
| End date of absence (YYYYMMDD)         |     |     | Endedatum           | C8         |
| Temporary field (fixed value 0)        |     |     | Temp2               | C15        |
| Temporary field (fixed value 0)        |     |     | Temp3               | C1         |
At the end of each row is CR/LF
Example:
00519;0000061;2004;08;0001;   168.00;              0;        ;        ;              0;0
00519;0000061;2004;08;0199;    16.00;              0;20040826;20040827;              0;0

| 1.13.1.1  | Interface configuration  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |     |     |     |
| --------- | --- | --- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 37 of 89

|     |     |     |     |   Formats used to upload data to payroll accounting  |     |     |     |
| --- | --- | --- | --- | ---------------------------------------------------- | --- | --- | --- |

| Key     |     |     |     | Value   |     |     |     |
| ------- | --- | --- | --- | ------- | --- | --- | --- |
| FORMAT  |     |     |     | KASPAR  |     |     |     |
Output format
| 1.13.1.2  | Interface configuration  |     |     |          |     |     |     |
| --------- | ------------------------ | --- | --- | -------- | --- | --- | --- |
| Key       |                          |     |     | Value    |     |     |     |
| FORMAT    |                          |     |     | INTEGRA  |     |     |     |
The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the formats
KASPAR. The other formats issue the HYDRA
standard format.

| ABSENCES_SEPARATE_FILE  |     |     |     | ON                  |          |                |      |
| ----------------------- | --- | --- | --- | ------------------- | -------- | -------------- | ---- |
|                         |     |     |     | With  the  formats  | KASPAR,  | the  absences  | are  |
written in the same file as the wage types. You can
|     |     |     |     | use  this  option  | to  specify  | that  also  | with  these  |
| --- | --- | --- | --- | ------------------ | ------------ | ----------- | ------------ |
formats the absences are written in a separate file
using the name hyfehl.dat.

| 1.14  | KDVLOHN_V2 (Kanne, new format CSV file)  |     |     |     |     |     |     |
| ----- | ---------------------------------------- | --- | --- | --- | --- | --- | --- |
  Monthly wage types: 77n (data without cost center)
With this interface, the field lengths are not fixed. To separate the fields, a semicolon ";" is used. The field
lengths listed below are maximum values.
The comma is the decimal separator.
The interface has the following format.
| Position  | Field      | Type   | Contents     |     |     |     | Example  |
| --------- | ---------- | ------ | ------------ | --- | --- | --- | -------- |
| 1         | Record ID  | Fixed  | always "77"  |     |     |     | 77       |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 38 of 89

Formats used to upload data to payroll accounting
[2] File number C(10) Optional field that must be activated explicitly in the 0584
configuration. See also notes on the configuration
below.
This field includes a configurable value.
[3 or 2] Plant C(20) Optional field that must be activated explicitly in the G
configuration. See also notes on the configuration
below.
This field includes a configurable value.
4 or 3 or Personnel N(8) Personnel number from the HYDRA HR master data 87654321
2 number
5 or 4 or Payroll YYYYMM By default, the Accounting month is output (not the 201602
3 month consecutive month).
6 or 5 or Leave days N(3.1) Leave taken (full or half days) as booked in the leave 12.5
4 account in HYDRA.
7 or 6 or Sick leave N(2) Sick leave are days when wage types are booked that 5
5 have a "K" in field Selection indicator in the wage type
master data.
8 or 7 or Public N(1) Public holidays are days when wage types are booked 1
6 holidays that have an "F" in field Selection indicator in the wage
type master data.
9 or 8 or Wage type C(4) Wage type 0004
7
10 or 9 or Value N(5.2) Hours of a wage type 123.75
8
In each data record, the number of leave days, sick leave and public holidays is transferred. If no wage
type data records are transferred for a person, the system creates an additional data record with empty
wage type and value=0,00 if one of the day field does not equal 0.
Example data:
77;0584;G;568;201502;4,5;0;1;;0,00
77;0584;G;667;201502;1,5;5;1;100;97,50
77;0584;G;667;201502;1,5;5;1;200;4,25
77;0584;G;667;201502;1,5;5;1;220;14,00
77;0584;G;667;201502;1,5;5;1;400;34,50
77;0584;G;667;201502;1,5;5;1;450;12,00
77;0584;G;667;201502;1,5;5;1;528;1,00
77;0584;G;667;201502;1,5;5;1;600;8,00
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 39 of 89

Formats used to upload data to payroll accounting
77;0584;G;667;201502;1,5;5;1;996;21,50
77;0584;G;667;201502;1,5;5;1;999;40,00
77;0584;L;10003645;201502;0,0;0;0;526;1,00
77;0584;L;10003645;201502;0,0;0;0;996;18,50
77;0584;L;10003645;201502;0,0;0;0;999;13,50
INI data configuration INI name HYD-LUG
Note: In most cases, the following settings are valid for the wage type interface and the absence interface.
In addition to the below-mentioned special configurations, the general configuration options for absence
interfaces still apply.
OPTIONS / FORMAT=KDVLOHN_V2
Sets the format.
OPTIONS / COMPANY
or COMPANY_SALARIED_EMPLOYEES or COMPANY_NONSALARIED_EMPLOYEES
Using this option, the column "Plant" is activated and the contents are defined. Using
COMPANY_SALARIED_EMPLOYEES or COMPANY_NONSALARIED_EMPLOYEES, you can
configure the contents independent of the HR master data field Employment relationship.
OPTIONS / CONTRACT
Using this option, the column "File number" is activated and the contents are defined.
Other
This interface does not include a cost center field. If this format is therefore activated, the options
"Without cost center"“ ( COSTCENTER=OFF) and "Summarize wage types" (
WAGETYPES_ONCE=ON) are implicitly activated. The option "Upload of daily wage type postings"
is deactivated.
Further notes on the configuration
Wage types
In the master data of the wage types, you use the field Selection indicator to control which wage type
days are used to identify Sick leave or Public holiday.
Selection indicator "K": Sick leave
Selection indicator "F": Public holiday
You use the standard options in the group Payroll accounting to control whether and how the wage
type is transferred from HYDRA to KDVLOHN.
1.14.1.1 Interface configuration
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 40 of 89

    Formats used to upload data to payroll accounting

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |
Key  Value
FORMAT  KDVLOHN_V2
  Output format
CONTRACT or CONSULTANT  In the FORMAT=KDVLOHN_V2, you can enable
  and set the field File number via these options.

  Absences: 7Fn (calendar dates)
With this interface, the field lengths are not fixed. To separate the fields, a semicolon ";" is used. The field
lengths listed below are maximum values.
The interface has the following format.
| Position  Field  | Type   | Contents     | Example  |
| ---------------- | ------ | ------------ | -------- |
| 1  Record ID     | Fixed  | always "7F"  | 7F       |
[2]  File number  C(10)  Optional field that must be activated explicitly in the  0584
configuration. See also notes on the configuration
below.
This field includes a configurable value.
[3 or 2]  Plant  C(20)  Optional field that must be activated explicitly in the  G
configuration. See also notes on the configuration
below.
This field includes a configurable value.
4 or 3 or  Personnel  N(8)  Personnel number from the HYDRA HR master  87654321
| 2  number  |     | data  |     |
| ---------- | --- | ----- | --- |
5 or 4 or  Payroll  YYYYMM  By default, the Accounting month is output (not the  201602
| 3  month         |           | consecutive month).  |           |
| ---------------- | --------- | -------------------- | --------- |
| 6 or 5 or  From  | YYYYMMDD  | Date from.           | 20160201  |
4

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 41 of 89

Formats used to upload data to payroll accounting
7 or 6 or To YYYYMMDD Date to. 20160229
5
8 or 7 or Indicator C(10) Identifies the absence reason. See notes on AK
6 configuration.
9 or 8 or Record I/D I=Insert, D=Delete. HYDRA only supports I=Insert. I
7 indicator
Additional notes
 The absence periods are transferred as one data record including weekends and days off.
 If the absence period includes a change of month, the period is divided. This means: If the
absences include several months, they are divided into several periods.
 If you have configured a period of continued pay in HYDRA (LFZ), the LFZ period is finished when
the specified time has expired and a period with another absence reason is transferred.
 You can transfer full-day absences and partial absences.
 The outputs of the record type 7Fn for absences and the record type 77n for wage types are
included in the same file. If required, you can change the configuration and output absences and
wage types in separate files.
INI data configuration INI name HYD-LUG
Note: In most cases, the following settings are valid for the wage type interface and the absence interface.
In addition to the below-mentioned special configurations, the general configuration options for absence
interfaces still apply.
OPTIONS / FORMAT=KDVLOHN_V2
Sets the format.
OPTIONS / ABSENCES= ON | OFF
Switches the absence interface on or off.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 42 of 89

Formats used to upload data to payroll accounting
OPTIONS / COMPANY
or COMPANY_SALARIED_EMPLOYEES or COMPANY_NONSALARIED_EMPLOYEES
Using this option, the column "Plant" is activated and the contents are defined. Using
COMPANY_SALARIED_EMPLOYEES or COMPANY_NONSALARIED_EMPLOYEES, you can
configure the contents independent of the HR master data field Employment relationship.
OPTIONS / CONTRACT
Using this option, the column "File number" is activated and the contents are defined.
Further notes on the configuration
Control of absences
Using the Control of absences, you can control which absences are transferred with which "indicator".
Example data:
77;0584;G;667;201502;1,5;5;1;100;97,50
77;0584;G;667;201502;1,5;5;1;200;4,25
77;0584;G;667;201502;1,5;5;1;220;14,00
77;0584;G;667;201502;1,5;5;1;400;34,50
77;0584;G;667;201502;1,5;5;1;450;12,00
77;0584;G;667;201502;1,5;5;1;528;1,00
77;0584;G;667;201502;1,5;5;1;600;8,00
77;0584;G;667;201502;1,5;5;1;996;21,50
77;0584;G;667;201502;1,5;5;1;999;40,00
7F;0584;G;667;201502;20150202;20150205;K;I
7F;0584;G;667;201502;20150211;20150211;U;I
7F;0584;G;667;201502;20150217;20150217;F;I
7F;0584;G;667;201502;20150224;20150224;U;I
7F;0584;G;667;201502;20150225;20150225;K;I
7F;0584;G;667;201502;20150226;20150227;100;I
77;0584;G;885;201502;0,0;0;0;526;1,00
77;0584;G;885;201502;0,0;0;0;997;2,00
77;0584;G;885;201502;0,0;0;0;998;3,75
7F;0584;G;885;201502;20150202;20150202;100;I
77;0584;G;40563;201502;0,0;0;0;100;124,00
77;0584;G;40563;201502;0,0;0;0;200;12,25
77;0584;G;40563;201502;0,0;0;0;220;2,75
77;0584;G;40563;201502;0,0;0;0;526;18,00
77;0584;G;40563;201502;0,0;0;0;996;57,50
7F;0584;G;40563;201502;20150210;20150211;200;I
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 43 of 89

    Formats used to upload data to payroll accounting

| 1.14.2.1  Interface configurations  |     |     |        |     |     |     |
| ----------------------------------- | --- | --- | ------ | --- | --- | --- |
| Key                                 |     |     | Value  |     |     |     |
CONTRACT or CONSULTANT  In the FORMAT=KDVLOHN_V2, you can enable
|     |     |     | and set the field File number via these options.   |     |     |     |
| --- | --- | --- | -------------------------------------------------- | --- | --- | --- |
COMPANY or CUSTOMER  In the FORMAT=KDVLOHN_V2, you can enable
and set the field Plant using these options.
or  COMPANY_NONSALARIED_EMPLOYEES
and COMPANY_SALARIED_EMPLOYEES
| ABSENCES_SEPARATE_FILE  |     |     | ON  |     |     |     |
| ----------------------- | --- | --- | --- | --- | --- | --- |
With the formats KDVLOHN_V2, the absences are
written in the same file as the wage types. You can
|     |     |     | use  this  option  | to  specify  | that  also  with  | these  |
| --- | --- | --- | ------------------ | ------------ | ----------------- | ------ |
formats the absences are written in a separate file
using the name hyfehl.dat.

| FORMAT  |     |     | KDVLOHN_V2                                        |     |     |     |
| ------- | --- | --- | ------------------------------------------------- | --- | --- | --- |
|         |     |     | The key of the monthly wage types also specifies  |     |     |     |
the format. A manufacturer-specific format for the
absence interface is only available with the formats
KDVLOHN_V2 (Kanne new CSV format) The other
formats issue the HYDRA standard format.

1.15  KDVLOHN (Kanne, old format fixed record length)
  Upload of monthly wage types
The interface for transferring monthly wage types in the older format with fixed positions to the payroll
accounting system KDVLOHN (Kanne) has the following format:
| Field name  | Posi Data  | typ/  Contents  |     |     | Example  |     |
| ----------- | ---------- | --------------- | --- | --- | -------- | --- |
tion  format
| Record type  | 1  N(2)  | always "77"    |     |     | 77    |     |
| ------------ | -------- | -------------- | --- | --- | ----- | --- |
| File number  | 3  N(4)  | always "0584"  |     |     | 0584  |     |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 44 of 89

    Formats used to upload data to payroll accounting

Plant  7  A(1)  For salaried employees a 'G' (wage earner) and  G
for industrial workers an 'L' (wage earner).
| Personnel number     | 8   | N(5)  Personnel number                  | 14235  |
| -------------------- | --- | --------------------------------------- | ------ |
| V (= previous year)  | 13  | A(1)  Constant empty                    | " "    |
| Monat                | 14  | N(2)  Monat                             | 10     |
| Leave days           | 20  | N(3,1)  Holidas with one decimal place  | 025    |
Sick leave 80%  23  N(2)  Sick das with 80% LFZ, constant 0  00
Sick days with  25  N(2)  Sick days with 100% LFZ incl. holiday credit,  00
100% incl. holiday  constant 0
credit
Sick days with  27  N(2)  Sick days with 100% LFZ without holiday credit  03
100% without  (wage tpe 05 or 005)
holiday credit
Public holidays  29  N(1)  Public holidays (wage type 03 or 003)  1
Days of absence  30  N(2)  Absence days (wage type 78 or 078)  02
| Wage type  | 32  | N(3)  Wage type with leading zeros  | 013  |
| ---------- | --- | ----------------------------------- | ---- |
Value  35  N(6,2)  Duration  of  the  wage  type  with  2  decimal  001350
numbers

For each person, the first data record contains the number of holidays, sick days without taking holidays,
public holidays and absences into account. One wage type is transferred in each of the following records:
The number of holidays is in all data records.
| 1.15.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 45 of 89

|     |     |   Formats used to upload data to payroll accounting  |     |     |     |
| --- | --- | ---------------------------------------------------- | --- | --- | --- |

Key  Value
FORMAT  KDVLOHN
  Output format

1.16  LGVSoft
The data record for transferring the monthly wage types to LGVSoft has the following structure:
|   Data format of the wage types: V4 (wage types)  |     |     |     |     |     |
| ------------------------------------------------- | --- | --- | --- | --- | --- |

| Field    |                                        | Description   | Type   | Place  Example  |        |
| -------- | -------------------------------------- | ------------- | ------ | --------------- | ------ |
| V4STAT   | Status (A=active, I=inactive, 8=copy)  |               | C1     | 1               | A      |
| V4FINR   | Company number                         |               |        |                 |        |
|          |                                        |               | N8.0   | 2  00000001     |        |
| V4PENR   | Personnel number                       |               | N8.0   | 10  00006711    |        |
| V4PEJA   | Period year                            |               | N4.0   | 18              | 2011   |
| V4PERV   | Period month from                      |               | N2.0   | 22              | 01     |
| V4PERB   | Period month until                     |               | N2.0   | 24              | 01     |
| V4LOAR   | Wage type                              |               | N5.0   | 26              | 00100  |
| V4BETR   | Amount                                 |               | N11.2  | 31  Always 0    |        |
| V4MENG   | Quantity                               |               | N7.2   | 42  0017600     |        |
| V4SATZ   | Record                                 |               | N9.2   | 49  Always 0    |        |
| V4LOGR   | Wage group                             |               | N3.0   | 58  Always 0    |        |
| V4KOST   | Cost center                            |               | C10    | 61              | 105    |
| V4KOTR   | Cost object                            |               | C15    |                 |        |
|          |                                        |               |        | 71              | empty  |
| V4GEMC   | Municipality code                      |               | C3     | 86              | empty  |
| V4ZUTX   | Additional text                        |               | C25    | 89              | empty  |
| V4ENTS   | Origin code                            |               | C1     | 114             | empty  |
| V4VOND   | From                                   |               | N8.0   | 115  Always 0   |        |
| V4BISD   | Until                                  |               | N8.0   | 123  Always 0   |        |
| V4ZSAA   | Target record                          |               | C3     | 131             | „V1 “  |
| V4IDEN   | Identification                         |               | C20    | 134             | empty  |
| V4WAER   | Currency                               |               | C3     | 154             | EUR    |

  Interface is created in an ftp format.
  Each data record is displayed in a line (0D, 0A end of the lines).
  Alphanumeric fields must be started with blanks.  The field content is filled to the left.
  Numeric fields must be started with zeros.  The field content is filled to the right with leading zeros

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 46 of 89

|     |     |   Formats used to upload data to payroll accounting  |     |     |     |
| --- | --- | ---------------------------------------------------- | --- | --- | --- |

Example file (here shown with return at position 115)
A88888888000966652011010100100000000000000003225000000000000105
0000000000000000V1                     EUR
A88888888000966652011010100031000000000000000500000000000000105
0000000000000000V1                     EUR
A88888888000966652011010100400000000000000000400000000000000105
0000000000000000V1                     EUR
A88888888000966652011010100041000000000000003650000000000000105
0000000000000000V1                     EUR

| 1.16.1.1  | Interface configuration  |     |     |     |     |
| --------- | ------------------------ | --- | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |     |
| --------- | -------- | --- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |     |
| Key       | xxxxxx   |     |     |     |     |
| Value     | xxxxxx   |     |     |     |     |

| Active    |    |     |     |     |     |
| --------- | --- | --- | --- | --- | --- |
Key  Value
FORMAT  LGVSOFT
  Output format
CUSTOMER or COMPANY  With the formats LGVSOFT, you can use these
or  COMPANY_NONSALARIED_EMPLOYEES  options to specify the company.
and COMPANY_SALARIED_EMPLOYEES

  Data format for absence times data: V9 (events)

| Field   |                                | Description   | Type  | Place  Example  |     |
| ------- | ------------------------------ | ------------- | ----- | --------------- | --- |
| V9STAT  | Status (A=active, I=inactive)  |               | C1    | 1               | A   |
| V9FINR  | Company number                 |               | N8.0  | 2  00000001     |     |
| V9PENR  | Personnel number               |               | N8.0  | 10  00006711    |     |
| V9VOND  | From (YYYYMMDD)                |               | N8.0  | 18  20010101    |     |
Typ (e.g. ARZ – visit to the doctor, KRA
| V9TYPE  |     |     | C3  | 26  | KRA  |
| ------- | --- | --- | --- | --- | ---- |
– illness)
| V9BISD  | Until (YYYYMMDD)                      |     | N8.0  | 29  20010115  |        |
| ------- | ------------------------------------- | --- | ----- | ------------- | ------ |
| V9KENN  | Identifier (H = half day, S = hours)  |     | C1    | 37            | empty  |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 47 of 89

|     |   Formats used to upload data to payroll accounting  |     |     |
| --- | ---------------------------------------------------- | --- | --- |

| V9KOMM  | Comment  | C30  |     |
| ------- | -------- | ---- | --- |
38  empty
| V9STUE  | Hours-E               | N7.2  | 68  0001600   |
| ------- | --------------------- | ----- | ------------- |
| V9FOER  | Recurrent illness     | C1    | 75  empty     |
| V9AZTE  | Working time level    | C1    | 76  empty     |
| V9AZTN  | Working hours number  | C10   | 77  empty     |
| V9KOST  | Cost center           | C10   | 87  105       |
| V9ENTS  | Origin code           | C1    | 97  empty     |
| V9ENJM  | Origin-JM             | N6.0  | 98  Always 0  |

  Interface is created in an ftp format.
  Each data record is displayed in a line (0D, 0A end of the lines).
  Alphanumeric fields must be started with blanks.  The field content is filled to the left.
  Numeric fields must be started with zeros.  The field content is filled to the right with leading zeros
Example file (here shown with return at position 75)
A888888880000000920110101URL20110102                              0000000
000000
A888888880000000920110103URL20110105                              0000003
000000
A888888880009666520110101KRA20110102                              0000000
000000
A888888880009666520110103KRA20110103                              0000000
000000
A888888880009666520110105KRA20110120                              0000012
000000
A888888880009666520110121KS120110124                              0000002
000000
A888888880009666520110127KRA20110127                              0000001
000000
A88888888000966652011021147020110214                              0000002
000000
A888888880009666520110218KRA20110221                              0000002
000000
| 1.16.2.1  Interface configuration  |     |     |     |
| ---------------------------------- | --- | --- | --- |
Key  Value
FORMAT  LGVSOFT
  The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the formats
LGVSOFT. The other formats issue the HYDRA
standard format.

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 48 of 89

    Formats used to upload data to payroll accounting

1.17  LOGA
The field lengths are not fixed in the LOGA interface. To separate the fields, a semicolon ";" is used.
Field names are in the first row separated by a separator.  This line is specified by LOGA, the order of the
fields cannot be changed:
Man;Akr;Pnr;Name;Vorname;Vertnr;LA;Tage;Std;Fakt;Betrag;Kst;Kostart;Ktr;Tdat;Zdat;Her;Herda
t;Proz;Kstb;Userid;Wert;Kst2Man;Kst2Akr;Kalk;Abr_Text;
  Upload of monthly wage types
The following fields are filled in HYDRA:
| Field name  | Data type /  | Contents  |     |     | Example  |
| ----------- | ------------ | --------- | --- | --- | -------- |
format
| Man  | C5         | System:                                  | HYDRA  | company  number  | is  1  |
| ---- | ---------- | ---------------------------------------- | ------ | ---------------- | ------ |
|      | mandatory  | converted to one number.                 |        |                  |        |
| Akr  | C5         | Payroll area: This field remains empty.  |        |                  |        |
| Pnr  | C12        | Personnel number                         |        |                  | 12345  |
mandatory
| SC  | C3  | Wage type  |     |     | 100  |
| --- | --- | ---------- | --- | --- | ---- |
mandatory
| Days  | N5.2  | Absence times: absence days of a wage  |     |     |     |
| ----- | ----- | -------------------------------------- | --- | --- | --- |
type.
For wage types with the average type "T" the
integer hour part.
Std (hours)  N5.2  Hours of a wage type.  Always" 0.0" for wage  167.75
types with the average type "T".
| Kst  | C15  | Executing  | cost  center  | (personnel  | master  105  |
| ---- | ---- | ---------- | ------------- | ----------- | ------------ |
cost center)
Zdat  Datum   Assignment date (first day of a accounting  1998-12-01
|     | YYYY-MM- | month)  |     |     |     |
| --- | -------- | ------- | --- | --- | --- |
DD
Kstb  C15  Cost center to be debited from the wage type  106
posting.

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 49 of 89

    Formats used to upload data to payroll accounting

Proz  N5.2  Assign performance efficiency rate for LLE.   131.77
Abr_Text  C254  Additional text for wage type (can be printed
in payroll). Reserved for  customizations.

N5,2: 5 decimal place, thereof 2 decimal places. The comma is the decimal separator.  Signs can be
prefixed.
All other fields remain empty.
Special feature for LOGA: If a "T" is entered in the "Average type" field when configuring the
wage types, the hourly portion of the wage type is confirmed in the "Days" field. The field
"Std" remains empty.
| 1.17.1.1  | Interface configuration  |     |
| --------- | ------------------------ | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |
| --------- | -------- | --- |
| Section   | OPTIONS  |     |
| Key       | xxxxxx   |     |
| Value     | xxxxxx   |     |

| Active    |    |     |
| --------- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 50 of 89

Formats used to upload data to payroll accounting
Key Value
FORMAT LOGA
Output format
WAGEGROUP ON
Special with LOGA: With format LOGA, the
interface always sets the first day of the relevant
month (FIRST).
DAY FIRST / LAST
Special with LOGA: With format LOGA, the
interface always sets the first day of the relevant
month (FIRST).
DATE OFF
The upload is performed without upload date. This
option is only available for FORMAT=LOGA and
FORMAT=TAYLORIX.
CUSTOMER or COMPANY In format LOGA, you can set the system using
or COMPANY_NONSALARIED_EMPLOYEES these keys.
and COMPANY_SALARIED_EMPLOYEES
CONTRACT or CONSULTANT With FORMAT=LOGA, the contract number that
must be transferred can be set using this key.
.
Upload of absences
The transfer of absences to LOGA takes place together with the monthly wage types in a shared interface
file.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 51 of 89

    Formats used to upload data to payroll accounting

The actual accounted absences for the corresponding month are transferred. For absences that extend
beyond the end of a month, separate absences are posted for each month. In the case of certain absences,
this may require manual intervention in LOGA (for example, during continued pay to determine the end of
continued pay).
Changes to absences that are made in HYDRA after the transfer of absences to LOGA must be updated
manually in LOGA.
The key for transferring the absences is a string that can be set in the Absence reason field in the Absence
processing window (for example, AFREI, BILD, BUFML, MUTTI, ..., WEHRÜ):
Note:
The output of special Umlauts in the interface file is done in DOS code page (850).
Meaning of the separate fields in the data record:
| Field name  | Data  type  | /  Contents  | Example  |
| ----------- | ----------- | ------------ | -------- |
format
| Record type  | Text  | constant "[ZEITENKAL]"  | [ZEITENKAL]   |
| ------------ | ----- | ----------------------- | ------------- |
time calculation
| Function  | Text  | constant "INSERT"  | INSERT  |
| --------- | ----- | ------------------ | ------- |
ZK_UNIQID  Text  Unique identifier consisting of the current  040226000001
date and a consecutive number.
| ZK_HER       | Text    | constant "HYDRA"                   | HYDRA  |
| ------------ | ------- | ---------------------------------- | ------ |
| ZK_HER_DATE  | Date    | constant ""                        |        |
| ZK_USER_ID   | Text    | Clerk identification, constant ""  |        |
| MAN          | Text    | See wage type interface            |        |
| AK           | Text    | See wage type interface            |        |
| PNR          | Number  | See wage type interface            |        |
| Name         | Text    | constant ""                        |        |
| First name   | Text    | constant ""                        |        |
| VERTNR       | Number  | See wage type interface            |        |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 52 of 89

    Formats used to upload data to payroll accounting

| ZK_VON  | Date   | Start date of the absence  | 2004-01-16  |
| ------- | ------ | -------------------------- | ----------- |
YYYY-MM-
DD
| ZK_BIS  | Date   | End date of the absence  | 2004-01-20  |
| ------- | ------ | ------------------------ | ----------- |
YYYY-MM-
DD
| ZK_VONDAT2  | Text  | constant ""                         |        |
| ----------- | ----- | ----------------------------------- | ------ |
| ZK_BISDAT2  | Text  | constant ""                         |        |
| ZK_SYMBOL   | Text  | Time symbol (short name of absence  | MUTTI  |
payment)
| ZK_PLANAN    | Text    | constant ""                           | I   |
| ------------ | ------- | ------------------------------------- | --- |
| ZK_ANZARBTA  | Number  | Number of working days, constant ""   |     |
| ZK_ANZKALT   | Number  | Number of calendar days, constant ""  |     |
| ZK_BEMERK    | Text    | Comment, constant ""                  |     |
| Reserved     |         | 8 fields, constant ""                 |     |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 53 of 89

|     |     |     |   Formats used to upload data to payroll accounting  |     |     |     |
| --- | --- | --- | ---------------------------------------------------- | --- | --- | --- |

| 1.17.2.1  | Interface configuration  |     |     |     |     |     |
| --------- | ------------------------ | --- | --- | --- | --- | --- |
Key  Value
FORMAT  LOGA
  The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the formats
|     |     |     | LOGA.  The  | other  formats  | issue  the  | HYDRA  |
| --- | --- | --- | ----------- | --------------- | ----------- | ------ |
standard format.

ABSENCES_SEPARATE_FILE  ON
With the formats LOGA, the absences are written
in the same file as the wage types. You can use
this option to specify that also with these formats
the absences are written in a separate file using the
name hyfehl.dat.

| 1.18  LOGA 400  |     |     |     |     |     |     |
| --------------- | --- | --- | --- | --- | --- | --- |
The interface to LOGA 400 contains fields with fixed record length.
There are the following formats for the separate field types:
A(n) Alphanumeric with n digits ( left-aligned, filled up with blanks)
N(n)   Numeric with n digits (right-aligned with leading zeros). If necessary, a minus symbol is placed in
the first position for negative values.
| N(n,i)   | Numeric  | with  | n  digits,  | of  which  |     | i  are   |
| -------- | -------- | ----- | ----------- | ---------- | --- | -------- |
| decimal  |          |       |             |            |     | places   |
Example  A  field  N(4,2)  contains  "0321".  This  is  the  number  3,21.
If necessary, a minus symbol is placed in the first position for negative values.
  Upload of monthly wage types
The B6 record for transferring monthly wage types to LOGA 400 has the following structure:
| Field name  | Item  | Data type /  | Contents  |     | Example  |     |
| ----------- | ----- | ------------ | --------- | --- | -------- | --- |
format

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 54 of 89

    Formats used to upload data to payroll accounting

| Record type  | 1  A(2)  | constant "B6"  | B6  |
| ------------ | -------- | -------------- | --- |
Company  3  A(2)  The first two digits of the company the person  01
works for.
Personnel number  5  N(7)  Personnel number from HYDRA. (The personnel  0041356
number has 8 digits in HYDRA and only the last
7 digits are transferred.)
| Document number  | 12  N(5)  | always "00000"  | 00000  |
| ---------------- | --------- | --------------- | ------ |
Record date of the  17  YYYYMM  Year and month of the accounting month  200112
document
| Day of issue  | 23  TT  | First day of a accounting month  | 01  |
| ------------- | ------- | -------------------------------- | --- |
Executing cost  25  A(10)  The person's regular cost center  49721
center
Cost center to be  35  A(10)  The person's regular cost center  48723
debited
Cost object  45  A(10)  constant "   " (10 blanks)  "          "
| internal use  | 55  A(1)  | constant " " (1 blank)  | " "  |
| ------------- | --------- | ----------------------- | ---- |
Wage type  56  A(3)  The first three digits of the wage type  100
Machine number  59  A(5)  constant "     " (5 blanks)  "     "
| Operation            | 64  A(5)    | constant "     " (5 blanks)  | "     "  |
| -------------------- | ----------- | ---------------------------- | -------- |
| Sample piece         | 69  N(7)    | always "0000000"             | 0000000  |
| Yield                | 76  N(7)    | always "0000000"             | 0000000  |
| Production time per  | 83  N(5,2)  | always "00000"               | 0000000  |
piece (time/piece)
| Quantity unit  | 88  A(1)    | constant " " (1 space)  | " "      |
| -------------- | ----------- | ----------------------- | -------- |
| Setup time     | 89  N(5,2)  | always "00000"          | 0000000  |
| Time used      | 94  N(5,2)  | always "00000"          | 0000000  |
| Performance    | 99  N(5,2)  | always "00000"          | 0000000  |
efficiency rate
| Limited  | 104  A(1)  | constant " " (1 space)  | " "  |
| -------- | ---------- | ----------------------- | ---- |
performance
efficiency rate

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 55 of 89

    Formats used to upload data to payroll accounting

Paid time  105  N(5,2)  Duration that was posted to the wage type  12800
| Piecework for  | 110  | A(2)  constant "  " (2 blanks)  | "  "  |
| -------------- | ---- | ------------------------------- | ----- |
groups is paid
Internal use B5 or  112  A(4)  constant "     " (4 blanks)  "    "
B6
| Internal use B5 or  | 116  | A(1)  constant " " (1 space)  | " "  |
| ------------------- | ---- | ----------------------------- | ---- |
B6
| Wage record       | 117  | N(7,3)  always "0000000"  | 0000000  |
| ----------------- | ---- | ------------------------- | -------- |
| Index             | 124  | N(5)  always "00000"      | 00000    |
| Zuschlagsprozent- | 129  | N(5,2)  always "00000"    | 00000    |
satz
| Amount  | 134  | N(9,2)  always "000000000"  | 000000000  |
| ------- | ---- | --------------------------- | ---------- |
Group piecework:   143  A(2)  constant "  " (2 blanks)  "  "
Empty field B5 or  145  A(6)  constant "    " (6 blanks)  "      "
B6

| 1.18.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |
| Active    |         |     |     |
Key  Value
FORMAT  LOGA400
  Output format

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 56 of 89

Formats used to upload data to payroll accounting
Upload of absences
The B1 record for transferring monthly totals and absences to LOGA 400 has the following structure:
Field name Item Data type / Contents Example
format
Record type 1 A(2) constant "B1" B1
Company 3 A(2) The first two digits of the company the person 01
works for.
Personnel number 5 N(7) Personnel number from HYDRA. (The personnel 0041356
number has 8 digits in HYDRA and only the last
7 digits are transferred.)
Consecutive 12 N(3) always "000" 000
number
Record date of the 15 YYYYMM Year and month of the accounting month 200112
document
Day of issue 21 TT First day of a accounting month 01
Days with target 23 N(2) Number of days including target time 21
time
Target time 25 N(5,2) Number of target hours 16800
Tax days 30 N(2) always "00" 00
Days present 32 N(3,1) Number of days inclding target time 180
Leave days 35 N(3,1) Number of vacation days (payment day type 025
402) incl. half days of holiday (payment day type
404)
Sick leave 38 N(3,1) Target time days (only whole days) with payment 010
day type 400 or 401.
Public holidays 41 N(3,1) Target time days with payment day type 409 000
including half public holidays with payment day
type 410.
Social days 44 N(3,1) Target time days with payment day type 405. 000
Excused absence 47 N(3,1) Target time days with payment day type 408. 000
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 57 of 89

    Formats used to upload data to payroll accounting

Unexcused  50  N(3,1)  Target time days with payment day type 407.  000
absence days
| Holiday leave hours  | 53  | N(5,2)  |     | 00000  |
| -------------------- | --- | ------- | --- | ------ |
always "00000"
| Hours of illnesss     | 58           | N(5,2)  | always "00000"  | 00000  |
| --------------------- | ------------ | ------- | --------------- | ------ |
| Public holiday hours  | 63           | N(5,2)  | always "00000"  | 00000  |
| Social hours          | 68           | N(5,2)  | always "00000"  | 00000  |
| Excused               | absence  73  | N(5,2)  | always "00000"  | 00000  |
hours
| Unexcused  | 78  | N(5,2)  | always "00000"  | 00000  |
| ---------- | --- | ------- | --------------- | ------ |
absence hours
| Total  | for  used  83  | N(5,2)  | always "00000"  | 00000  |
| ------ | -------------- | ------- | --------------- | ------ |
piecework time
Calculated  flextime  88  N(5,2)  Changes  of  the  flextime  accounts  (max.  99  -1250
| hours               |                 |       | minus hours can be transferred)  |      |
| ------------------- | --------------- | ----- | -------------------------------- | ---- |
| Printed gross wage  | 93              | A(1)  | constant " " (1 space)           | " "  |
| Wage                | after  tax  94  | A(1)  | constant " " (1 space)           | " "  |
printed
| Time  | collection  95  | N(5,2)  | always "00000"  | 00000  |
| ----- | --------------- | ------- | --------------- | ------ |
Hours
| Number  | of  100  | N(3,0)  | always "000"  | 000  |
| ------- | -------- | ------- | ------------- | ---- |
interruptions
Empty field  103  A(48)  constant "                       " (48 blanks)  "                "

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 58 of 89

Formats used to upload data to payroll accounting
Note: To ensure that the absences are assigned correctly, the following payment day types
must be observed:
Wage Meaning
Day type
400, 401 : Sick leave (with/without continued pay)
402 : Half holiday
404 : Half holiday
405 : Social day
407 : Unexcused
408 : Excused
409 : Full holiday
410 : Half holiday
1.19 Navision Wage
Upload of monthly wage types
The data record for transferring the monthly wage types to Navision Pay has the following structure:
Field name Data type / Contents Example
format
Personnel number N(5) Personnel number from HYDRA 00123
Wage type N(4) Wage type number 100
Number of days N(4,2) Number of total absence days 6
To transfer the number, the wage type must
match the number of the absence payment.
Accounting date DDMMYY Accounting date 010208
Duration N(7,2) Duration that was posted to the wage type 48.50
The different data fields are separated by a '|' The data record is finished via CRLF.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 59 of 89

|     |     |     |   Formats used to upload data to payroll accounting  |     |     |     |
| --- | --- | --- | ---------------------------------------------------- | --- | --- | --- |

Example:
96665|100|2|010507|59.87|
96665|111||010507|4.25|
96665|200||010507|7.00|
96665|211||010507|6.00|
96665|400||010507|9.50|
96665|420||010507|0.43|
96665|450|10|010507|72.00|
96665|600|2|010507|16.00|
| 1.19.1.1  | Interface configuration  |     |     |     |     |     |
| --------- | ------------------------ | --- | --- | --- | --- | --- |

The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |     |     |
| --------- | -------- | --- | --- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |     |     |
| Key       | xxxxxx   |     |     |     |     |     |
| Value     | xxxxxx   |     |     |     |     |     |

| Active    |    |     |                |     |     |     |
| --------- | --- | --- | -------------- | --- | --- | --- |
| Key       |     |     | Value          |     |     |     |
| FORMAT    |     |     | NAVISION       |     |     |     |
|           |     |     | Output format  |     |     |     |
PERSONNEL_NUMBER_LENGTH  With FORMAT=NAVISION, you can use this option
|     |     |     | to  configure  | the  personnel  | number  length  | with  |
| --- | --- | --- | -------------- | --------------- | --------------- | ----- |

leading zeros. If the option is not set, the personnel
number is set to five digits and is filled with leading
zeros.

| 1.20  ORGATIME  |     |     |     |     |     |     |
| --------------- | --- | --- | --- | --- | --- | --- |
  Upload of monthly wage types
The interface for confirming monthly wage types to ORGATIME has the following structure:
| Field  |     | Pos / length  | Description   |     |     |     |
| ------ | --- | ------------- | ------------- | --- | --- | --- |
Personnel number     1 /   8  Personnel number with leading zeros left-aligned
8 digits
| Not assigned  |     |    9 /   2  | Empty 2 digits                        |     |     |     |
| ------------- | --- | ----------- | ------------------------------------- | --- | --- | --- |
| Wage type     |     |  11 /   6   | Labeled wage types, must be posted.   |     |     |     |
6 digits

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 60 of 89

|     |     |   Formats used to upload data to payroll accounting  |     |
| --- | --- | ---------------------------------------------------- | --- |

| Field         |     | Pos / length  | Description                              |
| ------------- | --- | ------------- | ---------------------------------------- |
| Date          |     |  17 /   6     | Date in the format of YYMMDD - 6 digits  |
| Not assigned  |     |  23 / 10      | Empty 10 digits                          |
| Company       |     |  33 /   2     | Company 2 digits                         |
| Not assigned  |     |  35 / 14      | Empty 14 digits                          |
| Cost center   |     |  49 /   8     | Cost center, aligned to the right        |
| Not assigned  |     |  57 / 22      | Empty 22 digits                          |
| Quantity      |     |  79 / 12      | Quantity 12 digits                       |
| Not assigned  |     |  91 /   8     | Empty 8 digits                           |
| CRLF          |     |               |                                          |

| 1.20.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |                |     |
| --------- | --- | -------------- | --- |
| Key       |     | Value          |     |
| FORMAT    |     | ORGATIME       |     |
|           |     | Output format  |     |

| 1.21  Paisy  |     |     |     |
| ------------ | --- | --- | --- |
Legend:
| A(n)  Alphanumeric with n digits                      |     |     |     |
| ----------------------------------------------------- | --- | --- | --- |
| N(n)  Numeric with n digits                           |     |     |     |
| N(n,i)  Numeric with n digits, with i decimal places  |     |     |     |
  Example: In a field N(4,2), the value is "0321". This is the number 3,21.
K(n)  Constant text of length n
  Upload of monthly wage types
Uploads of the monthly wage is in the following format:

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 61 of 89

|     |     |     |   Formats used to upload data to payroll accounting  |     |
| --- | --- | --- | ---------------------------------------------------- | --- |

| Field name  | Type  | /  Digits  | Contents  | Example  |
| ----------- | ----- | ---------- | --------- | -------- |
format
| Record type  | K(2)  | 1 - 2  | Record type (constant P1)  | "P1"  |
| ------------ | ----- | ------ | -------------------------- | ----- |
Company  A(7)  3 - 6  Company from personnel master data left- "BSP    "
aligned (Paisy defines only positions 3 to
4 as company)
Personnel number  N(6)  7 – 12  Personnel number with leading zeros  "000041"
Group number  K(4)  13 – 15  Paisy: For group accounting Not filled by  "    "
HYDRA
| General ledger  | K(1)  | 16  | Not filled by HYDRA  | " "  |
| --------------- | ----- | --- | -------------------- | ---- |
account
assignment
Date  A(6)  17 – 22  Date, first day of the consecutive month  "010297"
|                        | DDMMYY  | DDMMYY   |               |        |
| ---------------------- | ------- | -------- | ------------- | ------ |
| Accounting number      | K(1)    | 23       | Always "1"    | "1"    |
| Collection identifier  | K(1)    | 24       | Constant "S"  | "S"    |
| Wage type              | A(3)    | 25 – 27  | Wage type     | "265"  |
Time  N(5,2)  28 - 32  Time that is posted to the wage type.  "14372"
Duration in industrial minutes
Factor /   N(5,2)  33 – 37  Paisy fills this field twice and interprets it  "     "
Wage group  C(4)  33 – 36  as a factor or wage group. Is left empty by
HYDRA.
| Amount  | N(7,2)  | 38 - 44  | Amount Always 0  | "0000000"  |
| ------- | ------- | -------- | ---------------- | ---------- |

| 1.21.1.1  | Interface configuration  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |     |     |     |
| --------- | --- | --- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 62 of 89

    Formats used to upload data to payroll accounting

| Key        |     |     | Value          |     |     |     |
| ---------- | --- | --- | -------------- | --- | --- | --- |
| FORMAT     |     |     | Paisy          |     |     |     |
|            |     |     | Output format  |     |     |     |
| ABSENCES   |     |     | ON             |     |     |     |
| WAGEGROUP  |     |     | ON             |     |     |     |
You can use this option to transfer the entry in field
LOBU indicator from the configuration of wage
types to the field Wage group of the Paisy interface.

| DAY   |     |     | FIRST / LAST   |        |                      |      |
| ----- | --- | --- | -------------- | ------ | -------------------- | ---- |
|       |     |     | Special  with  | LOGA:  | With  format  LOGA,  | the  |
interface always sets the first day of the relevant
month (FIRST).

CUSTOMER or COMPANY
With the formats PAISY, you can use these options
| or  COMPANY_NONSALARIED_EMPLOYEES  |     |     | to specify the company.  |     |     |     |
| ---------------------------------- | --- | --- | ------------------------ | --- | --- | --- |
| and COMPANY_SALARIED_EMPLOYEES     |     |     |                          |     |     |     |
COMPANY_LENGTH  You can use this option to set the length of the
company with FORMAT=PAISY.
| COSTCENTER  |     |     | ON                   |     |                    |          |
| ----------- | --- | --- | -------------------- | --- | ------------------ | -------- |
|             |     |     | With  FORMAT=PAISY,  |     | the  cost  center  | is  not  |
included in our standard interface. Use this key to
activate the output of the cost center.

  Upload of absences
The upload of the absences to Paisy is done as a P3 record:
| Field name  | Data type /  | Contents  |     |     | Example  |     |
| ----------- | ------------ | --------- | --- | --- | -------- | --- |
format
| Assign type  | K2  | Assign type (constant P3)                 |     |     | P 3  |     |
| ------------ | --- | ----------------------------------------- | --- | --- | ---- | --- |
| Company      | A2  | Position 1 and 2 of the person's company  |     |     | 24   |     |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 63 of 89

    Formats used to upload data to payroll accounting

| Empty  | K2  | Constant 2 blanks  | „  “  |
| ------ | --- | ------------------ | ----- |
Personnel number  N6  HYDRA personnel number (max. the last 6  999999
digits)
| Empty            | 4       | Constant 4 blanks          | „    "  |
| ---------------- | ------- | -------------------------- | ------- |
| Start date       | DDMMYY  | Start date of the absence  | 070104  |
| Accounting no.   | 1       |                            | 1       |
Always 1
| Collection ID  | 1   |     | Z   |
| -------------- | --- | --- | --- |
Constant Z
| Time type  | N3  |     | 410  |
| ---------- | --- | --- | ---- |
The last 3 digits absence payment
| Time  | 5   |     | „     “  |
| ----- | --- | --- | -------- |
Constant 5 blanks
| Empty     | K%      | Constant 5 blanks  | „     “  |
| --------- | ------- | ------------------ | -------- |
| End date  | DDMMYY  |                    | 120104   |
End date of the absence
| Empty     | 24  | Constant 24 blanks  | „                        “  |
| --------- | --- | ------------------- | --------------------------- |
| Shift ID  | A3  |                     | GAN                         |
"GAN" for full day's holiday and "HAL" for
half day's holiday

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 64 of 89

    Formats used to upload data to payroll accounting

| 1.21.2.1  Interface configuration  |     |     |     |     |     |
| ---------------------------------- | --- | --- | --- | --- | --- |
Key  Value
FORMAT  Paisy
  The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the formats
|     |     | PAISY.  The  | other  formats  | issue  the  | HYDRA  |
| --- | --- | ------------ | --------------- | ----------- | ------ |
standard format.

ABSENCES_SEPARATE_FILE  ON
With the formats PAISY, the absences are written
in the same file as the wage types. You can use
this option to specify that also with these formats
the absences are written in a separate file using the
name hyfehl.dat.

1.22  PASBAS (Syllwasschy)
  Upload of monthly wage types
The data record for transferring the monthly wage types to PASBAS (Syllwasschy) has the following
structure:
| Field name  | Item  Data type  | Contents                   |     | Example  |     |
| ----------- | ---------------- | -------------------------- | --- | -------- | --- |
| LBSA        | 1  N(2)          | Record type (constant 83)  |     | 83       |     |
| LBFA        | 3  C(5)          | Company                    |     | BSP      |     |
| LBL1        | 8  C(3)          | Empty field                |     |          |     |
| LBPERS      | 11  N(4)         | Personnel number 4 digits  |     | 9999     |     |
| LBKST       | 15  C(6)         | Cost center 6 digits       |     | 123456   |     |
| LBTTX       | 21  C(2)         | Day (constant "01")        |     | 01       |     |
| LBMM        | 23  N(2)         | Consecutive month          |     | 06       |     |
| LBLART      | 25  C(3)         | ŸWage type 3 digits        |     | 100      |     |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 65 of 89

|     |     |     |   Formats used to upload data to payroll accounting  |     |
| --- | --- | --- | ---------------------------------------------------- | --- |

| LBSTD  | 28  | N(8,2)  | Duration of absence/attendance  | 00000800  |
| ------ | --- | ------- | ------------------------------- | --------- |
| LBKZ   | 36  | C(1)    | Amount ID (constant 1 "Euro")   | 1         |
| LBZT1  | 37  | N(8,2)  | constant 0                      | 00000000  |
| LBZT2  | 45  | N(8,2)  | constant 0                      | 00000000  |
| LBL2   | 53  | C(2)    | constant empty                  |           |
| LBAUF  | 55  | C(11)   | constant empty                  |           |
| LBPOS  | 66  | C(5)    | constant empty                  |           |
| LBFAK  | 71  | N(5,2)  | constant 0                      | 00000     |
| LBZUS  | 76  | N(5,2)  | constant 0                      | 00000     |
At the end of each row are Carriage Return and Linefeed (CR/LF).
Data types:
| Type  Meaning                   |     | Formatting          |     |     |
| ------------------------------- | --- | ------------------- | --- | --- |
| C(n)  Character (string, text)  |     | Length n            |     |     |
| N(n)  Integer                   |     | with max. digits n  |     |     |
N(x.y)  Decimal number  Without decimal separator with maximum x total digits and y
decimal places.

Example (with return at position 71):
83BSP     999912345601051000000080010000000000000000
0000000000

| 1.22.1.1  | Interface configuration  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |     |     |     |
| --------- | --- | --- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 66 of 89

    Formats used to upload data to payroll accounting

| Key     |     | Value          |     |     |     |
| ------- | --- | -------------- | --- | --- | --- |
| FORMAT  |     | PASBAS         |     |     |     |
|         |     | Output format  |     |     |     |
CUSTOMER or COMPANY  With the formats PASBAS,  you can use these
options to specify the company.
or  COMPANY_NONSALARIED_EMPLOYEES
and COMPANY_SALARIED_EMPLOYEES

1.23  PEWISO (S+P payroll accounting)
  Upload of monthly wage types
The data record for transferring the monthly wage types to PEWISO (S+P Payroll Accounting) has the
following structure:
Data format of the wage transaction data
| Field             |                       | Description   |     | Type  | Examples    |
| ----------------- | --------------------- | ------------- | --- | ----- | ----------- |
| System number     | Number of the system  |               |     | Num   | 1  100      |
| Accounting month  | Accounting month      |               |     | Num   | 2  12       |
| Accounting year   | Accounting year       |               |     | Num   | 1996  2000  |
Personnel number  Personnel number of the employee  Num  1  520
| Wage type number  | Number of the wage type  |     |     | Num  | 5  102  |
| ----------------- | ------------------------ | --- | --- | ---- | ------- |
Date  Day of the accounting month, if necessary  Num  12  [empty]
Cost center  Number of cost center, if necessary  Alpha  "4001"  [empty]
Cost object  Number of cost object, if necessary  Alpha  "1000"  [empty]
Work type  Encoding of the work type according to the  Alpha  "B"  [empty]
|     | specifications  | of  the  employment  | office,  if  |     |     |
| --- | --------------- | -------------------- | ------------ | --- | --- |
necessary for WG/ZWG/WAG application in
s+p Baulohn
Number  Factor 1, numeric value or zero  Currency  10.00  1.00
Amount  Factor 2, numeric value or zero  Currency  17.80  -78.00
bonus  Bonus value, depending on the definition of  Currency  25.00  [empty]
the wage type, numeric value or zero
  The interface has separated fields due to the semicolon.
  Each data record is displayed in a line (0D, 0A end of the lines).
  Numeric fields are displayed in the format: 999999.99 or -999999.99 or 9999999, alphanumeric fields
in quotation marks
Field sequence:
Client number; payroll month; payroll year; personnel number; wage type number; [date]; [cost center];
[cost object]; [work type]; number; amount; overhead.
The entry in the square brackets are optional.

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 67 of 89

Formats used to upload data to payroll accounting
Example file
100;12;2009;9;1100;01;"4711";;;651.62;;
100;12;2009;9;370;01;"4711";;;7.50;;
100;12;2009;9;42;01;"4711";;;5.50;;
100;12;2009;9;51;01;"4711";;;2.08;;
100;12;2009;10;41;01;"5187";;;25.00;;
100;12;2009;10;526;01;"5187";;;42.00;;
1.23.1.1 Interface configuration
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:
INI name HYD-LUG
Section OPTIONS
Key xxxxxx
Value xxxxxx
Active 
Key Value
FORMAT PEWISO
Output format
1.24 proLOHN (proALPHA)
To import gross wage data from other systems, ProAlpha provides an ASCII interface which can be used
to import data from a connected PZE system.
The field contents are to be lined up in the appropriate length for each record. Unused blanks must be filled
in with blanks. Character fields are to be transferred left-aligned and numeric fields right-aligned. In
accordance with setting of the E-parameter (set parameter = European format), the decimal point must be
a comma if the format is European, otherwise the point must be used. As of version 4.02a, both comma
and dot can be used as decimal point independently of the E-parameter. The end of record indicator
(CR/LF) customary in the operating system used must be set at the end of each record.
There is no column separator.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 68 of 89

    Formats used to upload data to payroll accounting

  Upload of monthly wage types
The interface has the following format:
| Field name  | Item  Data type  | Contents  | Exampl Format  |
| ----------- | ---------------- | --------- | -------------- |
e
| BLANK   | 1  C(2)   | Constant empty  |   x(2)      |
| ------- | --------- | --------------- | ----------- |
| FIRMA   | 3  C(10)  | Company         | BSP  x(10)  |
| PERSKZ  | 13  C(1)  | Person ID       | P  X        |
constant „P“
| MITARBEITER  | 14  N(6)  | Personnel number  | 999999  zzzzz9  |
| ------------ | --------- | ----------------- | --------------- |
(employee)
| TAG      | 20  N(2)  | Accounting day            | 10  z9      |
| -------- | --------- | ------------------------- | ----------- |
| MONAT    | 22  N(2)  | Accounting month          | 12  z9      |
| JAHR     | 24  N(4)  | Payroll year              | 2006  9999  |
| LOHNART  | 28  C(3)  | Wage type of absence pay  | 100  x(3)   |
ZEIT  31  N(7,2)  Duration of absence/attendance  8.00  -zz9.99
| MENGE          | 38  N(10)  | Constant empty  |   -zzzzz9.99  |
| -------------- | ---------- | --------------- | ------------- |
| SATZ (record)  | 48  N(10)  | Constant empty  |   zzzz9.9999  |
| MENGENSATZ     | 58  N(8)   | Constant empty  |   zz9.9999    |
(quantity record)
| PROZENT  | 66  N(6)  | Constant empty  |   zz9.99  |
| -------- | --------- | --------------- | --------- |
(percentage)
| BETRAG (amount)  | 72  N(10)  | Constant empty  |   -zzzzz9.99   |
| ---------------- | ---------- | --------------- | -------------- |
| KOSTENSTELLE     | 82  N(8)   | Cost center     | 105  zzzzzzz9  |
(cost center)
| KOSTENTRAEGER  | 90  C(20)  | Constant empty  |   X(20)  |
| -------------- | ---------- | --------------- | -------- |
(cost object)
| BESCHREIBUNG:  | 110  C(20)  | Constant empty  |   X(60)  |
| -------------- | ----------- | --------------- | -------- |
At the end of each row are carriage Return and linefeed (CR/LF).

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 69 of 89

    Formats used to upload data to payroll accounting

Data types:
| Type  Meaning                   |     | Formatting          |
| ------------------------------- | --- | ------------------- |
| C(n)  Character (string, text)  |     | with max. length n  |
| N(n)  Integer                   |     | with max. digits n  |
N(x.y)  Decimal number  with "." (Point) as decimal separator and maximum x total digits and y
decimal places. Negative values are preceded by the sign "-".
Example:

| 1.24.1.1  | Interface configuration  |     |
| --------- | ------------------------ | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |
| --------- | -------- | --- |
| Section   | OPTIONS  |     |
| Key       | xxxxxx   |     |
| Value     | xxxxxx   |     |

| Active    |    |     |
| --------- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 70 of 89

Formats used to upload data to payroll accounting
Key Value
FORMAT PROLOHN
Output format
Upload of absences
For the upload of absences, the same format is used than for the monthly wage types. You can specify the
absence reason transferred to proLOHN using the application Control of absences.
The absences are not transferred as periods (with start and end date), but per day. When you configure
the absence interface, be careful to configure that the absences are transferred as separate days.
1.24.2.1 Interface configuration
Key Value
FORMAT PROLOHN
The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the formats
PROLOHN. The other formats issue the HYDRA
standard format.
ABSENCES_SEPARATE_DAYS ON
If this option is enabled, the absences are
uploaded as separate days and not as periods
from...to. If the absences are transferred in the
format PROLOHN, this option must be enabled
because the interface format only provides a date
field.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 71 of 89

Formats used to upload data to payroll accounting
1.25 sage KHK
Upload of monthly wage types
Uploads of the monthly wage is in the following format:
No. Field designation Type VKS Item Comment
1 Month Alpha 2 1 Payroll month (usually the consecutive month)
2 Personnel number Alpha 6 3 with leading zeros If the personnel numbers are longer,
the leading digits are cut.
3 Wage type number Alpha 3 9 For longer HYDRA wage types, the trailing digits are
cut off.
4 Time Alpha 6 12 HHH:MM or TTT:TT (T = daily wage types). The
transfer is performed in industrial minutes (divided by
100).
5 Amount Alpha 6 18 Constant 000.00
(3 pre-decimal places, point, 2 decimal places)
6 Cost center Alpha 5 24 For longer HYDRA cost centers, the trailing digits are
cut off.
7 G/L account Alpha 5 29 Constant 00000.
8 Cost object Alpha 5 34 The field is not filled, so the master cost object from the
personnel master is used in the KHK system.
9 ISO code of the Alpha 3 39 Specify EUR Not assigned.
currency. This means that KHK uses the wage system's own
currency.
10 CR/LF Alpha 2 42 Alt (13) + Alt (10)
The interface for confirming monthly wage types corresponds to the sage-KHK manual "Classic Line 2000"
chapter 10, status 12/4/2000.
Note: When using this interface, only numeric cost centers (5 digits with leading zeros) and
wage types (3 digits with leading zeros) are allowed in HYDRA.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 72 of 89

Formats used to upload data to payroll accounting
Infos from the sage-KHK manual
Attention: Contrary to chapter 1.1 of the sage-KHK-manual ("Introduction/General") the attributes of this
data set are not to be separated by separators such as comma or inverted commas.
The data records are to be stored for KHK in a file that must be located in the current system directory. The
file name is 020410mm (mm = month 01-12) without extension. Example „January“: 020410001. After
successful import, the file is provided with the extension *.KHK. This file serves as a backup copy and
remains in the system directory until it is overwritten by a corresponding file with the same name, usually
after twelve months.
1.25.1.1 Interface configuration
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:
INI name HYD-LUG
Section OPTIONS
Key xxxxxx
Value xxxxxx
Active 
Key Value
FORMAT SAGE-KHK
Output format
1.26 Taylorix
Upload of monthly wage types
In the interface for uploading monthly wage types to Taylorix, the length of the fields is not fixed. Instead,
they are separated by a separator. The separator is the semicolon ";".
In the file header there is a line with the company number and the company identification number. These
are preset in HYDRA (with 483543;6101) and, if necessary, can be changed with a text editor before being
read into Taylorix.
Field names are in the second line separated by a separator. This line is specified by Taylorix.
The following lines are data rows. There are the following formats for the separate field types:
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 73 of 89

    Formats used to upload data to payroll accounting

| -  Text field  |     |     |     |
| -------------- | --- | --- | --- |
Can be formatted by HYDRA with trailing blanks.  These are then ignored by Taylorix.
| -  Number fields  |     |     |     |
| ----------------- | --- | --- | --- |
Decimal separators for the decimal places is the point.  Numbers can include leading
zeros.  These are processed by Taylorix correctly.
| -  Date fields:  |     |     |     |
| ---------------- | --- | --- | --- |
A date is specified in the format YYYY-MM-DD.
The data rows have a processing indicator at the beginning, which is always "A" for "Append" in the
payroll interface. A data row is always concluded with the characters for "carriage return" and "line feed"
(hexadecimal 0D0A).
The data has the following structure:
| Field name  | Data type /  | Contents  | Example  |
| ----------- | ------------ | --------- | -------- |
format
| LVB_PERS  | Number  | Personnel number      | 14234   |
| --------- | ------- | --------------------- | ------- |
| LVB_LA    | Text    | Wage type             | 100     |
| LVB_STD   | Number  | Hours of a wage type  | 008.00  |
| LVB_BETR  | empty   | empty                 | ""      |
LVB_TAG  Date  First day of the accounting month.  No date  1999-09-01
is specified for the customer system USG.
| LVB_LSATZ  | empty  | empty  | ""  |
| ---------- | ------ | ------ | --- |
| LVB_ZUSCH  | empty  | empty  | ""  |
LVB_KOST  Text  Cost center to which the time on the wage  "105     "
type was posted in HYDRA.
| LVB_SZAEHL  | empty  | empty  | ""  |
| ----------- | ------ | ------ | --- |
| LVB_BAUST   | empty  | empty  | ""  |
| LVB_EINH    | empty  | empty  | ""  |
| LVB_LG      | empty  | empty  | ""  |
| LVB_RUEST   | empty  | empty  | ""  |
| LVB_MENGE   | empty  | empty  | ""  |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 74 of 89

    Formats used to upload data to payroll accounting

| LVB_VORGE  | empty  | empty  | ""  |
| ---------- | ------ | ------ | --- |
| LVB_VKEZI  | empty  | empty  | ""  |

Example:
Note that the line with the field names is displayed here on two lines for space reasons.
483543;6101
VKZ;LVB_PERS;LVB_LA;LVB_STD;LVB_BETR;LVB_TAG;LVB_LSATZ;LVB_ZUSCH;LVB_KOST;LVB
_SZAEHL;LVB_BAUST;LVB_EINH;LVB_LG;LVB_RUEST;LVB_MENGE;LVB_VORGE;LVB_VKEZI
A;2000;100;001.67;;1999-08-01;;;105;;;;;;;;
A;2003;100;219.40;;1999-07-01;;;105;;;;;;;;
A;2003;100;252.65;;1999-08-01;;;105;;;;;;;;
A;2003;100;244.50;;1999-09-01;;;105;;;;;;;;
A;2005;100;015.75;;1999-06-01;;;105;;;;;;;;
A;2005;400;023.50;;1999-06-01;;;105;;;;;;;;
A;2005;400;004.50;;1999-05-01;;;105;;;;;;;;
A;2005;100;091.75;;1999-07-01;;;105;;;;;;;;
A;2005;400;095.17;;1999-07-01;;;105;;;;;;;;
A;2020;1;135.75;;1999-01-01;;;2040000;;;;;;;;
A;2020;30;000.75;;1999-01-01;;;2040000;;;;;;;;
A;2020;35;000.75;;1999-01-01;;;2040000;;;;;;;;
A;2020;42;008.00;;1999-01-01;;;2040000;;;;;;;;
A;2020;1;119.50;;1999-02-01;;;2040000;;;;;;;;
A;2020;30;000.25;;1999-02-01;;;2040000;;;;;;;;
A;2020;35;000.25;;1999-02-01;;;2040000;;;;;;;;
A;2020;380;040.00;;1999-02-01;;;2040000;;;;;;;;
| 1.26.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 75 of 89

    Formats used to upload data to payroll accounting

Key  Value
FORMAT  TAYLORIX

Output format

DATE  OFF
The upload is performed without upload date. This
option is only available for FORMAT=LOGA and
FORMAT=TAYLORIX.

1.27  TOPAS
|     | Upload of monthly wage types  |     |     |
| --- | ----------------------------- | --- | --- |
The data records for uploading monthly wage types have the following structure:
| Field name  | Data  type  | /  Max.  | Notes  |
| ----------- | ----------- | -------- | ------ |
|             | format      | digits   |        |
FIRMA  alphanum.  3  3 digits, last digit from HYDRA is cut.
| PERSN  |     | 5   | Personnel number, leading zeros  |
| ------ | --- | --- | -------------------------------- |
alphanum.
| YYMM   | YYYYMM  | 6   | Payroll month  |
| ------ | ------- | --- | -------------- |
| YYMMV  | -       | 6   | (empty)        |
LOA   alphanum.  3  3  characters  of  wage  type,  last  character  cut  off  from
HYDRA
 BEZZT  FLIESS  6.2  Duration, sum of attendance and absence time; displayed
in hours with two decimal places without decimal separator
(23.25 hours gives 002325).
| TAGE (days)  | -    |     | (empty)  |
| ------------ | ---- | --- | -------- |
|  FAKTOR      | -    |     | (empty)  |
(factor)
|  LOBET_F  | -    |     | (empty)  |
| --------- | ---- | --- | -------- |
| WKZ       | -    |     | (empty)  |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 76 of 89

    Formats used to upload data to payroll accounting

| LOBET   | -          |   (empty)                                 |
| ------- | ---------- | ----------------------------------------- |
| LOBEST  | -          |   (empty)                                 |
| LOBESV  | -          |   (empty)                                 |
| KOSTL   | alphanum.  | 10  Cost center of the wage type posting  |
| KOTR    | alphanum.  | 10  (empty) cost object                   |
| VORG    | -          |   (empty)                                 |
| BEDT    | -          |   (empty)                                 |
| KZRAB   | -          |   (empty)                                 |
| HERKZ   | -          |   (empty)                                 |
| LKZ     | -          |   (empty)                                 |
| ERFUSR  | -          |   (empty)                                 |
| ERFDT   | -          |   (empty)                                 |
| CHGUSR  | -          |   (empty)                                 |
| CHGDT   | -          |   (empty)                                 |
| CHGZT   | -          |   (empty)                                 |

The semicolon ";" is used as a separator for the fields.
Example (110 hours on wage type 100, cost center 5187):
BSP;00123;200201;;100;11000;;;;;;;;5187;;;;;;;;;;;;
| 1.27.1.1  | Interface configuration  |     |
| --------- | ------------------------ | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |
| --------- | -------- | --- |
| Section   | OPTIONS  |     |
| Key       | xxxxxx   |     |
| Value     | xxxxxx   |     |

| Active    |    |     |
| --------- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 77 of 89

    Formats used to upload data to payroll accounting

Key  Value
FORMAT  TOPAS

Output format

|     | Upload of absences  |     |     |
| --- | ------------------- | --- | --- |
Absence times are transferred via a separate interface file.  The file is name „hyfehl.dat“, is located on the
HYDRA server in the directory where HYDRA is installed and is always generated together with the
interface for monthly wage types.
Data record have the following structure:
| Field name  | Data  type  | /  Max.  | Notes  |
| ----------- | ----------- | -------- | ------ |
|             | format      | digits   |        |
FIRMA  alphanum.  3  3 digits, last digit from HYDRA is cut.
| PERSN  |     | 5   | Personnel number, leading zeros  |
| ------ | --- | --- | -------------------------------- |
alphanum.
| VONDT  | DDMMYYY | 10  | Start date of the absence  |
| ------ | ------- | --- | -------------------------- |
Y
| BISDT  | DDMMYYY | 10  | End date of the absence  |
| ------ | ------- | --- | ------------------------ |
Y
| FZGR  | alphanum.  | 3   | Absence group is reserved for "FEH".   |
| ----- | ---------- | --- | -------------------------------------- |
FZGD  alphanum.  3  Absence reason; type number of the absence
remuneration or Lobu error reason from the absence
processing.
FZTAGZR  fliess  7.2  Absence days in numbers (with 2 decimal places)
| FZSTDZR  | fliess     | 9.2  | (empty)  |
| -------- | ---------- | ---- | -------- |
| FZTX     | alphanum.  | 50   | (empty)  |
| DVGRD    | numeric    | 2    | (empty)  |
| LKZ      | alphanum.  | 1    | (empty)  |
| ERFUSR   | alphanum.  | 10   | (empty)  |
| ERFDT    | DDMMYYY    | 10   | (empty)  |
Y

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 78 of 89

|     |     |     |   Formats used to upload data to payroll accounting  |     |     |     |
| --- | --- | --- | ---------------------------------------------------- | --- | --- | --- |

| CHGUSR  | alphanum.  | 10  (empty)  |     |     |     |     |
| ------- | ---------- | ------------ | --- | --- | --- | --- |
| CHGDT   | DDMMYYY    | 10  (empty)  |     |     |     |     |
Y
| CHGZT  | -    |   (empty)  |     |     |     |     |
| ------ | ---- | ---------- | --- | --- | --- | --- |

A data record looks like the following example:
(4 days absence 300 from 28.01.2002 to 31.01.2002)
BSP;00009;28.01.2002;31.01.2002;FEH;300;400;;;;;;;;;;
| 1.27.2.1  | Interface configuration of absences  |     |        |     |     |     |
| --------- | ------------------------------------ | --- | ------ | --- | --- | --- |
| Key       |                                      |     | Value  |     |     |     |
| FORMAT    |                                      |     | TOPAS  |     |     |     |

The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the formats
|     |     |     | TOPAS.  The  | other  formats  | issue  the  | HYDRA  |
| --- | --- | --- | ------------ | --------------- | ----------- | ------ |
standard format.

1.28  Varial
|     | Upload of monthly wage types  |     |     |     |     |     |
| --- | ----------------------------- | --- | --- | --- | --- | --- |
The data for confirming monthly wage types is transferred in the following format:
| Field name  | Data type /  | Contents  |     |     | Example  |     |
| ----------- | ------------ | --------- | --- | --- | -------- | --- |
format
Record ID  A(3)  Record identification, constant "HYD"  "HYD"
Company number  N(3)  Company from the HR master data Only  "01 "
the first 3 digits of the company number are
transferred.
| Include  | YYYYMM  | Payroll month  |     |     | 200310  |     |
| -------- | ------- | -------------- | --- | --- | ------- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 79 of 89

    Formats used to upload data to payroll accounting

Personnel number  N(7)  Personnel  number  (max.  7  digits  with  0001432
leading zeros)
Entry date  YYMMDD  Contains the first day of the months when  031001
data are collected.  If there is a daily data
transfer, then the day is also included.
| Wage type  | N(3)  | ŸWage type (max. 3 digits)  | "21 "  |
| ---------- | ----- | --------------------------- | ------ |
counters  N(6)  A constant 0 is transferred in this field. Varial  000000
sets unique value.
| KST/KTR/order  | N(9)  | always "000000000"  | 000000000  |
| -------------- | ----- | ------------------- | ---------- |
Cost center  N(9)  Cost  center  where  the  wage  type  was  000036745
collected (9 digits with leading zeros)
| Record priority  | N(1)  | always "0"    | 0   |
| ---------------- | ----- | ------------- | --- |
| Wage group       | N(2)  | constant "01  | 01  |
Order number  A(15)  constant "               " (15 blanks)  "               "
| Operation number   | N(3)  | always "000"  | 000  |
| ------------------ | ----- | ------------- | ---- |
| Sub operation      | N(1)  | always "0"    | 0    |
number
| Target setup time | N(5)  | constant "00000+"  | 00000+  |
| ----------------- | ----- | ------------------ | ------- |

| Actual setup time     | N(5)  | constant "00000+"      | 00000+      |
| --------------------- | ----- | ---------------------- | ----------- |
| Order quantity        | N(9)  | constant "000000000+"  | 000000000+  |
| Yield                 | N(9)  | constant "000000000+"  | 000000000+  |
| Sz yield VARIAL       | N(1)  | always "1"             | 1           |
| Target time per unit  | N(7)  | constant "0000000+"    | 0000000+    |
| Target time yield     | N(7)  | constant "0000000+"    | 0000000+    |
| Target time order     | N(7)  | constant "0000000+"    | 0000000+    |
quantity
Actual processing  N(9)  Duration of the wage type (9 digits, including  000002475+
| time                 |       | 2 decimal places)  |     |
| -------------------- | ----- | ------------------ | --- |
| Quantity unit yield  | A(2)  | always "00"        | 00  |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 80 of 89

    Formats used to upload data to payroll accounting

| Record type /  | N(9)  | constant "000000000+"  | 000000000+  |     |
| -------------- | ----- | ---------------------- | ----------- | --- |
amount
| Performance level  | N(7)                     | constant "0000000+"             | 0000000+    |     |
| ------------------ | ------------------------ | ------------------------------- | ----------- | --- |
| Filler             | A(8)                     | constant "        " (8 blanks)  | "        "  |     |
| Filler (PC/UNIX)   | A(1)                     | constant " " (1 space)          | " "         |     |
| 1.28.1.1           | Interface configuration  |                                 |             |     |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

Active
Key  Value
FORMAT  VARIAL

Output format

| 1.29  Winlohn (Sage Schweiz AG)  |     |     |     |     |
| -------------------------------- | --- | --- | --- | --- |
  Upload of monthly wage types
Data types:
| Type  Meaning                 |     | Formatting          |     |     |
| ----------------------------- | --- | ------------------- | --- | --- |
| Cn  Character (string, text)  |     | with max. length n  |     |     |
Nn  Integer  The maximum number of digits n. Negative values are preceded by the
sign "-".
Nx.y  Decimal number  with "." (Point) as decimal separator and maximum x total digits and y
decimal places. Negative values are preceded by the sign "-".

Structure:
| Field/meaning  |     |     | Column name  | Data type  |
| -------------- | --- | --- | ------------ | ---------- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 81 of 89

Formats used to upload data to payroll accounting
Personnel number Pnr N8
Wage type Wage type key C4
Hours (or day) for wage type Unit N10.2
Not assigned Charge -
Not assigned Financial accounting -
- target
Not assigned Financial accounting -
- credit
Cost center for wage type posting (usually corresponds to the cost KST C10
center in the HR master data)
Not assigned View 3 -
Not assigned View 4 -
The column separator is the semicolon ";". At the end of each row is CR/LF
Example:
203;061;15.00;;;;0013;;;
203;068;7.00;;;;0013;;;
203;091;5.00;;;;0013;;;
203;095;2.50;;;;0013;;;
203;100;88.00;;;;0013;;;
205;061;15.00;;;;0009;;;
205;064;2.00;;;;0009;;;
205;084;1.75;;;;0009;;;
205;091;5.00;;;;0009;;;
205;095;2.25;;;;0009;;;
205;100;126.00;;;;0009;;;
206;050;0.50;;;;0009;;;
206;061;15.00;;;;0009;;;
206;084;1.25;;;;0009;;;
206;091;5.00;;;;0009;;;
206;095;2.50;;;;0009;;;
206;100;94.25;;;;0009;;;
208;061;15.00;;;;0012;;;
208;064;23.25;;;;0012;;;
1.29.1.1 Interface configuration of the monthly wage types
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 82 of 89

    Formats used to upload data to payroll accounting

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |
| Active    |         |     |     |
Key  Value
FORMAT  WINLOHN

Output format
| 1.30  | VEDA  |     |     |
| ----- | ----- | --- | --- |
  Upload of monthly wage types
The data record to transfer wage types to VEDA has the following structure:
*
Fields that must be populated are identified via an * in front of the field name. All other fields can be
left empty – they might be filled during transfer.
***
Enter valid date in format DD.MM.YYYY or 01.01.0001.

| Field  | Name  | Comment  | Transfer from Hydra  |
| ------ | ----- | -------- | -------------------- |
* Company  Company abbreviation VEDA HR Pay =  Company from HR master data
N2FIRM
|     |     | recipient company  | Alpha 3 digits  |
| --- | --- | ------------------ | --------------- |
N2PRNR   * Personnel number  Target personnel no. for data record  Personnel number from HR
master
data

Numeric 6 digits
N2ABRJ   Accounting year  If empty: filled with year entered during  Accounting year
|     |     | transfer  | Numeric 4 digits (YYYY)  |
| --- | --- | --------- | ------------------------ |
N2ABRM   Accounting month  If empty: filled with month entered  Accounting month
|     |     | during transfer  | Numeric 2 digits (MM)  |
| --- | --- | ---------------- | ---------------------- |
N2LOAR   * Wage type  Valid wage type in VEDA HR Entgelt  Wage type
Alpha 3 digits
Currently not used
| N2FIGR  | Company group         |     | Not transferred  |
| ------- | --------------------- | --- | ---------------- |
| N2ABGR  | Group of accounting   |     | Not transferred  |
| N2LTYP  | Kind of wage type     |     | Not transferred  |
| N2LFOL  | Sequence number wage  |     | Not transferred  |
type
| N2STDF  | Number of hours  |     | Time of the wage type posting  |
| ------- | ---------------- | --- | ------------------------------ |
Numeric 5 digits (with 2 decimal
places, separator comma)
| N2TAGE  | Days  |     | Not transferred  |
| ------- | ----- | --- | ---------------- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 83 of 89

    Formats used to upload data to payroll accounting

Not transferred
| N2STCK  Pieces of yield for  |     |     |
| ---------------------------- | --- | --- |
piecework wage
Not transferred
| N2MINU  Specification of minutes  |     |     |
| --------------------------------- | --- | --- |
Hourly factor  Not transferred
| N2SFAK      |     |                  |
| ----------- | --- | ---------------- |
| Percentage  |     | Not transferred  |
N2PROZ
| N2KLME  Kilometer             |     | Not transferred  |
| ----------------------------- | --- | ---------------- |
| N2MENG  Quantity              |     | Not transferred  |
| N2KAWO  Calendar week         |     | Not transferred  |
| N2ABRB  Amount of accounting  |     | Not transferred  |
N2AKST  Executing cost center  If empty: Cost center from HR master  Cost center  >
|     | data or in case of corrections from wage  | of the wage type posting  |
| --- | ----------------------------------------- | ------------------------- |
|     | account                                   | Alpha 10 digits           |
N2TTKZ  Tariff table ID  Currently not used  Not transferred
N2AENR  Change number of wage  Currently not used  Not transferred
type
N2LOFI  Company for wage types  Company where the wage types are  Not transferred
managed (recipient company)
| N2VEMI  Calculated minutes     |     | Not transferred  |
| ------------------------------ | --- | ---------------- |
| N2HERK  Source of data record  |     | Not transferred  |
N2LDAT  *** Date of performance  If empty: Source of 'STA'  Not transferred
| N2FOLG  Sequence, serie  |     | Not transferred  |
| ------------------------ | --- | ---------------- |
Not transferred
| N2ARGA  Operation  |     |     |
| ------------------ | --- | --- |
Not transferred
| N2TATK  Activity  |     |     |
| ----------------- | --- | --- |
Not transferred
| N2BETM  Production resource  |     |     |
| ---------------------------- | --- | --- |
Not transferred
| N2BKST  Charged Cost center  |     |     |
| ---------------------------- | --- | --- |
Not transferred
| N2BEST  Number of persons  |     |     |
| -------------------------- | --- | --- |
Shift number  Not transferred
| N2SCHI  |     |                  |
| ------- | --- | ---------------- |
| Scrap   |     | Not transferred  |
N2AUSS
| N2RUZE  Setup time in hours  |     | Not transferred  |
| ---------------------------- | --- | ---------------- |
N2KOTR   Cost object  If empty: Cost object from HR master  Not transferred
data
N2VFMM   Month of correction  Must only be filled, if correction in  Not transferred
previous months, otherwise 0
N2VFJJ   Year of correction  Must only be filled, if correction in  Not transferred
previous months, otherwise 0
N2SKTO   G/L account  If empty: G/L account from wage type  Not transferred
N2KOAR   Cost type  If empty: cost type from wage type  Not transferred
| N2FEKZ   Failure ID    | Currently not used  | Not transferred  |
| ---------------------- | ------------------- | ---------------- |
| N2LOKZ   ID of delete  | Currently not used  | Not transferred  |
N2PERI   Period of accounting  Autom. filled from correction period,  Not transferred
otherwise from accounting period
N2FR01   Application field 1 - alpha  (field definition 1 alphanumeric)  Not transferred
N2FR02   Application field 1 - alpha  (field definition 1 alphanumeric)  Not transferred
N2FR03   Application field 1 - alpha  (field definition 1 alphanumeric)  Not transferred
N2FR04   Application field 1 - alpha  (field definition 1 alphanumeric)  Not transferred
Not transferred
| N2KZAT   ID of hours lost  | Currently not used  |     |
| -------------------------- | ------------------- | --- |
Not transferred
| N2FR05   Application field 1 - alpha  | (field definition 1 alphanumeric)  |     |
| ------------------------------------- | ---------------------------------- | --- |
Not transferred
| N2FR06   Application field 9 - num.  | (field definition 9,2 packed numeric)  |     |
| ------------------------------------ | -------------------------------------- | --- |
Not transferred
| N2FR07   Application field 9 - num.  | (field definition 9,2 packed numeric)  |     |
| ------------------------------------ | -------------------------------------- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 84 of 89

    Formats used to upload data to payroll accounting

Not transferred
| N2FR08   | Application field 9 - num.  | (field definition 9,2 packed numeric)  |     |
| -------- | --------------------------- | -------------------------------------- | --- |
N2FR09   Application field 9 - num.  (field definition 9,2 packed numeric)  Not transferred
N2FR10   Application field 9 - num.  (field definition 9,2 packed numeric)  Not transferred
N2ZUKZ   ID industrial minutes /  I=industrial minutes, N=normal minutes
Fixed value: I
normal minutes  (if different from company master data,  Alpha 1 digit
conversion of hours, minutes and setup
time during transfer)
N2LOTX   Wage type text  If empty and no following wage type: text
from wage type master data
N2VDAT   *** Date from  Currently not used, empty (01.01.0001)  Fixed value: 01.01.0001
Alpha 10 digits
N2BDAT   *** Date to  Currently not used, empty (01.01.0001)  Fixed value: 01.01.0001
Alpha 10 digits
N2WHSL   Currency  If empty: current standard currency is  Not transferred
used
| N2TXFL   | N2OBID   | Currently not used  | Not transferred  |
| -------- | -------- | ------------------- | ---------------- |
| N2EPID   | ID text  | Currently not used  | Not transferred  |
| N2EDAT   | N2STAT   | Currently not used  | Not transferred  |
Not transferred
| N2APID   | User PID creation of record  | Currently not used  |     |
| -------- | ---------------------------- | ------------------- | --- |
Not transferred
| N2ADAT   | *** Date creation of record  | Currently not used  |     |
| -------- | ---------------------------- | ------------------- | --- |
Not transferred
| N2ZEIT   | Time of last change  | Currently not used  |     |
| -------- | -------------------- | ------------------- | --- |

The different data fields are separated by a semicolon ';'. The data record is finished via CRLF.
Example:
001;1008;2015;02;100;;;;;36,98;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;
001;1008;2015;02;235;;;;;21,45;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;
001;1008;2015;02;420;;;;;120,00;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;
001;1008;2015;02;526;;;;;5,00;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;
001;1008;2015;02;600;;;;;16,00;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;
001;1008;2015;02;RSG;;;;;18,33;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;

| 1.30.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The "VEDA" interface format is then enabled via INI data configuration (called using function button in the
toolbar). The following settings are made:

INI data configuration to enable the interface in VEDA format
| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 85 of 89

Formats used to upload data to payroll accounting
Key Value
FORMAT VEDA
Output format
ABSENCES ON
MONTH CURRENT
COSTCENTER ON
Transfer cost centers:
Upload of absences
The data record to transfer absences to VEDA has the following structure:
Field Name Comment Transfer from Hydra
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 86 of 89

    Formats used to upload data to payroll accounting

NKFIRM   * Company  Company abbreviation VEDA HR Pay =  Company from HR master data
|     | recipient company  | Alpha 3 digits  |
| --- | ------------------ | --------------- |
NKPRNR   * Personnel number  Target personnel no. for data record  Personnel number from HR
master
data

Numeric 6 digits
NKABRJ   Accounting year  If empty: filled with year entered during  Accounting year
|     | transfer  | Numeric 4 digits (YYYY)  |
| --- | --------- | ------------------------ |
NKABRM   Accounting month  If empty: filled with month entered  Accounting month
|     | during transfer  | Numeric 2 digits (MM)  |
| --- | ---------------- | ---------------------- |
Not transferred
| NKLFNR   Record number  |     |     |
| ----------------------- | --- | --- |
Not transferred
| NKFIGR   Company group  | Currently not used  |     |
| ----------------------- | ------------------- | --- |
NKABGR   Group of accounting  Currently not used  Not transferred
NKEART   * Calendar input type  Valid input type from VEDA HR Entgelt  Absence reason from Control
of absences
Alpha 1 digit
| NKVDAT   *, *** Date from  |     | Start date of the absence  |
| -------------------------- | --- | -------------------------- |
10 digits (DD.MM.YYYY)
| NKBDAT   *, *** Date to  |     | End date of the absence  |
| ------------------------ | --- | ------------------------ |
10 digits (DD.MM.YYYY)
| NKAEIN   Duration of  | Currently not used  | Not transferred  |
| --------------------- | ------------------- | ---------------- |
application/unit
| NKAMNG   Duration of  | Currently not used  | Not transferred  |
| --------------------- | ------------------- | ---------------- |
application/quantity
| NKFEKZ   Failure ID    | Currently not used  | Not transferred  |
| ---------------------- | ------------------- | ---------------- |
| NKLOKZ   ID of delete  |                     | Not transferred  |
Not transferred
| NKSTAT   Status  |     |     |
| ---------------- | --- | --- |
N2EPID   User PID creation of record  Currently not used  Not transferred
Not transferred
| N2EDAT   *** Date creation of record  | Currently not used  |     |
| ------------------------------------- | ------------------- | --- |
N2APID   User PID record change  Currently not used  Not transferred
N2ADAT   *** Date of record change  Currently not used  Not transferred
N2ZEIT   Time of last change  Currently not used  Not transferred

Example:
001;2407;2015;02;;;;U;02.01.2015;05.01.2015;;;;;;;;;;
001;2407;2015;02;;;;U;07.01.2015;07.01.2015;;;;;;;;;;
001;3333;2015;02;;;;9;2015-01-01;2015-01-01;;;;;;;;;;
001;3333;2015;02;;;;9;2015-01-05;2015-01-05;;;;;;;;;;
001;96665;2015;02;;;;U;02.01.2015;02.01.2015;;;;;;;;;;
001;96665;2015;02;;;;9;2015-01-05;2015-01-05;;;;;;;;;;
001;96665;2015;02;;;;9;2015-01-07;2015-01-08;;;;;;;;;;

MBL_Interface_WageTypes_Absences_Up.docx  Version: 1.5.21270  Page 87 of 89

Formats used to upload data to payroll accounting
2 Set person-related options
The HYD-LUG interface can be customized in different ways for certain organizational characteristics in the
HR master record (for example, per company). You distinguish between options that can be different for
each person in the interface (person-related options) and options that must be identical for the entire
interface file (global options).
In the configuration, the options that must be identical for the entire interface file (global option) can also be
defined for the company of the HR master data. But in this case, the options are identified once in the
interface on start of the interface run for the company of the first person and are then valid for all subsequent
persons. The company is the only organization characteristic that is supported with global options.
The following person options are supported:
MONTH, BALANCES_MONTH, DAY, BALANCES_DAY, DATE, CUSTOMER, COMPANY,
COMPANY_SALARIED_EMPLOYEES, COMPANY_NONSALARIED_EMPLOYEES, CONTRACT,
CONSULTANT, COSTCENTER, WAGETYPES_DAILY, WAGETYPES_ONCE, ABREKZ,
ROUND_MODE.
To make a deviating setting for a specific company, you can add an organization characteristic
(=reference) and a value to the section "OPTIONS". Always use capital letters for the value. For example,
OPTIONS_FIR_KUS defines the options of the company "KuS".
The following organization characteristics/references are possible for person-related options:
Reference Explanation
FIR Company from HR master data, value in capital letters!
BER Area from HR master data, value in capital letters!
ABT Department from HR master data, value in capital letters!
KST Cost center from HR master data, value in capital letters!
PKREIS Employee subgroup from HR master data, value in capital letters!
TAETIGKEIT Activity from HR master data, value in capital letters!
BESCHVERH Employment relationship from HR master data. Values: "A" and "G"
NSTMP Option "Person does not clock" from HR master data. Values: "J" and "N"
Example of a deviating setting of the person-related key CUSTOMER for the company "BSP":
In this example, the deviating client number "4712" is entered for the company "BSP" in the interface.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 88 of 89

Formats used to upload data to payroll accounting
Note:
You must only enter the deviating settings with person-related options. The other keys
are taken over from the general configuration.
MBL_Interface_WageTypes_Absences_Up.docx Version: 1.5.21270 Page 89 of 89
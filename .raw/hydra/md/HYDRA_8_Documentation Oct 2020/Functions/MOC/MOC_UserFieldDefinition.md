Field Types

1  Field Types

Overview

HYDRA menu

System administration  System settings  Type definition

FEDRA menu

System administration  System settings  Type definition

Transaction code

ufd

Function authorization

ufd

Purpose

You use type definitions (field type definitions) to display  the different standard fields and user fields on

the terminal (AIP) and to display the users fields on the MOC.

In  addition  to  the  standard  field  types  provided  by  the  system  that  must  NEITHER  be  changed  NOR

deleted by the user, the user is able to define separate field types that may, for example, be used for user

fields of the operation or the machine within the "U" namespace that has been designed for this purpose.

Field  types  used  to  display  user  fields  on  the  MOC,  must  not  be  used  on  the  terminal  (AIP).

Create new customer-specific field types in the system that you use on the terminal.

For  further  information  on  the  configuration  of  user  field  keys  and  user  fields,  refer  to  the

documentation Configuration_Userfields.pdf.

Selection criteria

The application provides the following selection criteria:

Type

Selects the type of the type definition.

Field descriptions

The  tabs  "General"  and  "Terminal"  provide  the  fields  that  can  be  used  for  field  type  definition.  The

parameters and client used are specified via the Usage option of the relevant fields.

MOC_UserFieldDefinition.docx

Version: 1.7.23305

Page 1 of 11

Field Types

General tab

Type

Unique name of the field type. Special characters and blanks must not be included.

Customized field types must be created with "U:". Standard field types must neither be changed nor

deleted.

Syntactic type

A syntactic type is defined. The parameters defined in the syntactic type are used for displaying the

single  user  fields  if  parameters  are  missing  for  the  field  type.  The  list  described  in  the  section

"integration  of  field  types  in  MOC"or  the  MPDV  Repository  indicate  which  syntactic  types  are

available.

Usage:

  MOC user fields

Designation

Self-explanatory name of the field type (need not be unique). If the field type is used in the dynamic

dialogs of the terminal, the designation is also used as field label. But it is only used if a designation

is not stored in the dynamic dialog.

Usage:

  MOC user fields

  Terminal fields

Description

Description of the field type (free text field).

Please  note  for  generated,  customized  MOC  applications:  When  generating  an  application,  this

field is used as category of the grid columns of the new application, provided that a user field has

been selected and the field type is defined.

Usage:

  Category of MOC user fields

Output format

Specifies how the field is displayed in the MOC applications and which characters are shown. The

below-mentioned output formats are used by default:

Output format

Description

Example

{0:mpdv_timespan}

{0:mpdv_timestamp}

{0:mpdv_timespan_short}

{0:mpdv_timespan_minutes}

MOC_UserFieldDefinition.docx

Version: 1.7.23305

Page 2 of 11

Field Types

{0:mpdv_time}

{0:mpdv_time_short}

f3

n0

HH:mm

Decimal value with 3 decimal

places

Integer  value  with  0  decimal

places  (the  decimal  places

can  be  defined  by  replacing

"0" by a number)

Not applicable

Text field

Resource configuration

Short  date

field

in

the

country-specific format

Long  date

field

in

the

country-specific format

To  collect  negative  decimal

values,  define

the  output

format as follows: "~0.0000".

D

~0.0000

Usage:

  MOC user fields

Input format

Specifies how the field is displayed in the MOC editing dialog and which characters can be entered.

The  definitions  are  made  in  a  regular  expression  subject  to  the  country.  For  example,  the

separators used for decimal values are presented differently in different countries.

Please find below some examples for definitions:

Regular expression

Components  Meaning

Example

-?[0-9]{0,9}\R.?[0-

-?

Negative  and  positive  values  are

-999999999.999

9]{0,3}

possible

[0-9]{0.9}

[Number  range  from  0-9]  {number

of digits from 0-9}

e.g. 0 to 999999999

\R.

Masking \

Country-specific  decimal  separator

MOC_UserFieldDefinition.docx

Version: 1.7.23305

Page 3 of 11

Field Types

Regular expression

Components  Meaning

Example

R.

?[0-9]{0.3}

Decimal  places  optionally  ranging

between the numbers 0-9 and from

0-3 decimal places

[0-9]*

Integer,  numeric  value  of  an

12345678900

undefined length

[0-9]{0.2}

Integer,  numeric  value

ranging

99

between  the  numbers  0-9  with  0-2

decimal places

[^\*]{0.250}

Integer value ranging from 0 – 250.

234

Wildcard

characters

are

not

supported.

Usage:

  MOC user fields

Length

Field  length  for  displaying  user  fields  on  the  MOC  and  for  displaying  the  fields  in  the  dynamic

dialogs on the Windows terminal for which an existing type definition is stored for the input type.

Usage:

  MOC user fields

  Terminal fields

If an input type has been defined for a field in the dynamic dialogs on the terminal (AIP),

the  field  length  defined  in  the  field  types  is  always  used.  Any  deviating  definitions  that

were directly made in the field definition for the dynamic dialog are not used.

Unit

Unit for displaying user fields on MOC and for displaying the fields within the dynamic dialogs at the

Windows terminal for which an existing type has been defined for the input type.

Usage:

  MOC user fields

  Terminal fields

If an input type has been defined for a field in the dynamic dialogs on the terminal (AIP),

the unit of the field defined in the field types is always used. Any deviating definitions that

MOC_UserFieldDefinition.docx

Version: 1.7.23305

Page 4 of 11

were directly made in the field definition for the dynamic dialog are not used.

Field Types

Terminal index tab

Data type

Specifies  the  data  type  used  to  display  contents  on  the  terminal  (AIP).  The  following  possibilities

are available and transferred to the terminal as described below:

Type definition

Transfer to the terminal

Numeric

Text field

Decimal value

Checkbox

Date

Time

Numeric

ALPHA

FLIESS ("flow")

ALPHA (not used)

DATUM ("date")

ZEIT

Tri-state checkbox

ALPHA (not used)

Usage:

  Terminal fields

Data type for MOC user fields

The  data  type  has  to  be  configured  in  this  field  for  all  field  types  that  are  used  for  the

MOC user fields!

Note for data type "decimal value"

The  syntactic  type  "userfielddecimal"  has  to  be  used  for  all  field  types  used  for  MOC

user  fields  and  that  are  configured  as  data  type  "decimal  value".  The  input  and  output

formats required for the data type "decimal value" are also defined here. The field type of

the terminal must not be used in this case!

Negative decimal values

To collect negative decimal values, define the output format as follows: "~0.0000".

Allowed characters

Defines the allowed characters that may be entered in  the fields within the dynamic dialogs at the

Windows terminal for which an existing type definition has been defined at the input type within the

configuration of the dynamic dialog fields.

MOC_UserFieldDefinition.docx

Version: 1.7.23305

Page 5 of 11

Field Types

Usage:

  Terminal fields

If  an  input  type  has  been  defined  for  a  field  in  the  dynamic  dialogs  on  the  terminal

(AIP), the allowed characters defined in the field types are always used. Any deviating

definitions  directly  within  the  field  definitions  for  the  dynamic  dialog  are  not  used/are

ignored.

Default values for input

Defines  the  default  value  for  the  input  fields  in  the  dynamic  dialogs  on  the  Windows  terminal  for

which  an  existing  type  definition  has  been  stored  for  the  input  type  in  the  configuration  of  the

dynamic dialog fields.

Usage:

  Terminal fields

If an input type has been defined for a field in the dynamic dialogs on the terminal (AIP),

the default value defined in the field types is always used. Any deviating definitions that

were directly made in the field definition for the dynamic dialog are not used.

If default values are used in a workflow step x (not step 1), they must already exist in the

first step (also invisible).

Reason: The default values are initialized when opening the workflow in step 1.

From

Possible minimum value of the field when entered in the dynamic dialogs on the Windows terminal.

Usage:

  Terminal fields

To

Possible maximum value of the field when entered in the dynamic dialogs on the Windows terminal.

Usage:

  Terminal fields

Fill characters

Not used

formula

Not used

•Multiplier

Not used

MOC_UserFieldDefinition.docx

Version: 1.7.23305

Page 6 of 11

Field Types

Divisor

Not used

Summand

Not used

Subtrahend

Not used

Decimal places

Not used

The  decimal  places  displayed  on  the  terminal  (AIP)  are  defined  by  the  output  format

specified in the "general" tab.

Integration of MOC field types

When  defining  user  fields  that  are  displayed  on  the  MOC,  you  must  enter  a  field  type  specifying  the

display of the user field in relation to the user field key when you assign the user field to a user field key.

If  the  definition  of  a  parameter  is  specified  for  the  field  type,  e.g.  the  output  format,  this  specification  is

used for the MOC display. Further definitions of the  same parameter, i.e. in this example for the output

format, e.g in the syntactic type, are overwritten and not used.

If single parameters are not set  explicitly for  the field type  and, as  a result,  are  not  defined for the field

type, the display information from the lower-level configuration hierarchies is used.

The defined configuration hierarchy is structured as follows:

1)  Field type definition

2)  Syntactic type

3)  Properties  with  a  syntactic  type  that  might  be  defined  (global  properties  for  the  fields  that  are

available by default)

A display parameter that is not defined in the field type is determined as follows:









If parameters are directly defined for the field type they are used for the display.

If  a  syntactic  type  is  defined  in  the  field  type  and  not  all  parameters  are  set  for  the  field  type,  the

definitions from the syntactic type are used for the missing parameters.

If no syntactic type is specified for the field type, the parameter defined for the properties is used.

If no definition is specified in the properties, the definition stored for the syntactic type of the property

is used.



If none of the above-mentioned definitions is available for a parameter, the default system definition is

used.

The below diagram shows how the display parameters are identified:

MOC_UserFieldDefinition.docx

Version: 1.7.23305

Page 7 of 11

Field Types

If a syntactic type, which does not exist, is entered in the field type definitions, the required parameter is

identified  by  the  system  following  the  process  used  if  the  parameter  is  NOT  defined  in  an  existing,

syntactic type.

Syntactic types

The following syntactic types are defined for displaying the user fields on the MOC and can be used:



time

Time field hh:mm:ss



time_short

Time field hh:mm

  duration

Duration hh:mm:ss

  duration_short

Duration hh:mm

  datetime_date

Date field with date selection

  userfielddatetime

Combined date/time input field

  userfieldstring

Alphanumeric field

  userfieldstringLengthOne

Alphanumeric field of the length 1

  userfieldstringLengthTen

Alphanumeric field of the length 10

MOC_UserFieldDefinition.docx

Version: 1.7.23305

Page 8 of 11

Field Types

  userfieldstringLengthTwenty

Alphanumeric field of the length 20

  userfieldstringLengFourty

Alphanumeric field of the length 40

  userfieldInteger

Integer field

Internal configuration

  Output format:  n0

(unlimited length)

  userfielddecimal

Decimal field with three decimal places

Internal configuration

  Output format:  f3

Input format:

-?[0-9]{0,9}\R.?[0-9]{0,3}

  userfielddecimal_f1

Decimal field with one decimal place

Internal configuration

  Output format:  f1

Input format:

-?[0-9]{0,9}\R.?[0-9]{0,1}

  userfielddecimal_f2

Decimal field with two decimal places

Internal configuration

  Output format:  f2

Input format:

-?[0-9]{0,9}\R.?[0-9]{0,2}

  userfielddecimal_f3

Decimal field with three decimal places

Internal configuration

  Output format:  f3

Input format:

-?[0-9]{0,9}\R.?[0-9]{0,3}

  userfielddecimal_f4

Decimal field with four decimal places

Internal configuration

  Output format:  f4

Input format:

-?[0-9]{0,9}\R.?[0-9]{0,4}

  userfielddecimal_f5

Decimal field with five decimal places

Internal configuration

  Output format:  f5

Input format:

-?[0-9]{0,9}\R.?[0-9]{0,5}

MOC_UserFieldDefinition.docx

Version: 1.7.23305

Page 9 of 11

Field Types

  userfielddecimal_f6

Decimal field with six decimal places

Internal configuration

  Output format:  f6

Input format:

-?[0-9]{0,9}\R.?[0-9]{0,6}

Please note that syntactic types are case sensitive.

The above-mentioned syntactic types should be used for the configuration of a user field acting

as input and output field, since it might not be possible to enter all characters required for the

configuration in the "input format" field.

Sample definition for MOC user fields (input and output)

  Date:

Create (and assign) a new field type:

- Syntactic type = datetime_date

- Output format / input format / length/ unit = empty

  Time

Create (and assign) a new field type:

- Syntactic type = time

- Output format / input format / length/ unit = empty

  Duration

Create (and assign) a new field type:

- Syntactic type = duration

- Output format / input format / length / unit = empty

  Decimal field 2 decimal places

Create (and assign) a new field type:

- Syntactic type = userfielddecimal_f2

- Output format / input format / length / unit = empty

  Text field (x-digit)

Create (and assign) a new field type:

- Syntactic type = empty

- Output format = empty

- Input format = optional restriction of the characters to be entered

e.g. [0-9a-zA-Z/+#._*%- ]*

- Length = field length

- Unit = optional unit text

MOC_UserFieldDefinition.docx

Version: 1.7.23305

Page 10 of 11

Field Types

Integration of field types on the terminal

The display and the parameters for the display as well as the values of the single fields can be defined for

the terminal (AIP) by specifying a field type for the different fields in the dynamic dialogs on the Windows

terminal.

If parameters are not set explicitly for the field type, the configuration, if available, of the dynamic dialogs

is used or the INI configuration, e.g. ctaiplay.ini for the terminal.

For the display  on the terminal (AIP), the system uses the parameters specified in the type definition in

tab "Terminal" and the parameters of the field types in tab "General", e.g. designation.

Special features:



If a field designation is defined in the dynamic dialog, this designation is displayed.  The designation

specified for the field type is overwritten.

  With  parameters,  the  definition  made  for  the  field  types  is  used  and  displayed,  if  available;  for

example the allowed characters and the default value.

MOC_UserFieldDefinition.docx

Version: 1.7.23305

Page 11 of 11


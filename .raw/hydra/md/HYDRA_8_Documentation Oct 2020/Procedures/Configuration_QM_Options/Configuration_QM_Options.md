Configuration of QM/CAQ Options

1  Configuration of QM/CAQ Options

Processing

You can configure certain system options that are specific to the area or the data type. If several area or

data  type  specific  entries  have  been  defined,  the  entries  are  searched  for  in  a  specified  order  (in  de-

scending  order  according  to  field  option_id)  until  a  relevant  entry  is  found.  If  searching  for  specific  op-

tions fails, the global system option is used. The default setting is used if the global option is not config-

ured.

You can only create options manually if the description explicitly includes this possibility.

The sheer existence of specific options makes HYDRA assume that specific fields are available

in the database schema. HYDRA therefore tries to maintain these fields. But if the fields are not

available, this leads to a faulty system behavior.

You can configure several areas for the individual HYDRA-CAQ modules. You can use the combination

with area-specific options to configure an individual behavior for a specific program.

If you want to create an area-specific option or if you want to change an option that is not area-

specific into an option that is area-specific, you must check the option Subject to area and enter

the areas in the input field Option, area (comma-separated, in square brackets). You can also

create options that are specific to the data type (i.e. FEP, WEP). If you use this possibility, enter

the  valid  data  types  comma-separated  and  in  square  brackets  into  the  input  field  Option,  rec.

type.

If the input fields Option, rec. type and Option, area are empty, the option is not specific to an

area.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 1 of 95

Configuration of QM/CAQ Options

2  Special Options

Special options have a particular structure. The field option_subnr defines the sequence of the individual

subentries.

Option 1 – Method to search for inspection plan

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Description

Other

(with

comment)

This option specifies which fields in the inspection plan header or in the inspection plan character-

istics  are  used  to  find  the  respective  inspection  plan.  The  field  option_subnr  defines  the  se-

quence  in  which  the  specified  fields  are  processed.  If  the  search  for  an  inspection  plan  is  suc-

cessful (using the configured parameters), the search is stopped and the inspection plan found is

used to generate inspection steps.

For all fields that are not used in the field "Value", the system checks during the search for an in-

spection plan if an empty string is available. Below, you can find a list of all possible parameters.

The  search  targets  active  inspection  plans.  In  case  of  exceptions,  this  is  indicated  with  the  re-

spective parameter.

  BER - Search for an inspection plan in the same area as the inspection requirement.

  PPL:ID - Search for an inspection plan with the specified inspection plan number.

  PPL:ID_IDX - Search for an inspection plan with the specified inspection plan number and

the specified inspection plan index.

  PPL:ID_IDX  INAKTIV-  Search  for  an  inspection  plan  with  the  specified  inspection  plan

number and the specified inspection plan index. If you use this parameter to search for an in-

spection plan, the search includes all inspection plans (also the ones which are not active).

  ATK:NR_IDX - Search for an inspection plan with the specified article number and the speci-

fied article index.

  ATK:NR - Search for an inspection plan with specified article number.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 2 of 95

Configuration of QM/CAQ Options

  ATK:GRP - Search for an inspection plan of groups for the specified article. The article cata-

logue specifies the groups the specified article has been assigned to. A respective inspection

plan  is  then  searched  for  these  article  groups.  In  order  to  do  so,  the  group  hierarchy  is

searched from bottom to top.

  AG:NR_BEZ_PPLKOP  -  Search  for  an  inspection  plan  with  the  specified  operation  number

and operation designation in the inspection plan header (one single inspection plan for each

operation).

  AG:NR_BEZ_PPLMER  - Search for an inspection plan with the specified operation number

and  operation  designation  in  the  inspection  plan  characteristics  (one  inspection  plan  for  all

operations).

  AG:NR_BEZ_EMPTY - Search for an inspection plan with empty operation number and opera-

tion designation (in the inspection plan header or in the inspection plan characteristics). You

can use this parameter if for example the search for a specific operation was not successful.

You then want to use a default inspection plan (without reference to the operation).

  KD:NR - Search for an inspection plan for the specified customer number.

  KD:GRP  -  Search  for  an  inspection  plan  of  groups  for  the  specified  customer  number.  The

customer  catalog  specifies  the  groups  the  respective  customer  is  assigned  to.  The  system

then searches a respective inspection plan for these customer groups. In order to do so, the

group hierarchy is searched from bottom to top.

  LIEF:NR - Search for an inspection plan for the specified supplier number.

  LIEF:GRP - Search for an inspection plan of groups for the specified supplier number. The

supplier catalog specifies which groups have been assigned to the defined supplier.  The sys-

tem now searches for a corresponding inspection plan for these supplier groups. In order to

do so, the group hierarchy is searched from bottom to top.

  HERST:NR - Search for an inspection plan for the specified manufacturer number.

  HERST:GRP - Search for an inspection plan of groups for the specified manufacturer number.

The  manufacturer  catalog  specifies  the  groups  the  respective  manufacturer  has  been  as-

signed to. The system then searches for a respective inspection plan for these manufacturer

groups. In order to do so, the group hierarchy is searched from bottom to top.

  FU:1 up to FU:14 – Search for an inspection plan according to the content of one or more di-

rect user fields of the inspection requirement. (requires active option 1171).

The  parameters  are  set  in  square  brackets.  You  can  enter  several  parameters  (separated  by

comma) in one input field of an option. During the search for an inspection plan, these entered

Configuration_QM_Options.docx

Version: 2.23.16920

Page 3 of 95

Configuration of QM/CAQ Options

parameters are linked using "AND".

If you search for option entries during the search for an inspection plan, the system first checks

if option entries exist that are specific to a data type or an area.

If this is the case, the system only uses these entries. The system does not make a difference if

the entry is specific to a data type or an area. The system uses the entries simultaneously, sort-

ed by the option ID and the subnumber.

If no active data type or area specific entries are available, the system only uses the global en-

tries during the search for an inspection plan.

With option entries that only include the parameters PPL:ID and PPL:ID_IDX, it is not test-

ed during the search for an inspection plan if an empty string is available in the fields that are

not used in the field "Value". In this case, these fields can have any values because the inspec-

tion plan is used that is specified in the inspection requirement.

Example

[ATK:NR_IDX],[AG:NR_BEZ],[KD:NR]

Option 2 – Method to search for specification lists

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Description

Other

(with

comment)

This option specifies the fields that are used to find the respective specification list entry. The field

option_subnr defines the sequence in which the specified fields are processed. If the search is

successful (using the configured parameters), the search is stopped and the specification list en-

try found is used for the configuration of the inspection step characteristic.

With all fields that are not used in the field "Value", it is tested if an empty string is available dur-

ing the search for a specification list. Below, you can find a list of all possible parameters.

  BER - Search for a specification list entry in the area of the inspection requirement.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 4 of 95

Configuration of QM/CAQ Options

  ATK:NR_IDX - Search for a specification list entry with the specified article number and the

specified article index.

  ATK:NR - Search for a specification list entry with the specified article number.

  AG:NR_BEZ  -  Search  for  a  specification  list  entry  with  the  specified  operation  number  and

operation designation.

  AG:NR - Search for a specification list entry with the specified operation number.

  AG:BEZ - Search for a specification list entry with the specified operation designation.

  KD:NR - Search for a specification list entry with the specified customer number.

  LIEF:NR - Search for a specification list entry with the specified supplier number.

  MNR – Search for a specification list entry with the specified machine number. Using HYDRA

8: Parameter [MNR] is only supported in PDV.

  FU:1 up to FU:14 - Search for a specification list entry according to the content of one or

several direct user fields of the inspection requirement.

  RES:TYP_ID – Search for a specification list entry with the specified tool number (of the in-

spection requirement). This parameter depends on options 1198 and 1199.
Option 3 – Fields of a distinct inspection requirement

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Description

Other

(with

comment)

This option specifies the fields that distinctly identify an inspection requirement. You use this

option if interface functions manipulate inspection requirement data and if new inspection re-

quirements are created.

If no parameter 'inspection requirement number' or 'PPS reference number' is available, the

system identifies the inspection requirement that has identical field values that are enabled in

the option and do not have the status "Finished", "No characteristic" or "Skip lot".

If  an  inspection  requirement  is  found,  this  inspection  requirement  is  used  for  all  actions  ex-

cept  the  initial  creation.  After  successful  search,  an  initial  creation  is  stopped  and  the  note

"Data is existing" appears. See also option 4.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 5 of 95

Configuration of QM/CAQ Options

The number of entries for this option is fixed. There is only one field per entry which is differ-

ent to options 1 and 2.  If the field  Addition of an entry includes an "A", the corresponding

field is used to identify distinct inspection requirements.

The following entries are defined:

  AUFTRAG - The order number is used to identify an inspection requirement.

  ARBGANG - The operation number and operation designation are used to identify an inspec-

tion requirement.

  CHARGE - The batch number is used to identify an inspection requirement.

  KUNDE - The customer number is used to identify an inspection requirement.

  HERSTELLER - The manufacturer number is used to identify an inspection requirement.

  LIEFERANT - The supplier number is used to identify an inspection requirement.

  PRUEFPLATZ – The inspection station is used to identify an inspection requirement (only on

the level of inspection requirements, not on the level of inspection steps).

Configuration_QM_Options.docx

Version: 2.23.16920

Page 6 of 95

Configuration of QM/CAQ Options

3  List Options

Option 4 – Create new inspection steps for each requirement

Other

(with

comment)

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Subject to area

yes

Description

If you activate this option (value = "Y"), you override the setting of option n° 3 for the initial

creation of an inspection requirement.

See also Option 3.

A new inspection requirement is created regardless of existing inspection requirements with

identical key fields (PPS reference number or entries of option n° 3).

See also Option 1001.

Option 1001 – Create inspection requirement without valid in-

spection plan

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Subject to area

yes

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 7 of 95

Configuration of QM/CAQ Options

Description

If you activate this option (value="Y"), the result is the following:  If you create an inspection

requirement and no inspection plan is found, the inspection requirement is created with the

status "No inspection plan". The value "N" has the effect that no inspection requirement is

created.

If you activate this option, you can avoid that the system is overloaded with inspection require-

ments that cannot "be performed". If you activate this option, you also avoid that an incomplete

inspection planning is documented via inspection requirements that have the status "No inspec-

tion plan".

Option 1002 - Cancel also inspection requirement when cancel-

ing an inspection step

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Subject to area

yes

Description

Other

(with

comment)

If you use this option (value = "Y") and you cancel an inspection step, the respective inspec-

tion requirement is automatically canceled, too.

See also option 1003.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 8 of 95

Option 1003 –  Should the completion of an inspection require-

ment be prevented if inspection steps are canceled?

Configuration of QM/CAQ Options

Other

(with

comment)

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Subject to area

yes

Description

If this option is set (value = "Y"), an inspection requirement is not completed if it includes at

least one inspection step that has been canceled.

You activate this option to specify that inspection requirements with canceled inspection  steps

cannot  to  be  completed.  You  document  this  situation  with  the  inspection  requirement  status

"canceled".

See also option 1002.

Option 1004 – Classify canceled inspection steps as "Fail"

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 9 of 95

Configuration of QM/CAQ Options

Subject to area

yes

Description

If you set this option (value = "Y"), a canceled inspection step results in a negative evaluation

of an inspection requirement.

If  the  inspection  result  of  an  inspection  requirement  is  "pass",  the  inspection  requirement  is

considered as "fail", if it includes a canceled inspection step.

See also option 1003.

Option 1007 – Calculation method for Sigma / cp / cpk

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

X*

X

X

X*

Valid values

0 / 1 / 2 / 3

Subject to area

yes

Description

This option specifies the statistical values based on Sigma that the system displays (cp, cpk,

etc.).

Configuration_QM_Options.docx

Version: 2.23.16920

Page 10 of 95

Configuration of QM/CAQ Options

Using HYDRA 8, in the MOC the value 0 has no impact. If this value is configured the default

value deriving from cp_1 or cpk_1 or. sigma_1 is displayed according to the assignment of val-

ues.

For  the  statistical  calculations  1  to  3,  the  system  calculates  an  estimated  Sigma  value  that  is

based on 3 different methods:

Value 0:

No estimation

Calculations are performed without estimated values.

Value 1:

Based on dn

dn is a constant to determine an  estimated value for the variance (population)

deriving from the range (sample). dn is also called d2 and depends on the sam-

ple size which must be constant.

Value 2:

Based on an

an is a constant to determine the estimated value for the variance (population)

deriving  from  the  variance  (sample).  an  is  also  called  c4  and  depends  on  the

sample size which must be constant.

Value 3:

Based on a(n+1)

a (n+1) is a constant to determine the estimated value for the variance (popula-

tion) deriving from the variance (sample). This constand depends on the sample

size which must be constant. This estimate is the most unbiased of the 3 meth-

ods.

You can change the option as the calculation of the statistic for all samples is performed in the

server.

Value 2 is preset.

Formula to calculate Sigma using value 1:

R / dn

dn is a constant to determine the estimated value for the variance (population) deriving from the range of the sample. dn is also called d2 and depends

on the sample size which must be constant.

Formula to calculate Sigma using value 2:

s / an

Configuration_QM_Options.docx

Version: 2.23.16920

Page 11 of 95

Configuration of QM/CAQ Options

Formula to calculate Sigma using value 3:

s / an+1

Notes on the constants used

an and dn

an and dn  are constants to determine the estimated value for the variance (population). To deter-

mine the estimates an and dn all samples are regarded as one global sample. If 10 samples exist

with 5 measured values each, then n=50.

Based on the number of measured values (n), the values an and dn are calculated for the respec-

tive estimate.

an is also called c4 and dn is also called d2.

To calculate s or R, all measured values of the samples are used.

Option 1010 - Automatically complete inspection requirement if

all inspection steps are finished

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N / DM / DA

Subject to area

yes

Description

Other

(with

comment)

If you enable this option and complete an inspection step, the system searches for other in-

spection steps of the respective inspection requirement with a status that allows inspection

Configuration_QM_Options.docx

Version: 2.23.16920

Page 12 of 95

Configuration of QM/CAQ Options

(e.g. logged on, released, etc.). If this is not the case, the system also completes the respec-

tive inspection requirement.

Notes

Y

 The system completes the inspection requirement of the above example automatically

without showing a confirmation prompt.

N

The inspection requirement is never completed automatically.

DA

Once  you  have  completed  the  inspection  step  via  the  console,  a  dialog  opens  where

you can correct the suggested result and the usage decision. You can also stop the completion

of the inspection requirement.

If  an  automatic  process  or  the  terminal  completes  the  inspection  step,  the  corresponding  in-

spection requirement will also be completed automatically.

DM

Once  you  have  completed  the  inspection  step  via  the  console,  a  dialog  opens  where

you can correct the suggested result and the usage decision. You can also stop the completion

of the inspection requirement.

If  an  automatic  process  or  the  terminal  completes  the  inspection  step,  the  corresponding  in-

spection requirement will not be completed automatically.

See also option 1003.

If you have enabled the option for the data type QMS, you can define parameters in the "addi-

tion" field of the option. Here, you can define the usage decision that is transferred to the PPS

system upon automatic completion. Enter the following parameters in the "Addition" field:

[DLGADD_AUTO:CPAN.VERWEND:KATART=<catalog type of the usage deci-

sion>~CPAN.VERWEND:WERK=<site of the usage deci-

sion>~CPAN.VERWEND:AUSWMEN=<selected set of the usage deci-

sion>~CPAN.VERWEND:CODE=<code of the usage deci-

sion>~CPAN.VERWEND:CODGR=<code group of the usage decision>~BZW=J]

The value of the parameter specifies the additional data fields transferred to the BAPI. Use a

tilde instead of a pipe slash to separate these parameters.

Use the parameter BZW=J if you want to ignore all notifications. In this case, the system also

completes  the  inspection  requirement  if  error  messages  occur  that  can  be  overridden.  If  this

Configuration_QM_Options.docx

Version: 2.23.16920

Page 13 of 95

behavior is not required, do not use the parameter BZW=J.

Configuration of QM/CAQ Options

Option 1011 – Split all operations of an inspection plan into sepa-

rate inspection steps

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Subject to area

yes

Description

Other

(with

comment)

If this option is set (value= 'Y'), a separate inspection step is generated for each operation de-

fined in the inspection plan characteristics in case of an inspection requirement with operation

number or operation designation. The operation information in the inspection requirement is

therefore not relevant for the generation of inspection steps.

If the option is not set (value = "N"), the system searches for the respective operation infor-

mation in the inspection plan characteristics. If at least one characteristic is found, only one

inspection step is created for the respective operation for the inspection requirement. Other-

wise no inspection step is created and the inspection requirement gets the status "No inspec-

tion plan".

See also option 3 or option 4.

Option 1013 -  Automatic generation of complaint number

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

Other

Configuration_QM_Options.docx

Version: 2.23.16920

Page 14 of 95

(server)

(server)

Configuration of QM/CAQ Options

(with

comment)

X

X

X

Valid values

 Y / N

Subject to area

yes

Description

If this option is set (value = "Y"), a complaint number is automatically generated during the

initial creation.

Option 1014 - Automatically complete inspection steps when all

terminals are shut down

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Subject to area

yes

Description

Other

(with

comment)

If you set this option (value = "Y") and log off an inspection step in the terminal, the system

checks if this inspection step is also checked by other terminals. An inspection step is con-

sidered as being checked by another terminal if the inspection step has the status "logged

on" or "interrupted". You can find the status of the inspection step in the list of logged on in-

spection steps. If this is not the case, the inspection step is automatically completed.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 15 of 95

Configuration of QM/CAQ Options

You can ignore specific error messages upon completion of inspection steps by using the option

"Posting  required".  To  do  so,  add  the  parameter  [DLGADD:xyz]  in  the  "Addition"  field  of  the

option. If  you  want to transfer  several additional parameters to the BAPI, enter these parame-

ters in the "addition" field  of the option and use a tilde instead of a pipe slash to separate the

entries.

Example:

[DLGADD:BZW=J~BZWRET=2936,2905]

See also option 1010.

You can only use the option "Posting required" and enforce the posting in case of the automatic

process  that  completes  an  inspection  step.  You  cannot  enforce  the  posting  if  you  manually

complete the inspection step in the MOC.

Option 1015 – Instantly generate error message if limit values are

violated with control charts

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

X

X

X

X

Valid values

 Y / N

Subject to area

yes

Description

If this option is set (value = "Y"), the system checks for each measured value that is stored if

calculated statistical values of the current sample violate warning or action limits (Xquer / s /

R). In this case, a respective notification is issued.

If this option is not set (value = "N"), the system checks for limit violation only after you have

stored the last measured value of the sample.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 16 of 95

Configuration of QM/CAQ Options

Option 1017 – Which parameters specify the control chart

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

Valid values

Combined character string made up of one or more parameters

X

RECTYP

BER

PANNR

PAUNR

ANR

CNR

ATK

ATKIDX

PPLID

PPLIDX

PPS:REF

AGNR

AGBEZ

AFO

CMMNR

KDNR

– current data record type (e.g. production, test equipment etc.)

– current area

– current inspection requirement number

– current inspection step number

– current order number

– current batch number

– current article number

– current article index

– current inspection plan number

– current inspection plan index

– current PPS reference number

– current operation number

– current operation designation

– current OP sequence number

– current characteristics number

– current customer number

MNR:PAN

PMID:KALIB

– current machine number (of inspection requirement)

– test equipment ID of the current calibration

(only applicable to data type "PMV" - test equipment management)

Put the parameters in square brackets and separate by comma.

Subject to area

yes

Description

This parameter defines which filter criteria are valid for the samples and single values dis-

played in the control chart and in the histogram of collected measured values.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 17 of 95

Configuration of QM/CAQ Options

This definition of options is only valid for the client and not for the display of control chart con-

tent in the AIP or MOC.

The parameters for the control chart that is displayed in the AIP during collection are included in

the  caq_dc_t_ini  in  section  [MM]  or  [PPKT_MM]  based  on  the  acronyms  of  the  file  "merk-

mal.lst". Control chart for characteristic information is defined in the files "qee_char_chart_1.ini"

and  "qee_char_var_process.ini".    The  basis  of  available  acronyms  is  equally  the  file  "merk-

mal.Ist".

You  can  therefore  make  a  configuration  to  display  control  charts  for  all  characteristics,  even

though  acronyms,  article  number,  article  index,  inspection  plan  number  and  inspection  plan

version  are  not  available.  In  the  rectypes  FEP,  WEP,  WAP,  you  can  also  filter  other  fields  of

inspection plan characteristics, e.g. the user fields, if you do not want to use the inspection plan

of groups. You can therefore limit the selection accordingly. But you cannot restrict the contents

of  control  charts  to  the  data  that  you  need  to  calibrate  the  same  test  equipment  number  be-

cause normally the calibration plan is valid for n pieces of test equipment of the same group

If this parameter is empty, only the samples of the current inspection step charac-

teristic are displayed (relates to parameters

"[RECTYP],[BER],[PANNR],[PAUNR],[AFO]").

Example

[RECTYP],[BER],[ANR],[CMMNR]

A control chart or histogram is displayed that includes all samples of the current data record

type, the current area, the current order number and the current characteristic number for all

inspection steps.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 18 of 95

Option 1022 - Automatic deactivation of old inspection plans

Configuration of QM/CAQ Options

Other

(with

comment)

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Subject to area

yes

Description

If this option is set (value = "Y"), the system checks if inspections plans exist with the same

key criteria each time you activate an inspection plan. If this is the case, the respective in-

spection plans are automatically deactivated.

Key criteria are the data record type (production, goods receipt, etc.), area, article number, arti-

cle index, operation number, operation designation, customer or supplier or manufacturer num-

ber  and  the  configuration  of  field  "Inspection  plan  +  OP".  The  inspection  plans  of  the  test

equipment management are an exception.

In case of inspection plans for test equipment, key criteria are only the area and the inspection

plan number.

Option 1023 – Limit value as of which a process is stable

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

X

X

X*

Valid values

Floating point number using a point as a decimal separator (no comma).

Configuration_QM_Options.docx

Version: 2.23.16920

Page 19 of 95

Configuration of QM/CAQ Options

Subject to area

yes

Description

This option defines the limit value as of which you generally consider a process as stable.

This option is mainly used for evaluation and printing programs (e.g. initial sample documents).

If this option does not exist or if the value is not entered, the standard value 1,33 is used.

If this option is not available or the value has not been assigned, then the classification num-

ber calculation is based on the number of measured values n. The following formula is used:

Option 1028 up to 1031 – Supplier evaluation "Proportion of

complaints"

General description of the function

You first search for all completed goods receipt inspection requirements of the company you

want  to  evaluate  (entered  as  supplier).  The  option  defines  the  areas  of  the  inspection  re-

quirements. In order to filter only the data of the respective period, the system only considers

the inspection requirements with a date within the limits of the evaluation period. Option 1030

defines  the  date  that  is  used.  For  all  data  records  that  are  found,  the  calculation  basis  (ac-

cording to option 1031) is added up and stored in the variable nPAN.

Then the system counts all complaint details of the areas defined in the option. All complaint

details are counted where the company you want to evaluate is specified as supplier. In order

to restrict the data to the evaluation period, the system only includes complaints with a date

within the evaluation period. Option 1030 defines the fields used for the inspection of that pe-

riod. In order to exclude unjustified complaint details, data with results that are to be ignored

is not used (status addition [IGN]). For all data records that are found, the calculation basis

(according to option 1031) is added up and stored in the variable nREK.

The rating (in percent) of the evaluation criterion is calculated as follows:

Configuration_QM_Options.docx

Version: 2.23.16920

Page 20 of 95

100PANREKPANnnn

The decimal rating is issued in "parts per million" (ppm).

Configuration of QM/CAQ Options

Option 1028 up to 1031 Supplier Evaluation "Proportion of Com-

plaints"

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

See description

Description

Other

(with

comment)

This option defines the relevant areas of goods receipts for the automatic rating program

"proportion of complaints" (REKLAMATION_ANTEIL).

In this option, you can define one or several areas where the system should search for in-

spection requirements (to calculate the variable  nPAN).

If this parameter is empty, all goods receipt areas are included in the search. If you want to

include more than one area in the search, enter the individual areas comma-separated.

Option 1029 - Supplier evaluation "Proportion of complaints".

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

See description

Description

Other

(with

comment)

This option defines the relevant areas of complaints for the automatic rating program "propor-

tion of complaints" (REKLAMATION_ANTEIL).

Configuration_QM_Options.docx

Version: 2.23.16920

Page 21 of 95

Configuration of QM/CAQ Options

In this option, you can define one or several areas where the system should search for com-

plaints (to calculate the variable nREK).

If this parameter is empty, all complaint areas are included in the search. If you want to in-

clude more than one area in the search, enter the individual areas comma-separated.

Option 1030 - Supplier evaluation "Proportion of complaints".

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

See description

Description

Other

(with

comment)

This option defines the date fields that are used to filter the inspection requirements and

complaint details for the automatic rating program "proportion of complaints"

(REKLAMATION_ANTEIL).

The following date fields are available:

Inspection requirement - inspection of the lower limit of the evaluation period

PANDAT

ABSDAT

HERSTDAT

LIEFDAT

Date of the requirement

Completion date of the inspection requirement

Production date

Actual delivery date

LIEFDAT:SOLL

Target delivery date

Inspection requirement - inspection of the upper limit of the evaluation period

PANDAT

ABSDAT

HERSTDAT

LIEFDAT

Date of the requirement

Completion date of the inspection requirement

Production date

Actual delivery date

LIEFDAT:SOLL

Target delivery date

Complaint detail - inspection of the lower limit of the evaluation period

REKDAT

Date of receipt

Configuration_QM_Options.docx

Version: 2.23.16920

Page 22 of 95

Configuration of QM/CAQ Options

LIEFDAT

ZIELDAT

ISTDAT

Delivery date

Target date of the complaint

Actual date of the complaint

Complaint detail - inspection of the upper limit of the evaluation period

REKDAT

LIEFDAT

ZIELDAT

ISTDAT

Date of receipt

Delivery date

Target date of the complaint

Actual date of the complaint

The individual parameters are separated by „/“.

If this parameter is empty, the default setting is used:

LIEFDAT/LIEFDAT/LIEFDAT/LIEFDAT

During  data  collection,  the  system  ignores  all  data  records  where  one  of  the  configured  date

fields is empty.

Option 1031 - Supplier evaluation "Proportion of complaints".

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

See description

Description

Other

(with

comment)

This option defines the criterion that is used to specify the variables nPAN and nREK for the au-

tomatic rating program "proportion of complaints" (REKLAMATION_ANTEIL).

The following settings are available:

ANZAHL  -  the  calculation  is  based  on  the  number  of  inspection  requirements  or  com-

plaint details.

STUECKZAHL – the calculation is based on the actual delivery quantity of the inspection

Configuration_QM_Options.docx

Version: 2.23.16920

Page 23 of 95

Configuration of QM/CAQ Options

requirements and the quantity of the complaint details. If this parameter is set, all data

records are ignored during data collection where the respective field is empty. The cal-

culated decimal value is stated as "Parts per million".

If this parameter is empty, the setting STUECKZAHL is used.

Options 1032 up to 1034 – Supplier evaluation "Delivery date"

General description of the function

First, the number of completed inspection requirements of the goods receipt is specified that

are assigned to the company you want to evaluate (entered as supplier). You specify the

number of inspection requirements that are within the areas defined via option. In order to fil-

ter the data of the respective period, the system only considers the inspection requirements

with a date within the limits of the evaluation period. Option 1033 defines the date that is

used. The number of inspection requirements is stored in the variable npan.

For each inspection requirement found, an evaluation factor fTERMIN is specified according to

option 1034.   These evaluation factors are also added.

To further calculate, the greatest evaluation factor of option 1034 is specified. That factor is

stored in the variable fMAX.

At the end, the sum of the evaluation factors  fTERMIN is divided by the number of goods receipt

and multiplied with the maximum evaluation factor.

Option 1032 – Supplier evaluation  "Delivery date"

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 24 of 95

MAXPANPANTERMINfnnf

Configuration of QM/CAQ Options

Valid values

See description

Description

This option defines the relevant areas of the goods receipt that are used for the automatic rat-

ing program "delivery date (LIEFERUNG_TERMIN)".

In this option, you can define one or several areas where the system should search for in-

spection requirements (to calculate the variable  nPAN).

If this parameter is empty, all goods receipt areas are included in the search. If you want to

include more than one area in the search, enter the individual areas comma-separated.

Option 1033 – Supplier evaluation  "Delivery date"

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

See description

Description

Other

(with

comment)

This option defines the date fields that are used to filter inspection requirements for the auto-

matic rating program "delivery date" (LIEFERUNG_TERMIN).

The following date fields are available:

Inspection of the lower limit of the evaluation period

PANDAT

ABSDAT

HERSTDAT

LIEFDAT

Date of the requirement

Completion date of the inspection requirement

Production date

Actual delivery date

LIEFDAT:SOLL

Target delivery date

Inspection of the upper limit of the evaluation period

PANDAT

ABSDAT

Date of the requirement

Completion date of the inspection requirement

Configuration_QM_Options.docx

Version: 2.23.16920

Page 25 of 95

Configuration of QM/CAQ Options

HERSTDAT

LIEFDAT

Production date

Actual delivery date

LIEFDAT:SOLL

Target delivery date

The individual parameters are separated by „/“.

If this parameter is empty, the default setting is used:

LIEFDAT/LIEFDAT

During  data  collection,  the  system  ignores  all  data  records  where  one  of  the  configured  date

fields is empty.

Option 1034 – Supplier evaluation  "Delivery date"

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

See description

Description

Other

(with

comment)

This option defines the difference between target and actual delivery date as of which a

goods receipt is rated using the specified factor (to calculate the variable fTERMIN) for the au-

tomatic rating program "delivery date (LIEFERUNG_TERMIN)".

This option can contain several option details which are set in a certain sequence using the

sub number of the option. You must generally specify the sequence so that the best class

(lowest difference between dates) is on top of the list and therefore has the lowest sub num-

ber.

You first state the class, symbolized by letters.

Then you state the evaluation factor fTERMIN, separated by a colon. This is a positive integer.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 26 of 95

Configuration of QM/CAQ Options

Then you state the negative deviation (separated by a colon) and, after a slant line, the posi-

tive deviation. The deviation is specified as an integer in days.  The entry with the highest sub

number may not include any specification on deviations (see example below). Therefore all

deviations from the delivery date, which are outside the limits of the second last option entry,

are put into the last class.

Example

Option-

Option

Option

Value

No.

sub num-

identifier

ber

1

2

3

4

1034

1034

1034

1034

0

0

0

0

A:3:-3/+1

B:2:-5/+2

C:1:-8/+3

D:0

In this example, all goods receipts which are up to 3 days too early or 1 day too late, are

assigned to class A with an evaluation factor ftermin of 3.

Goods receipts which are up to 5 days too early or 2 day too late, are assigned to class B

with an evaluation factor ftermin of 2.

Goods receipts which are up to 8 days too early or 3 day too late, are assigned to class C

with an evaluation factor ftermin of 1.

All goods receipts which arrive earlier or later than stated above, are assigned to class D

with an evaluation factor ftermin of 0.

Options 1035 up to 1037 – Supplier evaluation "Delivery quantity"

General description of the function

First, the number of completed inspection requirements of the goods receipt is specified that

are  assigned  to  the  company  you  want  to  evaluate  (entered  as  supplier).  You  specify  the

number of inspection requirements that are within the areas defined via option. In order to fil-

ter the data of the respective period, the system only considers the inspection requirements

with  a  date  within  the  limits  of  the  evaluation  period.  Option  1035  defines  the  date  that  is

used.  Goods  receipts  with  a  target  quantity  of  zero  or  if  the  target  or  actual  quantity  is  not

Configuration_QM_Options.docx

Version: 2.23.16920

Page 27 of 95

Configuration of QM/CAQ Options

specified, are not taken into account for the rating result. The number of inspection require-

ments is stored in the variable npan.

For each found inspection requirement an evaluation factor is specified fmenge.  These evalua-

tion factors are also added.

To further calculate, the greatest evaluation factor of option 1037 is specified. That factor is

stored in the variable fMAX.

At the end, the sum of the evaluation factor  fMENGE is divided by the number of goods receipts

and multiplied with the maximum evaluation factor.

Option 1035 – Supplier evaluation "Delivery Quantity"

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

See description

Description

Other

(with

comment)

This option defines all relevant areas of goods receipt for the automatic rating program "de-

livery quantity" (LIEFERUNG_QUANTITY).

In this option, you can define one or several areas where the system should search for in-

spection requirements (to calculate the variable  nPAN).

If this parameter is empty, all goods receipt areas are included in the search. If you want to

include more than one area in the search, enter the individual areas comma-separated.

Option 1036 – Supplier evaluation "Delivery Quantity"

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

Other

Configuration_QM_Options.docx

Version: 2.23.16920

Page 28 of 95

MAXPANPANMENGEfnnf

Configuration of QM/CAQ Options

(with

comment)

(server)

(server)

X

X

Valid values

See description

Description

This option defines the date fields that are used to filter inspection requirements for the auto-

matic rating program "delivery quantity" (LIEFERUNG_QUANTITY).

The following date fields are available:

Inspection of the lower limit of the evaluation period

PANDAT

ABSDAT

HERSTDAT

LIEFDAT

Date of the requirement

Completion date of the inspection requirement

Production date

Actual delivery date

LIEFDAT:SOLL

Target delivery date

Inspection of the upper limit of the evaluation period

PANDAT

ABSDAT

HERSTDAT

LIEFDAT

Date of the requirement

Completion date of the inspection requirement

Production date

Actual delivery date

LIEFDAT:SOLL

Target delivery date

The individual parameters are separated by „/“.

If this parameter is empty, the default setting is used:

LIEFDAT/LIEFDAT

During  data  collection,  the  system  ignores  all  data  records  where  one  of  the  configured  date

fields is empty.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 29 of 95

Configuration of QM/CAQ Options

Option 1037 – Supplier evaluation "Delivery Quantity"

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

(server)

(server)

X

X

Valid values

See description

Description

Other

(with

comment)

This option defines the difference between target and actual delivery date as of which a

goods receipt is rated using a specified factor (to calculate the variable fMENGE) for the auto-

matic rating program "delivery quantity (LIEFERUNG_MENGE)".

This option can contain several option details which are set in a certain sequence using the

sub number of the option. You must generally specify the sequence so that the best class

(lowest difference between dates) is on top of the list and therefore has the lowest sub num-

ber.

You first state the class, symbolized by letters.

Then you state the evaluation factor fMENGE, separated by a colon. This is a positive integer.

Then you state the negative deviation (separated by a colon) and, after a slant line, the posi-

tive deviation. The deviation is specified as an integer in days.  The entry with the highest sub

number may not include any specification on deviations (see example below). Therefore all

deviations from the delivery date, which are outside the limits of the second last option entry,

are put into the last class.

Example

Option-

Option

Option

Value

No.

sub num-

identifier

ber

1

2

3

1037

1037

1037

0

0

0

A:2:-0/+0

B:1:-5/+10

C:0

Configuration_QM_Options.docx

Version: 2.23.16920

Page 30 of 95

Configuration of QM/CAQ Options

In  this  example,  all  goods  receipts  without  a  quantity  deviation  are  assigned  to  class  A

with an evaluation factor fMenge of 2.

Goods receipts where up to 5% less or 10% more than planned is delivered, are assigned

to class B and to an evaluation factor fMENGE  of 1.

Goods receipts, which deviate even more from the planned delivery quantity (positive or

negative deviation), are assigned to class C with an evaluation factor fMenge of 0.

Option 1038 - Method to identify the inspection result

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

Other

(with

comment)

X

X

X

Valid values

 EXIST_FA / NCD_ALL / NCD_LAST / NCD_MMKONF

Valid as of HYDRA-CAQ version

7.1.3

Subject to area

yes

Description

This option defines the method that is used to identify the inspection result of a characteristic.

Notes

The following values are available:

EXIST_FA

 If a failure type exists for this characteristic (generated manually or automati-

cally), the inspection result of the characteristic is FAIL. In all other cases it is PASS.

NCD_ALL

The worst inspection result of all collected samples is used as inspection re-

sult of the characteristic. This function relates to tolerance violations during the inspection of

n-c samples and is independent of manual or automatic failure collection.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 31 of 95

Configuration of QM/CAQ Options

NCD_LAST  The inspection result of the last sample collected for this characteristic is used

as inspection result of this characteristic.

If the last sample has the status UNGRPRUEFT ("unchecked") due to invalid measured val-

ues, this status is also assigned to the characteristic.

NCD_MMKONF

The inspection result of the characteristic is identified via the settings of

the characteristic. The settings include either the parameter NCD_LAST or NCD_ALL. This

parameter is only available as of HYDRA-CAQ 7.1.24.

If no valid measured value is available for the characteristic, the characteristic is assigned the

status UNGEPRUEFT ("unchecked").

If this option does not exist or the value is not entered, the standard value NCD_ALL is used.

If you change this option during operation, the system does not automatically correct all exist-

ing characteristic data where this option applies. Changes are only becoming active if meas-

ured values or failure types are entered, deleted or changed.

As of HYDRA-CAQ 7.1.24, this setting is also used to identify inspection results of

the entries of a number pool.

In the MOC, you use this option to set the characteristic result. If NCD_MMKONF is set in the

option, the acronym basic_inspection_result_enabled is set to 1, otherwise 0. If the value of

the acronym is 1, the field Inspection result base is visible (in the characteristic master data).

Note on the use of the field Inspection result base.

The setting of the inspection plan/inspection step characteristic in the field Inspection result

base is only used, if this option is set to "NCD_MMKONF" (for this data type/area if required).

If  the  content  of  this  field  in  the  MOC  (with  correct  option  1038)  does  not  equal  "NCD_LAST"

and does not equal "EXIST_FA", the system uses "NCD_ALL".

Option 1041 – Data base for dynamic modification history

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

Configuration_QM_Options.docx

Version: 2.23.16920

Page 32 of 95

Configuration of QM/CAQ Options

comment)

X

X

Valid values

For all types of dynamic modification, the following field acronyms are allowed:

RECTYP

– Data record type of the inspection requirement

BER

ATK

– Area of the inspection requirement

– Article number of the inspection requirement

ATKIDX

– Drawing issue number of the inspection requirement

HERSTNR

– Manufacturer from the inspection requirement

LIEFNR

KDNR

AGNR

AGBEZ

PANDAT

– Supplier from the inspection requirement

– Customer from the inspection requirement

– Operation number from the inspection requirement

– Operation designation from the inspection requirement

– Date of requirement

HERSTDAT

– Manufacturing date from the inspection requirement

LIEFDAT

– Actual delivery date from the inspection requirement

ANR

CNR

BESTNR

PPS:REF

PPLID

PPLIDX

– Order number of the inspection requirement

– Batch number of the inspection requirement

– Order number of the inspection requirement

– PPS reference number of the inspection requirement

– Inspection plan ID of the underlying inspection plan

– Inspection plan index of the underlying inspection plan

DYNUEBERG

– Transitional definition of the dynamic modification (see comment)

PPLATZ

– Inspection station (see comment)

The following field acronyms are available for the dynamic modification history that additional-

ly includes data of the inspection step characteristics:

AFO

CMMNR

SW

OTG

UTG

DYNORM

PNIVEAU

– OP sequence of the inspections step characteristic

– Characteristic number of the inspection step characteristic

– Target value of the inspection step characteristic

– Upper tolerance limit of the inspection step characteristic

– Lower tolerance limit of the inspection step characteristic

– Dynamic modification norm of the inspection step characteristic

– Inspection level of the dynamic modification norm (from the inspec-

tion step characteristic)

DYNMETH

– Method of the dynamic modification norm (from the inspection step

characteristic)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 33 of 95

Configuration of QM/CAQ Options

AQL

– AQL value of the dynamic modification norm (from the inspection

step characteristic)

DYNUEBERG

– Transitional definition of the dynamic modification (see note in the

– Inspection station (see note in the description)

description)

PPLATZ

Subject to area

No

Description

This  option  defines  all  fields  that  form  the  common  data  base  for  the  dynamic  modification

history.

When you identify the inspection severity of newly created inspection requirements or inspec-

tion step characteristics, all inspection steps or inspection step characteristics are taken into

account, which include the same content in the fields defined here as the newly created data

record.

The entries are equivalent to the field acronym and set in square brackets. A comma is used to

separate.

The  user  manually  decides  on  the  design  and  the  visualization  of  the  data  according  to  this

option in the MOC. To do so, the user must group the respective list by the relevant fields.

The user can use the additional field of this option to specify for which type of dynamic modifica-

tion  the  data  record  of  this  option  is  valid.  Enter  the  respective  type  of  dynamic  modification

here (set in square brackets). The following types of dynamic modification are available.

        [LOS] or [MERKMAL]Depending on the type of dynamic modification, the field acronyms

PPLATZ  and  DYNUEB  refer  to  the  respective  fields  of  the  inspection  requirement  (dynamic

modification referring to the batch) or of the inspection step characteristic (dynamic modification

referring to the characteristic).

A change of this option only has an effect when you create the next inspection requirement.

Once you have changed this option, the traceability of the identification of the inspection severi-

ty is greatly limited for the "old dynamic modification history".  Because of the grouping of fields,

you can only display one "type" of the dynamic modification history in the MOC.

Inspection step characteristics can have dynamic modification norms with different skip-lot fre-

quencies. For this reason, you should also use parameters that are specific to the characteris-

tics for the batch-related dynamic modification when considering the dynamic modification histo-

Configuration_QM_Options.docx

Version: 2.23.16920

Page 34 of 95

Configuration of QM/CAQ Options

ry. You can then make sure, that characteristic A is inspected every third time, but characteristic

B  only  every  6th  time.  In  this  case,  the  system checks for  each  inspection  requirement  of  the

dynamic modification history (according to the selection criteria that are specific to the charac-

teristic)  if  the  characteristic  had  the  status  skip-lot.  If  no  characteristic  has  been  found  for  the

inspection requirement that matches the selection criteria, the system proceeds as if a charac-

teristic with the status skip-lot has been found.

If the option for the batch-related  dynamic modification does not include  acronyms for inspec-

tion  step  characteristics,  then  the  system  checks  during  the  search  for  skip-lot  characteristics

that must be inspected if the inspection requirement included "any" dynamic characteristic with

a status unequal skip-lot.

Example

[RECTYP],[BER],[LIEFNR],[ATK],[ATKIDX]

Option 1044 – Distribution list for measures in case of errors in

the inspection planning

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

Other

(with

comment)

X

X

Valid values

Any character string.

Valid as of HYDRA-CAQ version

7.1.3

Subject to area

yes

Configuration_QM_Options.docx

Version: 2.23.16920

Page 35 of 95

Configuration of QM/CAQ Options

Description

You can use this option to define a distribution list that is notified via a specified measure in

case of errors in the inspection planning.

Notes

If the system cannot find a distribution list with the identifier defined in this option, the system

does not generate a measure.

This option is currently not used. If required, it is specified and individually resolved which er-

ror does generate a measure.

Option 1045 – Distribution list for measures in case of errors in

the dynamic modification

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

X

X

Valid values

Any character string.

Subject to area

yes

Description

You can use this option to define a distribution list that is notified via a specified measure in

case of errors in the dynamic modification.

If the system cannot find a distribution  list  with the  identifier  defined  in this option, the system

does not generate a measure.

In conjunction with the escalation management, users can be informed automatically about the

generation of a measure.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 36 of 95

Configuration of QM/CAQ Options

Option 1046 – Number of samples to identify a trend

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

X*

X

X

X

Valid values

Any integer

Subject to area

yes

Description

This option defines how many samples you need to identify a trend.

This number of samples is only counted as of a corresponding basic value, as shown in the

following example (with number = 4).

1

2

3

4

The trend already starts with the basic value and is visualized accordingly.

Use this option to display a trend in control charts.

You also use this option to identify when a respective automatic failure type is created in case

of an existing trend. For this, you must have activated the generation of the failure type for the

inspection step characteristic.

A trend occurs if x consecutive values of the control chart (depending on the type of control

chart XQuer, R, S ....) show a continuous trend in one direction (upwards or downwards).

If the defined value is 0, the display of the trend is generally suppressed. If this option does not

exist, the value 7 is used.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 37 of 95

Configuration of QM/CAQ Options

Option 1047 – Number of samples to identify a run

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

X*

X

X

X

Valid values

Any integer

Subject to area

yes

Description

You can use this option to define the minimum number of samples that you need to identify a

run.

Use this option to display a run in control charts.

A run occurs, if x consecutive values of the control chart are always above or below the mean

value.

If the defined value is 0, the display of the run is generally suppressed. If this option does not

exist, the value 7 is used.

Option 1048 – Lower threshold value for middle third in percent

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

X*

X

X

X

Valid values

Any integer

Subject to area

No

Configuration_QM_Options.docx

Version: 2.23.16920

Page 38 of 95

Configuration of QM/CAQ Options

Description

This option defines the percentage up to which a warning 'middle third' is displayed (meas-

ured values exceed the middle third of the action limits).

You use this option if you display a middle third in the control charts.

The system identifies a middle third, if less than x percent of the values visualized in the control

chart is within the middle third (of the area between the action limits).

If this option does not exist, the value 40 is used.

Option 1049 – Upper threshold value for middle third in percent

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X*

X

X

Other

(with

comment)

X

Valid values

Any integer

Subject to area

No

Description

This option defines the percentage as of which a warning 'middle third' is displayed (meas-

ured values exceed the middle third of the action limits).

You use this option if you display a middle third in the control charts.

The system identifies a middle third, if more than x percent of the values visualized in the con-

trol chart is within the middle third (of the area between the action limits).

If this option does not exist, the value 90 is used.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 39 of 95

Configuration of QM/CAQ Options

Option 1050 – Autom. deactivation of old control plans

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Subject to area

yes

Description

Other

(with

comment)

If  this  option  is  set  (value  =  'Y'),  the  system  checks every  time  a  control  plan  is  activated  if

control plans with the same key criteria exist. If this is the case, the respective control plans

are automatically disabled.

Key criteria are article number, article index, customer-, manufacturer-, and supplier number.

Options 1051 and 1052 – Supplier evaluation "Usage decision

goods receipt"

General description of the function

First, the number of completed inspection requirements of the goods receipt is specified that

are  assigned  to  the  company  you  want  to  evaluate  (entered  as  supplier).  You  specify  the

number of inspection requirements that are within the areas defined via option. In order to fil-

ter the data of the respective period, the system only considers the inspection requirements

with  a  date  within  the  limits  of  the  evaluation  period.  Option  1052  defines  the  date  that  is

used. The number of inspection requirements is stored in the variable npan.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 40 of 95

Configuration of QM/CAQ Options

For each inspection requirement found, the percentage  fPROZ is specified. The percentage is the

parameter "[BEWPENT:xx]" that is included in the additional field of the HYDRA-CAQ status (sta-

tus type = "PANVERWENT"; status ID = ID of the usage decision). These percentages are also

added.  Inspection  requirements  where  no  percentage  fPROZ  could  be  generated,  are  ignored

during the rating.

At the end, the sum of the percentages fPROZ is divided by the number of identified goods receipts

nPAN.

Option 1051 – Supplier evaluation "Usage decision"

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

See description

Description

Other

(with

comment)

In  this  option,  you  can  define  one  or  several  areas  where  the  system  should  search  for  in-

spection requirements (to calculate the variable  nPAN).

If this parameter is empty, all goods receipt areas are included in the search. If you want to

include more than one area in the search, enter the individual areas comma-separated.

Option 1052 – Supplier evaluation "Usage decision"

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 41 of 95

PANPANPROZnnf

Configuration of QM/CAQ Options

Valid values

See description

Description

You use this option to define the date fields which are used to filter the inspection require-

ments for the automatic rating program "Usage decision goods receipt

(LIEFERUNG_PENTSCHEID)".

The following date fields are available:

Inspection of the lower limit of the evaluation period

PANDAT

ABSDAT

HERSTDAT

LIEFDAT

Date of the requirement

Completion date of the inspection requirement

Production date

Actual delivery date

LIEFDAT:SOLL

Target delivery date

Inspection of the upper limit of the evaluation period

PANDAT

ABSDAT

HERSTDAT

LIEFDAT

Date of the requirement

Completion date of the inspection requirement

Production date

Actual delivery date

LIEFDAT:SOLL

Target delivery date

The individual parameters are separated by „/“.

If this parameter is empty, the default setting is used:

LIEFDAT/LIEFDAT

During  data  collection,  the  system  ignores  all  data  records  where  one  of  the  configured  date

fields is empty.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 42 of 95

Configuration of QM/CAQ Options

Option 1058 – Copy user fields from the inspection plan into the

inspection requirement

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

X

X

Valid values

 Y / N

Subject to area

yes

Description

Other

(with

comment)

If this option is set (value='Y'), the system takes over all user fields (direct and indirect) of the

underlying inspection plan when you generate an inspection requirement with CAQ 7.x.

As of CAQ 8.1, the system only takes over the direct user fields. As of CAQ 8.1, the indirect

user fields are no longer supported.

With CAQ 7.x, note the following with respect to indirect user fields:

If this functionality is activated, you must guarantee that the numbers of the indirect user fields

of the inspection plan and the inspection requirement do not conflict.

Example: The inspection plan header data use the indirect user fields 9 to 13. In the inspection

requirements, the direct user fields 1 to 8 are needed. An inspection requirement that is based

on an inspection plan therefore includes the indirect user fields 1 to 13.

For  the  configuration  of  the  user  fields  you  must make sure  that  the  field  types  of  the  indirect

user  fields  9  to  13  in  the  inspection  plans  correspond  to  the  ones  of  the  inspection  require-

ments.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 43 of 95

Configuration of QM/CAQ Options

If this option does not exist or if the value is not filled, the standard value N is used.

Option 1083 – Inspection step characteristics are not generated if

specification list entry is not found

Other

(with

comment)

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

X

X

Valid values

 Y / N

Subject to area

yes

Description

You  can  use  this  option  to  define  whether  the  generation  of  characteristics  should  be  sup-

pressed if the corresponding specification list entries are not found. If this option is disabled,

the characteristics are generated with status 'FHL'.

This  option  is  not  effective  for  characteristics  if  the  system  searches  for  their  details  and/or

specifications in the characteristics catalog.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 44 of 95

Option 1088 – Synchronizing the following number types for cal-

Configuration of QM/CAQ Options

culated characteristics

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Other

(with

comment)

Valid values

defined number type (see status type NUMMERTYP)

Valid as of HYDRA-CAQ version

CAQ 8.1

Subject to area

yes

Description

In HYDRA 8 and if you record values in relation to an inspection point, this option must be ac-

tive for the relevant rectype with the value "PPUNKT". By default, this is initially the case for

rectype  "[FEP]". If you have activated a recording of values in relation to inspection points for

other rectypes and if calculated characteristics are used, an active option with the value =

"rectype" must also exist for this rectype.

Other values apart from "PPUNKT" are not permitted if you use HYDRA 8.

If the field is empty, the function is disabled.

Notes

Numbers are only taken over for calculated characteristics if the number stored for the re-

spective sample of the inspection point is equal to the number of the characteristics that have

been referenced during the calculation of the characteristic. In the field 'Addition', you can use

specific flags to better control the behavior.

[AKTNPSTA]  The status of the corresponding entry in the number pool is updat-

ed depending on the result of all samples. You use the flags
PRFERG_INIT:UNGEPR, SP_PRFERG_INIT:IO,
SP_PRFERG_INIT:BEDINGT_IO and SP_PRFERG_INIT:NIO of
the status entries of status type NUMPOOLSTA to identify the sta-
tus of the sample result.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 45 of 95

Configuration of QM/CAQ Options

Option 1100 – QM Subsystem identification

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

X

X

Valid values

any string (max. length 6 characters)

Valid as of HYDRA-CAQ version / DB patch

CAQ 8.1Subject to area

No

Description

Other

(with

comment)

You  can  use  the  combination  of  options  1100  and  1101  to  add  identifiers  that  specify  the

origin  of  data.  These  identifiers  are  added  to  QM  subsystem  identifications  that  are  trans-

ferred with the inspection batch data from SAP.

The  SAP  inspection  batch  data  include  the  subsystem  ID  of  inspection  batches  in  the  field

SUBSYS of the structure QIWLR. This ID is stored in the field subsys_nr of the inspection re-

quirements.

During  uploads  for  an  inspection  batch,  a  corresponding  (active)  entry  of  option  1100  is

searched for, where the value of the option includes exactly this subsystem ID of the inspec-

tion

batch.

Then  the  ID  of  the  option  found  is  used  to  find  the  corresponding  (active)  entry  of  option

1101. The value of this corresponding option is used as data origin (field QERGDATH) in all

uploads of the respective inspection batch.

Cross reference

See also the documentation  "MBL_Interface_QMIDI".

Option 1101 – Origin of data for the QM subsystem ID

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

Other

(with

Configuration_QM_Options.docx

Version: 2.23.16920

Page 46 of 95

Configuration of QM/CAQ Options

comment)

X

X

Valid values

any string (max. length 2 characters)

Valid as of HYDRA-CAQ version / DB patch

CAQ 8.1Subject to area

No

Description

See Option 1100

Cross reference

See also the documentation  "MBL_Interface_QMIDI".

Option 1107 – Overruling the inspection scope with manually

generated inspection points for time and piece intervals

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

EGAL / GENAU / GROESSER / KLEINER ("irrelevant/exact/greater/smaller")

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 47 of 95

Configuration of QM/CAQ Options

Valid as of HYDRA-CAQ version / DB patch

for data type = "QMS": as of CAQ 8.1

for data type <> "QMS": as of service pack 14

Subject to area

yes

Data type of the inspection point <> "QMS"

Description

If this option includes a value, the value defined in this option overrules the specification,

which defines the compliance with the inspection scope. This specification is stored in the

characteristic during manual generation of inspection points with cause of creation Free.

Data type of the inspection point = "QMS"

Description

If this option includes a value, this value  overrules the specification that is stored in the

characteristic during manual generation of inspection points and that defines the  compli-

ance with the inspection scope.

However, this only occurs if the cause for the generation of an inspection point deviates

from the type of inspection point generation defined in the inspection step.

Example

You  have  configured  for  an  inspection  step  that  the  inspection  points  are  generated  at

time intervals. All characteristics of the inspection step have been configured so that you

must strictly adhere to the inspection scope.

If the system generates automatic inspection points for this inspection step because of a

time interval, the identifier to overrule the inspection scope with option 1107 is not affect-

ed for the newly generated inspection points. The inspection scope must be adhered to

for all characteristics of these inspection points. This does also apply for other automati-

cally created inspection points (e.g. change of machine status).

But if you manually generate an inspection point for this inspection step, the value stored

in  option  1107  is  used  to  overrule  the  characteristic  specifications  for  this  inspection

point.  If  the  option  includes  the  value  EGAL  ("irrelevant")  in  our  example,  you  need  not

adhere to the  inspection scope that  has been specified for the characteristics of this in-

spection point.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 48 of 95

Configuration of QM/CAQ Options

If like in this example the inspection step is configured so the inspection points are gen-

erated  manually  ("free")  then  Option  1108  has  no  impact.  As  the  generation  of  the  in-

spection  points  have  been  executed  manually  ("free"),  the  cause  of  creating  an  inspec-

tion point is identical.

Option 1108 – Overruling the mandatory inspection with manual-

ly generated inspection points for time and piece intervals

Other

(with

comment)

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

0 / 1

Valid as of HYDRA-CAQ version / DB patch

for data type = "QMS": as of CAQ 8.1

for data type <> "QMS": as of service pack 14

Subject to area

yes

Data type of the inspection point <> "QMS"

Description

If this option includes a value, the value defined in this option overrules the specification,

which defines if a mandatory inspection is required. This specification is stored in the

characteristic during manual generation of inspection points with cause of creation Free.

0 = no mandatory inspection

1 = mandatory inspection

Data type of the inspection point = "QMS"

Description

If this option includes a value, this value overrules the specification that is stored in the

characteristic during manual generation of inspection points and that defines if a manda-

tory inspection is necessary.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 49 of 95

Configuration of QM/CAQ Options

However, this only occurs if the cause for the generation of an inspection point deviates

from the type of inspection point generation defined in the inspection step.

Example

You  have  configured  for  an  inspection  step  that  the  inspection  points  are  generated  at

time intervals. All characteristics of this inspection step have been configured so that an

inspection result must be recorded.

If the system generates automatic inspection points for this inspection step because of a

time interval, the identifier to overrule the mandatory inspection with option 1108 is not af-

fected for the newly generated inspection points. Therefore,  you must record inspection

results for all characteristics of these inspection points. This does also apply for other au-

tomatically created inspection points (e.g. change of machine status).

But if you manually generate an inspection point for this inspection step, the value stored

in  option  1108  is  used  to  overrule  the  identifier  of  the  mandatory  inspection  for  this  in-

spection point. If the option includes the value 0 in our example, the collection of inspec-

tion results for the characteristics of this inspection point is optional.

f the inspection step in our example were configured so that you could freely generate in-

spection points, then option 1108 would not have any effect either. Reason: The manual

generation of inspection points is "free" and the cause for the generation of the inspection

point is again identical.

Option 1109 – Upload skip inspection points to the PPS system

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Valid as of HYDRA-CAQ version / DB patch

CAQ 8.1Subject to area

yes

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 50 of 95

Configuration of QM/CAQ Options

Description

You can use this option to define if skip inspection points are confirmed/uploaded to the PPS

system.

Skip  inspection  points  are  inspection  points  where  no  characteristic  to  be  inspected  has  been

assigned..

If this option is disabled, the skip inspection points are not uploaded. The relevant data records

contain an "I" for ignore as ID for the upload.

Option 1110 – Immediately completing skip inspection points af-

ter generation

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

X

X

Valid values

 Y / N

Valid as of HYDRA-CAQ version / DB patch

CAQ 8.1Subject to area

yes

Description

Other

(with

comment)

You can use this option to define if skip inspection points are immediately completed after

generation.

Skip inspection points are inspection points where no due date is assigned to the characteristic.

If this option is activated, a new skip inspection point is instantly completed after generation.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 51 of 95

Option 1111 – Creating initial inspection point for time and piece

intervals immediately after OP logon

Configuration of QM/CAQ Options

Other

(with

comment)

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Valid as of HYDRA-CAQ version / DB patch

Patch:

dbp_qm_idi.hsc

Subject to area

yes

Description

You can use this option to define if characteristics with intervals that are



time-related and

  piece-related

are  included  in  an  inspection  point  that  is  created  with  the  operation  logon.  If  an  inspection

point  is  generated  via  operation  logon,  the  respective  cause  for  creation  is  "OP  logon

(A_AN)". If this option does not exist or if the option is disabled or includes the value "N", only

the characteristics with interval type "once" are included in such inspection points.

If you do not want to generate an inspection point  with the OP logon,  you must disable this

option  or  set  it  to  the  value  "N".  And  there  must  not  be  any  characteristics  with  the  interval

type "once".

When the system generates an inspection point for QMS inspection steps, the cause of the

creation is STCK for a piece-related or ZEIT for a time-related generation of the inspection

point. An inspection point with interval type "once" is not supported in a QMS.

For inspection steps that are not QMS inspection steps, an inspection point is generated which

contains  all  characteristics  of  the  interval  type  once,  piece  and  time.  This  inspection  point  is

assigned the cause of creation "OP logon (A_AN)".

Configuration_QM_Options.docx

Version: 2.23.16920

Page 52 of 95

Configuration of QM/CAQ Options

To create an  initial  inspection point after the OP  logon, the active scheduler entry for creating

inspection points must exist. The entry also controls the cyclic generation of an inspection point

based on time and pieces.

Other

(with

comment)

Option 1115 – Linking CAQ and ADE structures

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

X

X

Valid values

 Y / N

Valid as of HYDRA-CAQ version / DB patch / license

Patch:

dbp_caq_operation_linking

Patch:

dbp_caq71_ade72_integration_qm_idi

License:   ADE-CAQ

Subject to area

yes

Description

You can use this option to define if you want to link ADE and CAQ structures in a global

manner or in specific areas.

You can use this option to control that the respective entries for the CAQ structures are gener-

ated in the table auftrags_bestand.

  CAQ inspection requirement  Order header

  CAQ inspection step  Operation

In this case, the corresponding fields of the table auftrags_bestand link the structures.

This  active  option  can  also  control  if  the  system  searches  for  inspection  plan  information  for

Configuration_QM_Options.docx

Version: 2.23.16920

Page 53 of 95

Configuration of QM/CAQ Options

ADE orders or operations. If the search is successful, the system generates the respective in-

spection steps with characteristics (this is not valid for the operation as QM subsystem).

In the integrated mode, the HYDRA standard functions (A_AN etc..) are used to log on and log

off operations or to interrupt operations.

This (active) option also specifies that the order number of the inspection requirement is gener-

ated from the PPS reference number if an order number has not been transferred during gener-

ation of the inspection requirement.

If  you  use  this  option  to  disable  that  ADE  and  CAQ  structures  are  linked  in  case  of  a specific

rectype, you can use an additional MOC configuration of the ADE-CAQ area-specific configura-

tion  to  prevent  the  generation  of  orders  for  inspection  requirements.  This  can  be  useful  if  you

use e.g. the inspection mode "goods receipt" in the AIP.

Other

(with

comment)

Option 1128 – QM-IDI partial uploads

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

X

X

Valid values

 Y / N

Valid as of HYDRA-CAQ version

This function is valid as of 7.x in connection with QMS.

This option must be generated manually if necessary.

Subject to area

No

Description

If you activate this option, you can configure that you can make partial confirmations/uploads

of part quantities for inspection batches to the PPS system before having identified the usage

decision.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 54 of 95

Configuration of QM/CAQ Options

Use the addition "[DIRECT]" in the field Addition to change the behavior. For further details,

please refer to the  note  below. This addition is only available  for test purposes.  To use this

addition, there is no release.

If  this  option  is  not  available  or  inactive,  all  data  of  an  inspection  batch  is  only  con-

firmed/uploaded to the PPS system when the usage decision is made (completion of the in-

spection requirement).

If you only activate this option (without the addition [DIRECT]), the following posting behavior is

achieved:



Inspection  points  are  confirmed/uploaded  after  completion. With  the  inspection  points,

the single values and the sample results are uploaded.



In case of operations that are not relevant to inspection points, the corresponding char-

acteristics including their measured values and samples are uploaded when the inspec-

tion step is completed (normally with the final log off of the operation).

Warning:

This can lead to problems when reactivating operations that are relevant for the quality.

  The usage decision is uploaded once it is completed (normally after completion of the

inspection requirement).

If you activate this option with the addition [DIRECT], the following posting behavior is achieved:

  All  details  of  inspection  points,  collection  results  and  failure  positions  are  directly  up-

loaded to the PPS system after collection.



It is uploaded to the PPS system that the characteristics are finished when the corre-

sponding inspection step has been completed (normally with the final logoff of an op-

eration).

Warning:

This can lead to problems when reactivating operations that are relevant for the quality.



It is uploaded to the PPS that the sample sets are finished when the respective inspec-

tion step or the corresponding inspection point has been completed.

Warning:

This can lead to problems when reactivating operations that are relevant for the quality.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 55 of 95

Configuration of QM/CAQ Options

  The usage decision is uploaded once it is completed (normally after completion of the

inspection requirement).

Cross reference

See also the documentation  "MBL_Interface_QMIDI".

Option 1130 – Plausibility check of staff badge number in CAQ

terminal dialogs

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

X

X

(X*)

X

(X*)

Valid values

 Y / N

Valid as of HYDRA-CAQ version

You must set this option manually if required.

Description

You can use this option to configure if the system makes a plausibility check of the staff

badge number in the CAQ terminal dialogs during the recording of measured values.

Also, there is the possibility in the "Addition" of this option to store authorizations for the cor-

responding action.

If  you  want  to  use  this  option  with  HYDRA  8  in  the  AIP,  you  must  explicitly  test  the  required

configuration.

You  can  use  the  additional  parameter  [OPTIONAL]  to  configure  that  the  plausibility  check  is

only  carried  out  if  you  enter  a  staff  badge  number  in  the  corresponding  dialogs.  If  the  staff

badge number is not entered, then the plausibility check is not performed. It is only checked if

Configuration_QM_Options.docx

Version: 2.23.16920

Page 56 of 95

Configuration of QM/CAQ Options

the entry of the staff badge number is mandatory for this dialog.

If the parameter is not set, everytime an action is carried out at the terminal a staff badge num-

ber is requested.

Use the parameters [AUTH:<BAPI name>:<info field>:<level>] to control which function authori-

zation the employee requires for a specific action.

You can enter the following BAPIs/DDIs as <BAPI name>:

CPAUMW.*,  CPAUSP.*,  CPANUMP.*,  CPAUERR.*,  CMASSN.*,  Q_MW_GEN,

Q_MW_MOD, Q_PRB_GEN, Q_PRB_ABS, Q_P_AN

Single  tasks  can  be  specified  for  BAPIs  like  CPAUMW.INSERT,  CPAUMW.UPDATE,

CPAUMW.DELETE or CPAUSP.ABSCHLIESSEN.

The parameter component <level>can have a numerical value between 1 and 9. 9 is the highest

authorization level.

In order to use this function,  you must create a CAQ authorization for the staff member in the

HR master data. To assign a CAQ authorization, you must configure the fields of the HR master

data  respectively.  This  configuration  is  different  in  HYDRA  versions  7  and  8  and  the  require-

ments are different.

Requirements HYDRA 7:

  License: PZE-EPA; user rights: PPE, PADM

Requirements HYDRA 8:

  Function authorization "pefc" and license (PZE-INF, ZKS, BAV or MOC-CFG) for the

application "Configuration of HR master data and badge fields" (menu: Master data –

Staff).

To create a CAQ authorization, you can only use the fields "number field 1" to "number field 5"

(fields of type "numeric value"). These fields correspond to the data base fields "infowert_1" to

"infowert_5".

Example for HYDRA 8

In the editing dialog of the field "Number field 1" of the HR master data, you activate this field.

You assign to this field e.g. the field name "CAQ authorization". The length is set to 1.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 57 of 95

Configuration of QM/CAQ Options

In the HR master data, you assign e.g. the value "7" to person A in this field (tab "Additional

infos").

If a plausibility check is performed for a person with the CAQ authorization of level 7 for the

BAPI "CPAUMW.*“ (create measured value), the parameter

[AUTH:<BAPI name>:<Info field>:<level>]

must be structured as follows:

[AUTH:CPAUMW.*:infowert_2:7].

The person can use BAPIs CPANUMP if they have CAQ authorization 7,8 and 9.  In this ex-

ample, person A would be authorized to save or change measured values.

You can also use the fields "Number field 1" to "Number field 5" to create several CAQ authori-

zation fields. You can for example create a specific CAQ authorization for measures or a specif-

ic  CAQ  authorization  for  failures.  You  must  then  select  descriptive  names  in  the  fields  in  tab

"Additional info".

To open the screen to record measured values,  you  use the constant Q_P_AN  instead of the

BAPI name.

Option 1142 – Automatic calculation of floating statistical values

in the sample data records

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

Positive integer value between 2.....10

Valid as of HYDRA-CAQ version

Patch:

dbp_caq_statistic_enh.hsc

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 58 of 95

Configuration of QM/CAQ Options

Subject to area

yes

Description

If this option is set (value >=1), the statistical values for the floating XQuer-, R- and s-value

are calculated in the sample data records. In tab "Statistics" of the respective applications,

the statistical values are displayed independent of this option. The value of the option speci-

fies the number of samples that is used to calculate the floating statistical value.

If this option is set, the corresponding value is also used to calculate the displayed statistics

of floating control charts.

Only if the requirements described below are fulfilled, the floating values stored in the statistical

calculation match the visualization of the corresponding control chart:

  The  data  base  to  display  a  control  chart  (see  option  1017)  corresponds  to  the  value

[RECTYP],[BER],[PANNR],[PAUNR],[AFO],[DEVICE:TYP],[DEVICE:ID]

  The samples are recorded continuously over time.



(the sorting by date/time of the first measured value of a sample is equal to the sorting

by sample number).

  The value of the current option equals 2.

If this option is not available or if the numeric value is less than 1, the respective statistical fields

are not considered to calculate samples. For the display of floating control charts, the value 2 is

used in this case.

Option 1154 – Optional posting possibility to manually interrupt

and log off operations with pending inspections

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

Other

(with

Configuration_QM_Options.docx

Version: 2.23.16920

Page 59 of 95

Configuration of QM/CAQ Options

comment)

(server)

(server)

X

X

Valid values

Y/N/A_UN

Subject to area

yes

Description

You can use this option to configure that the HYDRA server provides the possibility to log off

or interrupt a QM operation although an inspection is still pending ("posting required").

If you activate this option (value = Y) and you log off or interrupt an operation with pending in-

spections in the terminal, the option is provided to log off or interrupt this operation anyway.

If this option is set to the value = A_UN, you can interrupt a QM operation with pending inspec-

tions, but you cannot log it off.

If  this  option  is  not  available  or  disabled,  the  system  checks  if  there  are  pending  inspections

when  you  log  off  or  interrupt  an  operation.  If  pending  inspections  are  available,  the  action  is

canceled.

You may only activate this option if the respective user action (log off/interrupt) only affects the

operation specified in the dialog.

If further operations are logged off and/or interrupted using such an OP logoff (i.e. on the level

of single events), you may not activate this function.

The processing code generally defines if any check for pending inspections is performed at all

during logoff/interruption.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 60 of 95

Configuration of QM/CAQ Options

Option 1157 – Using inspection station instead of ma-

chine/machine group even if ADE-CAQ is used?

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(LR)

(LR)

Other

(with

comment)

X

X

(X)

Valid values

 Y / N

Valid as of HYDRA-CAQ version

Generally valid as of hymwcaq72.dll version 7.2.1.72

The addition [GROUP:GEPLANT,MNR,MGRP,OPT_PLAN] is valid as of hymwcaq72.dll ver-

sion 8.1.1.177

This option might not be visible. In this case, you must adapt the database patch

dbp_caq_customer_configuration.hsc accordingly.

If the script hydbpatchmw30.scr is not called in an existing customer system after SP 10, you

must manually run this patch before changing the option if required.

Subject to area

yes

Description

This option only has an effect on the generation of inspection steps, if the inspection require-

ments are generated by an operation logon or an order status change. Additionally, the set-

ting "One inspection step for each inspection station" must be enabled in the respective in-

spection plan.

If this option is not enabled (value unequal "Y") or not available, the characteristics in the in-

spection steps are grouped by the fields "Scheduled", "Machine group" and "Machine" and

not by the inspection station.

If this option is enabled without any further parameters (value equal to "Y", addition empty),

the characteristics in the inspection steps are exclusively grouped by the inspection station.

If this option is enabled (value equal to "Y") and the addition of the option includes the pa-

rameter [GROUP:GEPLANT,MNR,MGRP,OPT_PLAN],the characteristics in the inspection

steps are grouped by the fields "Scheduled", "Machine group", "Machine" and "Inspection sta-

Configuration_QM_Options.docx

Version: 2.23.16920

Page 61 of 95

Configuration of QM/CAQ Options

tion". The inspection steps in the fields of the same name always have the contents of the

grouping criteria.

Option 1162 – Optional posting possibility to automatically inter-

rupt and log off operations with pending inspections

Other

(with

comment)

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

Y/N/A_UN

Subject to area

yes

Description

You can use this option to configure if the HYDRA server provides the possibility to log off or

interrupt a productive operation although an inspection is still pending ("posting required").

If you activate this option (value = Y) and you log off or interrupt an operation with pending in-

spections in the terminal, the option is provided to log off or interrupt this operation anyway.

If  this  option  is  set  to  the  value  =  A_UN,  you  can  interrupt  an  operation  with  pending  inspec-

tions, but you cannot log it off.

If  this  option  is  not  available  or  disabled,  the  system  checks  if  there  are  pending  inspections

when  you  log  off  or  interrupt  an  operation.  If  pending  inspections  are  available,  the  action  is

canceled.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 62 of 95

Configuration of QM/CAQ Options

The processing code generally defines if any check for pending inspections is performed at all

during logoff/interruption.

Option 1167 – Additional parameter to complete inspection step

within the CPAN.BEURTEILEN

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

X

X

Valid values

Example: BZW=J~BZWRET=2905,2936,2937,2938

Valid as of HYDRA-CAQ version

hymwcaq72.dll version 7.2.1.94

Subject to area

No

Description

Other

(with

comment)

If this option is active and contains a value, this value is attached to the dialog

CPAU.ABSCHLIESSEN within the function cpan_beurteilen. You can use this option to make

a posting ("posting required") and to overrule the plausibility checks (perform mandatory in-

spections, inspection scope reached, inspection points completed).

Configuration_QM_Options.docx

Version: 2.23.16920

Page 63 of 95

Configuration of QM/CAQ Options

Other

(with

comment)

Option 1168 – User fields to search for specification lists

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

X

X

Valid values

PAN / PPLMM / NO_SEARCH

Valid as of HYDRA-CAQ version

hymwcaq72.dll version 7.2.1.95

Subject to area

No

Description

If this option is active and includes a value, you can use the value to control which user fields

are used to search for specification lists: the user fields of the inspection requirement header

(PAN) or of the inspection plan characteristics (PPLMM).

The value "NO_SEARCH" has the effect that the user fields are not included in the search for

specification list entries.

In the standard or with a missing/disabled option, the user fields of the inspection requirement

header are used.

From Service Pack 13 onwards, an optional parameter

[UPPER_USERFIELD_NUMBER:<user field number>] is available.  Only use integral values

between 1 and 14 for this parameter <user field number>.  If this parameter is included, then

use only the fast user fields number 1 up to the here configured values for the search of spec-

ification list entries.

All other user fields following the configured values are available for other functions that not

involved in the specification search.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 64 of 95

Option 1169 – Automatically complete inspection steps even if

they are available with status interrupted at other machines

Configuration of QM/CAQ Options

Other

(with

comment)

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

X

X

Valid values

Y / N

Valid as of HYDRA-CAQ version

hymwcaq72.dll version 7.2.1.98

Subject to area

(Indirectly yes, as dependent on option 1014)

Description

If option 1169 is activated and option 1014 is set, inspection steps are automatically complet-

ed even if the inspection step in question has the status "interrupted" at another machine. But

this does not apply, if the inspection step is still logged on to a machine.

When the inspection step is completed, all entries are automatically set to "completed" for this

inspection step.

Option 1170 – Cpk value calculation for characteristics with a

one-sided limit or with zero as limit

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

X

X

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 65 of 95

Configuration of QM/CAQ Options

Valid values

0 / 1 / 2

Valid as of HYDRA-CAQ version

hymwcaq72.dll version 7.2.1.99

hymw.exe version 7.2.1.420

Not valid for CAQ 8.1.  Valid again as of CAQ 8.2

Subject to area

No

Description

Option 1170 enables calculating the statistical value cpk, also for unilateral limited character-

istics. A characteristic is unilaterally limited if either the upper or the lower tolerance limit has

no entry.

In case of characteristics with the value zero as limit, the calculation of the cpk value is

changed and the limit 'zero' is considered as a non-existing limit. I.e. the characteristic is con-

sidered as a characteristic with a one-sided limit.

You can use the defined value to calculate the cpk value for characteristics with a one-sided

limit or the limit 'zero'. The following two options are available:

Value = 1

The cpk value is only calculated for characteristics with a one-sided limit. A char-

acteristic has a one-sided limit, if either the upper or the lower tolerance limit has

no entry.

Value = 2

In case of characteristics with zero as limit (one limit is equal to zero and the oth-

er limit has a value unequal to empty or zero), the cpk value is calculated in the

same way as in case of characteristics with a one-sided limit.. Additionally, the

behavior of option 1 applies.

Default behavior in CAQ 8.x

Value = 0

No cpk value calculation for characteristics with a one-sided limit or the limit 'zero'

Configuration_QM_Options.docx

Version: 2.23.16920

Page 66 of 95

Configuration of QM/CAQ Options

Default behavior in CAQ 7.x

In case of characteristics with a one-sided limit or the limit 'zero' (is considered as non-existent),

one part of the cpk formula is omitted.

Option 1171 – Use PAN user fields to search for inspection plan

Other

(with

comment)

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Valid as of HYDRA-CAQ version

CAQ 8.1Subject to area

yes

Description

If this option is activated, the content of one or several direct user fields of the inspection re-

quirement is used to search for an inspection plan.

The contents of the direct user fields of the inspection requirement must then match the con-

tents of the direct user fields of the active inspection plan.

(See also Option 1)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 67 of 95

Option 1174 – Correcting decimal places of measured values be-

Configuration of QM/CAQ Options

Other

(with

comment)

fore upload to SAP

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Valid as of HYDRA-CAQ version

CAQ 8.1

You must create this option manually if required.

Subject to area

No

Description

If this option is activated, the measured value format of the characteristic is read out and the

measured value, which e.g. has been generated by a measuring device, is formatted accord-

ing to the measured value format.

This way, you can ensure that the number of decimal places of the uploaded measured value

matches the number expected by SAP.

This option only applies for uploads of single values of individual piece inspections to SAP (rec-

ord types Q51 to Q56).

Option 1175 – Plausibility check of the inspection scope when

completing a sample

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

Configuration_QM_Options.docx

Version: 2.23.16920

Page 68 of 95

Configuration of QM/CAQ Options

comment)

X

X

Valid values

 Y / N

Valid as of HYDRA-CAQ version

CAQ 7.2, if the patch

dbp_caq_aip_enhancement.hsc

has been run and hymwcaq72.dll includes a version which is either the same or higher than

7.2.1.107.

Subject to area

yes

Description

If this option is active, a plausibility check is performed on completing the sample. The system

checks if at least the number of valid individual inspections is available that has been defined

using the identifier of the inspection scope and the specified sample size.

The plausibility check is used for the manual completion of the sample. This is only possible, if

the inspection has been performed with reference to the sample and not with reference to the

inspection point.

This option also activates the plausibility check of the inspection scope when samples are eval-

uated for non QMS data types.

The plausibility check of the target sample size is performed if the following conditions are ful-

filled:



Inspection scope indicator "GENAU" ("exact"):

The actual sample size does not exactly match the target sample size.



Inspection scope indicator "GROESSER" ("greater"):

The actual sample size is smaller than the target sample size.



Inspection scope indicator "KLEINER" ("smaller"):

The actual sample size is greater than the target sample size.

If the inspection scope indicator is "EGAL" ("irrelevant") or empty, no plausibility check is per-

Configuration_QM_Options.docx

Version: 2.23.16920

Page 69 of 95

formed. And if the target sample size is smaller than 1.

Configuration of QM/CAQ Options

Option 1176 – Default values for additional characteristic fields

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Valid as of HYDRA-CAQ version

CAQ 8.1

Other

(with

comment)

The following scripts implement the function of this option. The scripts must be available in

the relevant target system:

  b_cmm#aip#.hsc

  b_cpplmm#aip#.hsc

  b_cmm#aip#.hsc

  util_caq_scr.hsc

As of version 8.1.1.176 (service pack 10) of the program hymwcaq72.dll/so, this option is al-

so used when new inspection step characteristics are created.

Subject to area

yes

Description

If this option is activated, the fields defined in the addition can be populated using the respec-

tive values if the values are not provided by the corresponding dialog data string.

This option has an impact on the defined fields when you add or edit entries in the following

areas:

Configuration_QM_Options.docx

Version: 2.23.16920

Page 70 of 95

Configuration of QM/CAQ Options

  Characteristics catalog



Inspection plan characteristics



Inspection step characteristics

If this option is disabled or not available, the fixed values used for the AIP operation are not

populated.

If this option is active (value = Y), it is only effective in combination with the following individual

parameters in the respective context:



[PRFUMF:<inspection scope indicator for all characteristics>]



[PRFUMF_A:<Inspection scope indicator for attributive characteristics>]

 overrules the global entry [PRFUMF:<value>] if it exists



[PRFUMF_V:<inspection scope indicator for variable characteristics>]

 overrules the global entry [PRFUMF:<value>] if it exists



[PRFUMF_F:<inspection scope indicator for inspection chart characteristics>]

 overrules the global entry [PRFUMF:<value>] if it exists



[ERFART:<input type for all characteristics>]



[ERFART_A:<input type for all attributive characteristics>]

 overrules the global entry [ERFART:<value>] if it exists



[ERFART_V:<input type for variable characteristics>]

 overrules the global entry [ERFART:<value>] if it exists



[ERFART_F:<input type for all inspection chart characteristics>]

 overrules the global entry [ERFART:<value>] if it exists



[ERFART_PZ: :<Collection type for sampling characteristics>]

 overrules the global entry [ERFART:<value>] if it exists



[ERFART_V_FORMEL:<Input type for variable characteristics with individual cal-

culation>]

 only available as of CAQ 8.2

 overrules the global value [ERFART_V:<value>] if it exists

Configuration_QM_Options.docx

Version: 2.23.16920

Page 71 of 95

Configuration of QM/CAQ Options

 overrules the global entry [ERFART:<value>] if it exists



[ERFART_A_CODE:<Input type for attributive characteristics with catalog evalua-

tion without random selection>]

 only available as of CAQ 8.2

 overrules the global value [ERFART_A:<value>] if it exists

 overrules the global value [ERFART:<value>] if it exists



[ERFART_A_CODE_ZUFALL:<Input type for attributive characteristics with cata-

log evaluation and random selection>]

 only available as of CAQ 8.2

 overrules the global value [ERFART_A:<value>] if it exists

 overrules the global value [ERFART:<value>] if it exists



[ERFART_F_RASTER:<Input type for inspection chart characteristics with visual

inspection>]

 only available as of CAQ 8.2

 overrules the global value [ERFART_F:<value>] if it exists

 overrules the global entry [ERFART:<value>] if it exists

For the characteristics catalog, it is always the global option that is used.

It is possible to configure other parameters for specific data types and/or areas using options

that are specific to an area (subject to area).

The AIP default configuration includes the following parameter values:



[PRFUMF:KLEINER]

To record data based on samples:



[ERFART_A:BEWERT_STICHPR_PPUNKT_SIMPLE]



[ERFART_V:MESSW_ESTCK_PPUNKT_SIMPLE]



[ERFART_F:BEWERT_STICHPR_PPUNKT_FSK]



[ERFART_V_FORMEL:MESSW_ESTCK_STICHPR_CALC] (as of CAQ 8.2)

To record data based on inspection points:

Configuration_QM_Options.docx

Version: 2.23.16920

Page 72 of 95

Configuration of QM/CAQ Options



[ERFART_A:BEWERT_STICHPR_PPUNKT_SIMPLE]



[ERFART_V:MESSW_ESTCK_PPUNKT_SIMPLE]



[ERFART_F:BEWERT_STICHPR_PPUNKT_FSK]



[ERFART_PZ:PROBENZUG_PPUNKT_SIMPLE] or

[ERFART_PZ:PROBENZUG_PPUNKT_ERWEITERT] (as of CAQ 8.2)









[ERFART_A_CODE:CODE_STICHPR_PPUNKT_SIMPLE] (as of CAQ 8.2)

[ERFART_A_CODE_ZUFALL:CODE_STICHPR_PPUNKT_ZUF_SIMPLE] (as of CAQ 8.2)

[ERFART_F_RASTER:BEWERT_STICHPR_PPUNKT_RASTER] (as of CAQ 8.2)

[ERFART_V_FORMEL:MESSW_ESTCK_PPUNKT_CALC] (as of CAQ 8.2)

In addition to the parameters that you can configure here, other parameters are populated with

fixed values in the scripts. But other fixed values are not filled in, if new inspection step charac-

teristics are created that are based on an inspection plan characteristic.

To edit the characteristics catalog, the system always uses the global settings. To edit the in-

spection plan and inspection step characteristics, the system uses the settings that are specific

to an area.

For the data type QMS, a data type specific and disabled option must be available in order not

to influence the QMS standard processing (explicit exceptions are possible).

In the AIP, the inspection scope indicators for characteristics that are recorded with reference to

cavities are not used.

Option 1177 – Default values for inspection point parameters in

the inspection step

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 73 of 95

Configuration of QM/CAQ Options

Valid values

 Y / N

Valid as of HYDRA-CAQ version

CAQ 8.1

The option is implemented in the following scripts which must be available when activating

the option in the relevant target system:

  b_cpau#aip#.hsc

  util_caq_scr.hsc

Subject to area

yes

Description

If this option is active, the fields defined in the addition can be populated using the respective

values if the values are not provided during the generation of the inspection step.

This option is only effective with the defined fields if inspection steps are added (via inspec-

tion plan search, interface or manually).

If this option is disabled or not available, the fixed values used for the AIP operation are not

populated.

For  the  AIP  with  MW  3.0,  a  change  of  the  option  is  only  effective  if  a  new  inspection  point  is

generated.

The following entry in the configuration file "qee_insppoint.ini" in the AIP sub folder "functions" is

required to display the checkpoint user fields.

[CONFIGURATION]

SHOW_OPTIONAL_USERFIELDS=ON

If this option is active (value = Y), it is only effective in combination with the following individual

parameters in the respective context:

Configuration_QM_Options.docx

Version: 2.23.16920

Page 74 of 95

Configuration of QM/CAQ Options



[RELEVANT:<Flag inspection point relevant [0 or 1]  Default: 1>]



[BEW_REL:<Flag inspection point relevant for evaluation [0 or 1]  Default: 0>]



[KATART:<Catalog type for inspection point usage decisions>

 Default QM_PP_BEW]



[WERK:<site for inspection point usage decisions> Default 0001]



[AUSWMEN:<Selected set for inspection point usage decisions>

 Default PPKT_VE]



[CODGR_A:<code group for inspection point usage decision acceptance

 Default 01>]



[CODE_A:<code for inspection point usage decision acceptance

 Default A>]



[CODGR_A:<code group for inspection point usage decision rejection

 Default 01>]



[CODE_A:<code for inspection point usage decision rejection

 Default R>]



[PRB_REL:<Flag physical sample relevant [0 to 99]  Default: 0>]



[PRB_LAB:<Label for physical sample> Default: Probe>]



[TPL_REL:<Flag for functional location relevant [0 to 99]  Default: 0>]



[TPL_LAB:<Label for functional location>]



[EQU_REL:<Flag for equipment relevant [0 to 99]  Default: 0>]

Important:

If a data collection with reference to cavities is available (database patch

dbp_qm_cavities_insppoint_charact_variable.hsc), this flag is automatically ac-

tivated irrespective of the settings made here if the corresponding inspection

requirement is configured to collect cavities (unequal to KEINE (none), <zero>).



[EQU_LAB:<Label for Equipment>]

Configuration_QM_Options.docx

Version: 2.23.16920

Page 75 of 95

Configuration of QM/CAQ Options



[UC1_REL:<Flag for USERC1 relevant [0 to 99]  Default: 0>]



[UC1_LAB:<Label for USERC1>]



[UC2_REL:<Flag for USERC2 relevant [0 to 99]  Default: 0>]



[UC2_LAB:<Label for USERC2>]



[UN1_REL:<Flag for USERN1 relevant [0 to 99]  Default: 0>]



[UN1_LAB:<Label for USERN1>]



[UN2_REL:<Flag for USERN2 relevant [0 to 99]  Default: 0>]



[UN2_LAB:>Label forUSERN2>]



[UD1_REL:<Flag for USERD1 relevant [0 to 99]  Default: 0>]



[UD1_LAB:<Label for USERD1>]



[UT1_REL:<Flag for USERT1 relevant [0 to 99]  Default: 0>]



[UT1_LAB:<Label for USERT1>]



[TLOS_PFL:<Flag for partial lot requirement [0 or 1]  Default: 0>]



[CNR_PFL:<Flag for batch requirement [0 or 1]  Default: 0>]



[MEN_PFL:<Flag for input requirement of quantities [0 or 1]  Default: 0>]

In addition to the parameters that you can configure here, other parameters that are relevant for

the inspection point are populated with fixed values in the script b_cpau#aip#.hsc.

For the data type QMS, a data type specific and disabled option should be available in order not

to influence the QMS standard processing (explicit exceptions are possible).

The AIP default configuration includes the following parameter values:



[RELEVANT:1]

Configuration_QM_Options.docx

Version: 2.23.16920

Page 76 of 95

Configuration of QM/CAQ Options



[BEW_REL:0]



[KATART:QM_PP_BEW]



[WERK:0001]



[AUSWMEN:PPKT_VE]



[CODGR_A:01]



[CODE_A:A]



[CODGR_R:01]



[CODE_R:R]



[UC1_REL:99]



[UC1_LAB:Charge]



[UD1_REL:1]



[UD1_LAB:date]



[UT1_REL:2]



[UT1_LAB:time]



[PRB_LAB:sample]

Explanation of the "_REL" levels:

  0 => Field not active

  99  => field is active but there is no mandatory inspection,  i.e.  when  you complete the

inspection point, it is not checked if this field includes a content.

  1 to 98 => field is active. When you complete the inspection point, it is checked if this

field includes a content. The field with the lowest number is checked first.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 77 of 95

Configuration of QM/CAQ Options

Option 1190 – Table and index space alias for PDV single value

Other

(with

comment)

reloads

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

Name of an existing tablespace

Valid as of HYDRA PDV version

hp_insert.exe version 7.2.1.10    (19-May-2011)

Subject to area

No

Description

If this option is available, the value of this option is used to identify the table and index space

where the tables of the reloaded PDV single values should be created.

You use the alias used here (also called DB group name) to identify the actual names of the

table and index spaces via the HYDRA default mechanisms.

If this option does not exist or if it is disabled, then the table and index space alias

PDV2_DBS is used to import PDV single values.

Option 1192 – Transfer of article information during generation of

orders and operations using the ADE integration

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

Other

(with

Configuration_QM_Options.docx

Version: 2.23.16920

Page 78 of 95

Configuration of QM/CAQ Options

comment)

(server)

(server)

X

X

Valid values

 Y / N

Valid as of HYDRA-CAQ version

CAQ 7.2 if the following conditions are fulfilled:

  as of hymwcaq72.dll

version: 7.2.1.114             (MW20/MW21)

  as of hymwcaq72.dll

version: 7.2.1.112             (MW30)

Subject to area

yes

Description

If option 1192 is active and contains the value Y, then the following fields are added from the

inspection requirement fields when generating ADE orders and operations.

  Article number

  Drawing issue number (if the field is available)

  Article name (from article master data)

These  fields  are  recorded  in  the  order  and  in  the  operation  when  you  create  the  order  or  the

operation.

Changed field contents are not synchronized later on.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 79 of 95

Configuration of QM/CAQ Options

Option 1196 – Display of histogram for samples with n=1

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

X

X

Valid values

 Y / N

Subject to area

No

Description

Other

(with

comment)

If this option 1196 is active and contains the value Y, then the existing list of the histogram is

extended for (valid) samples with sample size 1. This is carried out using a union statement

where characteristics of the inspection type "V" are checked. Additionally, the status

(type=ERFASSART) must contain in the addition "[BAPI:CPAUSP]".

The calculation is based on XQ of the sample.

Option 1208 – MPL QM integration: Generating inspection points

for MPL output batches

You must not activate this option. Currently, only the dialog "CA_WL" provides the function to create an

inspection  point  in case of an output batch change. This does not require  a specific configuration of an

option.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 80 of 95

Configuration of QM/CAQ Options

Option 1209 – MPL-QM integration: Storage of detailed infor-

mation of batches in inspection points

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

X

Valid values

 Y / N

Valid as of

CAQ 8.1: The patch “dbp_caq_mpl_integration.hsc   (MW30)” must have been executed.

The option and the attached function is initially available in the standard as of CAQ 8.2.

Subject to area

yes

Description

If this option is active (value=Y), the information detailing the current batch is stored in de-

fined fields of the inspection point.

If a batch is created in the functions described in option 1208, then the 'respective batch

number' derives from the triggering MPL functions.

In all other cases where the batch number is unknown, the current batch number is identified

at the point in time of the generation of the inspection point.

It is the point in time when the inspection point is actually generated in HYDRA (in the serv-

er). To identify the corresponding batch, only the information can be used which is known to

the HYDRA server at that point in time.

There are exceptions where this batch information cannot match the current batch. See the

following examples:

  There is no current output batch and therefore no batch can be referenced.

  A delayed generation of an inspection point after an output batch change can lead to

a  "wrong"  assignment  of  an  output  batch  number.  If  inspection  events  are  due,

Configuration_QM_Options.docx

Version: 2.23.16920

Page 81 of 95

Configuration of QM/CAQ Options

which are generated via scheduling (this is the case with inspection points generated

via  the  events  'time',  'piece',  'once'  ),  the  inspection  point  can  possibly  obtain  a

'wrong' output batch number. Instead of using the batch that is available at the point

in time of the actual event, the system assigns the batch that is available at the point

in time of the inspection point generation.

The identified batch number is stored in the new field "caq_numpool.losnr". This field is used

to control which batch is affected by any actions when an inspection point is completed.

Using the individual functions described below, you can store additional batch information in

other fields of the inspection point.

[PPKT_TLOS:<Reference to batch information>]

This parameter identifies which additional batch information is edited as a partial batch of

the corresponding inspection point (field caq_numpool.ppkt_teillos). The information is

therefore available to the user as an identification criterion (contrary to the field hidden in

the interface "caq_numpool.losnr").

Please note that this field is only used when generating an inspection point. A later

change of the batch information does not cause a change of the partial batch in the in-

spection point.

For <Reference to batch information> the following values are available:

Internal batch number


  Batch number
  ERP batch (former PPS charge)
  MES batch number
  Batch information
  Alternative batch number 1 to 20

DLL

CNR

SAPNR

EXTCNR
BEM

CNR:ALT1 - CNR:ALT20

To  create  this  option,  you  must  only  use  the  before  mentioned  patch,  as  only  that  patch  can

enable/guarantee the required DB structures.

If you activate this option, the option 1207 must also be active (created using the before men-

tioned DB patch). As of CAQ 8.2, the option 1207 is created and immediately activated by de-

fault.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 82 of 95

Configuration of QM/CAQ Options

Example

If the option with the addition described below is activated, the batch number of the respec-

tive batch (that is possibly identified at that moment) is added for the inspection point when

the inspection point is generated in the field "Partial batch".

[PPKT_TLOS:DLL]

Option 1210 – MPL-QM integration: Changing batch data upon

completion of the corresponding inspection point

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

X

Valid values

 Y / N

Valid as of

CAQ 8.1: The patch “dbp_caq_mpl_integration.hsc   (MW30)” must have been executed.

The option and the attached function is initially available in the standard as of CAQ 8.2.

Subject to area

yes

Description

If this option is active (value=Y), specific parameters of a batch, which has been assigned to

an inspection point, can automatically be changed upon completion of the respective inspec-

tion point.

You can vary the list of parameters that you want to change and their contents according to

the usage decision of the inspection point (pass/fail).

The respective batch is exclusively identified using the new field "caq_numpool.losnr".

Details of the control are specified using the below mentioned individual function buttons in

the addition of the option.



[ABS_IO_DLG:<Parameter list to edit batch data>]

Configuration_QM_Options.docx

Version: 2.23.16920

Page 83 of 95

Configuration of QM/CAQ Options

The parameters specified here are only assigned if the inspection points include the us-

age decision "Pass" upon completion. The parameter list can include 1 to n parameters.

These are separated using a tilde ~. All parameters can be selected which are known to

the dialog CNR.UPDATE.



[ABS_NIO_DLG:<Parameter list to edit batch data>]

The parameters specified here are only assigned if the inspection points include the us-

age decision "Fail" upon completion. The parameter list can include 1 to n parameters.

These are separated using a tilde ~. All parameters can be selected which are known to

the dialog CNR.UPDATE.



[ABS_IO_SPERRE]

If this option is set, it is prevented that the parameters described in

[ABS_IO_DLG:<parameter list to edit batch data>] are changed if the quality status of

the batch is S (blocked).

The functionality of this option cannot be applied to throughput batches.

To  create  this  option,  you  must  only  use  the  before  mentioned  patch,  as  only  that  patch  can

enable/guarantee the required DB structures.

If you activate this option, the option 1207 must also be active (created using the before men-

tioned DB patch). As of CAQ 8.2, the option 1207 is  created and immediately activated by de-

fault.

All parameters can be used that are available in dialog "CNR.UPDATE". For details on this dia-

log, please refer to the PDM documentation.

Example

If this option is activated with the addition described below, the quality status of the batch is

set to "Free" and the comment "OK" is stored in the batch when an inspection point is com-

pleted with the usage decision "Pass".

If you complete an inspection point with the usage decision "Fail", the quality status of the

batch is set to "Blocked" and the comment "Not OK" is stored in the batch.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 84 of 95

Configuration of QM/CAQ Options

[ABS_IO_DLG:CNR.QST=F~CNR.BEM=OK];

[ABS_NIO_DLG:CNR.QST=S~CNR.BEM=nicht OK]

Option 1214 – AIP CAQ 'lean' data processing

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

Other

(with

comment)

X

Valid values

 Y / N

Valid as of HYDRA-CAQ version

caq_dc_t.dll >= 2.0.2.36

caq72.dll >= 2.0.2.28

mpdv-aip.zip >= 15-FEB-2015

Subject to area

No

Description

If this option is enabled, you can use specific entries in the field "Addition" to achieve a "lean"

processing and therefore a quicker collection of inspection data in the AIP CAQ terminal.

The following entries in the field "Addition" can control this:

-  [SKIP_RK]

-  [SLIM_DATA]

Configuration_QM_Options.docx

Version: 2.23.16920

Page 85 of 95

Configuration of QM/CAQ Options

-  [SKIP_AET]

The different entries do not depend on each other and can be combined in any way.

Separate the entries by commas in the field "Addition".

If you use QMS (quality management as subsystem), you must disable this option or you must

extend

the  default

filters  by

the  specific  QMS

fields

in

the  AIP  configuration

file

"caq_slim_data.ini" in the folder .\packets\.

[SKIP_RK]

Processing and display of control charts are disabled in the input dialog of inspec-

tion results for the following input types.

-

-

-

-

BEWERT_STICHPR_PPUNKT_SIMPLE

BEWERT_STICHPR_SIMPLE

MESSW_ESTCK_PPUNKT_SIMPLE

MESSW_ESTCK_STICHPR_SIMPLE

If you only want to disable processing and display of control charts for specific input types, use

the respective status of the status type "ERFASSART". If you remove the parameter "[RK]“, you

disable the control chart function for this input type. For further details, please refer to the status

documentation "Configuration_QM_Status".

[SLIM_DATA]

Data filters are added to reduce the data volume when requesting the dialogs to

record inspection results. This accelerates processing.

You can change the default filters in the AIP configuration file "caq_slim_data.ini“ within

the folder .\packets\.  If  you  have changed the file, store the file in the custom directory  in

the server.

For further configuration details, please refer to the documentation "Configuration_AIP-QM".

Configuration_QM_Options.docx

Version: 2.23.16920

Page 86 of 95

Configuration of QM/CAQ Options

[SKIP_AET]

Processing and display of the lists of automatic failures are disabled for specific

input dialogs of inspection results.

The following input types support processing of automatic failure lists:

-

-

-

-

BEWERT_STICHPR_PPUNKT_SIMPLE

BEWERT_STICHPR_SIMPLE

MESSW_ESTCK_PPUNKT_SIMPLE

MESSW_ESTCK_STICHPR_SIMPLE

For further configuration details, please refer to the documentation "Configuration_AIP-QM".

The use of automatic failure lists is NOT available in combination with DS100.

Because of this incompatibility of the DS100 and the list of automatic failures, you must set the

flag SKIP_AET for the respective system.

Option 1215 – Not resetting the inspection scope of sampling

characteristics

System availability

MW 3.0

MW 2.1

AIP

CTWIN

MOC

(server)

(server)

Other

(with

comment)

X

Valid values

 Y / N

Valid as of

CAQ 8.1: The patch“ dbp_caq_sample_insppoint_enhanced.hsc

 (MW30)” must have

been executed.

The option and the attached function is initially available in the standard as of CAQ 8.2.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 87 of 95

Configuration of QM/CAQ Options

Subject to area

yes

Description

If this option is active (value = Y), the inspection scopes of sampling characteristics are not

reset when you release an inspection step.

To  create  this  option,  you  must  only  use  the  mentioned  patch.  Requirement:  The  respective

programs must be up-to-date (as of CAQ 82).

Option 1218 – Display of unit designations in the AIP inspection

process

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

Other

(with

comment)

X

x

Valid values

 Y / N

Valid as of

The function is available as of service pack 11 for CAQ 8.1 and higher and for the program

versions AIP 8.1 and higher.

Subject to area

No

Description

You must create this option manually if required.

If this option is created with the value "Y", the unit designation is displayed in the AIP inspec-

tion process instead of the 3 digits of the unit ID number. Depending on the length of the unit

Configuration_QM_Options.docx

Version: 2.23.16920

Page 88 of 95

Configuration of QM/CAQ Options

designation, you must change the AIP dialogs that show the unit and adapt the field length to

display the unit designation.

If the option 1218 does not exist, if it is disabled or if the value is "N", the ID number of the

unit is displayed.

Option 1219 - Checking existing complaints during OP logon

System availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

(server)

(server)

Other

(with

comment)

X

x

Valid values

 Y / N

Valid as of

The function is available as of service pack 13 for CAQ 8.1 and higher and for the AIP 8.1

and higher.

Subject to area

No

Description

You must create this option manually if required.

When creating this option with the value "Y", the configuration parameters in the Addition field

in the OP logon are checked for existing complaints for the article or article + drawing issue

number of the production order (order header). If complaints are found, then they are dis-

played in a message.

Example:

internal complaint: 1

customer complaint: 2

If option 1219 is not available or the option is enabled, then the system does not check exist-

ing complaints during OP logon.

The following entries in the field Addition control the check:

Configuration_QM_Options.docx

Version: 2.23.16920

Page 89 of 95

Configuration of QM/CAQ Options

-

[MON:n]

n= The system checks all complaints that were created n months ago or later (required

parameters).

-

 [ATKIDX:Y]

You must specify this parameter[ATKIDX:Y] (optional) if you want to check the combina-

tion article number with drawing issue number instead of only the article number.

-

[MSGTIME:n]

n = n is the number of seconds after which the message is automatically closed on the

AIP (optional; default value: 30 seconds).

Example configuration in the field Addition:

-

-

[MON:6],[AKTIDX:Y],[MSGTIME:15]

Looking at complaints dating back the last 6 months for the combination "article number"

and "drawing issue number". The message is displayed on the AIP for up to 15 seconds.

You define in the respective status of the complaint types, results and statuses which com-

plaints you want to include in the check, i.e. which "Complaint types", "Results" (complaint

header and complaint detail) and "Statuses" (complaint header and complaint detail). For fur-

ther details, please refer to the status documentation.

Add the parameter"[AGAN]" to the respective statuses in the CAQ status application in the

field "Addition" if you want to include complaints of this type with this result (complaint header

and detail) and status (complaint header and detail).

Relevant complaint types must be identified with the parameter  „[AGAN]“. If no active entries

with the parameter"[AGAN]" have been found for a complaint status, complaint results, com-

plaint detail status and/or complaint results, then all entries in the context are considered "rel-

evant".

The current implementation requires that the article number and the drawing issue no. of the

order header are transferred directly in the dialog of the operation logon using the acronyms

"ANR.ATK" and "ANR.ATKIDX". If this is not feasible for certain application cases, then you

have to extend the dialog by these acronyms.

Option 1220 – Escalations with more than 1024 characters

System availability

MW

MW 2.1

AIP

CTWIN

Console

MOC

3.0/3.1

(server)

(server)

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 90 of 95

Configuration of QM/CAQ Options

X

Valid values

 Y / N

Valid as of

The function is available as of service pack 13 for CAQ 8.1 and higher.

Subject to area

No

Description

You must create this option manually if required.

If you create this option with the value "Y", then you can configure the following escalation

events with more than 1024 characters.

  CPAUERR.INSERTED (create a failure)

  CPANUMP.COMPLETED (completion of inspection point)

If this option is not available, enabled or has the value "N", then the above mentioned esca-

lation evants are restricted to 1024 characters.

If you enable this option, the escalation events are processed slower.

Option 1221 – Stop the completion of an inspection if the manda-

tory inspection was not fulfilled on the AIP

System availability

MW

MW 2.1

AIP

CTWIN

Console

MOC

3.0/3.1

(server)

(server)

X

Valid values

 Y / N

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 91 of 95

Configuration of QM/CAQ Options

Valid as of

The function is available as of service pack 13 for CAQ 8.1 and higher.

Subject to area

yes

Description

You must create this option manually if required.

If you create this option with the value "Y", then the inspection point including characteristics

that have a pending mandatory inspection, are not completed on the AIP.  You can complete

the inspection point on the MOC, even with an activated option of "Posting required".

If you do not create the option, or the option is inactive or has the value "N", you can also

close an inspection point on the AIP with "Posting required", depending on the configuration.

Option 1222 – Last off inspection

System availability

MW

MW 2.1

AIP

CTWIN

Console

MOC

3.0/3.1

(server)

(server)

X

Valid values

 Y / N

Valid as of

Other

(with

comment)

This function is available with the function extension of the in-production inspection (licensed

via FEP-AQF).

Subject to area

yes

Description

You must create this option manually if required.

If you create this option with the value "Y", you can use the characteristic user field specified

in field Addition to define if the relevant characteristic is included in a last off inspection. Spec-

ify the user field in field Addition as follows:

Configuration_QM_Options.docx

Version: 2.23.16920

Page 92 of 95

Configuration of QM/CAQ Options

[FU:1] for user field "FU:1".

[FU:2] for user field "FU:2".

etc.

The user fields [FU:1] to [FU:10] are available.

The user must manually create the relevant user field for the characteristic master data (ob-

ject type CMM, user field key SYSTEM) , the inspection plan characteristics (object type

CPPLMM and e.g. user field key FEP for the in-production inspection) and the inspection step

characteristics (object type CPAUMM and e.g. user field key FEP for the in-production in-

spection).

The user must define in field Addition which events trigger a last off inspection. The following

events (configuration parameters) are available:

  order logoff ([AG_AB])

  order interruption ([AG_UN])

Sample configuration in field Addition to trigger a last off inspection at operation logoff and in-

terruption. The relevant characteristics are identified in the numeric user field 6:

[FU:6],[AG_AB],[AG_UN]

If this option is not created, inactive or has the value "N", then the function of the last off in-

spection is not available.

To identify the characteristic as relevant for the last off inspection, enter a value unequal

empty and unequal "N" if you use alphanumeric user fields [FU:1] to [FU:5]. If you use numer-

ic user fields [FU:6] to [FU:10], enter a value greater than 0.

Option 1223 – Setup inspection

System availability

MW

MW 2.1

AIP

CTWIN

Console

MOC

3.0/3.1

(server)

(server)

X

Valid values

 Y / N

Other

(with

comment)

Configuration_QM_Options.docx

Version: 2.23.16920

Page 93 of 95

Configuration of QM/CAQ Options

Valid as of

This function is available with the installation of the CAQ 8.2 add-ons (licensed via FEP-

AQF).

Subject to area

No

Description

You must create this option manually if required.

If you create this option with the value "Y", the measured values and attributive inspection re-

sults specified in the inspection point decision entered in field Addition are set to invalid when

an inspection point is completed with this inspection point decision. Define the inspection

point decision for a setup inspection as follows:

[WERK:W],[AUSWM:X],[CODEGRP:Y],[CODE:Z]

  W = content of field "Site" of the inspection point decision defined in the MOC

X = content of field "Selected set" of the inspection point decision defined in the MOC

Y = content of field "Code group" of the inspection point decision defined in the MOC

Z = content of field "Code" of the inspection point decision defined in the MOC

Note: The inspection point decisions are defined in the MOC master data catalog "Catalog"

with catalog type "Usage decision for inspection points".

If this option is not created, inactive or has the value "N", then the function of the setup in-

spection is not available. For inspection points of data type "QMS", the functionality of the op-

tion is not available.

You cannot use the function of the setup inspection, if a logging function or signature check is

active when measured values are changed.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 94 of 95

Configuration of QM/CAQ Options

4  Customer-specific options

Options with a number greater or equivalent to 100.000 are identified as customer-specific options.

These options can be used to enable  or disable  CAQ functions  at specific sites of template customers.

These options are not available via configuration; the options are only available within the scope of a (ex-

tended) customization.

Configuration_QM_Options.docx

Version: 2.23.16920

Page 95 of 95


Manual

Inspection Planning based on
CAD/FMEA
EIS-CFM 8.1

Version 1.0.16616

Last changed on: 06.08.2020

Inspection Planning based on CAD/FMEA

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EIS-CFM_81.docx

Version: 1.0.22690

Page 2 of 14

Inspection Planning based on CAD/FMEA

Contents

1

Interface for Characteristics CAD/FMEA ..................................................... 4

2

Inspection plan ImportCAD/FMEA - Konfiguration ....................................... 6

EIS-CFM_81.docx

Version: 1.0.22690

Page 3 of 14

Inspection Planning based on CAD/FMEA

1

Interface for Characteristics CAD/FMEA

Purpose

You use this product to create inspection plan characteristics using a data file and different configuration

files. The data file is created using a CAD drawing or a HYDRA-FMEA.

Implementation notes

To import inspection plan characteristics, you require the configuration files. Using the configuration files,

you can assign data of inspection plan characteristics that is not included in a data file. You use conditions

to flexibly assign the data of inspection plan characteristics.

To  create  inspection  plan  characteristics  on  the  MOC,  you  additionally  require  the  license  FEP-PCF  or

WEP-PCF.

Integration

This product is a complementary component of the HYDRA inspection planning. Using the product "FMEA-

PPL", you can import inspection plan characteristics that have been exported from HYDRA-FMEA.

Features

The following functions are available:

  You  can  create  any  number  of  configuration  files  (XML)  to  map  different  import  scenarios.

Depending on the scenario, different fields of the inspection plan characteristics are pre-populated.

  You can define the fields of inspection plan characteristics if the data of these fields is not included

in the CAD drawing or HYDRA-FMEA, but you want to specify a default value for these fields.

  You can automatically generate the OP sequence number.

  You  can  transfer  data  of  inspection  plan  characteristics  based  on  a  data  file  with  a  specified

structure. You can process different file types.

  You can add inspection plan characteristics to an existing inspection plan using a specific import

configuration.

  You assign the "column" of the data file to a field of the inspection plan characteristic.

  You make rules/specifications to transform column contents of the CAD data file into the format

required  in  HYDRA.  This  way,  you  can  transfer  the  previously  exported  characteristic  type

"variable" into the format required in HYDRA: "V".

  You can define conditions for the assignment of characteristic data. If you define a condition, the

system assigns the control chart XQ with variable characteristics and the p-chart with attributive

characteristics, for example.

EIS-CFM_81.docx

Version: 1.0.22690

Page 4 of 14

Inspection Planning based on CAD/FMEA

EIS-CFM_81.docx

Version: 1.0.22690

Page 5 of 14

Inspection Planning based on CAD/FMEA

2

Inspection plan ImportCAD/FMEA - Konfiguration

Purpose

You need to have a configuration file to import inspection plan characteristics based on a CAD drawing or

for HYDRA FMEA.  The configuration file specifies which data of the data file to be imported is transferred

to a specific HYDRA field.

If required, the user can also create their own configuration file.

Following, we outline the functions of a configuration file.

General

The structure of a data file is the same as in a CSV file.  The data file is made up from one or more header

followed by a data row.  Each data row contains exactly one data record.  Each data row is the equivalent

to the characteristic to be imported. The individual fields of the data file are separated by a separator.  A

CSV file is separated by a semicolon.  In the configuration file for the data import the separator of the data

file can be specified. You can define both the separator and the field delimiter character in the configuration

file.

If the separator is part of the characteristic data to be imported, enclose the entire field contents with a field

delimiter character. If the field delimiter character is part of the characteristic data to be imported, enclose

the entire field contents using the field delimiter character. In addition, double the field delimiter character

located in the user data.

The following is an example of a data file with a header line, a data line, 2 columns, the separator semicolon,

and the field delimiter "double quotation marks" (").

column1; column2;

Value 1;"value containing semicolon; still the same value";

Please note/restrictions:

The  import  process  does  not  support  thousands  separators  for  numbers.  But  you  can  use  a  decimal

separator a decimal point or a decimal comma.  Make sure the decimal separator is not identical to the field

delimiter.

The system supports the date values and time stamps in the following format:

yyyy-MM-ddTHH:mm:ss\[.SSS\] (Example: 2018-12-30T13:17:42).

EIS-CFM_81.docx

Version: 1.0.22690

Page 6 of 14

Inspection Planning based on CAD/FMEA

The system supports currently only local date values/time stamps in the time zone of the HYDRA WSP

service.

The import process interprets a field made up from two field delimiters as a NULL value.  The import process

also  interprets  two  consecutive  separators  in  a  line  as  a  NULL  value.  Therefore,  you  cannot  create  an

empty string in the data file. If necessary, you can use a configuration file to convert a NULL value into an

empty string.

Structure of a controller configuration file

The  configuration  file  is  a  JSON  file  and  must  contain  a  value  JSON.    The  configuration  file  has  the

FileEncoding UTF-8.

Following, we will explain the basic structure of a configuration file with an example:

{
  "Version": "1.0",
  "Settings": {
    "FileType": "CSV",
    "File": {
      "StartRow": 4,
      "ColumnSeparator": ";",
      "QuotingChar": "\"",
      "FileEncoding": "Cp1252"
    }    }
  },
  "Services": [
    {
      "Name": "InspectionPlanCharacteristic.insert",
      "Parameters": [
        {
       "Name": "inspectionplancharacteristic.op",
        "DataType": "INTEGER",
        "FileColumnNumber": 1
         }
      ],
      "ObjectIdComplexExpression": "Service DummyService.insert called with %sample.acronym%"
    }    }
  ]
}

The characteristic "Version" and "File type" have fixed values.

The characteristic "StartRow" specifies, that the first 3 rows of the data file are header lines and the 4. row

contains the first data record.

The characteristic "ColumnSeparator" specifies the separator on a double quotation mark.

The characteristic "QuotingChar" specifies the field delimiter.

The characteristic "FileEncoding" specifies that the FileEncoding to ANSI (Code page Windows 1252).

You can look up valid values at the following web address:

https://docs.oracle.com/javase/8/docs/api/java/nio/charset/Charset.html

The characteristic "Services" contains the list of all services that the system is supposed to call per data

record  of  the  data  file.    In  this  example  the  service  "InspectionPlanCharacteristic.insert“is  used.      This

service enables you to create inspection plan characteristics.

EIS-CFM_81.docx

Version: 1.0.22690

Page 7 of 14

Inspection Planning based on CAD/FMEA

The characteristic "Parameter" contains the list of all service parameter.  Here, the parameter contains the

acronym "inspectionplancharacteristic.op". The acronym "inspectionplancharacteristic.op" contains the OP

sequence  number  of  the  inspection  plan  characteristic.  The  following  examples  describe  how  you  can

identify the acronyms for the individual fields of the inspection plan characteristics.

The  characteristic  "DataType"  specifies  the  data  type.    Possible  value  are  "ALPHA_NUMERIC",

"INTEGER" and "DECIMAL". In the above example, the data type is "INTEGER", since the OP sequence

number is a numeric value without decimal places.

In  the  example,  the  characteristics  "FileColumnNumber"  specifies  that  the  value  for  the  parameter

"inspectionplancharacteristic.op" is determined from the first column of the data file when the inspection

plan characteristics are imported.

The characteristic „ObjectIdComplexExpression" specifies that the system writes the following text in the

log file for each „InspectionPlanCharacteristic.insert" service call:

"Service InspectionPlanCharacteristic.insert called with %inspectionplancharacteristic.op%".

The spaceholder "%inspectionplancharacteristic.op%" is replaced by the acronym

"inspectionplancharacteristic.op".  In addition to the text from "ObjectIdComplexExpression", the log file

also contains the status "SUCCESS" or the error that occurred during the service call of

"InspectionPlanCharacteristic.insert".

If several parameters are defined in the configuration file, the parameter must be terminated with "},". The

last parameter is completed with the final curly bracket (without comma). The end of the parameter definition

is completed with "]".

To import inspection plan characteristics, the following parameters must always be specified as follows:
      "Parameters": [
        {
          "Name": "rectype.id",
          "DataType": "ALPHA_NUMERIC",
          "InitialDataKey": "rectype.id"
        },
        {
          "Name": "area.id",
          "DataType": "ALPHA_NUMERIC",
          "InitialDataKey": "area.id"
        },
        {
          "Name": "inspectionplan.id",
          "DataType": "ALPHA_NUMERIC",
          "InitialDataKey": "inspectionplan.id"
        },
        {
          "Name": "inspectionplan.index",
          "DataType": "ALPHA_NUMERIC",
          "InitialDataKey": "inspectionplan.index"
        },

The acronyms of the "InitialDataKey" are identified during the import process from the previously marked

inspection plan header.

There  are  two  other  „InitialDataKey“acronyms  to  automatically  identity  and  assign  the  OP  sequence

number.

EIS-CFM_81.docx

Version: 1.0.22690

Page 8 of 14

Inspection Planning based on CAD/FMEA

        {
          "Name": "$tmp_var$.startCharacteristicOp",
          "DataType": "INTEGER",
          "InitialDataKey": "startCharacteristicOp"
        },
        {
          "Name": "$tmp_var$.currentCounter",
          "DataType": "INTEGER",
          "InitialDataKey": "currentCounter"
        },

The parameter has „startCharacteristicOp“as a fixed value.  The "currentCounter" parameter corresponds

to the respective data record row of the characteristic to be created in the CSV data file. The first

characteristic has the value "1", the second characteristic the value "2", etc.

If you want to assign a fixed parameter, then you need the following parameter definition:

        {
          "Name": "qmcharacteristic.inspection_mandatory_flag",
          "DataType": "ALPHA_NUMERIC",
          "Value": "TRUE"
        },
        {
          "Name": "qmcharacteristic.sampling_scheme",
          "DataType": "ALPHA_NUMERIC",
          "Value": "NC"
        },
        {
          "Name": "qmcharacteristic.sample_size",
          "DataType": "INTEGER",
          "Value": "5"
           },

In the above example, the mandatory test flag is activated, the sampling scheme "n-c" and the sample size

"5" are assigned. If the assigned values are based on a status entry, then the ID of the status entry must

be assigned as the value.

If  the  OP  sequence  number  of  the  inspection  plan  characteristic  is  automatically  generated,  then  the

following parameter definition is required:

        {
          "Name": "$tmp_var$.startCharacteristicOp",
          "DataType": "INTEGER",
          "InitialDataKey": "startCharacteristicOp"
        },
        {
          "Name": "$tmp_var$.currentCounter",
          "DataType": "INTEGER",
          "InitialDataKey": "currentCounter"
        },
        {
          "Name": "inspectionplancharacteristic.op",
          "DataType": "INTEGER",
          "FormulaValue": "$tmp_var$.startCharacteristicOp + $tmp_var$.currentCounter * 10",
        },

The above example generates an OP sequence number in steps of 10.

EIS-CFM_81.docx

Version: 1.0.22690

Page 9 of 14

Inspection Planning based on CAD/FMEA

If  you  use a "Dependency" configuration,  you can  assign fixed values to characteristic contents using  a

condition. To do so, define a temporary variable first of all.  The following example shows a configuration

to  assign  the  characteristic  type  as  "variable".    The  data  file  to  be  imported  has  a  defined  value  as  the

characteristic type in column "9".  In HYDRA, however, the value "V" must be assigned to the inspection

plan characteristic. In this case, you have to define a temporary variable for the content to be included to

column "9".  You then specify that the characteristic type "V" is assigned if the temporary variable contains

the content "Variable". If the condition "does not equal" is used, "!==" instead of "==".

        {
          "Name": "$tmp_var$.inspection.type",
          "DataType": "ALPHA_NUMERIC",
          "FileColumnNumber": 9
        },
        {
          "Name": "qmcharacteristic.inspection_type.id",
          "DataType": "ALPHA_NUMERIC",
          "Value": "V",
          "Dependency": "$tmp_var$.inspection.type == \"Variable\""
        },

The definition of a condition that is never fulfilled enables to deactivate a parameter definition.

Acronym to import inspection plan characteristics

Open the application "Webservice Data Logging" with the transaction code "syswslog" to specify which

acronym corresponds to an inspection plan characteristic field. The recording must be started in the

application. Then you have to assign a characteristic to the inspection plan.  For this characteristic, you

have to assign a value for all fields.  Then you have to complete the recording in the application

„Webservice Data-Logging“. Check the entry in the list which has content

„InspectionCharacteristic.insert“in the"Service" column.  Click on the button "Show details".  Pay special

attention to the entries with the ending ".param" in the column "Key". You can see the value in the "Value"

column of the inspection of the plan characteristic field.

The required acronym corresponds to the entry in the column "Key" without the ending ".param".

The following tables gives you an overview on the existing acronyms to import inspection plan

characteristics.  The list does not claim to be complete.

area.id

article.designation

article.drawing_number

article.id

article.index

dynamic_modification_standard.aql_value

dynamic_modification_standard.designation

dynamic_modification_standard.id

dynamic_modification_standard.inspection_level.id

EIS-CFM_81.docx

Version: 1.0.22690

Page 10 of 14

Inspection Planning based on CAD/FMEA

dynamic_modification_standard.method.id

fit.id

fit_norm.id

inspectionplan.id

inspectionplan.index

inspectionplancharacteristic.detail_source.id

inspectionplancharacteristic.inspectionplace.id

inspectionplancharacteristic.no_cavity

inspectionplancharacteristic.operation.designation

inspectionplancharacteristic.operation.id

inspectionplancharacteristic.op

inspectionplancharacteristic.qmcharacteristic.machine.group_id

inspectionplancharacteristic.qmcharacteristic.machine_id

inspectionplancharacteristic.qmcharacteristic.machine_planned

inspectionplancharacteristic.sample_group

inspectionplancharacteristic.sampling

inspectionplancharacteristic.specification_source.id

qmanalysisset.id

qmcharacteristic.acceptancequantity

qmcharacteristic.capture_function

qmcharacteristic.capture_param4

qmcharacteristic.capture_param5

qmcharacteristic.capture_percentage

qmcharacteristic.capture_quantity

qmcharacteristic.capture_time_interval

qmcharacteristic.certificates_printing.id

qmcharacteristic.chart1.calculate_action_limit_flag

qmcharacteristic.chart1.calculate_warning_limit_flag

qmcharacteristic.chart1.calculation_action_limit

qmcharacteristic.chart1.calculation_distribution

qmcharacteristic.chart1.calculation_type

qmcharacteristic.chart1.calculation_warning_limit

qmcharacteristic.chart1.chart_id

qmcharacteristic.chart1.limits_preset_base

qmcharacteristic.chart1.lower_action_limit_active_flag

qmcharacteristic.chart1.lower_action_limit

qmcharacteristic.chart1.lower_warning_limit_active_flag

qmcharacteristic.chart1.lower_warning_limit

qmcharacteristic.chart1.meanvalue

qmcharacteristic.chart1.preset_cpk

EIS-CFM_81.docx

Version: 1.0.22690

Page 11 of 14

Inspection Planning based on CAD/FMEA

qmcharacteristic.chart1.preset_mean

qmcharacteristic.chart1.preset_relative_action_limit

qmcharacteristic.chart1.preset_relative_warning_limit

qmcharacteristic.chart1.preset_sigma

qmcharacteristic.chart1.preset_xbar_value

qmcharacteristic.chart1.trend_active_flag

qmcharacteristic.chart1.upper_action_limit_active_flag

qmcharacteristic.chart1.upper_action_limit

qmcharacteristic.chart1.upper_warning_limit_active_flag

qmcharacteristic.chart1.upper_warning_limit

qmcharacteristic.chart2.calculate_action_limit_flag

qmcharacteristic.chart2.calculate_warning_limit_flag

qmcharacteristic.chart2.calculation_action_limit

qmcharacteristic.chart2.calculation_distribution

qmcharacteristic.chart2.calculation_type

qmcharacteristic.chart2.calculation_warning_limit

qmcharacteristic.chart2.chart_id

qmcharacteristic.chart2.limits_preset_base

qmcharacteristic.chart2.lower_action_limit_active_flag

qmcharacteristic.chart2.lower_action_limit

qmcharacteristic.chart2.lower_warning_limit_active_flag

qmcharacteristic.chart2.lower_warning_limit

qmcharacteristic.chart2.meanvalue

qmcharacteristic.chart2.preset_cpk

qmcharacteristic.chart2.preset_mean

qmcharacteristic.chart2.preset_relative_action_limit

qmcharacteristic.chart2.preset_relative_warning_limit

qmcharacteristic.chart2.preset_sigma

qmcharacteristic.chart2.preset_xbar_value

qmcharacteristic.chart2.trend_active_flag

qmcharacteristic.chart2.upper_action_limit_active_flag

qmcharacteristic.chart2.upper_action_limit

qmcharacteristic.chart2.upper_warning_limit_active_flag

qmcharacteristic.chart2.upper_warning_limit

qmcharacteristic.computation_formula_flag

qmcharacteristic.computation_formula

qmcharacteristic.decimal_places

qmcharacteristic.defect_weight

qmcharacteristic.designation

qmcharacteristic.do_inspect_flag

EIS-CFM_81.docx

Version: 1.0.22690

Page 12 of 14

Inspection Planning based on CAD/FMEA

qmcharacteristic.dynamic_modification_type

qmcharacteristic.dynamic_sampling_flag

qmcharacteristic.emu_assignment

qmcharacteristic.emu_characteristic_copy

qmcharacteristic.external_influence

qmcharacteristic.fit_used

qmcharacteristic.gage.family.designation

qmcharacteristic.gage.family.id

qmcharacteristic.gage.id

qmcharacteristic.gage_mode.id

qmcharacteristic.id

qmcharacteristic.incidental_specification_of_parts

qmcharacteristic.initial_inspection_severity.designation

qmcharacteristic.initial_inspection_severity.id

qmcharacteristic.inspection_mandatory_flag

qmcharacteristic.inspection_sequence

qmcharacteristic.inspection_type.id

qmcharacteristic.inspectionresult_base.id

qmcharacteristic.interval_type

qmcharacteristic.interval_unit

qmcharacteristic.interval_value

qmcharacteristic.issuequantity

qmcharacteristic.lower_plausibility_limit_relative

qmcharacteristic.lower_plausibility_limit

qmcharacteristic.lower_process_action_limit_formula

qmcharacteristic.lower_tolerance_limit_active_flag

qmcharacteristic.lower_tolerance_limit_formula

qmcharacteristic.lower_tolerance_limit_relative

qmcharacteristic.lower_tolerance_limit

qmcharacteristic.machine_source_status

qmcharacteristic.machine_status_change_flag

qmcharacteristic.measure_type.id

qmcharacteristic.numberofsamples

qmcharacteristic.only_formula_flag

qmcharacteristic.output_batch_change_flag

qmcharacteristic.recording_detail.id

qmcharacteristic.sample_size

qmcharacteristic.sampling_scheme

qmcharacteristic.shift_change_flag

qmcharacteristic.sigma_process

EIS-CFM_81.docx

Version: 1.0.22690

Page 13 of 14

Inspection Planning based on CAD/FMEA

qmcharacteristic.target_value_formula

qmcharacteristic.target_value

qmcharacteristic.upper_plausibility_limit_relative

qmcharacteristic.upper_plausibility_limit

qmcharacteristic.upper_process_action_limit_formula

qmcharacteristic.upper_tolerance_limit_active_flag

qmcharacteristic.upper_tolerance_limit_formula

qmcharacteristic.upper_tolerance_limit_relative

qmcharacteristic.upper_tolerance_limit

qmcharacteristic.userfield01

qmcharacteristic.visualization_flag

qmcharacteristic.visualization_function

qmcharacteristic.visualization_param4

qmcharacteristic.visualization_param5

qmcharacteristic.visualization_percentage

qmcharacteristic.visualization_position

qmcharacteristic.visualization_quantity

qmcharacteristic.visualization_time_interval

qmcharateristic.qmdocument.copy_from_masterdata

rectype.id

transitional_definition.designation

transitional_definition.id

unit.id

workplace.commentary

workplace.designation

workplace.id

select.colconf

select.aggfuncts

EIS-CFM_81.docx

Version: 1.0.22690

Page 14 of 14


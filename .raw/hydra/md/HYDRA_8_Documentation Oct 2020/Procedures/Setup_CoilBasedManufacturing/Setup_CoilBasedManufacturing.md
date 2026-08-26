Coil-based manufacturing: Configuration

1  Coil-based manufacturing: Configuration

Purpose

You use this documentation, if one or several of the following conditions are true for you.

  You use the product "MPL" for the processing of rolls (coils) in your production and you want to be

informed about the configuration options.

  You want to use the product "MPL" for the processing of rolls in your production.

  You  want  to  be  informed  about  the  possibilities  of  specific  functions  that  are  designed  for  a

production using rolls.

Requirements

If you want to use the functions of the coil-based manufacturing, you must make the configurations listed

in the following.

Procedure

Workplace and resource configuration

Configure the workplace that you want to use as follows:

  The workplace has the "workplace type" = S (cutting unit)

  The workplace is configured to use "Batch management" = L

  The workplace has a "Preceding material buffer" and a "Subsequent material buffer"

  The "Automatic generation of batch numbers for production batches (MPL)" is enabled using "J"

Operation configuration

Configure

the

operation

that

produces

the

order

as

follows:

 The operation has the option





"Batch management requirement" = active and

"Cutting OP" = T or M

Setup_CoilBasedManufacturing.docx

Version: 1.0.14325

Page 1 of 3

Coil-based manufacturing: Configuration

If the operation is a mother operation, the option "Branch OP = M" is set for the operation and the field

"Mother OP" includes an own MES order number.

If the operation is a child operation, the option "Branch OP = K" is set for the operation and the field "Mother

OP" includes the MES order number of the respective mother operation.

The option "Cutting OP" is either set to "M – Standard numbering" or to "T – Numbering of daughter rolls".

You should only set the option "Cutting OP" = "T – Numbering of daughter rolls" after careful

analysis. The batch numbers, which are created if the option "T – Numbering of daughter rolls" is

set, contain the batch number of the input batch + suffix consisting of "-" and a consecutive

number of 4 digits. This can have the effect that the batch numbers created are longer than the

batch number length specified in the basic settings.

Alternative quantity units

A material that is supplied on coils and is available as lengths often has more than one quantity unit. But a

batch has only one quantity unit. If you want to integrate further quantity units, you can use "Activity" 1 to 6

("Activity" = batch with further quantity unit). Therefore use "Activity" 1 to 6 to save other quantity units for

a batch, if required. The "Activities" are configured via customization.

Sample configuration

Scenario 1

1 order with 3 operations, 1 mother operation and 2 child operations. A cut produces 3 output batches. It is

planned to perform 10 output batch changes with this order. The input width of the roll is 1000 cm. The

output widths of the operations are as follows:

  Mother operation: 300 cm

  Child operation 1: 200 cm

  Child operation 2: 500 cm

Result of scenario 1

Setup_CoilBasedManufacturing.docx

Version: 1.0.14325

Page 2 of 3

Coil-based manufacturing: Configuration

Mother operation

Child operation 1

Child operation 2

100042

100042

100042

0010

30

1000

300

0

0020

30

1000

200

0

0030

30

1000

500

0

Tab

Field

General

Order

General

OP

Number of rolls

Input width

Output width

Seam width

CBM

CBM

CBM

CBM

CBM

CBM

CBM

CBM

CBM

CBM

CBM

CBM

Surface per piece

300000

200000

500000

Mass per unit area

Casing weight

Cutting OP

Branch OP

Mother OP

1250

200

M

M

1250

200

M

K

1250

200

M

K

1000420010

1000420010

1000420010

Daughter rolls/cut

Daughter rolls/cut, total

1

3

1

3

1

3

Data transfer via interface

Specific segments are used to transfer the required data via interface. The segments are the following:

Message type

Segment

HY72PPS

ZPPORDER

HY72_AG_RF_001_A

Z2AG_RF000X000

Setup_CoilBasedManufacturing.docx

Version: 1.0.14325

Page 3 of 3


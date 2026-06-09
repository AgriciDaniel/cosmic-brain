Unit Conversion

1  Unit Conversion

Overview

HYDRA menu

System administration  System settings  Unit conversion

FEDRA menu

System administration  System settings  Unit conversion

Transaction code

unic

Function authorization  mdunic

Purpose

You use this function to convert quantity units in the system.

Integration

You can use the unit conversion function to convert from one unit to another unit.

If  a  new  conversion  rule  is  created  that  is  not  based  on  a  defined  formula,  then  when  a

conversion from unit A   unit B is set up, the system automatically also creates a conversion

from unit B   unit A.

Changing  a  conversion  rule  for  unit  A    unit  B  will  have  no  effect  on  the  existing  conversion

rule for unit B   unit A.

Requirements

The units that you would like to convert must exist in the system (create it, for example, using the function

"unit").

Customizations are documented in the customer-specific documentation (CID).

Field descriptions

From unit

Initial unit from which the conversion should be performed

MOC_UnitConversion.docx

Version: 1.4.23371

Page 1 of 3

Unit Conversion

To unit

Target unit to which the conversion should be performed

Material

Material number if the conversion rule is material related.

Material type

Material type if the conversion rule is material type related.

Conversion factor

A button that allows a conversion to be made using conversion factors that are also defined in the

dialog. In this case the formula is as follows:

Counters

Numerator in the conversion fraction

Denominator

Denominator in the conversion fraction

Exponent

Exponent in the conversion factor

Offset

Additive offset

Formula (check box)

A button that allows the conversion to be made using a stored formula.

Formula

A formula definition as an alternative to numerator/ denominator/ exponent/ offset:

This is a formula in the formula context "Quantity conversion" ("Formula management" application)

Rounding

N

U

T

R

Do not round

Round up

Round down (trunc)

Arithmetic rounding (round)

Rounding precision

Rounding to the specified decimal places

MOC_UnitConversion.docx

Version: 1.4.23371

Page 2 of 3

OffsetatorDenoNumeratoryExponent10*min

Conversion

Unit Conversion

MOC_UnitConversion.docx

Version: 1.4.23371

Page 3 of 3


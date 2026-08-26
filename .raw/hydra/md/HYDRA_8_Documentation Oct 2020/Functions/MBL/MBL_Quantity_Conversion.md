Using Quantity Units

1  Using Quantity Units

General

You can manage quantities in the system using the following quantity units:

Base quantity unit

The base quantity unit is an objective description of the material used in an order. Using the base

quantity unit, you can compare scrap of different operations, for example. It is therefore the header

unit of the order.

Primary quantity unit

The primary quantity unit is the quantity unit used to record quantities. It can deviate from the base

quantity unit.

The data collection is  generally  performed in  the  primary  quantity  unit.  Every  time data is posted,

the  quantity  is  converted  into  the  secondary  quantity  unit  or  tertiary  quantity  unit,  if  defined

accordingly. To convert the data, the system uses the conversion factors stored for the operation or

a formula stored in the system.

When  you  transfer  components  for  an  operation,  the  input  quantity  refers  to  the  production  of  an

article in primary quantity unit.

Secondary quantity unit

The secondary quantity unit is an alternative quantity unit used with material on coils, for example.

Tertiary quantity unit

Further alternative quantity unit, like the secondary quantity unit.

Usage in the backlog of orders

Proceed as follows to convert two quantity units:

If conversion factors (numerator and denominator each > 0) are defined for the operation, these factors

are  used.  Otherwise,  the  system  searches  a  formula  for  these  two  quantity  units  in  the  formula

management.  If  a  formula  is  found,  the  system  uses  the  formula  to  convert  the  quantity  units.  If  no

formula  is  found  and  the  quantity  units  are  identical,  the  system  uses  the  quantity  of  the  "from  quantity

unit"  one-to-one  as  "to  quantity  unit".  If  no  formula  is  found  and  the  quantity  units  are  not  identical,  the

value of the "to quantity unit" is set to 0.

If the target quantities of an operation are converted, the system always converts all quantities. Here, the

system  uses  the  quantity  (quantity  unit)  that  the  user  has  changed  or  that  has  been  transferred  via

interface. If the quantities of different quantity units are changed, the system converts the quantities using

the following priority – if conversion factors or a formula are available:

MBL_Quantity_Conversion.docx

Version: 1.4.16506

Page 1 of 5

Using Quantity Units

1.

2.

3.

Primary quantity: conversion into secondary quantity and tertiary quantity

Secondary quantity: conversion into primary quantity and tertiary quantity

Tertiary quantity: conversion into primary quantity and secondary quantity

The  base  quantity  unit  is  generally  used  for  conversions  between  primary,  secondary  and  tertiary

quantities.

To  specify  the  conversion  factors  (numerator,  denominator)  for  the  primary,  secondary  and

tertiary quantity of an operation, always define the conversion INTO the base quantity unit.

𝑏𝑎𝑠𝑒 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 = 𝑝𝑟𝑖𝑚𝑎𝑟𝑦 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 ∗

𝑛𝑢𝑚𝑒𝑟𝑎𝑡𝑜𝑟𝑝𝑟𝑖𝑚𝑎𝑟𝑦 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦
𝑑𝑒𝑛𝑜𝑚𝑖𝑛𝑎𝑡𝑜𝑟𝑝𝑟𝑖𝑚𝑎𝑟𝑦 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦

𝑏𝑎𝑠𝑒 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 = 𝑠𝑒𝑐𝑜𝑛𝑑𝑎𝑟𝑦 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 ∗

𝑛𝑢𝑚𝑒𝑟𝑎𝑡𝑜𝑟𝑠𝑒𝑐𝑜𝑛𝑑𝑎𝑟𝑦 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦
𝑑𝑒𝑛𝑜𝑚𝑖𝑛𝑎𝑡𝑜𝑟𝑠𝑒𝑐𝑜𝑛𝑑𝑎𝑟𝑦 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦

𝑏𝑎𝑠𝑒 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 = 𝑡𝑒𝑟𝑡𝑖𝑎𝑟𝑦 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 ∗

𝑛𝑢𝑚𝑒𝑟𝑎𝑡𝑜𝑟𝑡𝑒𝑟𝑡𝑖𝑎𝑟𝑦 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦
𝑑𝑒𝑛𝑜𝑚𝑖𝑛𝑎𝑡𝑜𝑟𝑡𝑒𝑟𝑡𝑖𝑎𝑟𝑦 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦

If no base quantity is specified, a conversion cannot be performed.

Usage with data collection and posting

Data  collection  can  generally  be  performed  using  all  4  quantity  units.  But  to  identify  the  quantities,  the

system  does  not  use  the  unit,  but  the  acronym  entered  in  the  terminal  dialog.  With  automatic  quantity

recording (e.g. data collection via CT-UMPS), data is always recorded in the primary quantity unit.

If  exactly  one  quantity  unit  is  used  for  data  collection,  data  is  first  converted  into  the  base  quantity  unit

and from the base quantity unit into the other quantity units.

If  data  is  recorded  in  more  than  one  quantity  unit,  the  first  unit  is  converted  based  on  the  following

sequence:

  Base quantity unit

  Primary input quantity unit

  Secondary input quantity unit

  Tertiary input quantity unit

Additionally recorded quantities in other quantity units are not recalculated but saved as recorded.

MBL_Quantity_Conversion.docx

Version: 1.4.16506

Page 2 of 5

Using Quantity Units

If  parallel  quantity  units  are  kept,  but  no  conversion  factors  are  specified,  then  these  quantity  units  are

calculated  based  on  the  material-specific  conversion  rules.  Data  is  converted  using  formulas  generally

referring to material properties (contents of user fields, such as the width or the relevant fields included in

the backlog of orders, e.g. partitioning).

Target quantity update: If you transfer the actual quantity to the subsequent OP, the system first converts

the  quantity  into  the  base  quantity  unit  within  the  forwarding  OP,  then  this  quantity  is  transferred  to  the

subsequent  operation  and  here  again  reconverted  into  the  primary  input  quantity  unit  or  the  alternative

quantity units.

A quantity 0 is generally not converted into alternative quantity units even if a value that is not 0

could be calculated (e.g. by means of a formula).

Usage in MPL

Alternative  quantity  units  can  be  recorded  with  coil-based  manufacturing,  if  you  make  a  respective

configuration for the operation.

Example:

  Base quantity unit m2

  Lengths are recorded as primary quantity unit

  Secondary quantity unit weight

  Tertiary quantity unit piece

Scrap quantities are managed in these 4 quantity units.

Example 1

You want to manage the quantities of an operation in the following quantity units:

  Base quantity unit: [M2] square meter

  Primary quantity unit: [PCS] piece

With 1 [PCS] = 2 [M2].

Conversion factors for base quantity

Primary quantity, numerator

Secondary quantity, numerator

Tertiary quantity, numerator

2

0

0

Primary quantity, denominator

1

Secondary quantity, denominator  0

Tertiary quantity, denominator

0

MBL_Quantity_Conversion.docx

Version: 1.4.16506

Page 3 of 5

Example 2

You want to manage the quantities of an operation in the following quantity units:

Using Quantity Units

  Base quantity unit: [CM] centimeter

  Primary quantity unit: [PCS] piece

  Secondary quantity unit: [KAR] box/carton

  Tertiary quantity unit: [PAL] pallet

With:

  1 [PCS] = 0,5 [CM]

  1 [KAR] =  100 [PCS] = 50 [CM]

  1 [PAL] = 20 [KAR] = 2000 [PCS] = 1000 [CM]

Conversion factors for base quantity

Primary quantity, numerator

1

Primary quantity, denominator

2

Secondary quantity, numerator

50

Secondary quantity, denominator  1

Tertiary quantity, numerator

1000

Tertiary quantity, denominator

1

Example 3

You want to manage the quantities of an operation in the following quantity units:

  Base quantity unit: [M2] square meter

  Primary quantity unit: [M] meter

  Secondary quantity unit: [KG] kilogram

  Tertiary quantity unit: [PCS] piece

With:

  1 [M] = 2,5 [M2]

  1 [KG] =  4,5 [M] = 11,25 [M2]

  1 [PCS] = 0,5 [KG] = 2,25 [M] = 5,625 [M2]

Conversion factors for base quantity

Primary quantity, numerator

Secondary quantity, numerator

Tertiary quantity, numerator

5

45

45

Primary quantity, denominator

2

Secondary quantity, denominator  4

Tertiary quantity, denominator

8

MBL_Quantity_Conversion.docx

Version: 1.4.16506

Page 4 of 5

Using Quantity Units

Example 4

You want to manage the quantities of an operation in the following quantity units:

  Primary quantity unit: [ST] piece

  Secondary quantity unit: [KAR] box/carton

With:

  1 [KAR] = 240 [ST]

The system always uses the base quantity unit for the conversion from one quantity unit (e.g.

primary quantity unit) into another quantity unit (e.g. secondary quantity unit). For this reason,

you MUST store a unit in the order header.

Conversion factors for base quantity

Primary quantity, numerator

1

Primary quantity, denominator

1

Secondary quantity, numerator

240

Secondary quantity, denominator  1

Tertiary quantity, numerator

0

Tertiary quantity, denominator

0

MBL_Quantity_Conversion.docx

Version: 1.4.16506

Page 5 of 5


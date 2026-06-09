 Range of Coverage Analysis and Material Availability

1  Range of Coverage Analysis and Material Availability

Overview

Menu

Material  management    Inventory  management    Estimation  of  range  of
coverage

Transaction code

roc

Function authorization

roc

Usage

This  function  analyzes  the  range  of  coverage  of  the  material  transferred  between  two  consecutive

production levels (preceding level and subsequent level).

For generating the list, materials are considered which are



currently produced in the preceding level

  used as components in the subsequent level

For each material, the number of supplying as well as retrieving machines is now indicated. By means of

option buttons, only the supplying or only the consuming machines can be considered.

The following criteria are relevant for the range of coverage:

  The consuming OPs and their target cycle result in a demand per unit of time.

  The supplying OPs and their target cycle result in a demand increase per unit of time.

The current stock of material buffers to be analyzed is considered as initial stock. In this regard, batches

currently logged on to consuming machines are also considered.

Integration

For the purpose  of analyzing material coverage ranges and/or material availability, so-called production

levels are defined. In this process, various machines as well as material buffers from where the machines

of a specific production level may retrieve material are allocated to a specific production level.

In  addition,  the  supply  relationship  between  production  levels  is  shaped.  A  production  level  may  have

several  subsequent  and/or  preceding  levels.  In  this  supply  relationship,  a  minimum  coverage  range  is

defined.

MOC_RangeOfCoverage.docx

Version: 1.0.1

Page 1 of 4

 Range of Coverage Analysis and Material Availability

The range of coverage computation is requested for a production level considered as consuming in this

context. With regard to the analysis, all supply levels/production levels assigned to this level as preceding

levels are then considered. If these, in turn, are supply levels to other levels, the latter are also included

for the purpose of a holistic analysis.

Prerequisite

The production levels and supply relationships must exist in the system.

Selection criteria

Production levels

The range of coverage computation is requested for a production level considered as retrieving in

this context. With regard to the analysis, all supply levels/production levels assigned to this level as

preceding levels are then considered. If these, in turn, are supply levels to other levels, these other,

retrieving production levels are also included for the purpose of a holistic analysis.

Incl. materials (currently) only supplied/produced

This  option  allows  for  extending  the  analysis  to  also  include  materials  which  are  currently  only

supplied and/or only produced.

Display

The range of coverage is shown in hours in the screen. For a cyclical display, the data are updated every

180 seconds. The following data are displayed:

Material

The material corresponds to the materials in the component list in producing operations and to the

article ID in supplying operations, respectively.

Material designation

Material designation

Number of retrieving machines (total)

Machines within the supply relationships of the current production level and with currently running

operations using this material.

In production

Machines within the supply relationships of the current production level and with currently running

operations using this material and operating in the Production status.

Number of supplying machines (total)

Machines within the supply relationships of the  current production level and with currently running

operations producing this material.

MOC_RangeOfCoverage.docx

Version: 1.0.1

Page 2 of 4

 Range of Coverage Analysis and Material Availability

In production

Machines within the supply relationships of the current production level and with currently running

operations producing this material and operating in the Production status.

Range of coverage

The range of coverage in [HH:MM:SS] is computed as follows:

In the first step for each operation and material component, the quantity per hour is computed. The

basis for this is the target cycle entered for the operation (= speed at which the article is produced),

as well as the input quantity of the included material components.

Since an article may be processed at different target cycle times in different orders/operations, the

individual values are added up.

The basis for computing the range of coverage of a material is the remaining quantity entered in the

batch stock (with material number). The batches considered are those in the material buffers of the

immediately  preceding  level  (acc.  to  configuration).  Only  batches  in  the  F  (free)  and  L  (running)

status are considered.

The range of coverage [in hours] is determined from the ratio of the values described above:

- Remaining quantity acc. to batch stock

- Required quantity per hour.

For  materials  which  are  indicated  in  the  list  (because  they  are  currently  produced  on  a  supplying

machine), but which are not retrieved (because no retrieving order/operation is active), the range of

coverage is not computed.

For  materials  which  are  more  rapidly  produced  than  consumed,  the  range  of  coverage  is  also

infinite.

In these cases, the "infinite" symbol is displayed in the "Trend" column.

Trend

In addition, the trend of the range of coverage (change in comparison to previous state) is indicated

in front of each bar by an appropriate symbol.

- increasing

- decreasing

- unchanged

- infinite

∞







On the first data request, the "unchanged" symbol is displayed.

In  the  range  of  coverage  analysis,  the

  function  can  be  used  to  switch  to  the  "Stock  overview"  in

order to display the stock overview of the previously selected material there.

MOC_RangeOfCoverage.docx

Version: 1.0.1

Page 3 of 4

 Range of Coverage Analysis and Material Availability

Each of the materials (batches) and material components must be defined in the same quantity

unit; there is no internal quantity conversion.

MOC_RangeOfCoverage.docx

Version: 1.0.1

Page 4 of 4


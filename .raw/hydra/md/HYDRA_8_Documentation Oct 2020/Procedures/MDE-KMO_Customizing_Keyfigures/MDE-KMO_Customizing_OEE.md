Configuration of OEE Key Figures
1 Configuration of OEE Key Figures
Purpose
This document describes the configuration options for customer-specific modifications of the Overall
Equipment Effectiveness (OEE) and the respective KPIs:
 OEE
 Availability
 Performance
 Quality
 Net Equipment Effectiveness (NEE)
 Planned operating time
 Machine runtime
 Yield utilization
 Actual utilization
If you want to copy a formula from this document into the formula management using copy and
paste, you must make sure that the formula does not include line breaks (CRLF). For this
purpose, copy the formula into a text editor and remove the included line breaks before copying
the formula into the formula management.
Requirements
The calculation of these key figures is based on the MDE log records. The key figures are included e.g. in
the MOC application OEE report.
Changes of the calculation rules are performed within Formula management or in the INI configuration.
They must be documented in the CID (Customer Implementation Documentation).
1.1 OEE Calculation
The Overall Equipment Effectiveness (OEE) is calculated as follows:
OEE = Performance x Availability x Quality
OEE is calculated as described below if no formula is defined for OEE within formula management:
oee = (rpa11 / (rpa1+rpa2+rpa3+rpa4+rpa5+rpa6+rpa7+rpa8+rpa9+rpa10+rpa11)) * (yield.primary /
(yield.primary + scrap.primary + rework.primary + problem.primary)) * performance_rate
Technical standard formula to calculate OEE to be defined within Formula management:
 Formula: oee
MDE-KMO_Customizing_OEE.docx Version: 1.4.18468 Page 1 of 11

Configuration of OEE Key Figures
 Type: 5
 Calculation: (rpa11 / (rpa1+rpa2+rpa3+rpa4+rpa5+rpa6+rpa7+rpa8+rpa9+rpa10+rpa11)) *
(yield.primary / (yield.primary + scrap.primary + rework.primary + problem.primary)) *
performance_rate
If you want to change one component of the OEE calculation (that deviates from the standard
formula), you must insert the complete formula for calculating OEE within formula
management.
The OEE configuration must not include a formula name of any other key figure (e.g. avail,
pf_rat, qual) in order to ensure a correct calculation. The only exception is the placeholder of
the performance_rate because of its complex calculation. It is always the defined performance
that is used here.
The formula name (oee) must be written in lower case letters.
1.2 Calculation of availability (productivity)
If formula management does not include a separate formula to calculate the key figure availability, the
"availability" will be determined as part of the standard OEE calculation as follows:
∑𝑅𝑃𝐴
11
𝐴𝑣𝑎𝑖𝑙𝑎𝑏𝑖𝑙𝑖𝑡𝑦 =
∑(𝑅𝑃𝐴 )
1−11
You can change the calculation rule for the availability in the configuration within Formula management.
The rule must be documented in the CID (Customer Implementation Documentation).
Technical standard formula to calculate the quality to be defined within HYDRA formula management:
 Formula: avail
 Type: 5
 Calculation: rpa11 / (rpa1+rpa2+rpa3+rpa4+rpa5+rpa6+rpa7+rpa8+rpa9+rpa10+rpa11)
If you have configured the formula avail within the formula management, you must also check
or configure the formulas of the OEE, NEE, Planned operating time, Machine run time, Yield
utilization and Actual utilization. The formula name (avail) must be written in lower case letters.
1.3 Calculation of performance (effectiveness)
You can change the calculation rule for the performance in the configuration within INI configuration or
Formula management. It is included in the CID (Customer Implementation Documentation).
MDE-KMO_Customizing_OEE.docx Version: 1.4.18468 Page 2 of 11

|     |     |     |     |     |     |     | Configuration of OEE Key Figures  |     |
| --- | --- | --- | --- | --- | --- | --- | --------------------------------- | --- |

| 1.3.1  | Standard as of MW 3.0  |     |     |     |     |     |     |     |
| ------ | ---------------------- | --- | --- | --- | --- | --- | --- | --- |
Version 1: Calculation based on recorded cycles
The performance is calculated based on the MDE log records. All data records collected during a
production status (RPA11) are used. For this purpose, performance is calculated for each MDE log record
in accordance with the formula
|              | T   | arget cycle  | T arget | cycle |     |     |     |     |
| ------------ | --- | ------------ | ------- | ----- | --- | --- | --- | --- |
| Performance |     |              |        |       |     |     |     |     |
|              |     | Actual cycle | RPA    |      |     |     |     |     |
|              |     |              |        | 11   |     |     |     |     |
|              |     |              |        |      |     |     |     |     |
cycles

The individual performance values are weighted in order to show a compressed view in evaluations. This
weighting is based on the production time (RPA11).
| Performance |         |  Performance*Duration |     |     |       |     |     |     |
| ----------- | ------- | ---------------------- | --- | --- | ----- | --- | --- | --- |
|             | Product |                        |     |     | RPA11 |     |     |     |
Performance
| Performance |     |     | Product   |     |     |     |     |     |
| ------------ | --- | --- | --------- | --- | --- | --- | --- | --- |
RPA
11
Example of a performance calculation based on six MDE log records:
| Machine  |     | RPA11 [sec]  |     | Performance  |     | Performance  |     |     |
| -------- | --- | ------------ | --- | ------------ | --- | ------------ | --- | --- |
(Product)
| 100    |     | 3600   |     |     |     | 0.7    |     | 2520   |
| ------ | --- | ------ | --- | --- | --- | ------ | --- | ------ |
| 100    |     | 2700   |     |     |     | 0.8    |     | 2160   |
| 100    |     | 1800   |     |     |     | 0.9    |     | 1620   |
| 100    |     | 2700   |     |     |     | 0.5    |     | 1350   |
| 100    |     | 7200   |     |     |     | 0.9    |     | 6480   |
| 100    |     | 1800   |     |     |     | 0.9    |     | 1620   |
| Total  |     | 19800  |     |     |     | 0.795  |     | 15750  |

Configuration in formula management
  The formula "pf_rat" must not exist in formula management.
Configuration in INI configuration
  No Ini configuration

MDE-KMO_Customizing_OEE.docx  Version: 1.4.18468  Page 3 of 11

|     |     |     |     | Configuration of OEE Key Figures  |
| --- | --- | --- | --- | --------------------------------- |

Version 2: Calculation based on calculated cycles
If you do not want to use the recorded cycles of the MDE (cycles might not be recorded at all) for the
calculation of the performance, you can use calculated cycles. In this case, you must configure as follows:
Configuration in formula management
  The formula "pf_rat" must not exist in formula management.
Configuration in INI configuration
| Name  |     |     | MDE  |     |
| ----- | --- | --- | ---- | --- |
Section
PERFORMANCE_RATE
| Key     |     |     | STROKE_REPLACEMENT  |     |
| ------- | --- | --- | ------------------- | --- |
| Value   |     |     | OFF                 |     |
| Active  |     |     |                    |     |

Version 3: Calculation based on recorded cycles and RPA 1-11
The performance is calculated based on the MDE log records. The following formula is used:
|              | Target cycle | Target cycle |     |     |
| ------------ | ------------ | ------------ | --- | --- |
| Performance |              |             |     |     |
|              | Actual cycle |  RPA        |    |     |
|              |              |   11      |    |     |
cycles
The individual performance values are weighted in order to show a compressed view in evaluations. This
weighting is based on the total time (RPA1-11).
| Performance |  Performance*Duration |     |     |     |
| ----------- | ---------------------- | --- | --- | --- |

|     | Product |     | RPA111 |     |
| --- | ------- | --- | ------- | --- |
Performance
Product
| Performance |     |     |     |     |
| ------------ | --- | --- | --- | --- |
RPA
111

MDE-KMO_Customizing_OEE.docx  Version: 1.4.18468  Page 4 of 11

|     |     |     | Configuration of OEE Key Figures  |
| --- | --- | --- | --------------------------------- |

Configuration in formula management
  The formula "pf_rat" must not exist in formula management.
Configuration in INI configuration
| Name     |     | MDE                |     |
| -------- | --- | ------------------ | --- |
| Section  |     | PERFORMANCE_RATE   |     |
| Key      |     | CONSIDER_BMK01_11  |     |
| Value    |     | ON                 |     |
| Active   |     |                   |     |

Version 4: Calculation based on calculated cycles and RPA 1-11
The performance is calculated based on the MDE log records. The following formula is used:
Targetcycle Actual cycle
Performance 

|     | Actual cycle  RPA  |     |     |
| --- | -------------------- | --- | --- |
 11 
 
Cycles
The individual performance values are weighted in order to show a compressed view in evaluations. This
weighting is based on the total time (RPA1-11).
| Performance |  Performance*Duration |         |     |
| ----------- | ---------------------- | ------- | --- |
|             | Product                | RPA111 |     |
Performance
Performance Product
RPA
111
Configuration in formula management
The formula "pf_rat" must not exist in formula management.
Configuration in INI configuration
Make the following two entries:
| Name     |     | MDE                 |     |
| -------- | --- | ------------------- | --- |
| Section  |     | PERFORMANCE_RATE    |     |
| Key      |     | STROKE_REPLACEMENT  |     |
| Value    |     | OFF                 |     |
| Active   |     |                    |     |

MDE-KMO_Customizing_OEE.docx  Version: 1.4.18468  Page 5 of 11

|     |     |     |     |     | Configuration of OEE Key Figures  |
| --- | --- | --- | --- | --- | --------------------------------- |

| Name     |     |     |     | MDE                |     |
| -------- | --- | --- | --- | ------------------ | --- |
| Section  |     |     |     | PERFORMANCE_RATE   |     |
| Key      |     |     |     | CONSIDER_BMK01_11  |     |
| Value    |     |     |     | ON                 |     |
| Active   |     |     |     |                   |     |

| 1.3.2  | Compatibility up to and including MW 2.0  |     |     |     |     |
| ------ | ----------------------------------------- | --- | --- | --- | --- |
Up  to  and  including  MW  2.0,  you  must  adjust  the  calculation  of  the  performance.  The  following
prerequisites are necessary. The formula must be as follows:
Required versions

|     |   Java domain DomSvcProductionReporting  |     |     | Version 1.1.STD.8977  |     |
| --- | ----------------------------------------- | --- | --- | --------------------- | --- |
  Client domains
|     | -  OeeReport            |     |     |   1.2.STD.20869   |     |
| --- | ----------------------- | --- | --- | ----------------- | --- |
|     | RPProductionReporting   |     |     | 1.2.STD.20870     |     |
Version 1: Old calculation based on recorded cycles
|              |          | (T  | arget  | cycle*RPA11 |     |
| ------------ | -------- | ----- | ------ | ------------ | --- |
|              |          |      |        |              |    |
|              |          |      |        |              |    |
|              | T arget  | cycle | RPA11 |              |     |
|              |          |      |        |              |    |
| Performance |          |      |        |              |     |
|              | RPA11 |       |      | RPA11       |     |
|              |         |      |       |             |     |
|              | Cycles |      |      |             |     |
Cycles
|     |    |    |    |    |     |
| --- | --- | --- | --- | --- | --- |
Configuration in formula management
  Formula: pf_rat
  Type: 5
  Calculation: cycle_target_weighted / cycle_actual_weighted
Configuration in INI configuration
| Name     |     |     |     | MDE                 |     |
| -------- | --- | --- | --- | ------------------- | --- |
| Section  |     |     |     | PERFORMANCE_RATE    |     |
| Key      |     |     |     | STROKE_REPLACEMENT  |     |
| Value    |     |     |     | OFF                 |     |
| Active   |     |     |     |                    |     |

MDE-KMO_Customizing_OEE.docx  Version: 1.4.18468  Page 6 of 11

|     |     |     |     |     | Configuration of OEE Key Figures  |
| --- | --- | --- | --- | --- | --------------------------------- |

If you have configured the formula pf_rat within formula management, you must also configure
the formula oee for the OEE! To do so, you must replace the text performance_rate in the OEE

formula with cycle_target_weighted / cycle_actual_weighted.
The formula name (pf_rat) must be written in lower case letters.
Version 2: Old calculation based on calculated cycles
|     |     | (Target |     | cycle*RPA11 |     |
| --- | --- | --------- | --- | ------------ | --- |
|     |     |          |     |              |    |
|     |     |          |     |              |    |
RPA11
|              | Target   | cycle  |     |        |    |
| ------------ | -------- | ------- | --- | ------ | --- |
| Performance |          |        |     |        |     |
|              | RPA11 |         |   | RPA11 |     |
|              |         |        |    |       |     |
|              | Cycles |        |   |       |     |
Cycles
|     |    |    |    |    |     |
| --- | --- | --- | --- | --- | --- |
Configuration in formula management
  Formula: pf_rat
  Type: 5
  Calculation: cycle_target_weighted / cycle_actual_weighted
Configuration in INI configuration
Ini entry: No Ini entry

If you have configured the formula pf_rat within formula management, you must also configure
the formula oee for the OEE! To do so, you must replace the text performance_rate in the OEE

formula with cycle_target_weighted / cycle_actual_weighted.
  You cannot weight different target cycle times. If you use this formula, it might happen that a
performance >1 is calculated for an evaluation on group level, whereas a performance <1 is
calculated for individual machines (which is then included in the evaluation).
The formula name (pf_rat) must be written in lower case letters.
| 1.3.3  | Non-standard calculation according to formula  |     |     |     |     |
| ------ | ---------------------------------------------- | --- | --- | --- | --- |
You can define calculation rules deviating from the standard using a customer-specific calculation. Please
note: The MOC applications do not provide guarantee for the calculation of totals.
Configuration in formula management
  Formula: pf_rat

MDE-KMO_Customizing_OEE.docx  Version: 1.4.18468  Page 7 of 11

|     |     |     |     |     | Configuration of OEE Key Figures  |
| --- | --- | --- | --- | --- | --------------------------------- |

  Type: 5
  Calculation: requested calculation defined in formula management
Configuration in INI configuration
  Ini entry: No Ini entry

If you have configured the formula pf_rat within formula management, you must also configure
the formula for the OEE, NEE and the formula for the Actual utilization. To do so, you must

replace the text performance_rate in the OEE formula with the formula of pf_rat.
The formula name (pf_rat) must be written in lower case letters.
The acronyms mentioned below are available. In the formula, use the acronym before "="; the acronym
behind "=" is the service acronym used in the calculation (e.g. in the OEE report).
rpa1=efficiencyreport.rpa1
rpa2=efficiencyreport.rpa2
rpa3=efficiencyreport.rpa3
rpa4=efficiencyreport.rpa4
rpa5=efficiencyreport.rpa5
rpa6=efficiencyreport.rpa6
rpa7=efficiencyreport.rpa7
rpa8=efficiencyreport.rpa8
rpa9=efficiencyreport.rpa9
rpa10=efficiencyreport.rpa10
rpa11=efficiencyreport.rpa11
rpa12=efficiencyreport.rpa12
yield.primary=efficiencyreport.yield.primary
scrap.primary=efficiencyreport.scrap.primary
rework.primary=efficiencyreport.rework.primary
problem.primary=efficiencyreport.problem.primary
cycle_actual_weighted=efficiencyreport.cycle_actual_weighted
cycle_target_weighted=efficiencyreport.cycle_target_weighted

The two values cycle_target_weighted and cycle_actual_weighted are specifically calculated acronyms:
|                          |     |  Target | cycle*RPA11 |   |     |
| ------------------------ | --- | ---------- | ----------- | --- | --- |
| cycle_target_weighted =  |     |           |             |    |     |
|                          |     |           |             |    |     |
RPA11
|     |     |    |     |    |     |
| --- | --- | --- | --- | --- | --- |
RPA11
|                          |     |         |    |     |     |
| ------------------------ | --- | -------- | --- | --- | --- |
| cycle_actual_weighted =  |     |          |     |     |     |
|                          |     | Cycles |    |     |     |
|                          |     |         |    |     |     |
As of the above-mentioned versions, the following values/acronyms are additionally available:
|                           |     |  Target | cycle*RPA11 |    |     |
| ------------------------- | --- | --------- | ----------- | --- | --- |
| perf_rate_cycle_target =  |     |           |             |     |     |
|                           |   | Cycles   |             |     |     |
perf_rate_strokes =

MDE-KMO_Customizing_OEE.docx  Version: 1.4.18468  Page 8 of 11

Configuration of OEE Key Figures
The values of these acronyms include (depending on the INI configuration) the recorded or calculated
strokes.
1.4 Calculation of quality
If formula management does not include a separate formula to calculate the key figure quality, the
"quality" will be determined as part of the standard OEE calculation as follows:
𝑌𝑖𝑒𝑙𝑑
𝑝𝑟𝑖𝑚𝑎𝑟𝑦
𝑄𝑢𝑎𝑙𝑖𝑡𝑦 =
(𝑌𝑖𝑒𝑙𝑑 +𝑆𝑐𝑟𝑎𝑝 +𝑅𝑒𝑤𝑜𝑟𝑘 +𝑂𝑝𝑒𝑛 𝑄𝑢𝑎𝑛𝑡𝑖𝑡𝑦 )
𝑝𝑟𝑖𝑚𝑎𝑟𝑦 𝑝𝑟𝑖𝑚𝑎𝑟𝑦 𝑝𝑟𝑖𝑚𝑎𝑟𝑦 𝑝𝑟𝑖𝑚𝑎𝑟𝑦
You can change the calculation rule for the quality in the configuration within Formula management. The
rule must be documented in the CID (Customer Implementation Documentation). Technical standard
formula to calculate the quality:
 Formula: qual
 Type: 5
 Calculation: yield.primary / (yield.primary + scrap.primary + rework.primary + problem.primary)
If you have configured the formula qual within formula management, you must also check or
configure the other formulas for OEE, NEE, Yield utilization and Actual utilization.
The formula name (qual) must be written in lower case letters.
1.5 NEE Calculation
In contrast to the OEE, the Net Equipment Effectiveness (NEE) does not consider setup and configuration
as a loss.
(𝑅𝑃𝐴 + 𝑅𝑃𝐴 )
11 7
𝑁𝐸𝐸 = ∗𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒∗𝑄𝑢𝑎𝑙𝑖𝑡𝑦
∑11𝑅𝑃𝐴
1
NEE is calculated as described below if no formula is defined for NEE within formula management:
nee = ((rpa11 + rpa7) / (rpa1+rpa2+rpa3+rpa4+rpa5+rpa6+rpa7+rpa8+rpa9+rpa10+rpa11)) *
(yield.primary / (yield.primary + scrap.primary + rework.primary + problem.primary)) * performance_rate
Technical standard formula to calculate NEE to be defined within Formula management:
 Formula: nee
 Type: 5
MDE-KMO_Customizing_OEE.docx Version: 1.4.18468 Page 9 of 11

Configuration of OEE Key Figures
 Calculation: ((rpa11 + rpa7) / (rpa1+rpa2+rpa3+rpa4+rpa5+rpa6+rpa7+rpa8+rpa9+rpa10+rpa11)) *
(yield.primary / (yield.primary + scrap.primary + rework.primary + problem.primary)) *
performance_rate
If you want to change one component of the NEE calculation (that deviates from the standard
formula), you must insert the complete formula for calculating NEE within formula
management.
The NEE configuration must not include a formula name of any other key figure (e.g. avail,
pf_rat, qual) in order to ensure a correct calculation. The only exception is the placeholder of
the performance_rate because of its complex calculation. It is always the defined performance
that is used here.
The formula name (nee) must be written in lower case letters.
The KPI NEE is only available if you enable the upgrade oeerp82.
1.6 Planned operating time
Use the formula op_ti to customize the calculation. If the formula management does not include this
formula, you have to create the formula in order to change the calculation:
Formula:
 Formula: op_ti
 Type: 5
 Calculation: (rpa1+rpa2+rpa3+rpa4+rpa5+rpa6+rpa7+rpa8+rpa9+rpa10+rpa11)
1.7 Machine runtime
Use the formula mch_rt to customize the calculation. If the formula management does not include this
formula, you have to create the formula in order to change the calculation:
 Formula: mch_rt
 Type: 5
 Calculation: rpa11
MDE-KMO_Customizing_OEE.docx Version: 1.4.18468 Page 10 of 11

Configuration of OEE Key Figures
1.8 Yield utilization
Use the formula yie_ut to customize the calculation. If the formula management does not include this
formula, you have to create the formula in order to change the calculation:
 Formula: yie_ut
 Type: 5
 Calculation: rpa11 * (yield.primary / (yield.primary + scrap.primary + rework.primary +
problem.primary))
1.9 Actual utilization
Use the formula act_ut to customize the calculation. If the formula management does not include this
formula, you have to create the formula in order to change the calculation.
Formula:
 Formula: act_ut
 Type: 5
 Calculation: rpa11 * (yield.primary / (yield.primary + scrap.primary + rework.primary +
problem.primary)) * performance_rate
If you want to change one component of the calculation (that deviates from the standard
formula), you must insert the complete formula act_ut for the calculation within formula
management.
The configuration must not include a formula name of any other key figure (e.g. avail, pf_rat,
qual) in order to ensure a correct calculation. The only exception is the placeholder of the
performance_rate because of its complex calculation. It is always the defined performance that
is used here.
If you have configured the formula pf_rat within formula management, you must also configure
the formula act_ut for the actual utilization! To do so, you must replace the text
performance_rate with the formula of pf_rat.
The formula name (here: act_ut) must be written in lower case letters.
MDE-KMO_Customizing_OEE.docx Version: 1.4.18468 Page 11 of 11
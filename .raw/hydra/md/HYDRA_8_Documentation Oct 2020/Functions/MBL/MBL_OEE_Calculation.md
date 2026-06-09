OEE Calculation
1 OEE Calculation
Overview
This document describes how to calculate the KPIs OEE (Overall Equipment Effectiveness), NEE (Net
Equipment Effectiveness) and their related factors. To calculate these KPIs, the system only uses the
workplace/machine-related postings of the MDE (Machine Data Collection).
OEE
The OEE or Overall Equipment Effectiveness is a rating figure providing information about the functioning
of a machine. In general, the OEE is less than 1 and a measure providing information about the availability
and effectiveness of equipment and machines during operating time.
To calculate the OEE, the following three key figures are used:
OEE = Availability (Productivity) x Performance (Effectiveness) x Quality.
You can customize the calculation formula.
Availability
Availability is a performance indicator of the machine. Like the OEE itself, it is a number less than one. Use
the following formula to calculate the productivity of a machine for a specific period of time:
RPA11
Availability 
11
RPA
1
You can customize the calculation formula.
Performance
Use the following formula to calculate the performance of a machine for a specific period of time:
Target cycle*
Performance
Actualcycle
Use the ratio of RPA 11 to the number of recorded cycles to identify the actual cycle.
MBL_OEE_Calculation.docx Version: 1.3.18468 Page 1 of 4

|     |     |     |     |     | OEE Calculation  |
| --- | --- | --- | --- | --- | ---------------- |

  RPA 
|     | cycle   |    |     |     |     |
| --- | --------- | --- | --- | --- | --- |
|     | Actual 11 |     |     |     |     |
Cycles* 
 
The target cycle is an averaged value, as different target cycles can be used within the selected period of
time:
∑(𝑇𝑎𝑟𝑔𝑒𝑡 𝑐𝑦𝑐𝑙𝑒∗𝑅𝑃𝐴 11)
𝑇𝑎𝑟𝑔𝑒𝑡 𝑐𝑦𝑐𝑙𝑒∗ =

∑𝑅𝑃𝐴 11
Cycles*: If you did not collect cycles from the machine, calculate the cycles from the yield (primary
quantity unit) and the partitioning:
| Cycles* | Yield /Partitioning  |     |     |     |     |
| ------- | --------------------- | --- | --- | --- | --- |
Primary
The performance is calculated based on the MDE log records. The application uses all data records
collected with the status "production" (data posted to RPA 11). For each log record, the system calculates
the performance. The individual performance values are weighted in order to show a compressed view in
evaluations. This weighting is based on the production time (RPA11).
|     | Performance  Performance*Duration |     |     |     |     |
| --- | ---------------------------------- | --- | --- | --- | --- |

Product RPA11
Performance
Product
|     | Performance |     |     |     |     |
| --- | ------------ | --- | --- | --- | --- |
RPA
11
Example of a performance calculation based on six MDE log records:
|     | Machine  RPA11 [sec]  | Performance  | Performance  |     |     |
| --- | --------------------- | ------------ | ------------ | --- | --- |
(Product)
|     | 100  3600     |        | 0.7  | 2520   |     |
| --- | ------------- | ------ | ---- | ------ | --- |
|     | 100  2700     |        | 0.8  | 2160   |     |
|     | 100  1800     |        | 0.9  | 1620   |     |
|     | 100  2700     |        | 0.5  | 1350   |     |
|     | 100  7200     |        | 0.9  | 6480   |     |
|     | 100  1800     |        | 0.9  | 1620   |     |
|     | Total  19800  | 0.795  |      | 15750  |     |

You can customize the calculation formula.

| MBL_OEE_Calculation.docx  |     | Version: 1.3.18468  |     |     | Page 2 of 4  |
| ------------------------- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     |     |     |     |     |     | OEE Calculation  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---------------- | --- |

Quality
Quality represents the ratio of the produced yield to the total quantity (here: yield + scrap + rework + open
quantity). This KPI provides information about the material to be processed and the quality of the process.
Use the following formula to calculate the quality of a machine for a specific period of time:
Yield
|     | Quality |    |     |     |     |     | Primary |     |     |     |
| --- | ------- | --- | --- | --- | --- | --- | ------- | --- | --- | --- |

|     |     | Yield |         | Scrap |         | Rework |         | Open_quantity |         |     |
| --- | --- | ----- | ------- | ------ | ------- | ------- | ------- | -------------- | ------- | --- |
|     |     |       | Primary |        | Primary |         | Primary |                | Primary |     |
You can customize the calculation formula.
NEE
In contrast to the OEE, the Net Equipment Effectiveness (NEE) does not consider setup and configuration
| as a loss.  |        |      |       |     |                         |     |     |     |     |     |
| ----------- | ------ | ---- | ----- | --- | ----------------------- | --- | --- | --- | --- | --- |
|             |        | (𝑅𝑃𝐴 | + 𝑅𝑃𝐴 |     | )                       |     |     |     |     |     |
|             | 𝑁𝐸𝐸 =  |      | 11    |     | 7 ∗𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒∗𝑄𝑢𝑎𝑙𝑖𝑡𝑦  |     |     |     |     |     |
∑11𝑅𝑃𝐴
1
You can customize the calculation formula.
The KPI NEE is only available if you enable the extension oeerp82.

Planned operating time
Total runtime of the machine during the selected period of time (Sum RPA 1 ... 11)
11
|     | 𝑃𝑙𝑎𝑛𝑛𝑒𝑑 𝑜𝑝𝑒𝑟𝑎𝑡𝑖𝑛𝑔 𝑡𝑖𝑚𝑒 |     |     |     | = ∑ | 𝑅𝑃𝐴  |     |     |     |     |
| --- | ---------------------- | --- | --- | --- | --- | ---- | --- | --- | --- | --- |
1
You can customize the calculation formula.
Machine run time
|     | 𝑀𝑎𝑐ℎ𝑖𝑛𝑒 𝑟𝑢𝑛𝑡𝑖𝑚𝑒 |     |     | = 𝑅𝑃𝐴 |     |     |     |     |     |     |
| --- | --------------- | --- | --- | ----- | --- | --- | --- | --- | --- | --- |
11
You can customize the calculation formula.
Yield utilization
|     | 𝑌𝑖𝑒𝑙𝑑 𝑢𝑡𝑖𝑙𝑖𝑧𝑎𝑡𝑖𝑜𝑛 |     |     | = 𝑅𝑃𝐴 | ∗𝑄𝑢𝑎𝑙𝑖𝑡𝑦  |     |     |     |     |     |
| --- | ----------------- | --- | --- | ----- | --------- | --- | --- | --- | --- | --- |
11

| MBL_OEE_Calculation.docx  |     |     |     |     |     | Version: 1.3.18468  |     |     |     | Page 3 of 4  |
| ------------------------- | --- | --- | --- | --- | --- | ------------------- | --- | --- | --- | ------------ |

|     |     |     |     |     | OEE Calculation  |
| --- | --- | --- | --- | --- | ---------------- |

You can customize the calculation formula.
Actual utilization
| 𝐴𝑐𝑡𝑢𝑎𝑙 𝑢𝑡𝑖𝑙𝑖𝑧𝑎𝑡𝑖𝑜𝑛 |     | =  𝑌𝑖𝑒𝑙𝑑 𝑢𝑡𝑖𝑙𝑖𝑧𝑎𝑡𝑖𝑜𝑛 |     | ∗𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒  |     |
| ------------------ | --- | -------------------- | --- | ------------- | --- |
You can customize the calculation formula.

| MBL_OEE_Calculation.docx  |     |     | Version: 1.3.18468  |     | Page 4 of 4  |
| ------------------------- | --- | --- | ------------------- | --- | ------------ |
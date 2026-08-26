Performance Level

1  Performance Level (LLE)

Synonyms

The term "Performance efficiency rate" is commonly used in the context of the piecework wage

calculation.

Definition

The performance level is the measurement of performance used to calculate premium/incentive wages. It

is the results from a target/actual comparison and is shown as a percentage.

Most of the time,  you compare a target time with the actual time. The target  time is usually  specified in

such a way that it doesn‘t exceeded by the actual time, so that the performance levels are normally above

100%.  This  is  due  to  improve  employee  motivation.  To  say  "I  achieve  more  than  100%"  is  more

motivating than saying "I have only achieved 90% of the target performance".

Performance level for piecework

The performance level is calculated in the classic piecework rate by putting the target time in relation to

the actual time. Data for piecework calculation origin from the BDE personnel postings (B records). The

"Wage  calculation"  generates  from  the  BDE  personnel  postings  valuated  time  tickets  which  include  the

performance efficiency rate.

𝑝𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒𝐿𝑒𝑣𝑒𝑙 =

𝑠𝑡𝑎𝑛𝑑𝑎𝑟𝑑𝑇𝑖𝑚𝑒
𝑎𝑐𝑡𝑢𝑎𝑙𝑇𝑖𝑚𝑒

∙ 100%

  The actual time in piecework depends on the basic settings for incentive wages. However, this is

usually  the  proportionately  calculated  working  time  deduced  from  the  logon  of  a  person  in  the

order data entry (B records).This is calculated proportionally for multiple machine operation.  You

can also use the basic settings for incentive wages to specify that the actual time for piecework is

only made up of certain RPAs used for personnel postings.

  The target time column results from the single piece target te and the quantity as well as the setup

time target tr  stored at the operation:



𝑠𝑡𝑎𝑛𝑑𝑎𝑟𝑑𝑇𝑖𝑚𝑒 =

𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑖𝑦∙𝑡𝑒
1000

+ 𝑡𝑟 + 𝑏𝑜𝑛𝑢𝑠𝑒𝑠

  The te is usually listed in HYDRA in hours per thousand pieces [h/1000].

GLOSSARY_PerfEffRate.docx

Version: 1.2.21371

Page 1 of 2

Performance Level

  The quantity is made up of the yield or yield + scrap, depending on the basic settings for incentive

wages.

  The tr is only offset if this is activated in the basic settings for incentive wages.

  The collected bonuses are added to each time ticket that matches the employee's personnel and

order number on the date and, as a result, is totaled in the person's daily result.

The performance level is calculated for piecework time tickets and in the daily results of the persons.

A performance level is also calculated for time tickets with other time types if the required basic data is

available. However, these performance levels only serve as information for the particular time tickets and

are not included in further payroll accounting.

To correctly determine the target time for single piecework, the person-related collection of the produced

quantities  in  the  order  data  collection  is  a  mandatory  requirement.  A  quantity  posting  to  the  logged  on

persons takes place in HYDRA for the following terminal postings:

1.

Log off a person from an order/workplace

2.

Partial confirmations/uploads

3.

Interrupting and completing orders:

1) at group workplaces

2) at individual workplaces: for the person who has been logged on for the longest time, but only if

the option "Quantity posting to person" is activated when configuring the machine or workplace.

If one of the two conditions is not fulfilled when interrupting or completing orders, the quantities are

only posted to the operation, and it is not possible to determine the correct performance level for

machine operators!

When using "Formula-based premium/ incentive wages", customer-specific formulas can result in

different calculation methods for performance levels.

Performance level for group incentives

You can also calculate performance levels for group incentives. The Calculation rules depend on the type

of group incentive.

GLOSSARY_PerfEffRate.docx

Version: 1.2.21371

Page 2 of 2


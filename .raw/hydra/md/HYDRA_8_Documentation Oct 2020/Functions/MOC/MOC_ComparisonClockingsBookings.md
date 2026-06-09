Labor Time Comparison

1  Labor Time Comparison

Summary

Menu

Human  Resources  Management    Incentive  Wages    Labor  Time
Comparison

Transaction code

compcb

Function authorization

compcb.*

The  labor  time  comparison  function  allows  for  the  times from  the  HYDRA  Time  Management  module

HYDRA-PZW  to  be  compared  with  the  personal  times  coming  from  the  HYDRA-ADE  shop  floor  data

collection  module.  Deviations  can  be  found  easily  and  specifically,  which  leads  to  simplified  correction

processes.  Moreover,  the  proportion  of  productive  order  postings  and  postings  made  on  overhead  cost

orders is determined and compared.

The  list  only  shows  such  people  who  are  at  least  assigned  to  a  BDE  authorization  of  “1”  within  the  HR

master (“shop floor data” tab, “BDE authorizations” group, “BDE authorization” field). Consequently, it is

possible  to  suppress  the  display  of  people  who  only  post  HYDRA-PZW (Personnel  Time  Management)

and not HYDRA-BDE (Shop Floor) data.

Definition of active labor time comparison

The  times  posted  in  HYDRA-BDE  can  automatically  be  adapted  to  the  time  intervals  computed  in

HYDRA-PZW if the active labor time comparison is enabled. The active labor time comparison function is

described in another document. This function is only installed by MPDV if the customer requests it, as it is

not compatible with all functions and options provided by the shop floor data collection module.

Prerequisite

The  HYDRA  shop  floor  data  collection  module  (HYDRA-BDE)  as  well  as  the  HYDRA  Personnel  Time

Management module (HYDRA-PZW) have to exist to be able to use this “comparison” function.

As  an  alternative,  the  required  data  may  also  be  transferred  from  third-party  systems  to  HYDRA  using

individually coordinated interfaces to be able to use this function.

MOC_ComparisonClockingsBookings.docxVersion: 1.2.18468

Page 1 of 4

Labor Time Comparison

Selection Criteria

The application provides the following selection criteria:

Admissible deviation

Allowed difference between the labor times collected from the HYDRA-PZW and the HYDRA-BDE

module. If the deviation is less than the time entered in this field, the person is not shown in the list.

Field Descriptions

Date

Date  to  which  the  times  from  the  Personnel  Time  Management  and  Shop  Floor  Data  Collection

module are assigned. Please also note the assignment of times to a settlement day.

Deviation

Difference  between  attendance  time  (HYDRA-PZW)  and  posted  time  and  labor  data  (HYDRA-

BDE).  With  respect  to  possible  deviation  reasons,  please  also  note  the  below-described

assignment of times to a settlement day.

MOC_ComparisonClockingsBookings.docxVersion: 1.2.18468

Page 2 of 4

Labor Time Comparison

Deviations up to one minute are not highlighted in color.

Deviations between one and five minutes are highlighted in yellow.

Deviations exceeding five minutes are highlighted in red.

Attendance time

Attendance  time  from  Personnel  Time  Management  (HYDRA-PZW).  This  time  has  already  been

rounded  or  cut  off  according  to  the  evaluation  parameters  that  are  applicable  in  HYDRA-PZW.  In

the basic parameter settings of incentive wages it may also be defined whether paid breaks of the

HYDRA Personnel Time Management module are to be considered as productive working time or

not.

Start/end

Rounded  beginning  and  end  of  the  working  time  according  to  the  Personnel  Time  Management

module.

Logged in

Total  of  the  columns  "productive"  and  "overhead  costs".  This  column  represents  the  basis  for

comparisons with the attendance time from HYDRA-PZW:

Productive

Labor utilization of personnel postings from HYDRA-BDE (B records) of the relevant day that have

been posted onto production operations.  Production orders can be distinguished by their category

of the order type that is not assigned to "overhead costs".

Overhead costs

Labor utilization of personnel postings from HYDRA-BDE (B records) of the relevant day that have

been  posted  onto  overhead  cost  operations.  Overhead  cost  orders  can  be  distinguished  by  their

"overhead  costs"  category  of  the  order  type.  HYDRA-BDE  personnel  postings  from  waiting  time

period  processing  are  not  taken  into  account.  They  are  considered  as  gaps  in  the  person's  shop

floor data collection (HYDRA-BDE).

% productive

Proportion  of  the  times  posted  on  productive  orders  compared  to  the  total  time  posted  from  the

personnel postings of HYDRA-BDE. The total time that has been posted results from the total time

posted onto productive orders and the time posted onto overhead cost orders.

%BDE incl. OC

Proportion  of  the  posted  labor  time  (HYDRA-BDE)  including  overhead  costs  compared  with  the

attendance time (HYDRA-PZW) in percent.

%BDE without OC

Proportion  of  the  labor  time  posted  on  production  orders  (HYDRA-BDE)  compared  with  the

attendance time (HYDRA-PZW) in percent.

MOC_ComparisonClockingsBookings.docxVersion: 1.2.18468

Page 3 of 4

Labor Time Comparison

Toolbar

 Labor Time Maintenance

This button directly opens the labor time maintenance dialog to correct the times of the Personnel

Time Management module.

 Order-related postings

This button directly opens the order-related postings dialog to correct the times of the Shop Floor

Data Collection module.

MOC_ComparisonClockingsBookings.docxVersion: 1.2.18468

Page 4 of 4


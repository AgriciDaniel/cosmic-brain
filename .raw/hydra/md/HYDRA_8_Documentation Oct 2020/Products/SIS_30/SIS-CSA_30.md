Manual
Cockpit for System
Administrators
SIS-CSA 3.0/3.1
Version 1.0.15126
Last changed on: 06.10.2020

Cockpit for System Administrators
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
SIS-CSA_30.docx Version: 1.2.23517 Page 2 of 26

Cockpit for System Administrators
Contents
1 Cockpit for System Administrators ............................................................... 4
2 Escalations for System Administrators ........................................................ 5
3 Cockpit for System Administrators ............................................................... 6
3.1 Requirements ...................................................................................................... 6
3.2 Activation of metrics output ................................................................................. 6
3.3 Prometheus installation ....................................................................................... 6
3.4 Grafana installation ............................................................................................. 8
4 Prometheus System Metrics ........................................................................ 9
4.1 Naming ................................................................................................................ 9
4.2 Metric data types ................................................................................................. 9
4.3 Standard metrics... ............................................................................................ 10
4.4 Standard labels ................................................................................................. 12
4.5 Metrics of specific services ................................................................................ 15
4.5.1 AnalysisOperationLogonPeriods.importFromManufacturing .................. 15
4.5.2 ProcessDataSpecifications.batchInsert.................................................. 16
4.5.3 ProcessDataSpecifications.distributeStandard ...................................... 16
4.5.4 ProcessDataSpecifications.insert .......................................................... 17
4.5.5 ProcessDataSpecifications.aggregatePeriodicStandard ........................ 18
4.5.6 ProcessDataStatistics.aggregateByOperation ....................................... 20
4.5.7 ProcessValues.aggregateCurveProgression ......................................... 21
4.5.8 ProcessValues.batchInsert .................................................................... 23
4.5.9 ProcessValues.distributeStandard ......................................................... 23
4.5.10 ProcessValues.importFromPccFiles ...................................................... 24
4.5.11 ProcessValues.insert ............................................................................. 26
SIS-CSA_30.docx Version: 1.2.23517 Page 3 of 26

Cockpit for System Administrators
1 Cockpit for System Administrators
Overview
Purpose
The Cockpit for System Administrators allows for an automated notification based on operation statuses
of the HYDRA server.
Implementation notes
You use the Cockpit for System Administrators if you wish to receive system-supported warning
messages about specific operating statuses of the HYDRA server in order to be able to react in good
time.
Integration
The Cockpit for System Administrators provides escalations which can be used within Escalation
Management.
Features
System Integration Service (SIS) for the automatic monitoring of:
 Fill levels of the HYDRA database
 Fill levels of the MES server drives
with adjustable limit values. Alert messages for a definable group of employees by e-mail when limit
values are exceeded.
SIS-CSA_30.docx Version: 1.2.23517 Page 4 of 26

|     |     |     |     | Cockpit for System Administrators  |     |     |
| --- | --- | --- | --- | ---------------------------------- | --- | --- |

| 2   | Escalations for System Administrators  |     |     |     |     |     |
| --- | -------------------------------------- | --- | --- | --- | --- | --- |

| Event  |     | Description  | Identifiers  | Description  | Please note  |     |
| ------ | --- | ------------ | ------------ | ------------ | ------------ | --- |
TNR.OFFLINE  Terminal is offline  TNR.TNR  Terminal number  The  event  is
|     |     |     |             |                        | triggered               | if  the        |
| --- | --- | --- | ----------- | ---------------------- | ----------------------- | -------------- |
|     |     |     | TNR.BEZL    | Terminal description   |                         |                |
|     |     |     |             |                        | duration                | since  the     |
|     |     |     | TNR.BEZK    | Terminal location      | last status posting of  |                |
|     |     |     |             |                        | the                     | terminal  has  |
|     |     |     | TNR.ZYKL:I  | Time passed since the  |                         |                |
exceeded the target
last status posting in
|     |     |     |     |     | cycle  | of  status  |
| --- | --- | --- | --- | --- | ------ | ----------- |
seconds
postings.
|     |     |     | TNR.ZYKL:S  | Target posting cycle in  |     |     |
| --- | --- | --- | ----------- | ------------------------ | --- | --- |
seconds
DB.INCREMENT_TOO_LAR Fill  level  of  table  DB.INC:GR  Increase in percent  The  event  is
| GE  |     | spaces too high  |            |                    | triggered    | if  the  fill   |
| --- | --- | ---------------- | ---------- | ------------------ | ------------ | --------------- |
|     |     |                  | DB.INC:TG  | Period considered  |              |                 |
|     |     |                  |            |                    | level        | of  individual  |
|     |     |                  |            |                    | files/table  | spaces          |
|     |     |                  |            |                    | has          | increased  by   |
<DB.INC:GR> within
the past few days.
FILESYS.FILL_LEVEL_EXCE Fill  level  of  drive  FILESYS.FILESYS  File system
| EDED  |     | exceeded  |                   |                      |     |     |
| ----- | --- | --------- | ----------------- | -------------------- | --- | --- |
|       |     |           | FILESYS.SUM       | File system size     |     |     |
|       |     |           | FILESYS.SUM:EINH  | Unit of file size    |     |     |
|       |     |           | FILESYS.FREE      | Free memory          |     |     |
|       |     |           | FILESYS.FREE:EIN  | Unit of free memory  |     |     |
H
|     |     |     | FILESYS.FREE:PRO | Free  memory         | in  |     |
| --- | --- | --- | ---------------- | -------------------- | --- | --- |
|     |     |     | Z                | percent              |     |     |
|     |     |     | FILESYS.USED     | Used memory          |     |     |
|     |     |     | FILESYS.USED:EIN | Unit of used memory  |     |     |
H
|     |     |     | FILESYS.USED:PRO | Used  memory      | in  |     |
| --- | --- | --- | ---------------- | ----------------- | --- | --- |
|     |     |     | Z                | percent           |     |     |
|     |     |     | FILESYS.USEDGR:P | Limit in percent  |     |     |
ROZ
DB.FILL_LEVEL_EXCEEDE Fill  level  of  database  DB.DBSPACE  File  group  /  table  The  event  is
| D   |     | file  groups/table  |             | space              | triggered                       | if  the  fill  |
| --- | --- | ------------------- | ----------- | ------------------ | ------------------------------- | -------------- |
|     |     | spaces exceeded     |             |                    | level of one or more            |                |
|     |     |                     | DB.DBSNUM   | Number (Informix)  |                                 |                |
|     |     |                     |             |                    | table                           | spaces  has    |
|     |     |                     | DB.NCHUNKS  | Number             | of  chunks  exceeded the value  |                |
|     |     |                     |             | (Informix)         | <DB.USEDGR:PRO                  |                |
Z>.
|     |     |     | DB.SUM        | Size                 |     |     |
| --- | --- | --- | ------------- | -------------------- | --- | --- |
|     |     |     | DB.SUM:EINH   | Unit of size         |     |     |
|     |     |     | DB.FREE       | Free memory          |     |     |
|     |     |     | DB.FREE:EINH  | Unit of free memory  |     |     |
|     |     |     | DB.FREE:PROZ  | Free  memory         | in  |     |
percent
|     |     |     | DB.USED       | Used memory          |     |     |
| --- | --- | --- | ------------- | -------------------- | --- | --- |
|     |     |     | DB.USED:EINH  | Unit of used memory  |     |     |
|     |     |     | DB.USED:PROZ  | Used  memory         | in  |     |
percent
|     |     |     | DB.USEDGR:PROZ  | Limit in percent  |     |     |
| --- | --- | --- | --------------- | ----------------- | --- | --- |

| SIS-CSA_30.docx  |     |     | Version: 1.2.23517  |     |     | Page 5 of 26  |
| ---------------- | --- | --- | ------------------- | --- | --- | ------------- |

Cockpit for System Administrators
3 Cockpit for System Administrators
3.1 Requirements
The system provides the option to output metrics to the monitoring and alert system Prometheus. You
can visualize these metrics using the analytics system Grafana.
In combination with other data suppliers providing for example metrics of the operating system and the
database management system, this solution can be used to monitor whether the system operates well; in
case of problems, you can be informed.
To output metrics you need the SIS-CSA license and Service Pack 15.
"Prometheus" and "Grafana" are products of third party manufacturers. Both products are
neither sold nor supported by MPDV.
For Prometheus MPDV only provides the metrics for query.
For Grafana MPDV provides exemplary dashboards.
3.2 Activation of metrics output
By default, the output of metrics is deactivated. Make the configuration below to enable the metrics
output:
<InstallDir>\WSP<SystemNo>\config\application.properties
management.security.enabled=true
3.3 Prometheus installation
Find an overview of Prometheus here:
https://prometheus.io/docs/introduction/overview/
Install Prometheus. Find instructions on the installation, operation and configuration of the product here:
https://prometheus.io/docs/prometheus/latest/getting_started
Configuration of the Exporter
Extend the Prometheus configuration as follows to have Prometheus query the metrics:
<Prometheus folder>\prometheus.yml
SIS-CSA_30.docx Version: 1.2.23517 Page 6 of 26

Cockpit for System Administrators
scrape_configs:
- job_name: '<name of configuration>'
scheme: 'https'
metrics_path: '/prometheus'
static_configs:
- targets: ['<host name of server>:<port>']
The port depends on the system queried:
 System 1: 8080
 System 2: 8081
 System 3: 8082
 etc.
Installation of WMI Exporter / Node Exporter
The following Prometheus exporters can be installed to output metrics of the operating system:
 Windows: https://github.com/martinlindhe/wmi_exporter
 LINUX: https://github.com/prometheus/node_exporter
Find notes on the configuration of the adapter here:
https://prometheus.io/docs/introduction/first_steps/
Use at least the following start parameters of the WMI Exporter for the basic functions:
--log.format logger:eventlog?name=wmi_exporter
--telemetry.addr :9182
If the Microsoft SQL Server is used as database and if this server is on the same host as the system, you
can additionally use the following start parameters:
--collectors.enabled cpu,cs,logical_disk,net,os,system,mssql,textfile
--collectors.mssql.classes-enabled=accessmethods,bufman,databases,genstats,locks,memmgr,sqlstats
MPDV Index dashboard, tab SQL Server: Only if the above parameters are set, the panel functions of the
dashboard provided by MPDV are active.
Checking the result
After start of Prometheus, enter the following address in a browser:
http://<name of Prometheus host>:9090
The relevant web page must then be displayed. In the provided selection of metrics, the metrics of the
following naming scheme must be available shortly after: wsp_services_* (e.g.
wsp_services_duration_total_seconds_sum).
SIS-CSA_30.docx Version: 1.2.23517 Page 7 of 26

|     |     |     | Cockpit for System Administrators  |     |
| --- | --- | --- | ---------------------------------- | --- |

3.4  Grafana installation
| Find an overview of Grafana here:  |     |     |     |     |
| ---------------------------------- | --- | --- | --- | --- |
https://grafana.com/
Install Grafana. Find instructions on the installation, operation and configuration of the product here:
https://grafana.com/docs/installation/
Configuration of Prometheus as data source
After start of Grafana, enter the following address in a browser:
| http://<name of Grafana host>:3000  |     |     |     |     |
| ----------------------------------- | --- | --- | --- | --- |
The relevant web page must then be displayed.
Open the page to configure the data sources. Add Prometheus as data source.
All steps required to visualize system metrics using Grafana are then fulfilled.
Loading example dashboards
MPDV provides some example dashboards. You can download them from the page below and integrate
them in your Grafana installation. Use the search function of this page and search for "MPDV".
https://grafana.com/grafana/dashboards
To use the MPDV dashboards, install further Grafana panel plug-ins, if required. The requirements of an
| MPDV panel are listed in the Dependencies.  |     |     |     |     |
| ------------------------------------------- | --- | --- | --- | --- |
Find the installation instruction for the plug-ins here:
https://grafana.com/docs/plugins/installation/

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     | Page 8 of 26  |
| ---------------- | --- | ------------------- | --- | ------------- |

Cockpit for System Administrators
4 Prometheus System Metrics
4.1 Naming
The general rules normally apply for the naming of metrics and labels. The following websites provide a
very good overview:
 https://prometheus.io/docs/practices/naming/
 https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels
In addition to the general rules, the following naming conventions apply:
 Metrics, which are centrally available for 100 % of all available services, start with
wsp.services.….
Metrics with this name are exclusively provided by the basic system functions.
 Metrics provided for a subset of services start with wsp.services.subset.….
Only use this naming for metrics if their evaluation is useful for all services.
 Metrics only provided for specific services start with wsp.service.<service name in
lower case>.….
The relevant service documentation describes the relevant labels.
4.2 Metric data types
The following data types are generally available for metrics:
 Summary – is used to total values
(Example: number of processed data records, duration of processing)
For each summary metric, the following parameters are provided:
o <name of metric>_sum
o <name of metric>_count
o <name of metric>_max
 Counter – Metric, which is incremented with each call.
(Example: number of calls, number or errors)
 Timer – is used to total times (in seconds)
(Example: duration of a service)
For each timer metric, the following parameters are provided:
o <Name of the metric>_seconds
 Gauge – current value, not totaled
(Example: current memory usage, current table space usage, alive status)
SIS-CSA_30.docx Version: 1.2.23517 Page 9 of 26

|     |     |     |     | Cockpit for System Administrators  |     |     |
| --- | --- | --- | --- | ---------------------------------- | --- | --- |

General note: Only the currently available content of a metric is transmitted at the time Prometheus
collects the data.
Some of the data provided, e.g. with gauge, is not "combined" and transferred one by one. Instead, only
the last transferred value (which had overwritten the predecessor values) is transferred.
In Prometheus, the relevant Prometheus configuration distinguishes the different systems. The native
labels job and instance are provided to distinguish the data source.
| 4.3  | Standard metrics...  |     |     |     |     |     |
| ---- | -------------------- | --- | --- | --- | --- | --- |
...provided by basic functions
The basic functions provide the following "basic metrics" for services:
|                           | Metric name with labels  |     | Type   |                       | Value  |     |
| ------------------------- | ------------------------ | --- | ------ | --------------------- | ------ | --- |
| wsp.services.calls.total  |                          |     | Count  | Counts service calls  |        |     |
{service_domain=”<service domain>”,
 service_function=”list|insert|delete|
                   update|modify|copy|
                   lock|unlock|…”,
 device_id=”<client device ID>”,
 user_id=”<user ID>”,
 distribution_id=”<distribution ID>”,
 processing_result=”processed|failed”
}
| wsp.services.errors.total  |     |     | Count  | Counts  | how  often  | a   |
| -------------------------- | --- | --- | ------ | ------- | ----------- | --- |
{service_domain=”<service domain>”,  service  is  canceled  with
|  service_function=”list|insert|delete|  |     |     |     | error  |     |     |
| --------------------------------------- | --- | --- | --- | ------ | --- | --- |
                   update|modify|copy|
                   lock|unlock|…”,
 device_id=”<client device ID>”,
 user_id=”<user ID>”,
 distribution_id=”<distribution ID>”,
 processing_result=”processed|failed”
}
wsp.services.duration.total_seconds  Timer  Processing  time  of
| {service_domain=”<service domain>”,  |     |     |     | service in seconds  |     |     |
| ------------------------------------ | --- | --- | --- | ------------------- | --- | --- |
 service_function=”list|insert|delete|
                   update|modify|copy|

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     |     |     | Page 10 of 26  |
| ---------------- | --- | ------------------- | --- | --- | --- | -------------- |

Cockpit for System Administrators
lock|unlock|…”,
device_id=”<client device ID>”,
user_id=”<user ID>”,
distribution_id=”<distribution ID>”,
processing_result=”processed|failed”
}
wsp.services.returned_records.total_cou Summary Number of data records in
nt/_max/_sum the result sets of the
{service_domain=”<service domain>”, highest level that the
service_function=”list|insert|delete| service returns to the
update|copy| calling process.
lock|unlock|…”,
device_id=”<client device ID>”,
user_id=”<user ID>”,
distribution_id=”<distribution ID>”,
resultset_id=”<result set ID>”
processing_result=”processed|
empty|failed|…”,
}
… provided by services
The following metrics with a global naming for all services can be provided by specific services:
Metric name with labels Type Value
wsp.services.subset.records.total_count Summary Number of data records
/_max/_sum
{service_domain=”<service domain>”,
service_function=”list|insert|delete|
update|copy|
lock|unlock|…”,
device_id=”<client device ID>”,
user_id=”<user ID>”,
distribution_id=”<distribution ID>”,
processing_result=”processed|
empty|failed|…”,
data_type=“operation_logon_period|
process_value…“
record_type=”deleted|inserted|
SIS-CSA_30.docx Version: 1.2.23517 Page 11 of 26

Cockpit for System Administrators
updated|listed|
remaining|…”
}
wsp.services.subset.files.total_count/_ Summary Number of files
max/_sum
{service_domain=”<service domain>”,
service_function=”list|insert|delete|
update|copy|
lock|unlock|…”,
device_id=”<client device ID>”,
user_id=”<user ID>”,
distribution_id=”<distribution ID>”,
processing_result=”processed|
empty|failed|…”,
data_type=“operations|…“
file_type=”processed|remaining|…”
}
wsp.services.subset.time_period.total_c Summary Period of time
ount/_max/_sum
{service_domain=”<service domain>”,
device_id=”<client device ID>”,
user_id=”<user ID>”,
distribution_id=”<distribution ID>”,
processing_result=”processed|
empty|failed|…”,
period_type=”processed|remaining|…”
}
For a precise listing of the metrics specifically provided by the services, refer to section "Metrics of
specific services".
4.4 Standard labels
service_domain
This label is used to narrow down the analysis, e.g. to a specific service domain. With standard metrics,
the service domain is included in a label and not in a metric name. For this reason, you can optionally
perform analyses for all services, e.g. to evaluate the number of inserted data records from all services.
This label is always directly created from the service name (character string before last dot).
The metrics, which include the service name already in the metric name, usually do not use this label.
SIS-CSA_30.docx Version: 1.2.23517 Page 12 of 26

Cockpit for System Administrators
In combination with the label service_function, you can filter by a specific service.
service_function
You can use this label to filter services with similar functions. For example, using this label you can make
evaluations of all delete services for the runtime. This label is always directly created from the service
name (character string after last dot).
The metrics, which include the service name already in the metric name, usually do not use this label.
In combination with the label service_domain, you can filter by a specific service.
device_id
Using this label, you can identify for analyses, which client made the request. For example, this can be
helpful if several users work on different devices with the same user name.
user_id
Using this label, you can make analyses for the query of specific users. Optionally, you can also compare
the queries of different users.
distribution_id
You use this label to distinguish several parallel services having the same task. You usually use these
parallel services to distribute the load.
The content of this label is usually directly derived from the service parameter distribution.id.
resultset_id
If a service returns several different result sets to the client, you can use this label to identify for each
result set how many data records it includes.
processing_result
You use this label as additional filter to identify processings that have actually processed data.
Valid values:
 processed
 empty
 failed
Specific services can also use other values.
SIS-CSA_30.docx Version: 1.2.23517 Page 13 of 26

Cockpit for System Administrators
data_type
If metrics with the same name are output for different data in a service, then you can use this label to
identify the data the metric refers to.
Example: Process data statistics are generated for each operation logon period. When the metrics for
the number of "relevant" data records are output, you can use the label data_type to
distinguish the following metrics:
a) wsp.services.subset.records.total_count/_max/_sum
{…,
data_type=“OperationLogonPeriods”
record_type=”processed”
}
 Number of processed operation logon periods
b) wsp.services.subset.records.total_count/_max/_sum
{…,
data_type=“OperationLogonPeriods”
record_type=”remaining”
}
 Number of the operation logon periods that must still be processed (later).
c) wsp.services.subset.records.total_count/_max/_sum
{…,
data_type=“ProcessValueStatistics”
record_type=”compressed”
}
 Number of compressed process parameter statistics
If a service includes only metrics of one kind of data, then this label is not needed.
In the context of other metrics, you can use this label for similar purposes. For example, with file-based
processings you can distinguish the different file types.
record_type
You can use this label to evaluate for all services how many data records were created, deleted,
changed, for example.
Valid values:
 deleted
 inserted
 updated
SIS-CSA_30.docx Version: 1.2.23517 Page 14 of 26

Cockpit for System Administrators
 listed
Specific services can also use other values.
file_type
You can use this label to distinguish the different types of files that might be relevant in the context of a
service call.
Valid values:
 processed
 remaining
Specific services can also use other values.
4.5 Metrics of specific services
4.5.1 AnalysisOperationLogonPeriods.importFromManufacturi
ng
The following service-specific metrics are provided by the service
AnalysisOperationLogonPeriods.importFromManufacturing:
Metric name with labels Type Value
wsp.services.subset.records.total_count/ Summary Number of processed data
_max/_sum records
{service_domain=”AnalysisOperationLogonP
If the service is finished with an
eriods”,
error, then the output is 0. In this
case, the label
service_function=”importFromManufacturin
g”, processing_result gets the
distribution_id=””, value failed.
If no data records are imported,
processing_result=”processed|empty|faile
the label processing_result
d”,
gets the value empty, otherwise
device_id=”<client device ID>”,
processed.
user_id=”<user ID>”,
data_type=”OperationLogonPeriods”,
record_type=”processed”
}
SIS-CSA_30.docx Version: 1.2.23517 Page 15 of 26

|     |     |     |     | Cockpit for System Administrators  |     |     |
| --- | --- | --- | --- | ---------------------------------- | --- | --- |

| 4.5.2  | ProcessDataSpecifications.batchInsert  |     |     |     |     |     |
| ------ | -------------------------------------- | --- | --- | --- | --- | --- |
The  following  service-specific  metrics  are  provided  by  the  service
ProcessDataSpecifications.batchInsert:
|     | Metric name with labels  |     | Type  |     | Value  |     |
| --- | ------------------------ | --- | ----- | --- | ------ | --- |
wsp.services.subset.records.total_count/ Summary  Number  of  processed  data
| _max/_sum  |     |     |     | records  |     |     |
| ---------- | --- | --- | --- | -------- | --- | --- |
{
If the service is finished with an

service_domain=”ProcessDataSpecification error,  then  the  output  is  0.
Otherwise, the number of data
s”,
 service_function=”batchInsert”,   records  added  to  the  staging
table is output.
 distribution_id=”<content of the
(optional) service parameter
|     |     |     |     | In  case  | of  an  error,  the  | label  |
| --- | --- | --- | --- | --------- | -------------------- | ------ |
distribution.id>”,
processing_result gets the
 processing_result=”processed|failed”,
|     |     |     |     | value  | failed,  otherwise  |     |
| --- | --- | --- | --- | ------ | ------------------- | --- |
 device_id=”<client device ID>”,
processed.
 user_id=”<user ID>”,
 data_type=”ProcessDataSpecifications”,
 record_type=”inserted”
}
| 4.5.3  | ProcessDataSpecifications.distributeStandard  |     |     |     |     |     |
| ------ | --------------------------------------------- | --- | --- | --- | --- | --- |
The  following  service-specific  metrics  are  provided  by  the  service
ProcessDataSpecifications.distributeStandard:
|     | Metric name with labels  |     | Type  |     | Value  |     |
| --- | ------------------------ | --- | ----- | --- | ------ | --- |

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     |     | Page 16 of 26  |     |
| ---------------- | --- | ------------------- | --- | --- | -------------- | --- |

|     |     |     |     | Cockpit for System Administrators  |     |     |     |
| --- | --- | --- | --- | ---------------------------------- | --- | --- | --- |

| wsp.services.subset.records.total_count/ |     |     | Summary  |     |     |     |     |
| ---------------------------------------- | --- | --- | -------- | --- | --- | --- | --- |
Number of processed data records
_max/_sum
If the service is finished with an error,
{service_domain=”ProcessDataSpecificatio
then the output is 0. In this case, the
ns”,
|     |     |     |     | label  processing_result  |     | gets  | the  |
| --- | --- | --- | --- | ------------------------- | --- | ----- | ---- |
 service_function=”distributeStandard”,
|  distribution_id=”<from variable  |     |     |     | value failed.  |     |     |     |
| --------------------------------- | --- | --- | --- | -------------- | --- | --- | --- |
distributionId>”,
If no data records are processed, the

|     |     |     |     | label  processing_result  |     | gets  | the  |
| --- | --- | --- | --- | ------------------------- | --- | ----- | ---- |
processing_result=”processed|empty|faile
value empty, otherwise processed.
d”,
 device_id=”<client device ID>”,
 user_id=”<user ID>”,
 data_type=”ProcessDataSpecifications”,
 record_type=”processed”
}
wsp.services.subset.records.total_count/ Summary  Number of specification changes waiting
| _max/_sum  |     |     |     | to be distributed.  |     |     |     |
| ---------- | --- | --- | --- | ------------------- | --- | --- | --- |
{service_domain=”ProcessDataSpecificatio
If the service is finished with an error,
ns”,
|     |     |     |     | the  label  | processing_result  |     | gets  |
| --- | --- | --- | --- | ----------- | ------------------ | --- | ----- |
 service_function=”distributeStandard”,
the value failed. If no data records
 distribution_id=”<from variable
| distributionId>”,  |     |     |     | were               | processed,  | the        | label  |
| ------------------ | --- | --- | --- | ------------------ | ----------- | ---------- | ------ |
|                    |     |     |     | processing_result  |             | gets  the  | value  |
processing_result=”processed|empty|faile empty, otherwise processed.
d”,
 device_id=”<client device ID>”,
 user_id=”<user ID>”,
 data_type=”ProcessDataSpecifications”,
 record_type=”remaining”
}
| 4.5.4  | ProcessDataSpecifications.insert  |     |     |     |     |     |     |
| ------ | --------------------------------- | --- | --- | --- | --- | --- | --- |
The following service-specific metrics are provided by the service ProcessDataSpecifications.insert:
|     | Metric name with labels  |     | Type  |     | Value  |     |     |
| --- | ------------------------ | --- | ----- | --- | ------ | --- | --- |

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     |     |     | Page 17 of 26  |     |
| ---------------- | --- | ------------------- | --- | --- | --- | -------------- | --- |

|     |     |     | Cockpit for System Administrators  |     |     |
| --- | --- | --- | ---------------------------------- | --- | --- |

| wsp.services.subset.records.total_count/ |     |     | Summary  |                |       |
| ---------------------------------------- | --- | --- | -------- | -------------- | ----- |
|                                          |     |     | Number   | of  processed  | data  |
_max/_sum  records
{
If the service is finished with an

|     |     |     | error,  then  | the  output  | is  0,  |
| --- | --- | --- | ------------- | ------------ | ------- |
service_domain=”ProcessDataSpecification
s”,  otherwise it is 1. In this case, the
label  processing_result
 service_function=”insert”,
 distribution_id=”<content of the  gets  the  value  failed,
(optional) service parameter  otherwise processed.
distribution.id>”,
 processing_result=”processed|failed”,
 device_id=”<client device ID>”,
 user_id=”<user ID>”,
 data_type=”ProcessDataSpecifications”,
 record_type=”inserted”
}
| 4.5.5  | ProcessDataSpecifications.aggregatePeriodicStandard  |     |     |     |     |
| ------ | ---------------------------------------------------- | --- | --- | --- | --- |
The  following  service-specific  metrics  are  provided  by  the  service
ProcessDataSpecifications.aggregatePeriodicStandard:
|     | Metric name with labels  |     | Type  | Value  |     |
| --- | ------------------------ | --- | ----- | ------ | --- |
wsp.services.subset.records.total_count/ Summary  Number  of  processed  data
_max/_sum
records
{service_domain=”ProcessDataSpecificatio
If the service is finished with an
ns”,
error, then the output is 0. In this

|     |     |     | case,  | the  | label  |
| --- | --- | --- | ------ | ---- | ------ |
service_function=”aggregatePeriodicStand
ard ”,   processing_result gets the
value failed.
 distribution_id=””,

|     |     |     | If  no  | data  records  | are  |
| --- | --- | --- | ------- | -------------- | ---- |
processing_result=”processed|empty|faile
|     |     |     | processed,  | the  | label  |
| --- | --- | --- | ----------- | ---- | ------ |
d”,
processing_result gets the
 device_id=”<client device ID>”,
|     |     |     | value  | empty,  | otherwise  |
| --- | --- | --- | ------ | ------- | ---------- |
 user_id=”<user ID>”,
processed.
 data_type=”ProcessDataSpecifications”,
 record_type=”processed”
}

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     | Page 18 of 26  |     |
| ---------------- | --- | ------------------- | --- | -------------- | --- |

|     |     |     | Cockpit for System Administrators  |     |     |
| --- | --- | --- | ---------------------------------- | --- | --- |

wsp.services.subset.records.total_count/ Summary
|            |     |     | Number   | of  processed  | data  |
| ---------- | --- | --- | -------- | -------------- | ----- |
| _max/_sum  |     |     | records  |                |       |
{service_domain=”ProcessDataSpecificatio
If the service is finished with an
ns”,
error, then the output is 0. In this

| service_function=”aggregatePeriodicStand |     |     | case,  | the  | label  |
| ---------------------------------------- | --- | --- | ------ | ---- | ------ |
processing_result gets the
ard ”,
|  distribution_id=””,  |     |     | value failed.  |     |     |
| --------------------- | --- | --- | -------------- | --- | --- |

|     |     |     | If  no  | data  records  | are  |
| --- | --- | --- | ------- | -------------- | ---- |
processing_result=”processed|empty|faile
|     |     |     | processed,  | the  | label  |
| --- | --- | --- | ----------- | ---- | ------ |
d”,
processing_result gets the
 device_id=”<client device ID>”,
|     |     |     | value  | empty,  otherwise  |     |
| --- | --- | --- | ------ | ------------------ | --- |
 user_id=”<user ID>”,
processed.
 data_type=”ProcessDataSpecifications”,
 record_type=”compressed”
}
wsp.services.subset.time_period.total.se Summary  Period  of  time  that  has  been
conds_count/_max/_sum
aggregated (in seconds)
{service_domain=”ProcessDataSpecificatio
If the service is finished with an
ns”,
error, then the output is 0. In this

|     |     |     | case,  | the  | label  |
| --- | --- | --- | ------ | ---- | ------ |
service_function=”aggregatePeriodicStand
| ard ”,                |     |     | processing_result gets the  |     |     |
| --------------------- | --- | --- | --------------------------- | --- | --- |
|  distribution_id=””,  |     |     | value failed.               |     |     |

|     |     |     | If  no  | data  records  | are  |
| --- | --- | --- | ------- | -------------- | ---- |
processing_result=”processed|empty|faile
|     |     |     | processed,  | the  | label  |
| --- | --- | --- | ----------- | ---- | ------ |
d”,
processing_result gets the
 device_id=”<client device ID>”,
|     |     |     | value  | empty,  otherwise  |     |
| --- | --- | --- | ------ | ------------------ | --- |
 user_id=”<user ID>”,
|  period_type=”processed”  |     |     | processed.  |     |     |
| ------------------------- | --- | --- | ----------- | --- | --- |
}
wsp.services.subset.time_period.total.se Summary
|                                          |     |     | Period       | of  time  until  offset  | that  |
| ---------------------------------------- | --- | --- | ------------ | ------------------------ | ----- |
| conds_count/_max/_sum                    |     |     | must  still  | be  aggregated           | (in   |
| {service_domain=”ProcessDataSpecificatio |     |     | seconds)     |                          |       |
ns”,
If the service is finished with an

service_function=”aggregatePeriodicStand error, then the output is 0. In this
|     |     |     | case,  | the  | label  |
| --- | --- | --- | ------ | ---- | ------ |
ard ”,
|  distribution_id=””,  |     |     | processing_result gets the  |     |     |
| --------------------- | --- | --- | --------------------------- | --- | --- |

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     | Page 19 of 26  |     |
| ---------------- | --- | ------------------- | --- | -------------- | --- |

|     |     |     |     | Cockpit for System Administrators  |     |     |
| --- | --- | --- | --- | ---------------------------------- | --- | --- |

|     |     |     |     | value failed.  |     |     |
| --- | --- | --- | --- | -------------- | --- | --- |
processing_result=”processed|empty|faile
|     |     |     |     | If  no  | data  records  | are  |
| --- | --- | --- | --- | ------- | -------------- | ---- |
d”,
|  device_id=”<client device ID>”,  |     |     |     | processed,  | the  | label  |
| --------------------------------- | --- | --- | --- | ----------- | ---- | ------ |
processing_result gets the
 user_id=”<user ID>”,
|  period_type=”remaining”  |     |     |     | value  | empty,  otherwise  |     |
| ------------------------- | --- | --- | --- | ------ | ------------------ | --- |
processed.
}
| 4.5.6  | ProcessDataStatistics.aggregateByOperation  |     |     |     |     |     |
| ------ | ------------------------------------------- | --- | --- | --- | --- | --- |
The  following  service-specific  metrics  are  provided  by  the  service
ProcessDataStatistics.aggregateByOperation:
|     | Metric name with labels  |     | Type  |     | Value  |     |
| --- | ------------------------ | --- | ----- | --- | ------ | --- |
wsp.services.subset.records.total_count/ Summary  Number of processed operation
| _max/_sum  |     |     |     | logon periods  |     |     |
| ---------- | --- | --- | --- | -------------- | --- | --- |
{service_domain=”ProcessDataStatistics”,
|     |     |     |     | If the service is finished with an  |     |     |
| --- | --- | --- | --- | ----------------------------------- | --- | --- |
error, then the output is 0. In this
service_function=”aggregateByOperation”,
|  distribution_id=”<from variable  |     |     |     | case,  | the  | label  |
| --------------------------------- | --- | --- | --- | ------ | ---- | ------ |
processing_result gets the
distributionId>”,
|     |     |     |     | value failed.  |     |     |
| --- | --- | --- | --- | -------------- | --- | --- |
processing_result=”processed|empty|faile
|     |     |     |     | If  no  | data  records  | are  |
| --- | --- | --- | --- | ------- | -------------- | ---- |
d”,
|     |     |     |     | processed,  | the  | label  |
| --- | --- | --- | --- | ----------- | ---- | ------ |
 device_id=”<client device ID>”,
processing_result gets the
 user_id=”<user ID>”,
|     |     |     |     | value  | empty,  otherwise  |     |
| --- | --- | --- | --- | ------ | ------------------ | --- |
 data_type=”OperationLogonPeriods”,
|  record_type=”processed”  |     |     |     | processed.  |     |     |
| ------------------------- | --- | --- | --- | ----------- | --- | --- |
}

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     |     | Page 20 of 26  |     |
| ---------------- | --- | ------------------- | --- | --- | -------------- | --- |

|     |     |     |     | Cockpit for System Administrators  |     |     |
| --- | --- | --- | --- | ---------------------------------- | --- | --- |

| wsp.services.subset.records.total_count/ |     |     | Summary  |          |                |            |
| ---------------------------------------- | --- | --- | -------- | -------- | -------------- | ---------- |
|                                          |     |     |          | Number   | of  operation  | logon      |
| _max/_sum                                |     |     |          | periods  | that  must     | still  be  |
{service_domain=”ProcessDataStatistics”,  processed  (until  specified
|     |     |     |     | offset).  |     |     |
| --- | --- | --- | --- | --------- | --- | --- |
service_function=”aggregateByOperation”,
 distribution_id=”<from variable  If the service is finished with an
|     |     |     |     | error,  | the  | label  |
| --- | --- | --- | --- | ------- | ---- | ------ |
distributionId>”,
|     |     |     |     | processing_result gets the  |     |     |
| --- | --- | --- | --- | --------------------------- | --- | --- |
value failed.
processing_result=”processed|empty|faile
d”,
|     |     |     |     | If  no  | data  records  | are  |
| --- | --- | --- | --- | ------- | -------------- | ---- |
 device_id=”<client device ID>”,
|     |     |     |     | processed,  | the  | label  |
| --- | --- | --- | --- | ----------- | ---- | ------ |
 user_id=”<user ID>”,
processing_result gets the
 data_type=”OperationLogonPeriods”,
|     |     |     |     | value  | empty,  | otherwise  |
| --- | --- | --- | --- | ------ | ------- | ---------- |
 record_type=”remaining”
processed.
}
wsp.services.subset.records.total_count/ Summary  Number  of  processed  data
_max/_sum
records
{service_domain=”ProcessDataStatistics”,
If the service is finished with an

error, then the output is 0. In this
service_function=”aggregateByOperation”,
|     |     |     |     | case,  | the  | label  |
| --- | --- | --- | --- | ------ | ---- | ------ |
 distribution_id=”<from variable
| distributionId>”,  |     |     |     | processing_result gets the  |     |     |
| ------------------ | --- | --- | --- | --------------------------- | --- | --- |
value failed.

processing_result=”processed|empty|faile
|     |     |     |     | If  no  | data  records  | are  |
| --- | --- | --- | --- | ------- | -------------- | ---- |
d”,
|     |     |     |     | processed,  | the  | label  |
| --- | --- | --- | --- | ----------- | ---- | ------ |
 device_id=”<client device ID>”,
processing_result gets the
 user_id=”<user ID>”,
|     |     |     |     | value  | empty,  | otherwise  |
| --- | --- | --- | --- | ------ | ------- | ---------- |
 data_type=”ProcessValueStatistics”
processed.
 record_type=”compressed”
}
| 4.5.7  | ProcessValues.aggregateCurveProgression  |     |     |     |     |     |
| ------ | ---------------------------------------- | --- | --- | --- | --- | --- |
The  following  service-specific  metrics  are  provided  by  the  service
ProcessValues.aggregateCurveProgression:
|     | Metric name with labels  |     | Type  |     | Value  |     |
| --- | ------------------------ | --- | ----- | --- | ------ | --- |

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     |     | Page 21 of 26  |     |
| ---------------- | --- | ------------------- | --- | --- | -------------- | --- |

|     |     |     | Cockpit for System Administrators  |     |     |
| --- | --- | --- | ---------------------------------- | --- | --- |

wsp.service.processvalues.aggregatecurve Summary
Number of processed raw data
| progression.compression.records.total_co |     |     | records  |     |     |
| ---------------------------------------- | --- | --- | -------- | --- | --- |
unt/_max/_sum
If the service is finished with an
{distribution_id=”<content of the
error, then the output is 0. In this
(optional) service parameter
| distribution.id>”,  |     |     | case,  | the  | label  |
| ------------------- | --- | --- | ------ | ---- | ------ |
processing_result gets the

| processing_result=”processed|empty|faile |     |     | value failed.  |     |     |
| ---------------------------------------- | --- | --- | -------------- | --- | --- |
d”,
|     |     |     | This  parameter  | is  written  | for  |
| --- | --- | --- | ---------------- | ------------ | ---- |
 device_id=”<client device ID>”,
|     |     |     | each  table  | that  must  | be  |
| --- | --- | --- | ------------ | ----------- | --- |
 user_id=”<user ID>”,
aggregated (with changing label
 compression=”<target table of
|     |     |     | compression).  | It  is  | globally  |
| --- | --- | --- | -------------- | ------- | --------- |
compression>”,
|     |     |     | written  for  | workplace  | and  |
| --- | --- | --- | ------------- | ---------- | ---- |
 record_type=”processed”
process parameters of the pool
}
of orders.
|     |     |     | If  no      | data  records  | are    |
| --- | --- | --- | ----------- | -------------- | ------ |
|     |     |     | processed,  | the            | label  |
processing_result gets the
|     |     |     | value  empty,  | otherwise  |     |
| --- | --- | --- | -------------- | ---------- | --- |
processed.
wsp.service.processvalues.aggregatecurve Summary  Number  of  aggregated  data
| progression.compression.records.total_co |     |     | records.  |     |     |
| ---------------------------------------- | --- | --- | --------- | --- | --- |
unt/_max/_sum
{distribution_id=”<content of the  If the service is finished with an
error, then the output is 0. In this
(optional) service parameter
| distribution.id>”,  |     |     | case,  | the  | label  |
| ------------------- | --- | --- | ------ | ---- | ------ |
processing_result gets the

| processing_result=”processed|empty|faile |     |     | value failed.  |     |     |
| ---------------------------------------- | --- | --- | -------------- | --- | --- |
d”,
|     |     |     | This  parameter  | is  written  | for  |
| --- | --- | --- | ---------------- | ------------ | ---- |
 device_id=”<client device ID>”,
|     |     |     | each  table  | that  must  | be  |
| --- | --- | --- | ------------ | ----------- | --- |
 user_id=”<user ID>”,
aggregated (with changing label
 compression=”<target table of
|     |     |     | compression).  | It  is  | globally  |
| --- | --- | --- | -------------- | ------- | --------- |
compression>”,
|  record_type=”compressed”  |     |     | written  for  | workplace  | and  |
| -------------------------- | --- | --- | ------------- | ---------- | ---- |
process parameters of the pool
}
of orders.

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     | Page 22 of 26  |     |
| ---------------- | --- | ------------------- | --- | -------------- | --- |

|     |     |     | Cockpit for System Administrators  |     |     |
| --- | --- | --- | ---------------------------------- | --- | --- |

|     |     |     | If  no      | data  records  | are    |
| --- | --- | --- | ----------- | -------------- | ------ |
|     |     |     | processed,  | the            | label  |
processing_result gets the
|     |     |     | value  | empty,  otherwise  |     |
| --- | --- | --- | ------ | ------------------ | --- |
processed.
| 4.5.8  | ProcessValues.batchInsert   |     |     |     |     |
| ------ | --------------------------- | --- | --- | --- | --- |
The following service-specific metrics are provided by the service ProcessValues.batchInsert:
|     | Metric name with labels  |     | Type  | Value  |     |
| --- | ------------------------ | --- | ----- | ------ | --- |
wsp.services.subset.records.total_count/ Summary  Number  of  processed  data
_max/_sum
records
{
If the service is finished with an
 service_domain=”ProcessValues”,
error, then the output is 0.
 service_function=”batchInsert”,
 distribution_id=”<content of the
|     |     |     | In  case  | of  an  error,  the  | label  |
| --- | --- | --- | --------- | -------------------- | ------ |
(optional) service parameter
processing_result gets the
distribution.id>”,
|     |     |     | value  | failed,  otherwise  |     |
| --- | --- | --- | ------ | ------------------- | --- |
 processing_result=”processed|failed”,
processed.
 device_id=”<client device ID>”,
 user_id=”<user ID>”,
 data_type=”ProcessValues”,
 record_type=”inserted”
}
| 4.5.9  | ProcessValues.distributeStandard  |     |     |     |     |
| ------ | --------------------------------- | --- | --- | --- | --- |
The following service-specific metrics are provided by the service ProcessValues.distributeStandard:
|     | Metric name with labels  |     | Type  | Value  |     |
| --- | ------------------------ | --- | ----- | ------ | --- |

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     | Page 23 of 26  |     |
| ---------------- | --- | ------------------- | --- | -------------- | --- |

|     |     |     |     | Cockpit for System Administrators  |     |     |
| --- | --- | --- | --- | ---------------------------------- | --- | --- |

| wsp.services.subset.records.total_count/ |     |     | Summary  |          |                |       |
| ---------------------------------------- | --- | --- | -------- | -------- | -------------- | ----- |
|                                          |     |     |          | Number   | of  processed  | data  |
| _max/_sum                                |     |     |          | records  |                |       |
{service_domain=”ProcessValues”,
If the service is finished with an
 service_function=”distributeStandard”,
error, then the output is 0. In this
 distribution_id=”<from variable
| distributionId>”,  |     |     |     | case,  | the  | label  |
| ------------------ | --- | --- | --- | ------ | ---- | ------ |
processing_result gets the

| processing_result=”processed|empty|faile |     |     |     | value failed.  |     |     |
| ---------------------------------------- | --- | --- | --- | -------------- | --- | --- |
d”,
|     |     |     |     | If  no  | data  records  | are  |
| --- | --- | --- | --- | ------- | -------------- | ---- |
 device_id=”<client device ID>”,
|     |     |     |     | processed,  | the  | label  |
| --- | --- | --- | --- | ----------- | ---- | ------ |
 user_id=”<user ID>”,
processing_result gets the
 data_type=”ProcessValues”,
|     |     |     |     | value  | empty,  otherwise  |     |
| --- | --- | --- | --- | ------ | ------------------ | --- |
 record_type=”processed”
processed.
}
wsp.services.subset.records.total_count/ Summary  Number of process data waiting
| _max/_sum  |     |     |     | to be distributed.  |     |     |
| ---------- | --- | --- | --- | ------------------- | --- | --- |
{service_domain=”ProcessValues”,
In mode SINGLE_SERIAL, this
 service_function=”distributeStandard”,
 distribution_id=”<from variable  metric always includes the value
0.
distributionId>”,

If the service is finished with an
processing_result=”processed|empty|faile
|     |     |     |     | error,  | the  | label  |
| --- | --- | --- | --- | ------- | ---- | ------ |
d”,
processing_result gets the
 device_id=”<client device ID>”,
|     |     |     |     | value  failed.  | If  no  | data  |
| --- | --- | --- | --- | --------------- | ------- | ----- |
 user_id=”<user ID>”,
|     |     |     |     | records  | were  processed,  | the  |
| --- | --- | --- | --- | -------- | ----------------- | ---- |
 data_type=”ProcessValues”,
|     |     |     |     | label  | processing_result  |     |
| --- | --- | --- | --- | ------ | ------------------ | --- |
 record_type=”remaining”
gets the value empty, otherwise
}
processed.
| 4.5.10  | ProcessValues.importFromPccFiles  |     |     |     |     |     |
| ------- | --------------------------------- | --- | --- | --- | --- | --- |
The following service-specific metrics are provided by the service ProcessValues.importFromPccFiles:
|     | Metric name with labels  |     | Type  |     | Value  |     |
| --- | ------------------------ | --- | ----- | --- | ------ | --- |

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     |     | Page 24 of 26  |     |
| ---------------- | --- | ------------------- | --- | --- | -------------- | --- |

|     |     |     | Cockpit for System Administrators  |     |     |
| --- | --- | --- | ---------------------------------- | --- | --- |

wsp.services.subset.records.total_count/ Summary
|            |     |     | Number   | of  processed  | data  |
| ---------- | --- | --- | -------- | -------------- | ----- |
| _max/_sum  |     |     | records  |                |       |
{service_domain=”ProcessValues”,
If the service is finished with an
 service_function=”importFromPccFiles”,
error, then the output is 0. In this
 distribution_id=”<from variable
| distributionId>”,  |     |     | case,  | the  | label  |
| ------------------ | --- | --- | ------ | ---- | ------ |
processing_result gets the

| processing_result=”processed|empty|faile |     |     | value failed.  |     |     |
| ---------------------------------------- | --- | --- | -------------- | --- | --- |
d”,
|     |     |     | If  no  | data  records  | are  |
| --- | --- | --- | ------- | -------------- | ---- |
 device_id=”<client device ID>”,
|     |     |     | processed,  | the  | label  |
| --- | --- | --- | ----------- | ---- | ------ |
 user_id=”<user ID>”,
processing_result gets the
 data_type=”ProcessValues”,
|     |     |     | value  empty,  | otherwise  |     |
| --- | --- | --- | -------------- | ---------- | --- |
 record_type=”processed”
processed.
}
wsp.services.subset.files.total_count/_m Summary  Number of processed files
ax/_sum
If the service is finished with an
{service_domain=”ProcessValues”,
error, then the output is 0. In this
 service_function=”importFromPccFiles”,
|  distribution_id”=”<from variable  |     |     | case,  | the  | label  |
| ---------------------------------- | --- | --- | ------ | ---- | ------ |
processing_result gets the
distributionId>”,
|  device_id=”<client device ID>”,  |     |     | value failed.  |     |     |
| --------------------------------- | --- | --- | -------------- | --- | --- |
 user_id=”<user ID>”,
|     |     |     | If  no  | data  records  | are  |
| --- | --- | --- | ------- | -------------- | ---- |
 file_type=”processed”
|     |     |     | processed,  | the  | label  |
| --- | --- | --- | ----------- | ---- | ------ |
}
processing_result gets the
|     |     |     | value  empty,  | otherwise  |     |
| --- | --- | --- | -------------- | ---------- | --- |
processed.
wsp.services.subset.files.total_count/_m Summary  Number  of  files  waiting  to  be
| ax/_sum  |     |     | processed.  |     |     |
| -------- | --- | --- | ----------- | --- | --- |
{service_domain=”ProcessValues”,
If the service is finished with an
 service_function=”importFromPccFiles”,
|     |     |     | error,  | the  | label  |
| --- | --- | --- | ------- | ---- | ------ |
 distribution_id=”<from variable
processing_result gets the
distributionId>”,
|     |     |     | value  failed.  | If  no  | data  |
| --- | --- | --- | --------------- | ------- | ----- |
processing_result=”processed|empty|faile records  were  processed,  the
| d”,  |     |     | label  processing_result  |     |     |
| ---- | --- | --- | ------------------------- | --- | --- |
 device_id=”<client device ID>”,  gets the value empty, otherwise
 user_id=”<user ID>”,

| SIS-CSA_30.docx  |     | Version: 1.2.23517  |     | Page 25 of 26  |     |
| ---------------- | --- | ------------------- | --- | -------------- | --- |

Cockpit for System Administrators
file_type=”remaining” processed.
}
4.5.11 ProcessValues.insert
The following service-specific metrics are provided by the service ProcessValues.insert:
Metric name with labels Type Value
wsp.services.subset.records.total_count/ Summary Number of processed data
_max/_sum records
{service_domain=”ProcessValues”,
If the service is finished with an
service_function=”insert”,
error, then the output is 0,
distribution_id=”<content of the
(optional) service parameter otherwise it is 1. In this case, the
distribution.id>”, label processing_result
processing_result=”processed|failed”, gets the value failed,
device_id=”<client device ID>”, otherwise processed.
user_id=”<user ID>”,
data_type=”ProcessValues”,
record_type=”inserted”
}
SIS-CSA_30.docx Version: 1.2.23517 Page 26 of 26
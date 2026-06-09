Key Performance Indicators Relating to Workplaces: Configuration
1 Key Performance Indicators Relating to Workplaces:
Configuration
Overview
This document describes the configurations required to calculate and display KPIs relating to shifts and
workplaces.
Integration
The shop floor clients AIP and/or AIP2, the Graphic machinery and Line Andon Board provide KPIs relating
to shifts/workplaces. By configuring these clients, you can view these KPIs. The calculated KPIs correspond
to those also displayed in the Efficiency report and/or the OEE report.
Requirements
AIP / AIP2 Graphic machinery Line Andon Board
Chapter relevant to X X X
Execute the database patch dbp_mde82.hsc and enable the required configuration in the Scheduler.
Enable the configuration in the INI configuration if you want to show the key performance indicators in the
AIP2.
Enable the upgrade aipkpi if you want the AIP and/or AIP2 to show the key performance
indicators.
Enable the upgrade mpark2kpi if you want the graphic machinery to show the key performance
indicators.
Scheduler configuration
AIP / AIP2 Graphic machinery Line Andon Board
Chapter relevant to X X X
Enter and enable the following entry in the Scheduler to provide for a cyclic calculation of KPIs relating to
shifts/workplaces.
MDE_KPI_Configuration.docx Version: 1.5.18468 Page 1 of 8

   Key Performance Indicators Relating to Workplaces: Configuration

| Field              |     | Value             |     |     |     |     |     |
| ------------------ | --- | ----------------- | --- | --- | --- | --- | --- |
| Type               |     | S (Standard)      |     |     |     |     |     |
| Category           |     | I (interval)      |     |     |     |     |     |
| Alterable          |     | Yes               |     |     |     |     |     |
| Visible            |     | Visible           |     |     |     |     |     |
| Product key        |     |                   |     |     |     |     |     |
| License key        |     |                   |     |     |     |     |     |
| Command (Windows)  |     | hymw.exe -u9999   |     |     |     |     |     |
-c“DLG=KEYF.WRITEWPCURSHIFT|RWSC.TIMEOUT=3600|“
| Command (Linux)  |     | hymw.out -u9999   |     |     |     |     |     |
| ---------------- | --- | ----------------- | --- | --- | --- | --- | --- |
-c“DLG=KEYF.WRITEWPCURSHIFT|RWSC.TIMEOUT=3600|“
| Comment   |     | MDE key figure calculation  |     |     |     |     |     |
| --------- | --- | --------------------------- | --- | --- | --- | --- | --- |
| Interval  |     | 0:10:00                     |     |     |     |     |     |
| Active    |     |                            |     |     |     |     |     |

When you install the MDE version 8.2, the database patch dbp_mde82.hsc automatically imports
this entry. However, the entry is disabled by default. Please check at first if the entry already

exists, before you attempt to enter a new one.
The duration required for the calculation of KPIs depends on the following criteria:
- the workplaces you want to calculate the KPIs for

- the KPIs you want to calculate.
Therefore, you should adjust the interval to the number of workplaces and the number of KPIs
you want to calculate. To do so, define the workstations and the KPIs first, then execute the
command directly in a server system environment and check the duration.
The system updates the calculated KPIs relating to shifts/workplaces in the table keyfigures_current_shift.
INI configuration displaying KPIs in the AIP and AIP2
|                      |     | AIP / AIP2  |     | Graphic machinery  |     | Line Andon Board  |     |
| -------------------- | --- | ----------- | --- | ------------------ | --- | ----------------- | --- |
| Chapter relevant to  |     |             | X   |                    | -   |                   | -   |

Add the following entry to the INI configuration in order for the AIP and/or AIP2 to show key performance
indicators. Then restart HYDRA.
| Field    |     | Value  |     |     |     |     |     |
| -------- | --- | ------ | --- | --- | --- | --- | --- |
| Name     |     | MDE    |     |     |     |     |     |
| Section  |     | AIP    |     |     |     |     |     |

| MDE_KPI_Configuration.docx  |     |     | Version: 1.5.18468  |     |     |     | Page 2 of 8  |
| --------------------------- | --- | --- | ------------------- | --- | --- | --- | ------------ |

   Key Performance Indicators Relating to Workplaces: Configuration

| Field    | Value                       |     |     |     |
| -------- | --------------------------- | --- | --- | --- |
| Key      | KEYFIGURES                  |     |     |     |
| Value    | Y                           |     |     |     |
| Active   |                            |     |     |     |
| Comment  | Display key figures in AIP  |     |     |     |

Processing information about the AIP and AIP2
|                      |     | AIP / AIP2  | Graphic machinery  | Line Andon Board  |
| -------------------- | --- | ----------- | ------------------ | ----------------- |
| Chapter relevant to  |     | X           | -                  | -                 |

A service cyclically run via the Scheduler calculates KPIs. The calculated KPIs correspond to those also
displayed in the Efficiency report and/or the OEE report.
The following cycles specify when data is shown in the AIP or AIP2:
  Server processing: according to Scheduler configuration. By default: 600 seconds.
The server runtime depends on:
- the number of KPIs you want to calculate and
- the number of affected workplaces.
  Updating of the machine list (mnr.lst) due to manual postings: at the latest after 900 seconds (default
value).
Therefore, the scrap rate might only be updated and displayed after a delay, for example, if you report part
quantities.
Updating of KPIs might also be delayed after a shift change. Reason: by default the job runs every 10
minutes, i.e. in the worst case the application shows KPIs of the previous shift for up to 9 minutes after a
shift change.
Processing information on the graphic machinery / Line Andon Board
|                      |     | AIP / AIP2  | Graphic machinery  | Line Andon Board  |
| -------------------- | --- | ----------- | ------------------ | ----------------- |
| Chapter relevant to  |     | -           | X                  | X                 |

A service cyclically run via the Scheduler calculates KPIs. The calculated KPIs correspond to those also
displayed in the Efficiency report and/or the OEE report.

MDE_KPI_Configuration.docx  Version: 1.5.18468  Page 3 of 8

   Key Performance Indicators Relating to Workplaces: Configuration

The following cycles specify when data is shown in the graphic machinery:
  Server processing: according to Scheduler configuration. By default: 600 seconds.
The server runtime depends on:
- the number of KPIs you want to calculate and
- the number of affected workplaces.
  Updating of the data displayed in the graphic machinery.
Therefore, the scrap rate might only be updated and displayed after a delay, for example, if you report part
quantities.
Updating of KPIs might also be delayed after a shift change. Reason: by default the job runs every 10
minutes.

Overview of available key performance indicators
|                      |     | AIP / AIP2  |     | Graphic machinery  |     | Line Andon Board  |     |
| -------------------- | --- | ----------- | --- | ------------------ | --- | ----------------- | --- |
| Chapter relevant to  |     | X           |     | X                  |     |                   | X   |

The AIP/AIP2 or the Graphic machinery show the following KPIs relating to workplaces/shifts (if necessary,
you might have to configure the GUI). You can calculate these KPIs at regular intervals.
The Line Andon Board only provides the OEE.
KPI  Formula ID used for  Acronym for the KPI in  Acronym for the color in
|     | changes in the  |     | the file mnr.lst  |     | the file mnr.lst  |     |     |
| --- | --------------- | --- | ----------------- | --- | ----------------- | --- | --- |
formula management
and for the
configuration of limit
values (optional)
| Utilization efficiency  | Rcu       |     | KF.RCU  |     | KF.RCU.COLOR  |     |     |
| ----------------------- | --------- | --- | ------- | --- | ------------- | --- | --- |
| (rate  of               | capacity  |     |         |     |               |     |     |
utilization)
| Allocation efficiency  | Ocu     |     | KF.OCU     |     | KF.OCU.COLOR     |     |     |
| ---------------------- | ------- | --- | ---------- | --- | ---------------- | --- | --- |
| Techn. efficiency      | tec_ef  |     | KF.TEC_EF  |     | KF.TEC_EF.COLOR  |     |     |
| Rate                   | yie_ra  |     | KF.YIE_RA  |     | KF.YIE_RA.COLOR  |     |     |
| Scrap ratio            | scr_ra  |     | KF.SCR_RA  |     | KF.SCR_RA.COLOR  |     |     |
| OEE                    | oee     |     | KF.OEE     |     | KF.OEE.COLOR     |     |     |
| Availability           | avail   |     | KF.AVAIL   |     | KF.AVAIL.COLOR   |     |     |
| Performance            | pf_rat  |     | KF.PF_RAT  |     | KF.PF_RAT.COLOR  |     |     |

| MDE_KPI_Configuration.docx  |     |     | Version: 1.5.18468  |     |     |     | Page 4 of 8  |
| --------------------------- | --- | --- | ------------------- | --- | --- | --- | ------------ |

   Key Performance Indicators Relating to Workplaces: Configuration

KPI  Formula ID used for  Acronym for the KPI in  Acronym for the color in
|     | changes in the  |     | the file mnr.lst  |     | the file mnr.lst  |     |     |
| --- | --------------- | --- | ----------------- | --- | ----------------- | --- | --- |
formula management
and for the
configuration of limit
values (optional)
| Quality             | qual    |     | KF.QUAL    |     | KF.QUAL.COLOR    |     |     |
| ------------------- | ------- | --- | ---------- | --- | ---------------- | --- | --- |
| Machine run time    | mch_rt  |     | KF.MCH_RT  |     | KF.MCH_RT.COLOR  |     |     |
| Actual utilization  | act_ut  |     | KF.ACT_UT  |     | KF.ACT_UT.COLOR  |     |     |
| Yield utilization   | yie_ut  |     | KF.YIE_UT  |     | KF.YIE_UT.COLOR  |     |     |

Configuration of workplaces
|                      |     | AIP / AIP2  |     | Graphic machinery  |     | Line Andon Board  |     |
| -------------------- | --- | ----------- | --- | ------------------ | --- | ----------------- | --- |
| Chapter relevant to  |     | X           |     | X                  |     |                   | X   |

In general, the system calculates key performance indicators for all workplaces. If you only want to calculate
KPIs for specific workplaces, use the Advanced object configuration to define the affected workstations:
| Field            |     | Value                            |     |     |     |     |     |
| ---------------- | --- | -------------------------------- | --- | --- | --- | --- | --- |
| Object type      |     | fixed "KEYFIGURE_CURRENT_SHIFT“  |     |     |     |     |     |
| Object ID 1      |     | fixed "WORKPLACE“                |     |     |     |     |     |
| Object ID 2      |     | <workplace/machine number>       |     |     |     |     |     |
| Parameter        |     | fixed "CONSIDER_IN_SCHEDULER“    |     |     |     |     |     |
| Parameter value  |     | fixed "TRUE“                     |     |     |     |     |     |
| Active           |     |                                 |     |     |     |     |     |

The system calculates all configured key performance indicators for the required workstations.
You must configure the production line (machine/workplace of the type "L") for the Line Andon Board.
Configuration of the key performance indicators you want to calculate
|                      |     | AIP / AIP2  |     | Graphic machinery  |     | Line Andon Board  |     |
| -------------------- | --- | ----------- | --- | ------------------ | --- | ----------------- | --- |
| Chapter relevant to  |     | X           |     | X                  |     |                   | X   |

In general, the system calculates all key performance indicators listed above. If you want to restrict the
KPIs, use the Advanced object configuration to specify the KPIs you want to calculate.

| MDE_KPI_Configuration.docx  |     |     | Version: 1.5.18468  |     |     |     | Page 5 of 8  |
| --------------------------- | --- | --- | ------------------- | --- | --- | --- | ------------ |

   Key Performance Indicators Relating to Workplaces: Configuration

| Field            |     | Value                                  |     |     |     |     |     |
| ---------------- | --- | -------------------------------------- | --- | --- | --- | --- | --- |
| Object type      |     | fixed "KEYFIGURE_CURRENT_SHIFT“        |     |     |     |     |     |
| Object ID 1      |     | fixed "KEYFIGURE“                      |     |     |     |     |     |
| Object ID 2      |     | <abbreviation of the KPI>, e.g. "rcu“  |     |     |     |     |     |
| Parameter        |     | fixed "CONSIDER_IN_SCHEDULER“          |     |     |     |     |     |
| Parameter value  |     | fixed "TRUE“                           |     |     |     |     |     |
| Active           |     |                                       |     |     |     |     |     |

The system calculates key performance indicators for all workplaces or for all workplaces configured above.
Configuration of limit values
|                      |     | AIP / AIP2  |     | Graphic machinery  |     | Line Andon Board  |     |
| -------------------- | --- | ----------- | --- | ------------------ | --- | ----------------- | --- |
| Chapter relevant to  |     | X           |     |                    | X   |                   | X   |

To the right of the KPI, the AIP2 GUI highlights in color if limit values are exceeded or not reached.
The graphic machinery and the Line Andon Board also highlight their layouts if limit values are exceeded
or not reached.
Optionally, you can define workplace-related limit values for color highlighting. You can store these limit
values for each KPI and workstation in the database table keyfigures_target_values. You must maintain
the following fields in the database table:
The table keyfigures_target_values is not intended to be maintained via the MOC. You can use
|                        |   a database frontend to edit the data.  |                                               |     |     |              |     |     |
| ---------------------- | ---------------------------------------- | --------------------------------------------- | --- | --- | ------------ | --- | --- |
| Database field         |                                          | Value                                         |     |     |              |     |     |
| object_type            |                                          | fixed "WORKPLACE“                             |     |     |              |     |     |
| object_id1             |                                          | Workplace number according to configuration.  |     |     |              |     |     |
| object_id2             |                                          |                                               |     |     |              |     |     |
| object_id3             |                                          |                                               |     |     |              |     |     |
| object_id4             |                                          |                                               |     |     |              |     |     |
| key_figure             |                                          | ID of the KPI. Possible values: see below     |     |     |              |     |     |
| upper_tolerance_limit  |                                          | Upper tolerance limit                         |     |     | see below    |     |     |
| upper_action_limit     |                                          | Upper action limit                            |     |     | see below    |     |     |
| upper_tolerance_limit  |                                          | Lower tolerance limit                         |     |     | see below    |     |     |
| lower_action_limit     |                                          | Lower action limit                            |     |     | see below    |     |     |
| target_value           |                                          |                                               |     |     |              |     |     |

| MDE_KPI_Configuration.docx  |     |     | Version: 1.5.18468  |     |     |     | Page 6 of 8  |
| --------------------------- | --- | --- | ------------------- | --- | --- | --- | ------------ |

   Key Performance Indicators Relating to Workplaces: Configuration

| Database field  |     |     | Value                         |     |     |     |     |     |     |     |
| --------------- | --- | --- | ----------------------------- | --- | --- | --- | --- | --- | --- | --- |
| modified_by     |     |     | Last modified by              |     |     |     |     |     |     |     |
| modified_ts     |     |     | Last modified on (date/time)  |     |     |     |     |     |     |     |
Colors are identified as follows:
|     | Lower            |     |     |     |     |     | Upper            |     |     |     |
| --- | ---------------- | --- | --- | --- | --- | --- | ---------------- | --- | --- | --- |
|     | tolerance limit  |     |     |     |     |     | tolerance limit  |     |     |     |
|     | v                |     |     |     |     |     | v                |     |     |     |

|     |     |               | ^       |     | ^             |     |     |     |     |     |
| --- | --- | ------------- | ------- | --- | ------------- | --- | --- | --- | --- | --- |
|     |     |               | Lower   |     | Upper         |     |     |     |     |     |
|     |     | action limit  |         |     | action limit  |     |     |     |     |     |
Only set the lower tolerance limit and lower action limit for KPIs aiming at high values (e.g.
utilization efficiency/rate of capacity utilization).

Only set the upper tolerance limit and upper action limit for KPIs aiming at low values (e.g. scrap
rate).
| The value of the KPI is...  |     |     |     |     | Graphic machinery  |     |     | AIP2  |     |     |
| --------------------------- | --- | --- | --- | --- | ------------------ | --- | --- | ----- | --- | --- |
greater than the upper tolerance limit  Red  $FF0000  Red  $1010D0
between the upper action limit  Yellow  $FFFF00  Orange $1090FF
and the upper tolerance limit
between the lower action limit     Green  $008000  Green  $107000
and the upper action limit
between the lower action limit  Yellow  $FFFF00  Orange $1090FF
and the lower tolerance limit
less than the lower tolerance limit  Red  $FF0000  Red  $1010D0
| Other (no limit values configured)  |     |     |     |     |     |     |     |     |     |     |
| ----------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Gray  $909090
The server identifies the color. For technical reasons, the color code varies for the graphic machinery and
the AIP2.

Configuration of alternative key performance indicators in the AIP2
|                      |     |     | AIP / AIP2  |     | Graphic machinery  |     |     | Line Andon Board  |     |     |
| -------------------- | --- | --- | ----------- | --- | ------------------ | --- | --- | ----------------- | --- | --- |
| Chapter relevant to  |     |     | X           |     |                    | -   |     |                   |     | -   |

The KPIs displayed by default are configured in the below-mentioned xml files. You must locate the KPIs
in the file in order to configure the KPIs. To do so, browse the file for the KPI's abbreviation. For example:
<!--"oee" (OEE)-->.
<AIP2 directory>\gui\a_data_mnr.xml   basic screen "tile design“
  <!--"oee" (OEE)-->

| MDE_KPI_Configuration.docx  |     |     |     | Version: 1.5.18468  |     |     |     |     |     | Page 7 of 8  |
| --------------------------- | --- | --- | --- | ------------------- | --- | --- | --- | --- | --- | ------------ |

Key Performance Indicators Relating to Workplaces: Configuration
<!--"rcu" (rate of capacity utilization/utilization efficiency)-->
<!--"scr_ra" (scrap rate)-->
<AIP2 directory>\gui\a_view_mnr.xml  icon view
<!--"oee" (OEE)-->
<!--"rcu" (rate of capacity utilization/utilization efficiency)-->
<!--"scr_ra" (scrap ratio)-->
This configuration file defines the format for KPIs not relating to durations. The format specifies that you
must enter these key performance indicators with two decimal places:
<AIP2 directory>\gui\globaldefines.xml
<!--Format for mde key figures (KF.OEE, KF.RCU, ...; e.g. %g, %0.2f)-->
<FORMAT_MDEKEYFIGURES>%0.2f</FORMAT_MDEKEYFIGURES>
In addition to the KPIs displayed by default, you can also configure further KPIs or other workstation/shift-
related KPIs to be displayed. The chapter Overview of available key performance indicators describes the
available KPIs and their IDs (acronyms).
Use the formatting
<OnGetDisplayValue>FormatDuration</OnGetDisplayValue>
instead of <DisplayFormat...> for KPIs relating to durations. You can find further information on the
configuration of the AIP2 in the training documents Extended Application Training MES Terminal.
Configuration of KPIs in the AIP basic screen list form
AIP / AIP2 Graphic machinery Line Andon Board
Chapter relevant to X - -
The basic screens of the AIP and AIP2 can also show KPIs in lists. To do so, configure the relevant settings
in the configuration file ctaiplay.ini, e.g.:
[Maschinenliste]
KF.RCU=N3.2,100,R,rate of capacity utilization/utilization efficiency
KF.MCH_RT=hh:mm,100,Z,run time of machines
MDE_KPI_Configuration.docx Version: 1.5.18468 Page 8 of 8
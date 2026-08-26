INI File hytnrcfg.ini

1

INI File hytnrcfg.ini

Usage

The terminal configuration file hytnrcfg.ini is a centrally administered file with which the system behavior

at the HYDRA AIP shop floor clients (ctaip.exe) can be influenced.

Integration

A large variety of applications use this  file in order to check settings stored there and adapt the system

behavior accordingly.

Filing on the HYDRA Server

The file is stored centrally on the HYDRA server.

Assignment type

Path

Standard

HYDRADIR/ctnet/win/aip/hytnrcfg.ini

Globally customer-specific  HYDRADIR/<system directory>/custom/aip/

Terminal group-specific

HYDRADIR/<system directory>/custom/aip/tgrp_<terminal group number>

Example:

HYDRADIR/1/custom/aip/tgrp_901/hytnrcfg.ini

Terminal-specific

HYDRADIR/<system directory>/custom/aip/tnr_<terminal number>

Example:

HYDRADIR/1/custom/aip/tnr_202/hytnrcfg.ini

The file must be created and/or stored in lower case letters. (UNIX is case sensitive).

Assignment Types

The file can be maintained and assigned on different levels:

MBL_TNR_hytnrcfg.docx

Version: 1.0.20762

Page 1 of 2

Standard

The file is delivered in the terminal directory of MPDV. The entries contained there are provided for

INI File hytnrcfg.ini

the standard system.

Globally customer-specific

The file assigned to this level is available to all terminals.

Customer-specific - terminal group-specific

The  terminal  group-specific  file  is  only  relevant  to  the  terminals  assigned  to  the  terminal  group

indicated in the directory name.

Customer-specific - terminal-specific

Terminal-specific assignment enables assignment to each individual terminal.

Processing Mode Depending on Assignment Type

Upon terminal start, the standard file is loaded from the server directory “./ctnet/win/aip/“.

In all cases, the system attempts to merge the standard file supplied by MPDV with a customer-specific

file, if present.

The customer-specific configuration files (if present) are loaded in the specified order from the following

directories by the server.

1)  Globally customer-specific

2)  Customer-specific - terminal group-specific

3)  Customer-specific - terminal-specific

The  file  loaded  last  is  subsequently  merged  with  the  standard  file  and  transferred  to  the  application

directory. This results in the following customizing file priority

1.  Customer-specific - terminal-specific

2.  Customer-specific - terminal group-specific

3.  Globally customer-specific

There is no multiple merging of GLOBAL + TGRP + TNR, but only a single merging of the file

loaded last and the standard file.

The merging of INI files of HYDRA standard and customizing is performed by section. For this

reason,  it  is sufficient  if only  the section to be modified is entered in the customer-specific INI

file.

MBL_TNR_hytnrcfg.docx

Version: 1.0.20762

Page 2 of 2


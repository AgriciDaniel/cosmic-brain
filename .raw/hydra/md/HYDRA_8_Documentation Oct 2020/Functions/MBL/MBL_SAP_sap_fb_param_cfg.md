Configuring function module parameters

1  Configuring function module parameters

Usage

The  integration  of  HYDRA  with  SAP  requires  the  use  of  a  number  of  function  modules  in  SAP.  Each

function module provides a set of import parameters that allow controlling the selection or posting process

in SAP.

In  order  to  provide  the  highest  flexibility  to  control  these  ones  differently,  all  these  parameters  can  be

maintained in a customizing table in HYDRA. Right now there is no graphical user interface to maintain

the table, though any adjustments have to be done by using database interface.

Table: SAP_FB_PARAM_CFG

Field

VARIANTE

T
CHAR

L
30  Variant

Description

FB_NAME

CHAR

30  Name of the function module

PARAM_NAME

CHAR

50  Name of the parameter

Meaning / Remark
The variant is the logical name for a set of parameters for
one or more function modules.

Together  with  the  field  VARIANTE  the  FB_NAME  forms
the key of the table.
The field contains the technical name as it can be found
in SAP transaction SE37

The field contains the technical name as it can be found
in SAP transaction SE37

PARAM_VALUE

CHAR

100  Value of the parameter

Contains the actual value of the parameter, e.g. “X”.

PARAM_TYPE

CHAR

15  Type of the parameter

Future use

PARAM_LENGTH

NUM

10  Length of the parameters

Future use

VERWEIS

Database serial

Consecutive number

MBL_SAP_sap_fb_param_cfg.docx

Version: 1.0.1362

Page 1 of 1


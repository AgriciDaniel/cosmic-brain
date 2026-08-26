HYDRA Settings Relevant to the Application

1  HYDRA Settings Relevant to the Application



Maintenance of the HYDRA distribution model – inbound

Change  existing  entries  or  create  new  entries  in  the  HYDRA  distribution  model  for  HYDRA  inbound

processing:

Parameter name

Value

Processing the PPCC2RECORDER IDoc of the PP-PDC interface

Message type

PPCC2RECORDER

Priority

Command

Command parameter

None

hysapinf.scr

/RECTYPE

Description

PP-PDC / HYINFO – request additional data

Log. target system

Created logical system

Retention period

10

Processing the PPCC2RECORDER IDoc and HYINFO additional data

Message type

PPCC2HYINFOORDER

Priority

Command

None

mle72imp.scr

Command parameter

/VARIANTE=<MLE version to be used>

Description

PP-PDC / HYINFO transfer of additional data

Log. target system

Created logical system

Retention period

10

SAP_ISS_Customizing_HYDRA.docx

Version: 1.6.18468

Page 1 of 7

HYDRA Settings Relevant to the Application

No deletion of the operation's material, tool, NC program

If  HYDRA  receives  components,  tools,  or  NC  programs  for  the  operation,  the  system  enters  the  first

element  transferred  for  the  operation  in  the  corresponding  fields  "material",  "tool"  or  "DNC".  The  same

applies if the tool is assigned by a production variant/version in the Shop Floor Scheduling module.

In  both  cases  it  might  be  necessary  to  prevent  these  operation  entries  from  being  deleted  when  the

components and  PRT lists are deleted routinely  while the system transfers the next operation.  You can

achieve this by setting the relevant entries in the HYDRA INI configuration:

Parameter name

Value

For the material

INI name

Section

Key

Value

Active

Comment

For the tool

INI name

Section

Key

Value

Active

SAP

E2BP_PP_PDC_OPERA2000

PREVENT_ANR_RES_MAT_FROM_DELETION

Y  yes

N  no

Yes

Prevents  the  first  resource  of  the  type  "material"

(ID  "MAT")  included  in  the  component  list  from

being deleted when the component list is deleted.

SAP

E2BP_PP_PDC_OPERA2000

PREVENT_ANR_RES_WNR_FROM_DELETION

Y  yes

N  no

Yes

SAP_ISS_Customizing_HYDRA.docx

Version: 1.6.18468

Page 2 of 7

Parameter name

Value

HYDRA Settings Relevant to the Application

Comment

For the DNC program

INI name

Section

Key

Value

Active

Comment

Prevents  the  first  resource  of  the  type  "tool"  (ID

"FHM"/"PRT") included in the component list from

being deleted when the PRT list is deleted.

SAP

E2BP_PP_PDC_OPERA2000

PREVENT_ANR_RES_DNC_FROM_DELETION

Y  yes

N  no

Yes

Prevents  the  first  resource  of  the  type  "DNC

resource"  (ID  "DNC")  included  in  the  component

list from being deleted when the component list is

deleted.

Requirements:

.\custom\userexit\mle_convfield_in.hsc:

V8.1.1.64407

MLE version:

HY72_031

Preventing the call for deletion records

Use an INI entry if you do not want to request additional data for deletion records:

Parameter name

INI name

Section

Key

Value

SAP

REQUEST_DELETED_OP

PPCC2RECORDER

for PP-PDC

SAP_ISS_Customizing_HYDRA.docx

Version: 1.6.18468

Page 3 of 7

Parameter name

Value

HYDRA Settings Relevant to the Application

Value

Active

Comment

OPERA3

for KK3

OPERA4

for KK4

Y  yes

N  no

Yes

No additional data for deletion records

Requirements:

hysapinf.exe/out:

V8.1.1.41

Preventing  the  transfer  of  overdelivery/underdelivery  details  from  record

type "AV"

Configure  the  HYDRA  INI  configuration  to  prevent  the  overdelivery/underdelivery  information  from  the

record type "AV" from being transferred:

Parameter name

INI name

Section

Key

Value

Active

Comment

Value

SAP

HYINFO_AV

USE_OVER_UNDER_DELIVERY_CHECK

Y  yes (set by default)

N  no

Yes

Transfers  overdelivery/underdelivery  data  from

the HYINFO AV segment

SAP_ISS_Customizing_HYDRA.docx

Version: 1.6.18468

Page 4 of 7

HYDRA Settings Relevant to the Application

If you use the information interface for SAP PP, you cannot use BAPINOUPDATE for the fields

of the following record types:

  Order header data (AK)

  User fields for the header/ operation (AU)

  Operation data (AV)

  Additional texts for the operation (AI)

  Component list (AM)

  Production resources and tools (AF)

  Documents (AC)

Activating the transfer of dialog data strings

Use  the  following  program  parameter  to  activate  the  transfer  of  dialog  data  strings  via  the  HYINFO

module in the ZPP_HYBAPI structure when calling the executing program in the script hysapinf.scr:

Call prior to the change (example for Windows):

$HY_PATH/hysapinf.exe /TL=TRL_ALL $1 $2 $3 $4 $5 $6 $7

Call after the change (example for Windows):

$HY_PATH/hysapinf.exe /Z2BAPI000=ADD $1 $2 $3 $4 $5 $6 $7

Requirements:

hysapinf.exe/out:

V8.1.1.43

Changing the name of the function module Z_PP_HYINFO_GET

If  you  cannot  use  the  name  of  the  HYINFO  function  module  given  by  MPDV  (e.g.  as  internal  naming

conventions prevent it), you can change this name. To do so, use the following program parameter when

calling the executing program in the script hysapinf.scr:

Call prior to the change (example for Windows):

$HY_PATH/hysapinf.exe /TL=TRL_ALL $1 $2 $3 $4 $5 $6 $7

Call after the change (example for Windows):

$HY_PATH/hysapinf.exe /HYINFO_GET=<New Name> $1 $2 $3 $4 $5 $6 $7

SAP_ISS_Customizing_HYDRA.docx

Version: 1.6.18468

Page 5 of 7

HYDRA Settings Relevant to the Application

Changing the name of the table ZPP_HYINFO

If  you  cannot  use  the  name  of  the  ZPP_HYINFO  table  given  by  MPDV  (e.g.  as  internal  naming

conventions prevent it), you can change this name. To do so, use the following program parameter when

calling the executing program in the script hysapinf.scr:

Call prior to the change (example for Windows):

$HY_PATH/hysapinf.exe /TL=TRL_ALL $1 $2 $3 $4 $5 $6 $7

Call after the change (example for Windows):

$HY_PATH/hysapinf.exe /HYINFO_ITAB=<New Name> $1 $2 $3 $4 $5 $6 $7

Changing the name of the table ZPP_HYBAPI

If  you  cannot  use  the  name  of  the  ZPP_HYBAPI  table  given  by  MPDV  (e.g.  as  internal  naming

conventions prevent it), you can change this name. To do so, use the following program parameter when

calling the executing program in the script hysapinf.scr:

Call prior to the change (example for Windows):

$HY_PATH/hysapinf.exe /TL=TRL_ALL $1 $2 $3 $4 $5 $6 $7

Call after the change (example for Windows):

$HY_PATH/hysapinf.exe /Z2BAPI_ITAB=<New Name> $1 $2 $3 $4 $5 $6 $7

Prevent processing of OPs until HYINFO is processed

Add  the  following  entry  to  the  HYDRA  INI  configuration  if  you  want  to  lock  operations  until  the  original

data  and  additional  data  have  been

imported  completely

from

the  HYINFO  module

(MBL_SAP_Implementation_HYINFO_FB).

Parameter name

INI name

Section

Key

Value

Active

Value

SAP

E2BP_PP_PDC_OPERA2000

SET_OPS_TO_BLOCKED

Y  yes

Yes

SAP_ISS_Customizing_HYDRA.docx

Version: 1.6.18468

Page 6 of 7

HYDRA Settings Relevant to the Application

Parameter name

Value

Comment

Locks OPs until HYINFO has been processed

Requirements:

This  function  requires  service  pack  14  (or  higher)  or  installation  of  an  update  package.  The
update package must include the following software components:

hymw.exe/out:

hyerror.msg/en

lib\b_anr.dll/so

MLE version

V8.1.1.646

V8.1.1.646

V8.1.1.356

HY72_034

MOC Language Resources

1.0.STD.66720

SAP_ISS_Customizing_HYDRA.docx

Version: 1.6.18468

Page 7 of 7


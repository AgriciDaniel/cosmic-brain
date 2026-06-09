Operation Object

1  Operation Object

Definition

The  operation  or  procedure  is  one  step  within  a  work  flow  during  which  a  manufactured  quantity  of  an

order's article is produced.

In addition to the operation number, the information listed below is needed to identify the operation:

  A written description of the work that needs to be performed

  The required workplace or the required group of identical workplaces



In some cases, any other resources needed (e.g. tools, drawings, NC programs)

  Time needed to carry out the work (e.g. setup time, processing time)

  Target quantity (batch size)

If  different  machines  or  groups  are  required  for  production,  this  is  what  we  refer  to  as  multilevel

production. Therefore, multilevel production includes several machine-related operations, which normally

run one after the next. The number of operations needed for an order is not limited.

Terms  used  synonymously  for  the  term  operation  are:  procedure  or  order  sequence/maintenance

sequence (AFO). Oftentimes, the term order itself is also used synonymously.

Usage

All activities that a person carries out on a machine/work station are order and/or operation related. The

posting of the order and operation answers the question what is being done and/or what activity is being

carried out.

OBJECT_MES-Operation.docx

Version: 1.0.1362

Page 1 of 2

Operation Object

Structure

Each  operation  can  be  identified  by  the  relevant  combination  of  the  unique  order  number  and  the

sequence  and  operation  number.  This  is  either  provided  and  administered  by  an  upstream  system

(generally ERP system) or by the MES system itself. The object "operation" is subordinate to the object

"order" and "sequence" and is structured as follows:

Please note: the object order sequence is only used if specifically requested.

Integration

The operation outputs a material with a specific material type. The operation also includes as additional

information the bill of materials or rather the component list showing the materials that are needed or that

are relevant in manufacturing the article. The same applies to the range of different production resources

(e.g. tools) itemized in the production resources and tools list.

OBJECT_MES-Operation.docx

Version: 1.0.1362

Page 2 of 2


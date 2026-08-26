Composition Recipe

1  Composition Recipe

Summary

Menu

Master data  Material  Composition recipe

Transaction code

core

Function authorization

core

Utilization

The  composition  recipe  defines  the  expected  chemical  composition  of  input  materials  and  output

materials.

Integration

The  composition  recipe  is  the  basic  prerequisite  for  composition.  Once  the  charging  order  has  been

released,  the  recipe  is  used  for  the  determination  of  samples.  An  inspection  request  is  generated  as  a

part of the release process. The used inspection plan is referenced in the generated inspection request.

Prerequisite

The material  for  which  the  recipe  is  to  be  created  needs  to  be  defined  within  the material  master  to  be

able  to  create  composition  recipes.  In  addition,  the  chemical  elements  to  be  used  in  the  composition

recipe also need to be defined.

Selection criteria

The paragraph that follows shows some of the available selection criteria. Self-explanatory filter options

are not listed.

Area

"Composition recipe" is set here by default.

Active

By checking this checkbox, the list of composition recipes can be restricted to active recipes. If this

checkbox  is  not  checked,  the  list  only  shows  composition  recipes  in  the  status  "in  process"  and

"released". The third state of this checkbox (grayed out) shows all composition recipes. This is the

initial state.

Recipe number

Filters the recipe numbers of composition recipes.

MOC_CompositionRecipe.docx

Version: 1.0.1362

Page 1 of 5

Composition Recipe

Recipe version

Filters the recipe version of composition recipes.

Field descriptions

Area, recipe number, recipe version

The "area", "recipe number" and "recipe version" uniquely identify all existing composition recipes.

The  area  is  set  to  "composition  recipe".  The  recipe  number  and  recipe  version  may  be  entered

using alphanumeric characters. All these fields are mandatory fields.

By  assigning  a  structured  recipe  number,  it  is  possible  to  provide  specific  information.  This

information might be useful later during sorting. If an existing recipe version is to be modified, yet it

cannot just be changed because it has already been used for the generation of inspection orders, it

is  recommended  to  copy  the  original  composition  recipe  and  to  modify  the  recipe  version  (e.g.

incrementing it by 1). The recipe number should be kept as far as possible.

Material number

Shows the material number. If it is known it can be entered directly. Otherwise, the material dialog

can  be  opened  and  the  provided  filter  and  sort  criteria may  be  used  to  identify  and  take  over  the

required  material.  Once  a  material  has  been  chosen  from  the  master  data  record,  the  material

designation,  customer  article  number  and  drawing  issue  number  are  taken  over  and  displayed  in

the relevant fields.

Released/active

Shows whether the inspection recipe is "released" and/or "active". If the recipe is released or active

the  corresponding  checkboxes  are  checked.  A  recipe  is  released  and  enabled,  i.e.  its  status  is

changed, only by  using the corresponding toolbar functions. A recipe has to be released before it

can be activated.

Inspection  orders  are  generated  in  the  system  to  perform  composition.  Please  note  that  the

automatic generation of inspection orders only considers released composition recipes.

Released by / on

Shows the HYDRA user who has released the recipe. The release date is displayed additionally.

MOC_CompositionRecipe.docx

Version: 1.0.1362

Page 2 of 5

Composition Recipe

Valid from / until

If required, a validity period may be entered here, instead of the "unrestricted" activation (using the

toolbar).  This  period  is  then  taken  into  account  when  the  inspection  order  is  generated.  Yet

activation for a certain period means that the user has no clear overview of currently valid inspection

plans,  and  it  is  therefore  recommended  to  use  the  "global/unrestricted"  activation  option  using  the

toolbar. If activated by toolbar functions, the system carefully monitors whether an active inspection

plan  already  exists  for  the  specified  article  and  it  also  includes  the  same  drawing  issue  number,

customers  and  suppliers.  If  this  is  indeed  the  case,  the  previously  active  inspection  plan  will

automatically be disabled.

Editing functions

The key fields "area", "recipe number" and "recipe version" cannot be changed in the editing mode.

Toolbar

Copy

A corresponding dialog opens for copying of a composition recipe.

The  target  area  type  and  target  area  may  be  entered  here.  Normally,  the  user  should  choose  an

area that is identical to that of the source inspection plan. Then the new recipe number and recipe

version need to be  entered. In case a new version  is  generated from an existing recipe, normally

the same recipe number is used and only the recipe version is changed.

Activate

Function authorization: core.activate

Makes the composition recipe status "active“.

Deactivate

Function authorization: core.deactiv

Puts the composition recipe that is in the "active" status back to the "released" status.

Release

Function authorization: core.release

Puts a composition recipe that is in the "in process" status to the "released" status.

In process

Function authorization: core.unreal

Puts a composition recipe that is in the "active" or "released" status to the "in process" status.

MOC_CompositionRecipe.docx

Version: 1.0.1362

Page 3 of 5

Detail application "print form"

Function authorization

core.print

Composition Recipe

The print dialog opens a  list of available reports.  These are Word forms. The potential content of these

forms is determined by the Web services that are available in the respective context. The form entries, i.e.

the  contents  of  the  list  of  forms  of  the  corresponding  print  dialog,  are  defined  within  the  master  data  of

quality management. The basis for new forms and the corresponding form properties are defined there as

well. A corresponding license is required to be able to change the forms as regards content and design.

Detail application "characteristics"

The  detail  application  for  characteristics  is  nearly  identical  to  the  master  data  of  characteristics

application. For this reason, reference is made here only to modifications or additional features.

The  relevant  characteristics  are  assigned  to  the  previously  defined  composition  recipe  on  the  level  of

characteristics.  Characteristics  are  assigned  by  creating  a  new  data  record  and  by  opening  the

characteristic catalog and accepting the characteristic selected there. All master data entries are copied

into  the  characteristic,  once  the  characteristic  has  been  taken  over.  Each  (copied)  information  can  be

changed  and/or  amended  afterwards.  Characteristic  designations  are  often  supplemented  to  define  the

characteristic in more detail.

It  is  also  possible  to  create  a  characteristic  that  is  not  included  in  the  characteristics  catalog.  However,

this is recommended only in exceptional cases, since all analyses (e.g. failure mode analysis) are based

on  characteristics  included  in  the  catalog.  It  is  therefore  recommendable  to  maintain  the  characteristics

catalog properly.

Different properties and settings can still be defined, before specific characteristic data is supplemented.

Field descriptions

Position

The position determines the order of subsequent inspections. The input must be unique. Ideally, the

position  number  should  be  incremented  in  steps  of  ten  when  new  data  records  are  created.

Consequently,  a new characteristic may still be inserted  between two existing characteristics at  a

later point in time.

Characteristics number

Number of the characteristic selected from master data.

Characteristic designation

Designation of the selected characteristic.

MOC_CompositionRecipe.docx

Version: 1.0.1362

Page 4 of 5

Composition Recipe

Detail application "inspection plan documents"

As  many  documents  as  required  may  be  assigned  to  each  composition  recipe,  provided  that  the

"inspection plan documents" tab has been enabled in the master detail grid. By enabling these tabs, the

toolbar provides corresponding buttons to edit documents.

All  formats  registered  by  Windows  are  available,  when  documents  are  assigned.  Consequently,  simple

documents  (e.g.  written  in  Word),  drawings  of  any  format  and  videos  may  be  assigned.  However,  the

corresponding programs that are able to display the required formats have to be installed. In this context,

the documents are opened by the program that has been linked in Windows.

The  file  types  "FILE",  "URL"  and  "Text"  are  provided.  The  file  name  including  path  may  be  entered

manually  with  the  "file"  type.  The  "URL"  file  type  allows  access  to  the  Internet  or  Intranet.  The  third  file

type "Text" allows for text to be entered directly.

A designation may be assigned to each defined document. Moreover, it may also be determined in which

order  the  documents  are  to  be  listed.  The  "position"  field  is  used  for  this  purpose  (numeric  input).  The

specifications made within this list must be unique. In addition, the checkbox "display during inspection"

specifies whether or not the document may be shown during the inspection process.

MOC_CompositionRecipe.docx

Version: 1.0.1362

Page 5 of 5


  Development Suite MES-Cockpit - XML File Interface

1  Development Suite MES-Cockpit - XML File Interface

The  defined  XML  file  interface  also  used  by  default  can  be  implemented  to  integrate  customer-specific

basic KPIs.

The requirements for using the XML file interface are:

  The structure described here has been adhered to

  Data  is  transferred  for  existing  data  types  and/or  new  data  types  have  been  created  in  MES-

Cockpit as described in the document entitled MESC_DevelopmentSuite.pdf.

  Meta data/master data of objects are included

  Data to be transferred has to be filed in a new directory on the MES-Cockpit server. The directory

name starts with the object name plus an underscore character "_". e.g. Workplace_

The  defined  storage  locations  can  be  found  in  the  configuration  file  MESC_DataLocations.txt

(c:\ProgramData\QlikTech\Documents\conf\)

1.1  General

The  MESC_Loader.qvw  application  processes  serialized  data  in  XML  format.  Several  types  are

differentiated. Different types of data are stored in separate directories.

1.2  Master data

Master data is stored in a separate file for each site according to the following pattern:

<?xml version="1.0"?>

<MescData xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

xmlns:xsd="http://www.w3.org/2001/XMLSchema">

  <Meta>

    <Plant>Werk4</Plant>

    <ObjectType>Operation</ObjectType>

    <DataType>masterdata</DataType>

    <CreationTime>2014-09-09T07:48:44.9645867+02:00</CreationTime>

    <ValidFrom>0001-01-01T00:00:00</ValidFrom>

    <ValidTo>0001-01-01T00:00:00</ValidTo>

  </Meta>

MESC_DevelopmentSuiteInterface.docx  Version: 1.0.2219

Page 1 of 3

  Development Suite MES-Cockpit - XML File Interface

  <Content>

    <MasterData>

      <Id>Id0</Id>

<Info>

        <Parameter Type="decimal" Name="dec1" Value="8000.000000" />

        <Parameter Type="string" Name="text1" Value="value" />

        <Parameter Type="number" Name="num1" Value="18000" />

<Parameter Type="datetime" Name="time1" Value="2004-06-18 06:20:16" />

      </Info>

    </MasterData>

</Content>

General information on data is filed within the meta element. The internal site ID is indicated in the plant

element. With master data the DataType element is set to masterdata. The object type is defined in the

ObjectType element.

Data  objects  are  stored  in  MasterData  elements  (as  many  as  required  for  each  XML).  Each  object  is

identified  by  a  distinct  ID.  As  many  parameters  as  you  like  can  be  indicated  for  each  object.  Each

parameter has a specific type (decimal, string, number, datetime), a name and a value that is formatted

accordingly.  Number  parameters  are  integers;  decimal  parameters  are  decimals  with  6  decimal  places

(dots are used as decimal separators) and time stamps are specified according to the ISO format.

1.3  Basic KPIs

Basic KPIs are determined and stored for each shift.

<?xml version="1.0"?>

<MescData xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

xmlns:xsd="http://www.w3.org/2001/XMLSchema">

  <Meta>

    <Plant>Werk2</Plant>

    <ObjectType>Operation </ObjectType>

    <DataType>keyfiguredata</DataType>

    <CreationTime>2014-08-29T09:08:26.3090441+02:00</CreationTime>

MESC_DevelopmentSuiteInterface.docx  Version: 1.0.2219

Page 2 of 3

  Development Suite MES-Cockpit - XML File Interface

    <ValidFrom>2012-01-11T00:00:00</ValidFrom>

    <ValidTo>2012-01-11T00:00:00</ValidTo>

  </Meta>

  <Content>

    <Block ObjectId="Id1" RefDate="2012-01-11" ShiftNo="1">

      <KeyFigures>

        <Entry Key="kf1" Value="1.000000" />

        <Entry Key="kf2" Value="1.234567" />

      </KeyFigures>

    </Block>

  </Content>

</MescData>

Similar to master data, general information is stored in the meta element and the data itself is filed in the

content element.

Data  is  stored  in  as  many  sections/block  elements  as  required.  Each  block  is  distinctly  identified  by  an

object  ID  (ObjectId),  the  shift  date  (RefDate)  stated  according  to  the  ISO  format  and  the  shift  number

(ShiftNo). KPIs are stored as entries in the block. KPIs are always decimals with 6 decimal places (dots

are used as decimal separators).

MESC_DevelopmentSuiteInterface.docx  Version: 1.0.2219

Page 3 of 3


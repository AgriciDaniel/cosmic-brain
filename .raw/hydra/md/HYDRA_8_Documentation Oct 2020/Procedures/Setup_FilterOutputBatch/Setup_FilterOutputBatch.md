Configuration: Filter by produced output batches

1  Configuration: Filter by produced output batches

Purpose

Use this configuration if you want to filter the third list of the AIP 8.2 in the main view. The filter affects the

produced output batches displayed in the third list. The filter specifies that the  produced output batches

only show those batches pertaining to a currently logged in operation.

Requirements

Service pack 12 must be installed.

Procedure

By default, the file globaldefines.xml includes a commented out text block. The commented out text block

is:

GLOBALDEFINES.XML

...
<!-- <FilterFields>

        <Field ID="1">AST=L</Field>

      </FilterFields> -->

...

Comment in the text block. You activate the filter if you comment in the text block. Remove the characters

<!-- and --> at the beginning and end of the text block in order to comment in the text block. The result must

look as follows:

GLOBALDEFINES.XML

...
      <FilterFields>

        <Field ID="1">AST=L</Field>

      </FilterFields>

...

Setup_FilterOutputBatch.docx

Version: 1.0.10865

Page 1 of 2

Configuration: Filter by produced output batches

Result

The third list in the Produced output batches tab of the AIP 8.2 main view is filtered by logged in operations.

Setup_FilterOutputBatch.docx

Version: 1.0.10865

Page 2 of 2


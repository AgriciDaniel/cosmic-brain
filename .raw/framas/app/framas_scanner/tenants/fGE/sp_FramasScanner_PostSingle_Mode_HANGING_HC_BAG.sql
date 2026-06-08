SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		congdat.nguyen@framas.com
-- Create date: 2026-06-08
-- Description:	Posts a single HC Compound/Material lot scan (QR format Product-LotNO,
--              e.g. RCM00001-000023) for HANGING_HC_BAG mode: writes the scan tag to
--              FT176, removes the pending ScanningLabel row, inserts the final
--              ScannedLabel record, then returns the posted row.
-- =============================================
ALTER PROCEDURE [dbo].[sp_FramasScanner_PostSingle_Mode_HANGING_HC_BAG]
    @qr nvarchar(1000),
    @userId nvarchar(50),
    @mode nvarchar(50),
    @whFrom nvarchar(50),
    @whTo nvarchar(50),
    @deviceId nvarchar(50),
    @scanTime datetime,
    @postTime datetime = NULL,
    @ipAdd nvarchar(50) = '',
    @postingText nvarchar(100) = '',
    @inputQuantity float = 0.0,
    @transactionId uniqueidentifier = NULL,
    @inputValue1 nvarchar(500) = NULL,
    @inputValue2 nvarchar(500) = NULL,
    @inputValue3 nvarchar(500) = NULL,
    @inputValue4 nvarchar(500) = NULL,
    @inputValue5 nvarchar(500) = NULL,
    @nfcValue1 nvarchar(500) = NULL,
    @nfcValue2 nvarchar(500) = NULL,
    @nfcValue3 nvarchar(500) = NULL,
    @nfcValue4 nvarchar(500) = NULL,
    @nfcValue5 nvarchar(500) = NULL,
    @flag int = 0,
    @culture nvarchar(500) = 'en',
    @traceId nvarchar(32) = NULL,
    @xmlFile nvarchar(100) = NULL,
    @unitPrice float = NULL,
    @scanningId int = NULL
AS
BEGIN
    -- Prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;
	declare @success bit = 0;
	declare @message nvarchar(500) = ''
	declare @productCode nvarchar(500) = null;

    -- Ex: RCM00001-000023
	select
		@productCode = C1
	from fn_SplitStringToColumns(@qr, '-')

    insert into FT176 (
        CreatedDate,
        CreatedBy,
        CreatedMachine,
        ModifiedDate,
        ModifiedBy,
        ModifiedMachine,
        Actived,
        TransactionId,
        C000,
        C001,
        C002
    ) values (
        @postTime,
        @userId,
        @deviceId,
        @postTime,
        @userId,
        @deviceId,
        1,
        @transactionId,
        @qr,
        @qr,
        @productCode
    )
    
	-- Clean up
	DELETE FROM lmpScannerClient_ScanningLabel WHERE Id = @scanningId;
	DECLARE @generated_keys table([Id] uniqueidentifier)

	insert into lmpScannerClient_ScannedLabel (
		  QRCode
		, UserId
		, DeviceId
		, WHFrom
		, WHTo
		, Mode
		, ScanTime
		, PostTime
		, IpAdd
		, PostingText
		, Quantity
		, Quantity2
		, Actived
		, c020 -- PostingType		
		, InputValue1
		, InputValue2
		, InputValue3
		, InputValue4
		, InputValue5
		, NfcValue1
		, NfcValue2
		, NfcValue3
		, NfcValue4
		, NfcValue5
		, TransactionId
		, Flag
		, TraceId
		, UnitPrice
	) 
	output inserted.Id into @generated_keys
	values (
		  @qr
		, @userId
		, @deviceId
		, @whFrom
		, @whTo
		, @mode
		, @scanTime
		, @postTime
		, @ipAdd
		, @postingText
		, @inputQuantity
		, @inputQuantity * 1000
		, 1 -- Active
		, NULL
		, @inputValue1
		, @inputValue2
		, @inputValue3
		, @inputValue4
		, @inputValue5
		, @nfcValue1
		, @nfcValue2
		, @nfcValue3
		, @nfcValue4
		, @nfcValue5
		, @transactionId
		, @flag
		, @traceId
		, @unitPrice
	)		

	set @success = 1
	select 
		@success as [Success],
		@message as [Message],
		sn.*
	from @generated_keys k
	inner join lmpScannerClient_ScannedLabel sn on sn.Id = k.Id
	WHERE @@ROWCOUNT > 0
END
GO

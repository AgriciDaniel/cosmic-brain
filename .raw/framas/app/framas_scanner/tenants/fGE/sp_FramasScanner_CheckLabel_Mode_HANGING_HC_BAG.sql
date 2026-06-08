SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		congdat.nguyen@framas.com
-- Create date: 2026-06-08
-- Description:	Validates a HC Compound/Material lot QR label (format Product-LotNO,
--              e.g. RCM00001-000023) for HANGING_HC_BAG scan mode: rejects malformed
--              QR, blocks re-scans via FT176, resolves product name from T027,
--              then records/returns the scan result.
-- =============================================
ALTER PROCEDURE [dbo].[sp_FramasScanner_CheckLabel_Mode_HANGING_HC_BAG]
	@qr nvarchar(500),
	@userId nvarchar(50),
	@mode nvarchar(50),
	@whFrom nvarchar(max),
	@whTo nvarchar(max),
	@lock bit,
	@inputQuantity float = null,
	@transactionId uniqueidentifier = null,
	@inputValue1 nvarchar(500) = null,
	@inputValue2 nvarchar(500) = null,
	@inputValue3 nvarchar(500) = null,
	@inputValue4 nvarchar(500) = null,
	@inputValue5 nvarchar(500) = null,
	@nfcValue1 nvarchar(500) = null,
	@nfcValue2 nvarchar(500) = null,
	@nfcValue3 nvarchar(500) = null,
	@nfcValue4 nvarchar(500) = null,
	@nfcValue5 nvarchar(500) = null,
	@culture nvarchar(500) = 'en',
	@deviceId nvarchar(50) = null,
	@traceId nvarchar(32) = null
AS
BEGIN
	SET NOCOUNT ON;

	declare @accept bit = 0, @reload bit = 0;
	declare @message nvarchar(500) = '';

	declare @requireQuantity bit = 0;
	declare @requireInput bit = 0;
	declare @editable bit = 0;
	declare @inputDef1 nvarchar(500) = '';
	declare @inputDef2 nvarchar(500) = '';
	declare @inputDef3 nvarchar(500) = '';
	declare @inputDef4 nvarchar(500) = '';
	declare @inputDef5 nvarchar(500) = '';
	declare @displayText1 nvarchar(500) = '';
	declare @displayText2 nvarchar(500) = '';
	declare @displayText3 nvarchar(500) = '';
	declare @displayText4 nvarchar(500) = '';
	declare @displayText5 nvarchar(500) = '';
	declare @nfcDef1 nvarchar(500) = '';
	declare @nfcDef2 nvarchar(500) = '';
	declare @nfcDef3 nvarchar(500) = '';
	declare @nfcDef4 nvarchar(500) = '';
	declare @nfcDef5 nvarchar(500) = '';
	declare @ocNumber		nvarchar(100) = null;
	declare @productCode	nvarchar(500) = null;
	declare @symbol			nvarchar(1) = null;
	declare @boxInOc		nvarchar(20) = null;

	-- scan audit (re-scan check)
	declare @scanAt nvarchar(20), @scanBy nvarchar(500)

	-- Check the QR should be HC Compound QRCode ex: RCM00119|20241023-0246
	if @qr not like '%-%'
	begin
		set @message = N'This label is invalid. %s'
		exec sp_FramasScanner_GetLocalizeText @message, @culture, @message output
		set @message = FORMATMESSAGE(@message, @qr)
		goto COMPLETE		
	end

	-- HC Material - Lot Label Content: RCM00001-000023
	-- Product-LotNO
    IF EXISTS (
        select 1 from FT176 (NOLOCK) WHERE FT176.C001 = @qr and Actived = 1
    )
    BEGIN
        select 
            @scanAt = FORMAT(CreatedDate, 'MM/dd/yyyy HH:mm'), @scanBy = CreatedBy
        from FT176 (NOLOCK) WHERE FT176.C001 = @qr and Actived = 1

        set @message = N'This label was scan before. At %s by %s'
		exec sp_FramasScanner_GetLocalizeText @message, @culture, @message output
		set @message = FORMATMESSAGE(@message, @scanAt, @scanBy)
		goto COMPLETE		
    END

	-- Ex: RCM00001-000023
	select
		@productCode = C1
	from fn_SplitStringToColumns(@qr, '-')

    select 
        @inputValue1 = C003 
    from CWL..T027 
    where C002 = @productCode

	set @accept = 1
	goto COMPLETE		

COMPLETE:

	set @displayText1 = '<Label Margin="4,0,0,0" FontSize="20" TextColor="Gold" Text="'+@qr+'"></Label>'
	set @displayText2 = '<Label Margin="4,0,0,0" FontSize="18" Text="Product name: '+@inputValue1+'"></Label>'	

	if @accept = 1
	begin
		if @lock = 1
		begin
			insert into lmpScannerClient_ScanningLabel (
				QRCode, UserId, Lock, Mode, CreatedTime, Quantity, WHFrom, WHTo, OCNum, BoxCode, Unit, ProductNumber,
				RequireQuantity, RequireInput, InputDef1, InputDef2, InputDef3, InputDef4, InputDef5, 
				DisplayText1, DisplayText2, DisplayText3, DisplayText4, DisplayText5,
				InputValue1, InputValue2, InputValue3, InputValue4, InputValue5, TransactionId,
				NfcDef1, NfcDef2, NfcDef3, NfcDef4, NfcDef5,
				NfcValue1, NfcValue2, NfcValue3, NfcValue4, NfcValue5, Editable, DeviceId
			) 
			output 
				@accept as [Accept], 
				@message as [Message],
				@reload as [Reload],
				INSERTED.*
			values (
				UPPER(@qr), @userId, 1, @mode, GETDATE(), @inputQuantity, @whFrom, @whTo, @ocNumber, @boxInOC, @symbol, @productCode,
				@requireQuantity, @requireInput, @inputDef1, @inputDef2, @inputDef3, @inputDef4, @inputDef5,
				@displayText1, @displayText2, @displayText3, @displayText4, @displayText5,
				@inputValue1, @inputValue2, @inputValue3, @inputValue4, @inputValue5, @transactionId,
				@nfcDef1, @nfcDef2, @nfcDef3, @nfcDef4, @nfcDef5, 
				@nfcValue1, @nfcValue2, @nfcValue3, @nfcValue4, @nfcValue5, @editable, @deviceId
			)
			RETURN
		end
	end

	SELECT @accept as [Accept]
		  ,@message as [Message]
		  ,@reload as [Reload]
		  ,SCOPE_IDENTITY() as [Id]
		  ,@qr as [QRCode]
		  ,@inputQuantity as [Quantity]
		  ,@lock as [Lock]
		  ,@userId as [UserId]
		  ,@mode as [Mode]
		  ,GETDATE() as [CreatedTime]
		  ,@whFrom as [WHFrom]
		  ,@whTo as [WHTo]
		  ,@ocNumber as [OCNum]
		  ,@boxInOc as [BoxCode]
		  ,@symbol as [Unit]
		  ,@productCode as [ProductNumber]
		  ,@requireQuantity as [RequireQuantity]
		  ,@requireInput as [RequireInput]
		  ,@inputDef1 as [InputDef1]
		  ,@inputDef2 as [InputDef2]
		  ,@inputDef3 as [InputDef3]
		  ,@inputDef4 as [InputDef4]
		  ,@inputDef5 as [InputDef5]
		  ,@displayText1 as [DisplayText1]
		  ,@displayText2 as [DisplayText2]
		  ,@displayText3 as [DisplayText3]
		  ,@displayText4 as [DisplayText4]
		  ,@displayText5 as [DisplayText5]
		  ,@inputValue1 as [InputValue1]
		  ,@inputValue2 as [InputValue2]
		  ,@inputValue3 as [InputValue3]
		  ,@inputValue4 as [InputValue4]
		  ,@inputValue5 as [InputValue5]
		  ,@transactionId as [TransactionId]
		  ,@nfcDef1 as [NfcDef1]
		  ,@nfcDef2 as [NfcDef2]
		  ,@nfcDef3 as [NfcDef3]
		  ,@nfcDef4 as [NfcDef4]
		  ,@nfcDef5 as [NfcDef5]
		  ,@nfcValue1 as [NfcValue1]
		  ,@nfcValue2 as [NfcValue2]
		  ,@nfcValue3 as [NfcValue3]
		  ,@nfcValue4 as [NfcValue4]
		  ,@nfcValue5 as [NfcValue5]
		  ,@editable as [Editable]
		  ,@deviceId as [DeviceId]
		  ,@traceId as [TraceId]
END
GO

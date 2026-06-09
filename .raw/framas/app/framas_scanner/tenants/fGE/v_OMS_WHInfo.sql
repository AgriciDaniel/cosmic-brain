-- =============================================
-- Author:		congdat.nguyen@framas.com
-- Create date: 2026-06-08
-- Description:	Returns warehouse list for the current company year (fGE tenant).
--				Includes warehouse identity (WHNo, WHCode, WHName), structure/level,
--				physical specs (Area, Volume, MaxWeight, MaxWidth, MaxLength, MaxPieces),
--				location info, and scanner behavior flags (SkipCheckLastWh, AllowHydraYield, AllowTracking).
--				ActualPostWHNo returns NULL for fGE/fKV/fFT tenants — custom column T335.U003 not yet provisioned.
-- =============================================
CREATE OR ALTER VIEW [dbo].[v_OMS_WHInfo]
AS
	select
		T335.C000 as WHNo,
		T335.C001 as WHStructureId,
		T335.C002 as WHLevel,
		T335.C003 as WHName,
		T335.C008 as WHCode,
		T335.C006 as Area,
		T335.C007 as Volume,
		T335.C009 as [Location],
		T311.C001 as WHStructure,		
		T335.C026 as MaxWeight,
		T335.C027 as MaxWidth,
		T335.C028 as [MaxLength],
		T335.C029 as [MaxPieces],
		-- T335.U003 as [ActualPostWHNo], -- fVN, fIN
		NULL as [ActualPostWHNo], -- fKV, fFT, fGE -> Temporary RETURN null due to custom column T335.U003 is not exists yet
		wh.GroupName,
		ISNULL(wh.SkipCheckLastWh, 0) SkipCheckLastWh,
		ISNULL(wh.AllowHydraYield, 0) AllowHydraYield,
		ISNULL(wh.AllowTracking, 0) AllowTracking,
		f.C000 as [LocationName]
	from wl.T335 (NOLOCK)
	join ST045_CurrentCompYear (NOLOCK) comp on T335.mesoyear = comp.mesoyear
	left join wl.T311 (NOLOCK) on T311.mesoyear = T335.mesoyear and T311.C000 = T335.C001
	left join lmpScannerClient_Warehouse (NOLOCK) wh on T335.C000 = wh.Id
	left join ST049_FactoryCode f on f.Id = T335.C009;

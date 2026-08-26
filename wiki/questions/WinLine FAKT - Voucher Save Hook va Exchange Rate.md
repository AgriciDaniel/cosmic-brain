---
type: synthesis
title: "WinLine FAKT - Voucher Save Hook và Exchange Rate"
created: 2026-06-09
updated: 2026-06-09
address: c-000251
question: "Trong WinLine FAKT, khi save voucher có script/formula nào chạy để lấy exchange rate và lưu vào user-defined column của T025 không?"
answer_quality: solid
tags:
  - winline
  - fakt
  - voucher
  - formula
  - exchange-rate
  - T025
  - scripting
  - batchbeleg
status: developing
related:
  - "[[WinLine FAKT]]"
  - "[[WinLine FAKT Formeln]]"
  - "[[Mesonic WinLine]]"
  - "[[Framas WL Schema]]"
  - "[[WinLine Settings]]"
  - "[[WinLine ADMIN]]"
sources:
  - "[[.raw/winline/cwl0/cwl0.chm]]"
---

# WinLine FAKT — Voucher Save Hook và Exchange Rate

## Kết luận nhanh

Mechanism đúng cho interactive save: **Belegkopfformel (Speichern)** — VBScript formula gắn vào Belegart, chạy khi user save voucher.

Cho Batchbeleg (batch import): formula này **không chạy** → dùng **SQL Server Agent Job**.

---

## Bốn loại Formula trong FAKT

| Loại | Khi nào chạy | Gắn vào đâu |
|---|---|---|
| Zeilenformel | Sau khi xác nhận article, mỗi dòng | Artikelgruppe |
| Belegformel | Khi save, mỗi dòng (sau Belegkopfformel Speichern) | Artikelgruppe |
| Belegkopfformel (Laden) | Khi Belegart được xác nhận (load) | Belegart |
| **Belegkopfformel (Speichern)** | **Khi save voucher** | **Belegart** |

> [!warning] Belegkopfformel không chạy khi batch import hoặc auto-print
> Chỉ chạy khi user interactive save.

Biến `Value(0, 297)` trả về context hiện tại: `995` = đang chạy Belegformel, `997` = Batchbeleg import.

---

## Exchange Rate Variables

Trong VBScript formula, truy cập qua `Value(0, N)`:

| Var | Nội dung |
|---|---|
| **618** | **Kurs/Einheit — tỷ giá đang áp dụng cho voucher** |
| 616 | fixer Kurs — tỷ giá cố định (chỉ có khi "Kursänderung" checkbox được tick) |
| 66 | Fremdwährungseinheit — đơn vị ngoại tệ |
| 93 | Fremdwährungsfaktor |
| 64 | Fremdwährungszeile — currency slot (1-6) |

Công thức chuyển đổi: `Fremdwährungsbetrag / Fremdwährungseinheit × Fremdwährungskurs = Landeswährung`

---

## Thêm User Column vào T025

**Menu:** `WinLine ADMIN → System → Tabellen erweitern`

1. Chọn bảng `T025`
2. Phần **Benutzerspalten** → thêm dòng mới: tên `U000`, kiểu `4 - Double`
3. Save → WinLine tự tạo cột trong tất cả Mandanten

Tên cột bắt đầu bằng `U`: `U000`, `U001`, ... (tối đa 50 cột per table, tổng ≤ 150).

> [!warning] Thêm cột vào T025 tắt tính năng "Belege parken"
> Nếu cần park voucher → extend T026 thay thế (nhưng cần MDP-Fensterskript thêm AddColumn cho window ID300/ID301).

> Yêu cầu license: **MDP-Developer-Lizenz** để tạo + **MDP-Runtime-Lizenz** để vận hành.

> Nếu dùng background printing → phải extend **T145** (header staging) với cùng cột.

---

## Tạo và Gắn Formula (Interactive Save)

### Bước 1 — Tạo formula

**Menu:** `WinLine FAKT → Stammdaten → Formelstamm`

- Click **"neue Formel erstellen"** → đặt tên (ví dụ: `SaveExchangeRate`)
- Click **"Formel editieren"** → mở code editor
- Gõ `.` → chọn `Invoicing` → autocomplete hiện danh sách biến

```vbscript
Function Formel ()
  'Description: Save exchange rate to T025 user column on voucher save
  Value(0, "U000") = Value(0, 618)
End Function
```

- Đóng bằng `ALT+F4` → tự syntax-check → save
- Formulas lưu trong system DB table `T030CMP`
- Export/import được dưới dạng file `.MMR`

### Bước 2 — Gắn vào Belegart

**Menu:** `WinLine FAKT → Stammdaten → Belegartenstamm`

1. Mở Belegart cần (Order, Invoice...)
2. Vào tab **"Optionen"**
3. Field **"Belegkopfformel beim Speichern"** → nhập tên formula (hoặc F9 search)
4. Save

---

## Hướng xử lý khi dùng Batchbeleg

Belegkopfformel (Speichern) **không chạy** trong Batchbeleg. Các lựa chọn:

### Option 1 — SQL Server Agent Job (khuyến nghị)

Chạy định kỳ sau batch import:

```sql
UPDATE h
SET h.U000 = r.c003          -- c003 = exchange rate trong t012
FROM wl.T025 h
JOIN wl.t012 r
    ON r.c001 = h.[cột_currency]      -- match currency code
    AND r.c002 <= h.[cột_belegdate]   -- rate gần nhất ≤ ngày chứng từ
WHERE h.U000 IS NULL                   -- chỉ update row chưa có rate
  AND h.mesocomp = '300M'              -- filter Mandant
```

Cần xác định column name của currency và date trong T025 từ schema `wl.T025`.

Exchange rate table: `wl.t012` — `c001` = currency code, `c002` = date, `c003` = rate.

### Option 2 — Belegformel + batch template

Belegformel (gắn vào Artikelgruppe) **có thể** chạy trong Batchbeleg nếu template bật **"Zeilenformel ausführen"**. Nhưng fires per-line, không phải per-header.

### Option 3 — Action Server + Makro

Action Server có thể schedule chạy WinLine macro định kỳ. Nhưng macro là keyboard/mouse recording — không thể viết SQL trực tiếp vào T025. Không phù hợp cho use case này.

### Option 4 — EXIM Watchdog

`cwlexim.exe` — chạy EXIM templates (file import/export) theo interval. Không có hook vào Batchbeleg. Không phù hợp.

---

## Bảng so sánh cuối

| Approach | Interactive save | Batchbeleg | Độ phức tạp |
|---|---|---|---|
| Belegkopfformel (Speichern) | ✅ | ❌ | Thấp |
| Belegformel + "Zeilenformel ausführen" | ✅ | ✅ (per-line) | Trung bình |
| SQL Server Agent Job | — | ✅ | Thấp |
| EXIM Watchdog | ❌ | ❌ | — |
| Action Server + Macro | ❌ trực tiếp | ❌ trực tiếp | Cao, không phù hợp |

## See also

[[WinLine FAKT Formeln]] (chi tiết variables, formula types) · [[WinLine FAKT]] (module overview, T025 extension warnings) · [[Framas WL Schema]] (T025, T026, t012 schema)

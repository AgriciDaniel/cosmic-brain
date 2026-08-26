# Kiến trúc Monorepo với Git Bare + Worktree cho .NET 10 Blazor

## Mục lục

1. [Tổng quan kiến trúc](#tổng-quan-kiến-trúc)
2. [Tại sao chọn kiến trúc này](#tại-sao-chọn-kiến-trúc-này)
3. [Cấu trúc thư mục](#cấu-trúc-thư-mục)
4. [Cấu trúc Solution](#cấu-trúc-solution)
5. [Hướng dẫn setup từ đầu](#hướng-dẫn-setup-từ-đầu)
6. [Workflow hàng ngày](#workflow-hàng-ngày)
7. [Các điểm cần lưu ý](#các-điểm-cần-lưu-ý)

---

## Tổng quan kiến trúc

Dự án sử dụng **Monorepo + Git Bare Repository + Git Worktree** để quản lý một ứng dụng .NET 10 Blazor InteractiveServer với team 10 người, mỗi người phụ trách một hoặc nhiều feature.

```
Tổ chức branch:
  apphost         → chứa MyApp.Host + MyApp.Shared (dùng chung toàn team)
  feature/orders  → chứa MyApp.Feature.Orders.csproj
  feature/reports → chứa MyApp.Feature.Reports.csproj
  feature/auth    → chứa MyApp.Feature.Auth.csproj
  dev_A           → chứa MyApp.sln của dev A (ref AppHost + feature của mình)
  dev_B           → chứa MyApp.sln của dev B (ref AppHost + feature của mình)
  main / develop  → merge đích cuối cùng, dùng để build và deploy
```

**Nguyên tắc cốt lõi:**

- Mỗi dev có `.sln` riêng, chỉ thấy AppHost + feature mình phụ trách
- AppHost là branch dùng chung, không dev nào tự ý sửa
- Feature branch chỉ chứa `.csproj` và code của feature đó
- Tất cả nằm trong một folder parent → VS Code + Roslyn hoạt động bình thường

---

## Tại sao chọn kiến trúc này

### Tại sao Monorepo thay vì Plugin Architecture

Ban đầu cân nhắc giữa hai hướng:

**Plugin Architecture** (load DLL từ SQL Server lúc startup) bị loại vì:
- SQL Server không phải artifact store, không phải use case phù hợp
- Thêm single point of failure: SQL down → app không start được
- Phải viết và maintain plugin loader infrastructure
- Overhead không cần thiết cho team 10 người

**Monorepo** được chọn vì:
- Performance tốt hơn: static linking, AOT-friendly, không overhead reflection lúc runtime
- Đơn giản hơn: toàn bộ app là một artifact duy nhất, dễ kiểm soát
- CI/CD pipeline chuẩn, không cần logic đặc biệt
- Phù hợp với Blazor InteractiveServer vốn không được thiết kế cho dynamic assembly loading

### Tại sao Git Bare + Worktree thay vì switch branch

Dev có thể phụ trách nhiều feature cùng lúc. Nếu dùng switch branch bình thường:

```
❌ Vấn đề:
  - Phải git stash liên tục khi chuyển context
  - Không thể chạy 2 feature song song để test
  - Dễ nhầm lẫn đang đứng ở branch nào
```

Git Worktree giải quyết bằng cách mỗi branch là một folder riêng:

```
✅ Kết quả:
  - Mở nhiều VS Code instance cùng lúc, mỗi cái một feature
  - Không cần stash, không cần switch
  - Chạy song song trên port khác nhau
```

**Bare repo** thay vì normal clone vì:
- Normal clone tạo ra một working directory mặc định thừa
- Bare repo clean hơn: chỉ chứa git data, worktree nằm tách riêng
- Là pattern được Git recommend chính thức khi dùng worktree

### Tại sao mỗi dev có `.sln` riêng

- Dev chỉ cần thấy AppHost + feature của mình → IDE nhẹ hơn, ít noise hơn
- Tránh conflict trên file `.sln` khi nhiều người làm cùng lúc
- Mỗi dev tự quản lý solution của mình mà không ảnh hưởng người khác

---

## Cấu trúc thư mục

```
~/
  ├── your-app.git/          ← Bare repo (git data, không mở bằng IDE)
  │     ├── HEAD
  │     ├── objects/
  │     ├── refs/
  │     └── worktrees/       ← Git tự quản lý worktree metadata ở đây
  │
  └── your-app/              ← Parent folder, mở cái này bằng VS Code
        ├── apphost/         ← worktree của branch: apphost
        │     ├── MyApp.Host/
        │     │     ├── MyApp.Host.csproj
        │     │     ├── Program.cs
        │     │     └── ...
        │     └── MyApp.Shared/
        │           ├── MyApp.Shared.csproj
        │           ├── Contracts/
        │           └── Models/
        │
        ├── dev-A/           ← worktree của branch: dev_A
        │     └── MyApp.sln  ← chỉ ref AppHost + Orders
        │
        ├── dev-B/           ← worktree của branch: dev_B
        │     └── MyApp.sln  ← chỉ ref AppHost + Reports
        │
        ├── orders/          ← worktree của branch: feature/orders
        │     └── MyApp.Feature.Orders/
        │           ├── MyApp.Feature.Orders.csproj
        │           ├── Pages/
        │           ├── Services/
        │           └── ...
        │
        ├── reports/         ← worktree của branch: feature/reports
        │     └── MyApp.Feature.Reports/
        │           └── ...
        │
        └── your-app.code-workspace   ← VS Code multi-root workspace
```

---

## Cấu trúc Solution

File `.sln` của dev_A (nằm tại `your-app/dev-A/MyApp.sln`):

```
Project("{FAE04EC0-...}") = "MyApp.Host",
  "../apphost/MyApp.Host/MyApp.Host.csproj", "{GUID-1}"
Project("{FAE04EC0-...}") = "MyApp.Shared",
  "../apphost/MyApp.Shared/MyApp.Shared.csproj", "{GUID-2}"
Project("{FAE04EC0-...}") = "MyApp.Feature.Orders",
  "../orders/MyApp.Feature.Orders/MyApp.Feature.Orders.csproj", "{GUID-3}"
```

File `.code-workspace` để VS Code hiểu multi-root (nằm tại `your-app/`):

```json
{
  "folders": [
    { "name": "AppHost",  "path": "./apphost" },
    { "name": "Orders",   "path": "./orders" },
    { "name": "dev-A",    "path": "./dev-A" }
  ],
  "settings": {
    "dotnet.defaultSolution": "dev-A/MyApp.sln"
  }
}
```

---

## Hướng dẫn setup từ đầu

### Bước 1: Tạo bare repo (chỉ làm một lần, thường là lead)

```bash
# Clone dạng bare từ remote
git clone --bare https://github.com/your-org/your-app.git your-app.git

# Di chuyển vào bare repo
cd your-app.git

# Tạo parent folder cho các worktree
mkdir -p ../your-app
```

### Bước 2: Add worktree cho các branch chính

```bash
# Từ trong your-app.git/

# AppHost branch (dùng chung)
git worktree add ../your-app/apphost -b apphost origin/apphost

# Feature branches
git worktree add ../your-app/orders  -b feature/orders  origin/feature/orders
git worktree add ../your-app/reports -b feature/reports origin/feature/reports
git worktree add ../your-app/auth    -b feature/auth    origin/feature/auth

# Dev branches
git worktree add ../your-app/dev-A   -b dev_A   origin/dev_A
git worktree add ../your-app/dev-B   -b dev_B   origin/dev_B
```

> **Lưu ý:** Nếu branch đã tồn tại local thì bỏ `-b`, chỉ dùng tên branch:
> ```bash
> git worktree add ../your-app/orders feature/orders
> ```

### Bước 3: Kiểm tra worktree list

```bash
git worktree list
```

Output mong đợi (không có `HEAD`, phải có tên branch trong `[]`):

```
/home/user/your-app.git          (bare)
/home/user/your-app/apphost      abc1234 [apphost]
/home/user/your-app/orders       def5678 [feature/orders]
/home/user/your-app/reports      ghi9012 [feature/reports]
/home/user/your-app/dev-A        jkl3456 [dev_A]
```

### Bước 4: Tạo file `.code-workspace`

Tạo file `your-app/your-app.code-workspace` với nội dung phù hợp với từng dev. Ví dụ cho dev_A:

```json
{
  "folders": [
    { "name": "AppHost",        "path": "./apphost" },
    { "name": "Feature.Orders", "path": "./orders" },
    { "name": "dev-A",          "path": "./dev-A" }
  ],
  "settings": {
    "dotnet.defaultSolution": "dev-A/MyApp.sln"
  }
}
```

### Bước 5: Mở VS Code

```bash
# Mở bằng file .code-workspace, không mở từng folder riêng lẻ
code your-app/your-app.code-workspace
```

### Bước 6: Chạy app với port riêng

Mỗi worktree chạy trên port riêng để tránh conflict:

```bash
# Terminal 1 — feature/orders
cd ~/your-app/orders
dotnet run --project MyApp.Feature.Orders --urls "https://localhost:7001"

# Terminal 2 — feature/reports (nếu dev handle 2 feature)
cd ~/your-app/reports
dotnet run --project MyApp.Feature.Reports --urls "https://localhost:7002"
```

Hoặc set trong `launchSettings.json` của từng feature để không cần gõ mỗi lần:

```json
{
  "profiles": {
    "MyApp": {
      "applicationUrl": "https://localhost:7001"
    }
  }
}
```

---

## Workflow hàng ngày

### Khi bắt đầu ngày làm việc

```bash
# Sync apphost (branch dùng chung, thường xuyên có thay đổi)
cd ~/your-app/apphost
git fetch origin
git rebase origin/apphost

# Sync feature branch của mình
cd ~/your-app/orders
git fetch origin
git rebase origin/feature/orders
```

### Khi nhận feature mới

```bash
cd ~/your-app.git

# Tạo worktree mới cho feature mới
git worktree add ../your-app/auth -b feature/auth origin/feature/auth

# Thêm project vào .sln của mình
cd ~/your-app/dev-A
dotnet sln MyApp.sln add ../auth/MyApp.Feature.Auth/MyApp.Feature.Auth.csproj
```

### Khi feature xong, tạo PR

```bash
cd ~/your-app/orders
git push origin feature/orders
# Tạo PR từ feature/orders → develop trên GitHub/GitLab
```

### Sau khi PR được merge, dọn dẹp

```bash
# Xóa worktree
git worktree remove ~/your-app/orders

# Xóa local branch
cd ~/your-app.git
git branch -d feature/orders

# Xóa khỏi .sln
cd ~/your-app/dev-A
dotnet sln MyApp.sln remove ../orders/MyApp.Feature.Orders/MyApp.Feature.Orders.csproj
```

---

## Các điểm cần lưu ý

### Branch `apphost` — ai được phép sửa?

Branch này dùng chung toàn team, nên áp dụng rule:

```
✅ Dev được phép: đọc, fetch, rebase
✅ Dev được phép: tạo PR vào apphost khi cần thêm shared service/model
❌ Dev không được: push thẳng vào apphost
❌ Dev không được: tự ý thay đổi DI registration của feature khác
```

Chỉ lead hoặc người được chỉ định mới merge PR vào `apphost`.

### Detached HEAD khi add worktree

Khi add worktree từ remote branch mà **không tạo local branch**, Git sẽ rơi vào trạng thái detached HEAD:

```bash
# ❌ Sai — gây detached HEAD
git worktree add ../your-app/orders origin/feature/orders

# ✅ Đúng — tạo local branch track remote
git worktree add ../your-app/orders -b feature/orders origin/feature/orders

# ✅ Đúng — nếu local branch đã tồn tại
git worktree add ../your-app/orders feature/orders
```

Kiểm tra: chạy `git worktree list`, kết quả phải có `[tên-branch]` trong ngoặc vuông, không phải `(HEAD)`.

### Một branch chỉ được checkout ở một worktree tại một thời điểm

```bash
# ❌ Lỗi — feature/orders đã được checkout ở ../orders rồi
git worktree add ../orders-backup feature/orders
# fatal: 'feature/orders' is already checked out at '...'
```

Nếu cần làm việc với cùng một branch ở hai nơi, hãy tạo branch mới từ đó.

### Không commit `.code-workspace` vào branch dùng chung

File `.code-workspace` là cấu hình riêng của từng dev vì mỗi người có folder set khác nhau. Nên thêm vào `.gitignore`:

```gitignore
# .gitignore ở branch apphost hoặc develop
*.code-workspace
```

Mỗi dev tự tạo và giữ file này ở local.

### Sync apphost thường xuyên, tránh conflict lớn

AppHost thay đổi ít nhưng ảnh hưởng nhiều. Nếu lâu không sync:

```bash
# Kiểm tra apphost có gì mới không
cd ~/your-app/apphost
git fetch origin
git log HEAD..origin/apphost --oneline

# Nếu có thay đổi thì rebase ngay
git rebase origin/apphost
```

### Port conflict khi chạy nhiều feature cùng lúc

Quy ước port cho team để tránh đụng nhau:

```
AppHost dev server   : 5000 / 5001
feature/auth         : 7001
feature/orders       : 7002
feature/reports      : 7003
feature/dashboard    : 7004
... (mỗi feature +1)
```

Ghi quy ước này vào README của repo để cả team follow.

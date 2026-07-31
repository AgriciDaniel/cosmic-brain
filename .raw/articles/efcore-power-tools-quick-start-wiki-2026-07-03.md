---
source_url: https://github.com/ErikEJ/EFCorePowerTools/wiki/Reverse-Engineering-Quick-Start
fetched: 2026-07-03
---
# EF Core Power Tools — Reverse Engineering Quick Start (Wiki)

Step-by-step beginner's guide for generating DbContext and entity classes from Azure SQL / SQL Server databases. Prerequisites: install via VS Extensions → Manage Extensions. Launch: right-click project → EF Core Power Tools → Reverse Engineer, or Ctrl+Shift+A → Data → EF Core Database First Wizard. Step 1: database connection (Add button for new, dropdown for existing). Step 2: choose database objects (top checkbox selects all). Step 3: choose options (accept defaults for first run). Step 4: click OK to generate C# code into current project. Post-generation example: `using var db = new ChinookContext(); var hairAlbum = db.Albums.Where(a => a.Title == "Hair").FirstOrDefault();`. CLI alternative at `src/Core/efcpt.8/readme.md`. Companion ~10-minute YouTube walkthrough available. 16 revisions, last edited September 22, 2024.

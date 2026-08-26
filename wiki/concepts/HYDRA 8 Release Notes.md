---
type: concept
title: "HYDRA 8 Release Notes"
created: 2026-05-27
updated: 2026-05-27
address: c-000182
tags:
  - concept
  - mes
  - hydra-8
  - releases
  - changelog
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[hydra-8-documentation]]"
  - "[[HYDRA 8 Function Catalog]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: basic
domain: "Manufacturing Execution Systems"
---

# HYDRA 8 Release Notes

Release notes catalog organized by module and version. Each entry represents a set of PDFs in `Products/<MODULE>_<VERSION>/` documenting new features, changes, and fixes.

## Version History

HYDRA 8 had three major releases:

| Version | Modules | Approx. PDFs |
|---------|---------|-------------|
| **v8.1** | Initial release across all 23 modules | ~300 |
| **v8.2** | Second major release | ~200 |
| **v8.3** | Select modules only (EMG, PDV, PZE, PZW) | ~15 |

## Release Notes by Module

### Production Execution
| Module | v8.1 | v8.2 | v8.3 |
|--------|------|------|------|
| BDE | 19 PDFs | 19 PDFs | — |
| MDE | 10 PDFs | 11 PDFs | — |
| MPL | 6 PDFs | 6 PDFs | — |
| TRT | 7 PDFs | 5 PDFs | — |
| DNC | 6 PDFs | — | — |

### Scheduling
| Module | v8.1 | v8.2 |
|--------|------|------|
| HLS | 16 PDFs | 19 PDFs |
| PEP | 4 PDFs | 5 PDFs |

### Quality
| Module | v8.1 | v8.2 |
|--------|------|------|
| FEP | 17 PDFs | 3 PDFs |
| WEP | 13 PDFs | 15 PDFs |
| REK | 8 PDFs | — |
| PMV | 6 PDFs | 2 PDFs |
| QMS | 5 PDFs | — |

### Personnel
| Module | v8.1 | v8.2 | v8.3 |
|--------|------|------|------|
| LLE | 6 PDFs | — | — |
| PZE | 2 PDFs | 2 PDFs | 2 PDFs |
| PZW | 10 PDFs | 10 PDFs | 10 PDFs |

### Infrastructure
| Module | v8.1 | v8.2 | v8.3 |
|--------|------|------|------|
| PDV | 10 PDFs | 7 PDFs | 9 PDFs |
| EMG | 16 PDFs | — | 14 PDFs |
| WRM | 12 PDFs | 11 PDFs | — |
| ZKS | 9 PDFs | 10 PDFs | — |

### Terminal Client
| Module | v8.1 | v8.2 |
|--------|------|------|
| AIP | 24 PDFs | 26 PDFs |
| TSW | 2 PDFs | — (superseded by AIP) |

### Integration
| Module | v3.0 | v4.0 | v8.1 | v8.2 |
|--------|------|------|------|------|
| SIS | 20 PDFs | 19 PDFs | — | — |
| EIS | 1 PDF | — | 9 PDFs | 8 PDFs |
| SAP | 13 PDFs | — | — | 13 PDFs |
| SCS | — | — | 10 PDFs | — |

### Analytics & Web
| Module | v3.1 | v3.2 | v8.1 | v8.2 |
|--------|------|------|------|------|
| MC (MES-Cockpit) | 8 PDFs | 8 PDFs | — | — |
| MDS | — | — | 12 PDFs | — |
| WEB | — | — | 5 PDFs | 4 PDFs |
| SMA | — | — | 13 PDFs | 15 PDFs |

### Connectivity
| Module | v8.1 |
|--------|------|
| OPC | 2 PDFs |
| PCC | 10 PDFs |

## Notable Release Patterns

1. **PDV had three releases** (v8.1, v8.2, v8.3) — the only module besides PZE/PZW/EMG with v8.3
2. **PZW had consistent documentation** — 10 PDFs for each of v8.1, v8.2, and v8.3
3. **LLE was single-release** — 6 PDFs for v8.1 only, suggesting it reached maturity early
4. **SAP interfaces had dedicated releases** — 13 PDFs each for v3.0 and v8.2, independent of EIS module versions
5. **SIS jumped from v3.0 to v4.0** — 20 PDFs (v3.0) to 19 PDFs (v4.0)
6. **MES-Cockpit had v3.1 and v3.2** — 8 PDFs each, on a separate version track from HYDRA proper

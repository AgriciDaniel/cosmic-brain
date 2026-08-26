#!/usr/bin/env python3
"""Generate distributed-scaling.svg v2 — multi-server animated SVG.

Redesigned with:
- Unique random DAGs (3-5 nodes) per host
- Fade+drift invalidation (nodes disappear)
- Description text at bottom changing per phase
- 48s cycle (2x slower)
- Equal column widths with centered boxes
"""

import math

# ═══════════════════════════════════════════
# CONSTANTS
# ═══════════════════════════════════════════

DUR = 48
NR = 5
FADE_LEN = 8   # % duration for fade+drift
DRIFT_PX = 12  # pixels to drift down
PAD = 10        # box interior padding
HDR_H = 18     # window header bar height

# Colors
GREEN_F, GREEN_S = "#c8e8d0", "#78b490"
BLEACH_F, BLEACH_S = "#ede8e3", "#c4bab2"
BLUE_F, BLUE_S = "#c8ddf8", "#6b9ad4"
HIT_F, HIT_S = "#b0dcc0", "#58a078"
DB_F, DB_S = "#e4ddd6", "#b0a498"
DB_FLASH_F, DB_FLASH_S = "#f0c8a0", "#d09050"

# Layout
SVG_W, SVG_H = 870, 600
COL_W = 280
COL1_X, COL2_X, COL3_X = 10, 295, 580
DIV1_X, DIV2_X = 290, 575
BOX_W = 200
DB_PART_FRAC = 0.62

def col_center(col_x):
    return col_x + COL_W // 2

def box_x(col_x):
    return col_x + (COL_W - BOX_W) // 2

CX = box_x(COL1_X)   # 90
AX = box_x(COL2_X)   # 455
BX = box_x(COL3_X)   # 820

# ═══════════════════════════════════════════
# HOST DEFINITIONS
# ═══════════════════════════════════════════
# nodes: [(frac_x, frac_y), ...] relative to padded box interior
# edges: [(src, dst), ...]
# affected: set of node indices that invalidate/recompute
# db: set of node indices that are DB nodes

HOSTS = {
    "C1": {
        "box": (CX, 42, BOX_W, 70), "label": "Client 1",
        "nodes": [(0.18, 0.35), (0.52, 0.68), (0.85, 0.38)],
        "edges": [(0, 1), (1, 2)],
        "affected": {0, 1, 2},
    },
    "C2": {
        "box": (CX, 120, BOX_W, 82), "label": "Client 2",
        "nodes": [(0.15, 0.50), (0.50, 0.18), (0.50, 0.82), (0.85, 0.50)],
        "edges": [(0, 1), (0, 2), (1, 3), (2, 3)],
        "affected": {0, 1},  # partial: nodes 2,3 stay green
    },
    "C3": {
        "box": (CX, 210, BOX_W, 96), "label": "Client 3",
        "nodes": [(0.10, 0.50), (0.38, 0.20), (0.38, 0.80), (0.68, 0.50), (0.92, 0.30)],
        "edges": [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4)],
        "affected": set(),  # not affected by this invalidation
    },
    "C4": {
        "box": (CX, 330, BOX_W, 70), "label": "Client 4",
        "nodes": [(0.18, 0.50), (0.82, 0.22), (0.82, 0.78)],
        "edges": [(0, 1), (0, 2)],
        "affected": {0, 1},  # partial: node 2 stays green
    },
    "C5": {
        "box": (CX, 408, BOX_W, 82), "label": "Client 5",
        "nodes": [(0.15, 0.32), (0.52, 0.25), (0.52, 0.78), (0.85, 0.58)],
        "edges": [(0, 1), (0, 2), (1, 3)],
        "affected": set(),  # not affected by this invalidation
    },
    "A1": {
        "box": (AX, 42, BOX_W, 248), "label": "API Server 1",
        "nodes": [(0.12, 0.20), (0.48, 0.16), (0.85, 0.18), (0.85, 0.62)],
        "edges": [(0, 1), (1, 2), (0, 3)],
        "affected": {0, 1, 2},
    },
    "A2": {
        "box": (AX, 318, BOX_W, 172), "label": "API Server 2",
        "nodes": [(0.12, 0.22), (0.42, 0.16), (0.42, 0.75), (0.80, 0.18), (0.80, 0.80)],
        "edges": [(0, 1), (0, 2), (1, 3), (2, 4)],
        "affected": {0, 1, 3},
    },
    "B1": {
        "box": (BX, 42, BOX_W, 96), "label": "Backend 1",
        "nodes": [(0.18, 0.28), (0.18, 0.72), (0.78, 0.28), (0.78, 0.72)],
        "edges": [(0, 2), (1, 3)],
        "affected": set(), "db": {2, 3},
    },
    "B2": {
        "box": (BX, 174, BOX_W, 108), "label": "Backend 2",
        "nodes": [(0.14, 0.22), (0.14, 0.78), (0.42, 0.50), (0.82, 0.50)],
        "edges": [(0, 2), (1, 2), (2, 3)],
        "affected": {0, 1, 2}, "db": {3},
    },
    "B3": {
        "box": (BX, 318, BOX_W, 96), "label": "Backend 3",
        "nodes": [(0.20, 0.28), (0.20, 0.72), (0.78, 0.28), (0.78, 0.72)],
        "edges": [(0, 2), (1, 3)],
        "affected": set(), "db": {2, 3},
    },
}

# ═══════════════════════════════════════════
# CROSS-BOX CONNECTIONS
# ═══════════════════════════════════════════

# (from_host, from_node, to_host, to_node)
CROSS_AFFECTED = [
    ("C1", 2, "A1", 0), ("C2", 1, "A1", 0),  # C2 partial: only node 1 connects
    ("C4", 1, "A2", 0),
    ("A1", 2, "B2", 0), ("A2", 3, "B2", 1),
]

CROSS_SAFE = [
    ("C3", 4, "A1", 3),  # C3 connects to A1's safe node
    ("C4", 2, "A2", 2),  # C4 unconnected node → A2's safe node (same as C5)
    ("C5", 3, "A2", 2),  # C5 connects to A2's safe node
    ("A1", 3, "B1", 0), ("A2", 4, "B3", 0),
]

# ═══════════════════════════════════════════
# ANIMATION TIMING (% of 48s)
# ═══════════════════════════════════════════

# Invalidation start (R→L) — only affects C1, C2, C4 (C3, C5 unaffected)
INV = {
    "B2": 8,
    "A1": 11, "A2": 11,
    "C1": 14, "C2": 15, "C4": 18,
}

# Recomputation: appear (blue), green, optional cache_hits
RECOMP = {
    "C1": {"appear": 30, "green": 44},
    "A1": {"appear": 32, "green": 40, "cache_hits": [52]},
    "B2": {"appear": 34, "green": 38, "cache_hits": [66]},
    "C2": {"appear": 50, "green": 56},
    "C4": {"appear": 62, "green": 72},
    "A2": {"appear": 64, "green": 70},
}

# Cross-edge disconnect/reconnect
CROSS_DISC_RECON = {
    ("C1", 2, "A1", 0): (14, 30),
    ("C2", 1, "A1", 0): (15, 50),
    ("C4", 1, "A2", 0): (18, 62),
    ("A1", 2, "B2", 0): (11, 32),
    ("A2", 3, "B2", 1): (11, 64),
}

# Description phases
DESCRIPTIONS = [
    (0, 6, "All computed values are consistent"),
    (7, 10, "A database change in Backend 2 triggers invalidation"),
    (11, 22, "Invalidation cascades through both API servers to Clients 1, 2, and 4"),
    (30, 44, "Client 1 recomputes \u2014 full chain through API Server 1 to Backend 2"),
    (50, 56, "Client 2 recomputes \u2014 API Server 1 is already computed (cache hit)"),
    (62, 72, "Client 4 recomputes via API Server 2 \u2014 Backend 2 is already consistent (cache hit)"),
    (78, 100, "All computed values are consistent again"),
]

# ═══════════════════════════════════════════
# HELPERS
# ═══════════════════════════════════════════

def abs_pos(host_id, node_idx):
    h = HOSTS[host_id]
    bx, by, bw, bh = h["box"]
    fx, fy = h["nodes"][node_idx]
    # Nodes live in the body area below the header bar
    body_top = by + HDR_H
    body_h = bh - HDR_H
    iw, ih = bw - 2 * PAD, body_h - 2 * PAD
    return round(bx + PAD + fx * iw), round(body_top + PAD + fy * ih)

def edge_pts(h1, n1, h2, n2, r=NR):
    x1, y1 = abs_pos(h1, n1)
    x2, y2 = abs_pos(h2, n2)
    dx, dy = x2 - x1, y2 - y1
    d = math.sqrt(dx * dx + dy * dy)
    if d < 0.1:
        return x1, y1, x2, y2
    return (round(x1 + r * dx / d), round(y1 + r * dy / d),
            round(x2 - r * dx / d), round(y2 - r * dy / d))

def nid(host_id, node_idx):
    return f"{host_id}-{node_idx}"

def is_db(host_id, node_idx):
    return node_idx in HOSTS[host_id].get("db", set())

def is_affected(host_id, node_idx):
    return node_idx in HOSTS[host_id].get("affected", set())

def is_edge_animated(host_id, src, dst):
    """Edge animates if source is affected."""
    return is_affected(host_id, src)

# Per-node invalidation stagger: rightmost affected nodes fade first
INV_STAGGER = 2  # % gap between each depth rank

def node_inv_pct(hid, idx):
    """Invalidation start % for a node, staggered R→L by x-position."""
    host = HOSTS[hid]
    base = INV[hid]
    ranked = sorted(host["affected"], key=lambda i: host["nodes"][i][0], reverse=True)
    rank = ranked.index(idx)
    return base + rank * INV_STAGGER

# Per-node recomputation overrides (nodes that recompute at different times than their host)
NODE_RECOMP = {
    ("B2", 1): {"appear": 66, "green": 70},  # only when A2 requests it
}

def node_recomp(hid, idx):
    """Return (appear, green, cache_hits) for a node, checking overrides first."""
    override = NODE_RECOMP.get((hid, idx))
    if override:
        return override["appear"], override["green"], override.get("cache_hits", [])
    rc = RECOMP[hid]
    return rc["appear"], rc["green"], rc.get("cache_hits", [])

# ═══════════════════════════════════════════
# CSS GENERATION
# ═══════════════════════════════════════════

def gen_css():
    L = []

    # Font classes
    L.append("""      .sh { font-family: Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; font-size: 11px; fill: #8b90a8; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase }
      .bl { font-family: Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; font-size: 9px; fill: #5c6b82; font-weight: 500 }
      .wh { font-family: Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; font-size: 9px; fill: #5c6b82; font-weight: 600 }
      .dbl { font-family: Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; font-size: 8px; fill: #a09488; font-weight: 500; font-style: italic }
      .lg { font-family: Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; font-size: 10px; fill: #8b90a8; font-style: italic; stroke: none }
      .desc { font-family: Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; font-size: 11px; fill: #5c6b82; font-weight: 500; text-anchor: middle }""")

    L.append(f"\n      /* {DUR}s cycle. Invalidation R→L with fade+drift, recomputation L→R with cache hits. */")

    # --- Old node keyframes (fade + drift down, staggered R→L) ---
    L.append("\n      /* Old nodes: bleach → fade + drift down (staggered by x-position) */")
    for hid in INV:
        for idx in HOSTS[hid]["affected"]:
            inv = node_inv_pct(hid, idx)
            gone = inv + FADE_LEN
            name = f"old-{nid(hid, idx)}"
            L.append(f"""      @keyframes {name} {{
        0%,{inv}% {{fill:{GREEN_F};stroke:{GREEN_S};stroke-width:1.5;opacity:1;transform:translateY(0)}}
        {inv+1}% {{fill:{BLEACH_F};stroke:{BLEACH_S};stroke-width:1.5;opacity:0.85;transform:translateY(2px)}}
        {gone}% {{fill:{BLEACH_F};stroke:{BLEACH_S};stroke-width:1.5;opacity:0;transform:translateY({DRIFT_PX}px)}}
        100% {{opacity:0;transform:translateY({DRIFT_PX}px)}}
      }}""")

    # --- New node keyframes (appear blue → green, with per-node overrides) ---
    L.append("\n      /* New nodes: appear computing → green (with optional cache-hit flashes) */")
    for hid in RECOMP:
        for idx in HOSTS[hid]["affected"]:
            app, grn, hits = node_recomp(hid, idx)
            name = f"new-{nid(hid, idx)}"
            # Build keyframe entries as sorted list of (pct, value)
            entries = []
            entries.append((0, f"fill:{BLUE_F};stroke:{BLUE_S};stroke-width:1.5;opacity:0"))
            entries.append((app - 1, f"fill:{BLUE_F};stroke:{BLUE_S};stroke-width:1.5;opacity:0"))
            entries.append((app + 1, f"fill:{BLUE_F};stroke:{BLUE_S};stroke-width:1.5;opacity:1"))
            entries.append((grn - 1, f"fill:{BLUE_F};stroke:{BLUE_S};stroke-width:1.5;opacity:1"))
            entries.append((grn, f"fill:{GREEN_F};stroke:{GREEN_S};stroke-width:1.5;opacity:1"))
            for ht in hits:
                entries.append((ht, f"fill:{HIT_F};stroke:{HIT_S};stroke-width:2.5;opacity:1"))
                entries.append((ht + 2, f"fill:{HIT_F};stroke:{HIT_S};stroke-width:2.5;opacity:1"))
                entries.append((ht + 4, f"fill:{GREEN_F};stroke:{GREEN_S};stroke-width:1.5;opacity:1"))
            entries.append((100, f"fill:{GREEN_F};stroke:{GREEN_S};stroke-width:1.5;opacity:1"))
            # Deduplicate by pct (keep last)
            by_pct = {}
            for pct, val in entries:
                by_pct[pct] = val
            sorted_entries = sorted(by_pct.items())
            inner = "\n".join(f"        {pct}% {{{val}}}" for pct, val in sorted_entries)
            L.append(f"      @keyframes {name} {{\n{inner}\n      }}")

    # --- B2 DB node flash ---
    L.append(f"""
      /* B2 DB node flash */
      @keyframes db-flash {{
        0%,7% {{fill:{DB_F};stroke:{DB_S};stroke-width:1.5}}
        8%,10% {{fill:{DB_FLASH_F};stroke:{DB_FLASH_S};stroke-width:2.5}}
        12%,100% {{fill:{DB_F};stroke:{DB_S};stroke-width:1.5}}
      }}""")

    # --- Internal edge keyframes (use source node's inv/recomp timing) ---
    L.append("\n      /* Animated internal edges */")
    for hid in INV:
        host = HOSTS[hid]
        rc = RECOMP.get(hid)
        if not rc:
            continue
        for src, dst in host["edges"]:
            if is_edge_animated(hid, src, dst):
                inv = node_inv_pct(hid, src)
                recon, _, _ = node_recomp(hid, src)
                ename = f"ie-{nid(hid, src)}-{nid(hid, dst)}"
                L.append(f"""      @keyframes {ename} {{
        0%,{inv}% {{opacity:1}} {inv+1}% {{opacity:0}} {recon-1}% {{opacity:0}} {recon}%,100% {{opacity:1}}
      }}""")

    # --- Cross-box edge keyframes ---
    L.append("\n      /* Volatile cross-box edges */")
    for key, (disc, recon) in CROSS_DISC_RECON.items():
        fh, fn, th, tn = key
        ename = f"xe-{nid(fh, fn)}-{nid(th, tn)}"
        L.append(f"""      @keyframes {ename} {{
        0%,{disc}% {{opacity:0.5}} {disc+1}% {{opacity:0}} {recon-1}% {{opacity:0}} {recon}%,100% {{opacity:0.5}}
      }}""")

    # --- Box stroke keyframes (earliest inv → latest green) ---
    L.append("\n      /* Box stroke animations */")
    for hid in INV:
        rc = RECOMP.get(hid)
        if not rc:
            continue
        affected = HOSTS[hid]["affected"]
        earliest_inv = min(node_inv_pct(hid, i) for i in affected)
        first_app = min(node_recomp(hid, i)[0] for i in affected)
        latest_grn = max(node_recomp(hid, i)[1] for i in affected)
        L.append(f"""      @keyframes bx-{hid} {{
        0%,{earliest_inv-1}% {{stroke:#c0c8d4}}
        {earliest_inv}%,{first_app-1}% {{stroke:{BLEACH_S}}}
        {first_app}%,{latest_grn-1}% {{stroke:{BLUE_S}}}
        {latest_grn}%,100% {{stroke:#c0c8d4}}
      }}""")

    # --- Description keyframes ---
    L.append("\n      /* Description text phases */")
    for i, (start, end, _text) in enumerate(DESCRIPTIONS):
        L.append(f"""      @keyframes desc-{i} {{
        0%,{max(0, start-1)}% {{opacity:0}} {start}%,{end}% {{opacity:1}} {min(100, end+1)}%,100% {{opacity:0}}
      }}""")

    # --- Apply animations ---
    L.append("\n      /* Apply animations */")

    # Old nodes
    ids = []
    for hid in INV:
        for idx in HOSTS[hid]["affected"]:
            name = f"old-{nid(hid, idx)}"
            ids.append(f"#{name}{{animation:{name} {DUR}s ease infinite}}")
    L.append("      " + " ".join(ids))

    # New nodes
    ids = []
    for hid in RECOMP:
        for idx in HOSTS[hid]["affected"]:
            name = f"new-{nid(hid, idx)}"
            ids.append(f"#{name}{{animation:{name} {DUR}s ease infinite}}")
    L.append("      " + " ".join(ids))

    # DB flash
    L.append(f"      #db-B2-3{{animation:db-flash {DUR}s ease infinite}}")

    # Internal edges
    ids = []
    for hid in INV:
        host = HOSTS[hid]
        if hid not in RECOMP:
            continue
        for src, dst in host["edges"]:
            if is_edge_animated(hid, src, dst):
                ename = f"ie-{nid(hid, src)}-{nid(hid, dst)}"
                ids.append(f"#{ename}{{animation:{ename} {DUR}s ease infinite}}")
    if ids:
        L.append("      " + " ".join(ids))

    # Cross-box edges
    ids = []
    for key in CROSS_DISC_RECON:
        fh, fn, th, tn = key
        ename = f"xe-{nid(fh, fn)}-{nid(th, tn)}"
        ids.append(f"#{ename}{{animation:{ename} {DUR}s ease infinite}}")
    L.append("      " + " ".join(ids))

    # Box strokes
    ids = []
    for hid in INV:
        if hid in RECOMP:
            ids.append(f"#bx-{hid}{{animation:bx-{hid} {DUR}s ease infinite}}")
    L.append("      " + " ".join(ids))

    # Descriptions
    ids = []
    for i in range(len(DESCRIPTIONS)):
        ids.append(f"#desc-{i}{{animation:desc-{i} {DUR}s ease infinite}}")
    L.append("      " + " ".join(ids))

    return "\n".join(L)


# ═══════════════════════════════════════════
# SVG GENERATION
# ═══════════════════════════════════════════

def gen_svg():
    P = []

    P.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SVG_W} {SVG_H}" width="100%" height="100%">')

    # Defs
    P.append("""  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f4f8fd"/>
      <stop offset="50%" stop-color="#eaf1fb"/>
      <stop offset="100%" stop-color="#e2ebf7"/>
    </linearGradient>
    <linearGradient id="sbg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#d0daea" stop-opacity="0.12"/>
    </linearGradient>
    <marker id="ah" viewBox="0 0 10 10" refX="8.5" refY="5"
            markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#b8c0cc"/>
    </marker>
    <style>""")

    P.append(gen_css())

    P.append("""    </style>
  </defs>""")

    # Background
    P.append(f'  <rect width="{SVG_W}" height="{SVG_H}" rx="10" fill="url(#bg)"/>')

    # Section panels (equal width columns)
    P.append(f"""
  <!-- Section panels -->
  <rect x="{COL1_X}" y="34" width="{COL_W - 5}" height="470" rx="8" fill="url(#sbg)"/>
  <rect x="{COL2_X}" y="34" width="{COL_W - 5}" height="470" rx="8" fill="url(#sbg)"/>
  <rect x="{COL3_X}" y="34" width="{COL_W - 5}" height="470" rx="8" fill="url(#sbg)"/>""")

    # Division lines
    P.append(f"""
  <line x1="{DIV1_X}" y1="34" x2="{DIV1_X}" y2="504" stroke="#c8d0dc" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>
  <line x1="{DIV2_X}" y1="34" x2="{DIV2_X}" y2="504" stroke="#c8d0dc" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>""")

    # Section headers
    P.append(f"""
  <text x="{col_center(COL1_X)}" y="26" class="sh" text-anchor="middle">Clients</text>
  <text x="{col_center(COL2_X)}" y="26" class="sh" text-anchor="middle">API Servers</text>
  <text x="{col_center(COL3_X)}" y="26" class="sh" text-anchor="middle">Backend Servers</text>""")

    # --- Window-style Boxes ---
    P.append("\n  <!-- Window-style boxes -->")
    animated_boxes = set(INV.keys()) & set(RECOMP.keys())
    for hid, host in HOSTS.items():
        bx, by, bw, bh = host["box"]
        id_attr = f'id="bx-{hid}" ' if hid in animated_boxes else ""
        # Outer box
        P.append(f'  <rect {id_attr}x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="6" fill="#f0f4fa" stroke="#c0c8d4" stroke-width="1.5"/>')
        # Header bar background
        P.append(f'  <rect x="{bx}" y="{by}" width="{bw}" height="{HDR_H}" rx="6" fill="#e4e9f2"/>')
        # Fill bottom corners of header (since outer rect has rx but header is only top)
        P.append(f'  <rect x="{bx}" y="{by + HDR_H - 6}" width="{bw}" height="6" fill="#e4e9f2"/>')
        # Header divider line
        P.append(f'  <line x1="{bx}" y1="{by + HDR_H}" x2="{bx + bw}" y2="{by + HDR_H}" stroke="#c0c8d4" stroke-width="1"/>')
        # Header text
        P.append(f'  <text x="{round(bx + bw / 2)}" y="{by + HDR_H - 5}" class="wh" text-anchor="middle">{host["label"]}</text>')

    # --- DB partition lines ---
    P.append("\n  <!-- DB partition lines -->")
    for hid in ["B1", "B2", "B3"]:
        bx, by, bw, bh = HOSTS[hid]["box"]
        body_top = by + HDR_H
        px = round(bx + DB_PART_FRAC * bw)
        P.append(f'  <line x1="{px}" y1="{body_top + 4}" x2="{px}" y2="{by + bh - 8}" stroke="#b8b0a4" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>')
        P.append(f'  <text x="{round(px + (bw - DB_PART_FRAC * bw) / 2)}" y="{by + bh - 6}" class="dbl" text-anchor="middle">DBs</text>')

    # --- Static internal edges (source not affected) ---
    P.append("\n  <!-- Static internal edges -->")
    for hid, host in HOSTS.items():
        for src, dst in host["edges"]:
            if not is_edge_animated(hid, src, dst):
                sx, sy, ex, ey = edge_pts(hid, src, hid, dst)
                P.append(f'  <line x1="{sx}" y1="{sy}" x2="{ex}" y2="{ey}" stroke="#b8c0cc" stroke-width="1" stroke-linecap="round" marker-end="url(#ah)"/>')

    # --- Animated internal edges ---
    P.append("\n  <!-- Animated internal edges -->")
    for hid in INV:
        host = HOSTS[hid]
        if hid not in RECOMP:
            continue
        for src, dst in host["edges"]:
            if is_edge_animated(hid, src, dst):
                ename = f"ie-{nid(hid, src)}-{nid(hid, dst)}"
                sx, sy, ex, ey = edge_pts(hid, src, hid, dst)
                P.append(f'  <line id="{ename}" x1="{sx}" y1="{sy}" x2="{ex}" y2="{ey}" stroke="#b8c0cc" stroke-width="1" stroke-linecap="round" marker-end="url(#ah)"/>')

    # --- Permanent cross-box edges (safe) ---
    P.append("\n  <!-- Permanent cross-box edges (safe path) -->")
    for fh, fn, th, tn in CROSS_SAFE:
        sx, sy, ex, ey = edge_pts(fh, fn, th, tn)
        P.append(f'  <line x1="{sx}" y1="{sy}" x2="{ex}" y2="{ey}" stroke="#8b90a8" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="5,3" opacity="0.35"/>')

    # --- Volatile cross-box edges (affected) ---
    P.append("\n  <!-- Volatile cross-box edges (affected path) -->")
    for fh, fn, th, tn in CROSS_AFFECTED:
        ename = f"xe-{nid(fh, fn)}-{nid(th, tn)}"
        sx, sy, ex, ey = edge_pts(fh, fn, th, tn)
        P.append(f'  <line id="{ename}" x1="{sx}" y1="{sy}" x2="{ex}" y2="{ey}" stroke="#8b90a8" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="5,3" opacity="0.5"/>')

    # --- Static nodes (safe, non-animated) ---
    P.append("\n  <!-- Static nodes -->")
    for hid, host in HOSTS.items():
        for idx in range(len(host["nodes"])):
            if is_affected(hid, idx) or is_db(hid, idx):
                continue
            cx, cy = abs_pos(hid, idx)
            P.append(f'  <circle cx="{cx}" cy="{cy}" r="{NR}" fill="{GREEN_F}" stroke="{GREEN_S}" stroke-width="1.5"/>')

    # --- DB nodes (static except B2.d1 which flashes) ---
    P.append("\n  <!-- DB nodes -->")
    for hid, host in HOSTS.items():
        for idx in host.get("db", set()):
            cx, cy = abs_pos(hid, idx)
            if hid == "B2":
                P.append(f'  <circle id="db-{hid}-{idx}" cx="{cx}" cy="{cy}" r="{NR}" fill="{DB_F}" stroke="{DB_S}" stroke-width="1.5"/>')
            else:
                P.append(f'  <circle cx="{cx}" cy="{cy}" r="{NR}" fill="{DB_F}" stroke="{DB_S}" stroke-width="1.5"/>')

    # --- Old affected nodes (fade + drift groups) ---
    P.append("\n  <!-- Old nodes (fade + drift down during invalidation) -->")
    for hid in INV:
        for idx in HOSTS[hid]["affected"]:
            cx, cy = abs_pos(hid, idx)
            gid = f"old-{nid(hid, idx)}"
            P.append(f'  <g id="{gid}"><circle cx="{cx}" cy="{cy}" r="{NR}"/></g>')

    # --- New affected nodes (appear during recomputation) ---
    P.append("\n  <!-- New nodes (appear during recomputation: blue → green) -->")
    for hid in RECOMP:
        for idx in HOSTS[hid]["affected"]:
            cx, cy = abs_pos(hid, idx)
            gid = f"new-{nid(hid, idx)}"
            P.append(f'  <g id="{gid}"><circle cx="{cx}" cy="{cy}" r="{NR}"/></g>')

    # --- Description text area ---
    P.append("\n  <!-- Description text -->")
    desc_y = 530
    for i, (_s, _e, text) in enumerate(DESCRIPTIONS):
        P.append(f'  <text id="desc-{i}" x="{SVG_W // 2}" y="{desc_y}" class="desc" opacity="0">{text}</text>')

    # --- Legend ---
    P.append(f"""
  <!-- Legend -->
  <g transform="translate({(SVG_W - 600) // 2}, {SVG_H - 20})">
    <circle cx="0" cy="-2" r="4" fill="{GREEN_F}" stroke="{GREEN_S}" stroke-width="1.5"/>
    <text x="8" y="2" class="lg">consistent</text>
    <circle cx="90" cy="-2" r="4" fill="{BLEACH_F}" stroke="{BLEACH_S}" stroke-width="1.5"/>
    <text x="98" y="2" class="lg">invalidated</text>
    <circle cx="195" cy="-2" r="4" fill="{BLUE_F}" stroke="{BLUE_S}" stroke-width="1.5"/>
    <text x="203" y="2" class="lg">computing</text>
    <circle cx="295" cy="-2" r="4" fill="{HIT_F}" stroke="{HIT_S}" stroke-width="1.5"/>
    <text x="303" y="2" class="lg">cache hit</text>
    <line x1="375" y1="-2" x2="405" y2="-2" stroke="#8b90a8" stroke-width="1.5" stroke-dasharray="5,3" stroke-linecap="round"/>
    <text x="413" y="2" class="lg">network hop</text>
    <circle cx="500" cy="-2" r="4" fill="{DB_F}" stroke="{DB_S}" stroke-width="1.5"/>
    <text x="508" y="2" class="lg">DB (ground truth)</text>
  </g>""")

    P.append("</svg>")
    return "\n".join(P)


if __name__ == "__main__":
    svg = gen_svg()
    out = "/proj/ActualLab.Fusion/docs/img/distributed-scaling.svg"
    with open(out, "w") as f:
        f.write(svg)
    print(f"Generated {out}")
    print(f"Size: {len(svg)} bytes, {svg.count(chr(10)) + 1} lines")

    import xml.etree.ElementTree as ET
    tree = ET.parse(out)
    root = tree.getroot()
    ns = {'svg': 'http://www.w3.org/2000/svg'}

    circles = root.findall('.//svg:circle', ns)
    print(f"Circles: {len(circles)}")

    from collections import Counter
    ids = [e.get('id') for e in root.iter() if e.get('id')]
    dupes = {k: v for k, v in Counter(ids).items() if v > 1}
    if dupes:
        print(f"DUPLICATE IDs: {dupes}")
    else:
        print(f"All {len(ids)} IDs unique")

    import re
    style = root.find('.//svg:style', ns).text
    kfs = re.findall(r'@keyframes\s+([\w-]+)', style)
    print(f"Keyframes: {len(kfs)}")

    groups = root.findall('.//svg:g', ns)
    old_g = [g for g in groups if (g.get('id') or '').startswith('old-')]
    new_g = [g for g in groups if (g.get('id') or '').startswith('new-')]
    print(f"Old node groups: {len(old_g)}")
    print(f"New node groups: {len(new_g)}")

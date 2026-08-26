---
title: "What is DESIGN.md?"
source: "https://getdesign.md/what-is-design-md"
author:
published:
created: 2026-07-31
description: "DESIGN.md is a markdown file that describes a brand's visual language in a format AI coding agents can actually use. Learn the format, its 9 sections, and why it matters."
tags:
  - "clippings"
---
The DESIGN.md concept was introduced by Google Stitch. Stitch uses a plain markdown file to describe design patterns, colors, typography, spacing, components, and hands it to an AI agent so it can generate consistent UI. No Figma plugin, no JSON schema, just a markdown file the agent reads before it writes code.

We built the [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) repository on top of that idea. getdesign.md is the web app version of that repo. You can browse, preview, and copy any DESIGN.md file without cloning anything.

---

## The problem: AI builds "nice" but not "yours"

Tell any AI agent to "build me a landing page" and you already know what you'll get. Rounded cards. A purple-blue gradient. A centered hero. A "Get Started" button. It works. It also looks like everything else.

The reason is simple. The agent's idea of "good design" is an average of averages. It has no clue why Vercel uses border instead of shadow, why Linear keeps its letter-spacing so tight, or why Stripe goes easy on gradients. Even if it did know, cramming all of that into a prompt is borderline impossible.

So you end up with two bad options:

1. Write 40 lines of prompt every time ("use #0070f3 for links, -0.02em letter spacing on headings, 8px border radius, no shadows just 1px borders...") and still get half of it wrong.
2. Screenshot a site, paste it, say "make it look like this." The agent copies pixels but misses the system behind them.

Neither scales.

## The fix: DESIGN.md

A DESIGN.md file describes a design system semantically. It is not a token list. Not a Figma export. Not a component library. Picture a document where an experienced designer explains a brand's visual language to a developer who's seeing it for the first time. That's what it reads like.

Here's what goes inside:

- **Visual theme and atmosphere** tells the agent what the brand looks like and, more importantly, *why*. The philosophy behind the aesthetic. Sentences like "Minimalism as engineering principle." The agent gets intent, not just instructions.
- **Color palette and roles** gives every color a hex value *and* a job. " `#ff5b4f`, ship red, used for the production deploy flow because shipping should feel urgent." The name tells you what the color does.
- **Typography rules** cover font, size, weight, line-height, letter-spacing. But the real value is context: which style goes where, and why. "Display sizes get -2.4px tracking because headlines should feel like minified code."
- **Spacing, shadows, motion, components** fill in the rest of the system. Every rule, wherever possible, with a reason attached.

DESIGN.md keeps token, rule, and rationale in the same file. A token tells you what to use but not where. A rule tells you where but not when to bend it. The rationale is what lets an agent make the right call when it hits a situation the file never covers.

## Why markdown?

Because it is the language AI agents speak best. They can read JSON tokens but can't interpret them. They can't see Figma files. They'll imitate a screenshot but won't systematize it. Markdown sits in the middle: readable by humans, parseable by machines, easy to version and diff, and you can drop it in a repo root.

Drop a DESIGN.md file in your project root and tell your agent "use DESIGN.md as reference before you write any UI." From that point on, whether you're working with Claude Code, Cursor, or Windsurf, the agent knows which font, which color, which spacing to reach for. You don't have to repeat yourself in every prompt.

## Why a collection?

Most teams don't write their own DESIGN.md from scratch. Most teams say "make it look like Linear," "give it that Stripe feel," or "keep it close to Apple." These references are real. They come up constantly.

getdesign.md collects those starting points. Inspiration files based on Vercel, Stripe, Linear, Apple, Tesla, Notion, Figma, Supabase, and dozens more, all in the same format, all comparable. Pick one, drop it into your project, tell your agent "use this file as reference." Building on top of that language with your own content and components is up to you.

The goal is not "copy Vercel." It is to give the agent a starting language. Enough context to escape the generic average and land on a specific aesthetic. From there you drift, you make it yours, you evolve it.

## What DESIGN.md is not

The name can be misleading, so this matters:

You can't drop it in and call the theme done. It is a dictionary. The implementation still needs writing. There is no code inside, just rules. It describes what a button looks like; you or your agent still build the button.

It is not a brand guideline PDF either. Brand guidelines are written for humans and speak too loosely for agents to act on ("our brand feels approachable yet premium"). A DESIGN.md has to be specific enough for the agent to make its next decision.

It is not a Figma export. Figma token exports tell you "what" but skip "why." A DESIGN.md carries the rationale.

And it is not static. When the brand evolves, the file evolves. It gets versioned, PR'd, discussed. It behaves like code.

## Mental model

You used to hire a designer and say "you know Linear, right? Give me that feel." It worked because the designer already carried the reference in their head. That shared context sat underneath every conversation you had with them.

An AI agent doesn't have that shared context. DESIGN.md writes it into a file and puts it in the agent's "head." The reference pool you built with a designer over years, you set up with an agent in two minutes.

getdesign.md is not an "asset site." It is closer to an experiment in how design languages get shared when the designer is a machine. The DESIGN.md files are the format. The site is a collection that makes that format concrete.

## The structure of a DESIGN.md file

A DESIGN.md file in the Google `alpha` spec has two halves: a **YAML front matter block** that holds the structured tokens, and a **prose body** of canonical sections that turns those tokens into language an agent can act on. There are 9 standard pieces, walked through below in the order they appear in the file. Each one is a layer the agent reaches for when making a specific design decision.

### 1\. YAML front matter

The very top of the file is a YAML block fenced by `---`. It declares the spec version, the brand name, and a one-paragraph `description` that anchors the brand's atmosphere — not a tagline, but a dense summary an agent can read before it even gets to the prose.

```yaml
---
version: alpha
name: Lumenpath
description: A bright, citrus-warmed product canvas where every primary
  moment runs in a single Tangerine accent. Display type stays large and
  confident at modest weights; cards float on a pale-cream surface
  separated by hairline borders rather than shadows.
---
```

The `version: alpha` line is what tells a linter or downstream tool which spec rules to apply. The `description` is read as the brand's voice — it sets up everything that follows.

### 2\. Color tokens

Inside the YAML, the `colors:` block names every color role with its hex value. Names carry intent — `primary`, `ink`, `body`, `muted`, `canvas`, `surface-card`, `hairline`, `on-primary` — never `blue1`, `gray-100`, `accent-2`. The agent learns the color's job from the key, not just the value.

```yaml
colors:
  primary: "#F76B1C"
  ink: "#1B1A17"
  body: "#3D3A33"
  muted: "#7A7568"
  canvas: "#FFFAF1"
  surface-card: "#FFFFFF"
  hairline: "#E8E1D2"
  on-primary: "#FFFFFF"
```

The prose body later references these as `{colors.primary}`, `{colors.canvas}`, and so on — so a token is defined once and pointed to everywhere.

### 3\. Typography tokens

The `typography:` block defines named text styles, each carrying its own font family, size, weight, line height, and letter spacing. Levels read as roles (`display-lg`, `body-md`, `button`, `caption`), not as semantic HTML elements (`h1`, `h2`).

```yaml
typography:
  display-lg:
    fontFamily: "'Söhne', Inter, sans-serif"
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -1.8px
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
```

Typography tokens become `{typography.display-lg}`, `{typography.button}` references in component definitions — the full style applies in one symbol.

### 4\. Shape and spacing tokens

Two more YAML blocks complete the foundation: `rounded:` for corner radii and `spacing:` for the spacing scale. Both use a t-shirt-size vocabulary plus semantic names (`pill`, `full`, `section`).

```yaml
rounded:
  none: 0px
  sm: 6px
  md: 10px
  lg: 16px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  section: 80px
```

`{rounded.md}` and `{spacing.section}` then appear inside component definitions and prose alike. A site that wants to lift its corners from 8px to 12px changes one YAML value; every component that referenced `{rounded.md}` re-resolves automatically.

### 5\. Component tokens

The `components:` block is where tokens compose into named UI primitives. Each component is defined entirely through `{token.refs}` — never inline hex or px — so a button's color stays in lockstep with the rest of the system.

```yaml
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 10px 18px
  card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 20px
```

This is the structural payload of the file. Variants (`button-primary-active`, `button-primary-disabled`) live as their own entries, not as nested state objects.

### 6\. Overview prose

After the closing `---` of the YAML, the body opens with `## Overview`. This is a multi-paragraph atmosphere statement: the brand's voice in plain English — what carries the voltage, what role the typography plays, what the page rhythm feels like. It closes with a `Key Characteristics` bullet list that summarizes the most-quoted facts.

```markdown
## Overview

Lumenpath reads like a product brand that wants to feel both warm and
deliberate. The base canvas is a pale cream {colors.canvas} (#FFFAF1)
holding deep ink type, with a single voltage of Tangerine {colors.primary}
(#F76B1C) carrying every primary CTA and inline brand link. There is no
secondary brand color — the orange does all the brand work, used scarcely
so it never dilutes.

**Key Characteristics:**
- Single accent color: {colors.primary} carries every primary CTA, the
  active sidebar row, and the brand wordmark.
- Modest display weights — display-lg sits at weight 500, not 700+. The
  brand trusts size and the cream canvas to set hierarchy, not heavy ink.
- Hairline-only depth. Cards separate from canvas via {colors.hairline}
  1px borders, never drop shadows.
```

This section answers "why does it look like this?" The other prose sections answer *what*. This one answers *why*.

### 7\. Colors, Typography, Layout, Elevation prose

Four canonical prose sections expand the YAML tokens with rationale and grouping:

- **`## Colors`** — every named role from `colors:`, grouped under sub-headings (`### Brand & Accent`, `### Surface`, `### Hairlines`, `### Text`, `### Semantic`), with one sentence explaining *what each color does* in the system.
- **`## Typography`** — font family, the full hierarchy table, a `### Principles` paragraph explaining why the scale is shaped the way it is, and a `### Note on Font Substitutes` block for licensed faces.
- **`## Layout`** — the spacing system, grid + container widths, and a whitespace philosophy paragraph. Tokens appear as `{spacing.section}`, `{spacing.lg}`.
- **`## Elevation`** — surface tiers and shadow definitions. Many systems use just one shadow tier; the section says so explicitly when that's the case.
```markdown
## Colors

### Brand & Accent
- **Tangerine** ({colors.primary} — #F76B1C): The single brand color.
  Used on every primary CTA, the active sidebar row, the brand wordmark,
  and inline brand links. Used scarcely — most pages render 90% cream
  canvas plus ink type, with one Tangerine moment.

### Surface
- **Canvas** ({colors.canvas} — #FFFAF1): The default page floor. A pale
  cream rather than pure white — warmer, calmer, lower-glare.
- **Surface Card** ({colors.surface-card} — #FFFFFF): Pure white card
  plates that float a half-step above the cream canvas.
```

The pattern is consistent across all four — the YAML supplies the value, the prose supplies the *reason*.

### 8\. Components prose

`## Components` carries one prose entry per component named in the YAML. Each entry opens with the component's key in bold-code, then describes the surface, typography, padding, and corner radius — all referenced as `{token.refs}` rather than inline values.

```markdown
## Components

**\`button-primary\`** — The signature primary CTA. Background
\`{colors.primary}\`, text \`{colors.on-primary}\`, type
\`{typography.button}\`, padding 10px × 18px, rounded \`{rounded.md}\`
(10px). Press state: shifts background to \`{colors.primary-active}\`.
No hover state is documented.

**\`card\`** — The default content card. Background
\`{colors.surface-card}\`, text \`{colors.ink}\`, rounded \`{rounded.lg}\`
(16px), padding 20px, separated from the canvas by a 1px
\`{colors.hairline}\` border. No drop shadow.
```

The match between the YAML `components:` block and the prose `## Components` section has to be 1:1 — every YAML key has a prose entry, and every prose entry is a YAML key. A coverage linter checks this automatically.

### 9\. Responsive Behavior and Known Gaps

The file closes with two prose sections that handle breakpoints and honesty about limits.

- **`## Responsive Behavior`** — a breakpoint table, a `### Touch Targets` block (with WCAG-AAA assessment), and a `### Collapsing Strategy` bullet list describing how nav, grid, spacing, and forms adapt at each width.
- **`## Known Gaps`** — an explicit list of what the file does *not* cover. Animation timings, error/success state visualizations, sub-brands extracted on different sub-domains. Stating the gaps up front keeps the contract honest.
```markdown
## Responsive Behavior

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 720px | Hamburger nav; hero h1 56→32px; cards stack 1-up. |
| Tablet | 720–1024px | Top nav narrows; cards 2-up; sidebar collapses. |
| Desktop | 1024–1440px | Full top nav; 3-up card grid; sticky sidebar. |
| Wide | > 1440px | Content caps at 1440px; gutters absorb the rest. |

### Touch Targets
- Primary CTAs ≥ 44 × 44px (WCAG AAA).
- Form inputs at 48px height.

### Collapsing Strategy
- Top nav switches to hamburger below 720px.
- Card grid drops column count cleanly — never reflows rows.

## Known Gaps

- Animation and transition timings are out of scope.
- Form error/success states are not extracted on the captured surfaces.
- Dark mode is not a documented variant — the brand renders one canvas mode.
```

---

### Why these 9 pieces?

The structure is not random. It mirrors the layers an agent walks through when making a UI decision. The YAML tokens (1–5) answer "which exact value?" Overview (6) answers "why does it look like this?" Colors / Typography / Layout / Elevation (7) answer "where does each token apply, and why?" Components (8) answer "what does this element look like, made out of those tokens?" Responsive and Known Gaps (9) answer "what changes on small screens, and what isn't covered?"

Each section builds on the one before it. Components are colors and typography composed. The prose is the YAML made human-readable. Read the file top to bottom and it flows like a story — and a linter can still walk it without ever reading prose.

---

## Disclaimer

These are not official design systems from the listed companies. They are curated starting points inspired by publicly visible design patterns. All trademarks, brand names, and design elements belong to their respective owners. These DESIGN.md files document publicly observable design patterns for educational and development purposes.
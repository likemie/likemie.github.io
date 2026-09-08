---
title: Obsidian web style maintenance
---

The vault's `.obsidian/snippets/argument-callouts.css` is the design source.
Do not edit it to fix web rendering.

The Pages workflow runs `node scripts/sync-obsidian-styles.mjs content` after
checking out the vault. This refreshes `quartz/styles/argument-callouts.scss`.
For a local vault, pass its directory instead of `content`. Missing source CSS
fails the build rather than silently publishing stale styles. The generated
file includes the source SHA-256 for verifying which version was imported.

Web responsibilities are separated:

- `obsidian-theme-bridge.scss`: the semantic background/text variables used by
  the default Obsidian theme, plus Quartz paragraph inheritance.
- `argument-callouts.scss`: generated vault CSS, including light/dark selectors
  and reading-view selectors adapted for Quartz. Never hand-edit it.
- `quartz-callout-overrides.scss`: Quartz title paragraphs, SVG icon masks,
  default-title suppression and contained, compact tables.
- `web-readability.scss`: theme-aware accent ink and link contrast improvements.

The converter preserves custom colors, backgrounds, layout and typography.
It does not import Obsidian's full desktop stylesheet. Named Lucide icons need
Quartz SVG masks; existing masks are retained. Obsidian editor-only DOM and
MathJax structures are not reproduced by Quartz's reader and KaTeX renderer.
Full pixel identity across those renderers is not promised.

Verification: compile a sample containing nested lists, links, tables and
representative callouts; inspect both themes and the real RCT note. Color-only
contrast sampling does not account for gradient text, pseudo-elements or all
layered backgrounds, so retain a visual check.

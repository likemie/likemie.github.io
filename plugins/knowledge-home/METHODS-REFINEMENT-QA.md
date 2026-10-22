# Methods discovery and latest entries

The two sections retain the methods page's typefaces, blue accent and light/dark
themes. Random discovery uses two wider columns (one on phones), equal-height
cards and deliberate internal padding. Titles have two visible lines, summaries
have three, and complete text remains available through native title attributes.
Descriptions use normal weight at 16px instead of inheriting bold link text.

Latest entries use a date/content ledger with six native entry links. Each row
shows the title, an existing vault summary and type/link metadata. Phone rows
place the date above the text. Hover/focus feedback remains restrained and has a
reduced-motion fallback. Comparative-page latest cards keep their existing layout.
No new images or video assets were introduced.

## Candidate membership

All entries in these four directories enter their corresponding random pools:

- `wiki/concepts/research-methodology/`
- `wiki/methods/mixed/`
- `wiki/methods/qualitative/`
- `wiki/methods/quantitative/`

The eight-entry build window and the exclusion of fixed, stage, variant and latest
readings are removed. A new categorized entry is included on the next published
vault build. Initial entry/Quartz navigation draws from every candidate. Refresh
selects uniformly among the other candidates when more than one exists, avoiding
immediate repeats. A shared draw helper preserves comparative discovery behavior.

## Checks

- Twelve component tests pass, including 15 candidates in each of four categories,
  inclusion of latest entries, and automatic addition of a new quantitative entry.
- Final preview builds 581 Markdown inputs into 2,827 files successfully.
- Real-browser checks pass at 1440, 768 and 390 pixels in both themes: no document
  overflow, four equal-height 246px cards, six dated latest rows, full pool counts,
  and exactly one visible candidate per group. All 44 distinct discovery/latest
  links resolve in the limited preview corpus. These are fixture counts, not the
  production vault's candidate counts.
- Controlled browser draws reach all candidates beyond index eight; navigation
  can select the last candidate. Longest-title cases preserve complete summary
  lines and metadata within each card. Date sorting and reduced-motion checks pass.
- Prettier and git whitespace checks pass.
- All six baseline and eight final full-page inspector images were opened, together
  with both-theme section close-ups and longest-title screenshots. Inspector:
  before 11 FAIL / 7 WARN; final 10 FAIL / 7 WARN. Generic visual approval remains
  unmet. Retained page styling and shared Quartz chrome still trigger checks;
  unrelated comment-frame loading and footer whitespace were also visible.
- Source style lint scans the entire existing index component: 216 FAIL / 92 WARN.
  These broad legacy findings are not suppressed or reported as passes.
- No vault prose or writing-exception record was edited; no new exceptions approved.

CURRENT REVIEW
Seen in one second: four routes for discovering research methods, followed by a
chronological update list.
Idea: give random reading room for a useful summary; let recent changes scan by date.
Live thing: full-pool draws on navigation and refresh, with native wiki links.
Scores: design 6.5 · usability 8.0 · creativity 6.5 · content 8.5 → overall 6.0.
Caps: unresolved generic visual gate; scores do not imply its approval.
Top three fixes: replace narrow columns with wider cards; separate recent updates
from the card grid; remove candidate caps and keep new/latest entries eligible.

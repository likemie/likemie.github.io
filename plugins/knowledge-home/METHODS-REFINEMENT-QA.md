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

## Focused toolkit and compact ledger update (2026-10-22)

The five toolkit rows now separate the method introduction, one fixed reading,
and one independently drawn related reading. Observation fixes **Classroom
Observation**; the other rows fix Experimental Research, Questionnaire,
Qualitative Interview, and Action Research. Each related reading displays its
existing vault summary. Full titles and summaries remain available as tooltips.
Desktop latest rows measure 65px in the expanded preview fixture. Metadata moves
beside the title/summary, and phone rows keep metadata above the copy.

Discovery adds a fine CSS surface grain, inset edge, pointer light sweep and a
short reveal when the selected entry changes. Reduced-motion preferences disable
these effects. The surrounding Quartz typography and theme colors remain intact.
The compact list hierarchy takes its reference from the Linear analysis in
VoltAgent/awesome-design-md; this is a component refinement, not a theme replacement.

### Tracing and automatic membership

Read the vault index, method definitions and linked passages for Observation
Method, Classroom Observation, Experimental Research, Questionnaire, Qualitative
Interview and Action Research. Followed the corresponding Cohen et al. (2011)
chapter Arguments on action research, questionnaires, interviews and observation.
No original PDF verification is claimed and no vault prose was changed.

Each build starts from the method plus its existing variant entries:

- Observation: Classroom Observation, Participant Observation, Non-participant
  Observation, Structured Observation; also Observation Method.
- Experiment: True Experimental Design, Quasi-Experimental Designs,
  Pre-Experimental Designs; also Experimental Research.
- Questionnaire: Questionnaire Wording, Open-Ended and Closed-Ended Data,
  Response Bias; also Questionnaire.
- Interview: Semi-structured Interview, In-depth Interview, Group Interview;
  also Qualitative Interview.
- Action: Participatory Action Research, Emancipatory Action Research;
  also Action Research.

All eligible roots and their direct outgoing and incoming link neighbors enter
the matching pool. Eligibility covers methods, instruments, and concepts under
research-methodology, statistics and measurement. The fixed reading is excluded;
there is no candidate limit. These are **related readings**, including tools,
quality checks and contrasting designs, rather than a claim that every neighbor
is a subtype. Unbounded traversal would eventually merge the five pools, so the
traversal stops one edge from these method/variant roots. New entries linked to
any root are included automatically on the next published vault build. Unlinked
entries need a relevant vault link to qualify.

The expanded local corpus contains 1,105 Markdown inputs and emits 5,767 files.
Its toolkit pools contain 121 / 120 / 185 / 108 / 39 candidates respectively;
these are preview counts, not a frozen production list.

### Verification

Thirteen component tests pass. The added regression covers both link directions,
variant neighbors, new-entry inclusion, deduplication, fixed-reading exclusion,
and more than eight candidates. Browser checks at 1440, 768 and 390 pixels in
both themes verify one fixed and one visible random reading per method,
independent refresh, last-candidate reachability, compact row heights, no page
overflow, all distinct rendered reading destinations, and reduced motion.
Section screenshots in both themes and full-page inspector sheets were reviewed.
A final visual pass removed inherited pill backgrounds from the toolkit links.
The generic page-wide inspector reports 12 FAIL / 8 WARN, including retained
page/chrome patterns and the requested textured surface. Whole-component source
style lint reports 222 FAIL / 93 WARN across this large existing multi-page file.
These broad style gates remain unmet; no findings were suppressed or claimed to pass.
No new writing exceptions were approved.

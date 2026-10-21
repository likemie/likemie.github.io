# Evidence navigation design

## Scope

Applies only to `/explore/evidence`. Keeps the shared Quartz typography, sidebars and
theme variables, and the topic-page grammar shared with `/explore/methods` and
`/explore/comparative-education`: a framed hero with "← 返回首页 / 专题 0X · English
name", an uppercase kicker, a large title, a statistic column and a numbered compass;
section heads with an eyebrow, an `h2` and a right-aligned note above a rule.

## Identity: Evidence Ledger

Sibling pages each own a motif: methods uses a blueprint grid in slate blue,
comparative education uses an atlas orbit in teal and bronze. This page uses a
ledger: ruled horizontal lines, monospaced section codes (`§01`), tabular
reference counts and an amber signal colour (`--ev-signal`). A second colour,
`--ev-doubt` (muted red), marks critique, so claims and counter-claims can be read
by colour across the page.

The hero carries one signature figure: a four-rung evidence ladder (systematic
review and meta-analysis, RCT, quasi-experiment, practice-based evidence) drawn as
strength pips. Its caption points readers to the method-specific paired reading links.

## References

The [awesome-design-md collection](https://github.com/VoltAgent/awesome-design-md)
provides design analyses, not official brand specifications. Borrowed principles,
without brand palettes or fonts:

- [Stripe analysis](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/stripe/DESIGN.md): tabular figures for every count, thin rules and light borders, one filled pill action per section, a dark inverted card for the featured entry.
- [Notion analysis](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/notion/DESIGN.md): editorial hierarchy and restrained tinted surfaces.

## Section order and curated entries

Entries are matched by wiki title; missing entries are skipped. Counts are inbound
wikilinks across the vault.

1. 重要概念: lead card 循证教育 with a labelled evidence/judgment/context illustration; ledger rows 循证决策, 证据知情实践, 研究利用, 证据标准, 证据生态系统.
2. 证据的产生与评价: three native disclosure chapters (产生 / 综合 / 评价); each opens downward with a brief review, two fixed anchors and one independently sampled related entry. The respective random pools contain 13, 10 and 12 existing entries. Paired criticism remains beside the relevant method.
3. 证据的传播与使用: six reading stages (形成问题 / 检索筛选 / 审查综合 / 转译交流 / 实施调适 / 使用反馈). The six use concepts and their readings live inside the appropriate stage; there is no detached use-card grid.
4. 各国机构与案例: four fixed logo cards (EEF, WWC, Visible Learning, Evidence for ESSA); an independent random draw from 34 institutions, networks, portals and programmes, with country, function and reading link. Historical cases are labelled. The former six-item services list is folded into that draw, with explicit entry types.
5. 国际机构与协作: a clickable eight-node EEN graph connects EEF, NRO, SUMMA and E4L, a shared toolkit, the earlier cooperation project and its funder. Partner relations are distinct from project funding. An eleven-node OECD graph connects six project entrances (PISA, TALIS, PIAAC, INES, AHELO feasibility study, research-impact project), Education at a Glance/CERI and numerical-governance/policy-brokerage concepts. Its solid project/organization edges are distinct from dashed interpretive links. Campbell and BE2 remain secondary entrances.
6. 随机发现: four pools (概念 / 方法与工具 / 人物 / 研究文献) drawn from the topic scope.
7. 最新条目: six most recently updated entries in scope.

## Motion and accessibility

- Sections already in view at load are never hidden; only below-the-fold sections fade in, and `beforeprint` reveals everything.
- Ladder pips grow once on entry; disclosure panels slide down on interaction, with cancellable animations and a reduced-motion fallback.
- The compass highlights the current section while scrolling (captured scroll listener, so it works with any scroll container).
- Native disclosure summaries support Enter and Space; flow steps support arrow keys, Home and End. Opening a chapter closes the previous chapter; reduced-motion skips the slide.
- `prefers-reduced-motion` disables all transitions and transforms; all functions remain.
- The concept lens uses layered discs, soft radial light and animated signals. EEN connections animate subtly; hover and keyboard focus highlight connected nodes, and node links open their wiki entries. Both graphs become readable linked grids on phones. Each method refresh changes only its own random entry, preserving the two fixed anchors and every other pool.
- Official logos sit unmodified on a white plate in both themes.
- Checked at 1440px, 768px and 390px in light and dark themes: no horizontal overflow.

## Refinement checks

The implementation and navigation changes are covered by `components/evidence.test.js`.
Browser checks cover both themes at 1440, 768 and 390 pixels, method switching,
independent random pools and local link resolution. The generic taste inspector
also reports existing ledger conventions and shared Quartz chrome as findings;
its results must not be described as a complete visual-gate pass.

The concept lens has four native SVG links with descriptive labels and hover/focus hit areas: research synthesis, professional judgment, local knowledge and evidence-informed decision-making. Missing targets leave the diagram visible without dead links.

Research readings share one three-column row on desktop and tablet. Synthesis fixes Meta-analysis and Meta-meta-analysis, with Systematic Review in its random pool. Every use stage has two main entries. Discovery uses five compact, consistently sized records, including a dedicated 25-entry project pool. Long titles show at most two visual lines, retain full accessible text and expose the full title on hover.

### Discovery card revision

Restore the user's card composition and add vault summaries. Keep category counts
and a bottom metadata/action line; limit title and summary lines so long research
titles do not force tall narrow columns. Use three desktop columns, two tablet
columns and one phone column. The final programme card spans two columns when
available. This explicit user preference takes precedence over the skill's generic
ban on repeated cards. Remove the secondary international entry block.

### Compact cards and movable international nodes

Reduce discovery reading areas from 19/18rem to 12rem, shorten visible summaries
to three lines, and retain full text in native title attributes. The user's request
for texture and motion adds restrained amber surface grain, a hover light sweep,
and a short lift; reduced-motion settings remove travel. Existing palette stays.

Combine EEN and OECD in one connected map using the EEF research-case bridge.
Native links stay on the entry boxes; separate labelled handles accept pointer
and arrow-key movement. Positions remain in session storage, edges follow node
centres, and a reset button restores the initial arrangement. On narrow screens
the map pans inside its own scroll region, keeping the document width fixed.
Remove the former bottom legend and instructional caption, as requested.

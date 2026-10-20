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
strength pips. Its caption points to §04, where the hierarchy itself is contested.

## References

The [awesome-design-md collection](https://github.com/VoltAgent/awesome-design-md)
provides design analyses, not official brand specifications. Borrowed principles,
without brand palettes or fonts:

- [Stripe analysis](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/stripe/DESIGN.md): tabular figures for every count, thin rules and light borders, one filled pill action per section, a dark inverted card for the featured entry.
- [Notion analysis](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/notion/DESIGN.md): editorial hierarchy and restrained tinted surfaces.

## Section order and curated entries

Entries are matched by wiki title; missing entries are skipped. Counts are inbound
wikilinks across the vault.

1. 重要概念: lead card 循证教育; ledger rows 循证决策, 证据知情实践, 研究利用, 证据标准, 证据生态系统.
2. 证据的产生与评价: three tabs (产生 / 综合 / 评价), five entries each; RCT, 元分析, 元-元分析, 效应量 and 实施与过程评估 carry a "对照阅读" link to their critique entry.
3. 证据的传播与使用: dark lead card 教育证据清算中心; five-step flow (证据标准 → 检索与筛选 → 质量审查 → 综合与评级 → 发布与动员); mechanism chips 教育中介机构, 研究-实践伙伴关系, QURE, 实施忠实度, 研究利用模型.
4. 争议与反思 (new): six claim ↔ counter-claim rows by issue, plus seven key people tagged by stance (Slavin, Hattie, Brown, Gorard, Pawson, Cartwright, Biesta).
5. 各国机构与案例: four fixed logo cards (EEF, WWC, Visible Learning, Evidence for ESSA) with refreshed related links; a 13-row institution registry filterable by region.
6. 国际机构: Campbell Collaboration, Evidence for Education Network, OECD, BE2, EU initiatives, Global Evidence Ecosystem for Teaching.
7. 随机发现: four pools (概念 / 方法与工具 / 人物 / 研究文献) drawn from the topic scope.
8. 最新条目: six most recently updated entries in scope.

## Motion and accessibility

- Sections already in view at load are never hidden; only below-the-fold sections fade in, and `beforeprint` reveals everything.
- Ladder pips grow once when the hero enters view; tab, flow and filter changes animate only after interaction.
- The compass highlights the current section while scrolling (captured scroll listener, so it works with any scroll container).
- Tabs and flow steps support arrow keys, Home and End; buttons are at least 44px tall; visible focus rings use the signal colour.
- `prefers-reduced-motion` disables all transitions and transforms; all functions remain.
- Official logos sit unmodified on a white plate in both themes.
- Checked at 1440px, 768px and 390px in light and dark themes: no horizontal overflow.

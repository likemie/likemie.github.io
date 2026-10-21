# Evidence refinement checks

## Scope and evidence

This is a component refinement of the existing Evidence Ledger page. Shared Quartz
navigation, typography, themes and section conventions are retained. The vault was
read through its index, entry bodies and relevant Argument passages; no wiki body
content or writing-exception records were edited. Source paths and inclusion
choices are recorded in EVIDENCE-TRAVERSAL.md. Original PDFs were not reread.

## Current verification

- Eight component tests pass. Native disclosures, missing-entry handling, fixed
  anchors, independently addressed pools and graph relation types are covered.
- Node syntax, Prettier and git whitespace checks pass.
- Final component preview: 540 Markdown inputs, 2,557 emitted files, success.
- Browser checks at 1440, 768 and 390 pixels in both themes pass: no document
  overflow or overlapping nodes; 2 fixed plus 4 random entries per chapter.
- Repeated refreshes preserve fixed readings, other pools, keyboard focus and the
  open chapter. Both graphs highlight the expected immediate neighbors. The PISA
  node navigates to its wiki page. All 267 distinct component wiki links resolve.
- Reduced-motion and script-disabled fallbacks pass. The static fallback exposes
  six fixed and twelve initially selected links, plus all nineteen graph nodes.
- An earlier full-vault integration build processed 4,269 Markdown inputs and
  emitted 22,158 files successfully. The latest iteration uses the component
  preview, whose citation counts reflect its smaller corpus.

## Research reading interaction

Each of three chapters contains two fixed anchors and four random entries.
The random candidate counts are 13 (production), 10 (synthesis) and 12 (appraisal),
with fixed anchors excluded. Sampling is without replacement; a refresh guarantees
a changed set when more than four candidates exist. Each refresh affects only its
own pool. The two fixed entries and other method, institution and discovery pools
remain unchanged. Opening, closing and rapid chapter selection retain the native
disclosure behavior and cancellable height animation.

The independent institution library contains 34 institution, network and service
entries. The former standalone services list remains removed.

## Relationship maps

EEN has eight nodes and seven edges. Project funding connects BHP to its funded
project. OECD has eleven nodes and ten edges, covering six project entrances, a
report, a research center and two interpretive concepts around its central node.
INES connects to Education at a Glance, and CERI connects to its research-impact
project. Numerical governance and policy brokerage are dashed interpretive links.

Both maps use native wiki links. Pointer hover and keyboard focus highlight the
selected node's immediate neighbors and update the relationship caption. On phones,
the maps become linked grids with the decorative edge layer hidden.

## Visual review

All ten final inspector images were opened, along with close-up light/dark method
and graph screenshots. The final inspector reports **13 FAIL / 7 WARN**.

The generic visual gate remains unmet. It reports retained ledger eyebrows,
numbering, monospaced labels, outlines and rules; rendered depth; image-density
expectations; and shared Quartz header/sidebar issues. Findings are not suppressed
or reported as passes. Functional and responsive checks are distinct from this gate.

CURRENT REVIEW
Seen in one second: an evidence reading guide with two organization relationship maps.
Idea (one sentence): fixed reading anchors support randomized exploration, while graph
edges distinguish institutional/project relationships from governance interpretations.
Live thing: independent four-entry method draws, two linked maps, disclosure chapters
and the existing institution/discovery draws.
Layout words by section: concepts=rendered lens / methods=fixed plus sampled readings /
use=stages / institutions=cases and draw / international=two relationship maps.
Scores: design 6.5 · usability 8.0 · creativity 7.0 · content 8.5 → overall 6.0.
Caps applied: generic visual-rule failures remain.
Top three visible issues addressed:

1. The OECD cards hid project/report and center/project connections. Replaced them
   with a linked eleven-node map with solid and interpretive edge types.
2. Six static method links constrained exploration. Added audited existing candidates
   and separate controls for four random entries, retaining two fixed anchors.
3. An old last-child rule made the thirteenth production candidate span both columns.
   Removed the rule so all sampled four-entry sets keep the same two-column grid.

## Concept illustration links

The four linked regions cover both the diagram symbols and their labels. SVG uses a group role so native links retain their accessible semantics. Research evidence directs to the existing Research Synthesis entry; the other regions direct to Professional Judgment, Local Knowledge in Evidence-Based Policy and Evidence-Informed Decision-Making. Existing source-checked labels and diagram geometry remain unchanged. No writing exceptions were added.

The linked illustration passed desktop (1440px) and phone (390px) pointer hit tests for all four regions, keyboard focus and actual navigation to the decision entry. The final publication preview compiled successfully.

# Research-stage reading pools

Random discovery is integrated into the research roadmap. The standalone
four-category section is removed. Each regular stage and each approach/analysis
branch has two or three fixed links plus one independently drawn extension.
**Literature Search remains fixed in the review stage.** The five featured-method
cards retain their separate anchored/related readings and share the shuffle
control styling. Reading-status headings are omitted; candidate counts remain
in native control tooltips and accessible labels.

| Reading group         | Fixed anchors                                                            | Extension family                                                                 |
| --------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Topic                 | Research Topic; Research Scope                                           | Problem finding, research value, feasibility and theoretical focus               |
| Review                | Literature Search; Literature Review; Research Purpose                   | Search strategies, literature mapping, research rationale and proposals          |
| Questions             | Research Question; Variable; Operationalization                          | Research-methodology questions, hypotheses, concepts and measurement definitions |
| Sampling              | Study Population and Sample; Unit of Analysis; Sample Size Determination | Sampling strategies, access, saturation, attrition and power planning            |
| Qualitative design    | Case Study; Ethnography                                                  | Case, ethnographic, narrative, grounded-theory, historical and participatory paths            |
| Quantitative design   | Survey Research; Experimental Research                                   | Experimental, survey and longitudinal designs, allocation and design controls    |
| Mixed design          | Convergent Design; Explanatory Sequential Design                         | Mixed-method design families, including exploratory and embedded designs         |
| Collection            | Questionnaire; Qualitative Interview; Observation Method                 | Collection procedures, field records, protocols and measurement instruments      |
| Qualitative analysis  | Coding in Qualitative Research; Qualitative Content Analysis             | Coding, text/discourse analysis and interpretive analytic procedures             |
| Quantitative analysis | Descriptive Analysis; Multiple Regression; Confidence Interval           | Statistical estimation, models, tests, uncertainty and analytic displays         |
| Mixed integration     | Integration in Mixed Methods; Joint Display                              | Integration statements, data transformation and metainferences                   |
| Quality/reporting     | Trustworthiness; Internal Validity; Research Writing Script              | Validity, reliability, generalization, reporting and appraisal tools             |

The approach heading links remain contextual entry points. Fixed anchors are
excluded from their own random pool. Draws include every matching candidate;
there is no eight-entry window. Refresh avoids immediately repeating the visible
entry. Initial page load and Quartz navigation can reach every candidate.

## Classification boundaries

The cross-cutting ethics group fixes Research Ethics and Reflexivity, drawing one
extension from research consent, privacy, confidentiality, researcher reflection,
ethics review, conflicts of interest and research-ethics theories. It uses an
independent pool and the same compact controls.

Rules are in `components/methods-flow-pools.js`. They combine directory scope with
reviewed title families, so new entries fitting those families join automatically
on the next vault build. New terminology outside the families needs a rule update;
this does not claim automatic semantic recognition of every future note.

The audit uses `wiki/index.json` to locate candidate families and the existing
method/planning bodies and Argument references documented in METHODS-REFINEMENT-QA.
The pool is an editorial set of related readings, including limitations and
supporting concepts; membership does not assert that every candidate is a subtype.

Important exclusions verified with regression tests:

- Hypotheses from subject domains (for example Technology Driver Hypothesis) do
  not enter the question-setting pool merely because their titles say hypothesis.
- AMSTAR, PRISMA and other appraisal/reporting checklists enter quality, not the
  data-collection instrument pool.
- Power Analysis belongs to sampling/planning. Regression Discontinuity Design
  belongs to design; neither is treated as a generic analysis procedure.
- Mixed-method designs and mixed-method integration have separate pools.
- Unlisted entries and a group's fixed links are excluded.

## Controls and layout

Random readings are capsule links matching the fixed anchors, with a dashed border
and an adjacent icon-only shuffle button. Full titles and existing summaries are
available in the native link tooltip; long labels wrap within the available width without truncation. The button tooltip states the candidate count; its accessible label
also names the stage. Touch buttons remain 44px. Each control affects only its
own pool, while fixed links stay stable. Reduced motion disables reveal and icon
animation.

The qualitative directory currently contains 134 entries, spanning design,
collection, sampling and analysis. The previous eight random readings were only
the narrow design-family matches after two fixed anchors were excluded. Reading
the definitions, method-stack sections and linked Cohen chapters identified ten
additional related paths: Archival Research, Ethogenic Approach, Feminist Research,
Fieldwork, Historical-Comparative Method, Participatory Research, Participatory
Action Research, Emancipatory Action Research, Practitioner Enquiry and Process
Tracing. This yields 18 random extensions plus the two fixed anchors. These are
related design readings, not a claim that participatory/feminist approaches can
only use qualitative data. Visual Research Methods remains a collection approach;
interview and coding entries are not moved into design to inflate its count.

## Deployment error repaired in the vault

The failed run 39733932889 stopped on `Stereotype Threat.md`: adding an indented
MetaX tag ahead of an indentless YAML tag list produced mixed indentation. The
subsequent esbuild deadlock appeared after the fatal YAML error. The vault's
`metax_sync.py` now handles both block-list styles and repairs this mixed form,
while preserving tag order and the surrounding body. Regression cases also cover
flow/scalar/empty tags, quoted values, removals and idempotence.

Normal incremental `vault_index.py` followed by `vault_lint.py` passed (0 errors,
0 warnings). Required writing review changed “闭环” to “循环” and replaced one
“而是” transition with a direct explanatory clause in Stereotype Threat. No new
writing exceptions were approved. The hosted-content snapshot subsequently built
4,543 Markdown inputs into 22,830 files, and recovery workflow 39752053667 succeeded.

## Verification

Sixteen component tests pass, including the Literature Search fixed anchor,
classification counterexamples, newly added matching entries, and draws with more
than eight candidates. The integrated preview builds 1,110 Markdown inputs into
5,799 files. Browser checks at 1440, 768 and 390 pixels in both themes verify 12
independent pools, exactly two or three fixed links plus one visible random link,
complete link destinations, stable fixed readings, last-candidate reachability,
uniform reachability beyond eight, 44px touch controls and reduced motion. The
standalone discovery section is absent. Section captures include the roadmap,
three-way branches, analysis and featured toolkit.

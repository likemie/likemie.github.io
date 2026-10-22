// Families follow the distinct planning/design/collection/analysis roles in the vault.
// Matching remains open to newly published entries; no preselected draw window.
const concept = (p) => (p.slug ?? "").startsWith("wiki/concepts/")
const method = (p) => (p.slug ?? "").startsWith("wiki/methods/")
const qualitative = (p) => (p.slug ?? "").startsWith("wiki/methods/qualitative/")
const quantitative = (p) => (p.slug ?? "").startsWith("wiki/methods/quantitative/")
const mixed = (p) => (p.slug ?? "").startsWith("wiki/methods/mixed/")
const instrument = (p) => (p.slug ?? "").startsWith("wiki/instruments/")
const planningConcept = (p) =>
  ["wiki/concepts/research-methodology/", "wiki/concepts/academic-writing/"].some((prefix) =>
    (p.slug ?? "").startsWith(prefix),
  )
const qualityConcept = (p) =>
  planningConcept(p) ||
  ["wiki/concepts/statistics/", "wiki/concepts/measurement/"].some((prefix) =>
    (p.slug ?? "").startsWith(prefix),
  )
const collectionInstrument = (p) =>
  instrument(p) &&
  (/\/(observation-tools|interview-tools|questionnaires|inventories|scales|tests)\//.test(p.slug) ||
    /^(Consensual Assessment Technique|OECD Rubrics for Creativity and Critical Thinking|VALUE Rubrics|CALOHEE Assessment Reference Frameworks)$/.test(
      p.frontmatter?.title ?? "",
    ))
const named = (p, pattern) => pattern.test(p.frontmatter?.title ?? "")

export const methodsFlowPoolRules = {
  topic: (p) =>
    concept(p) &&
    named(
      p,
      /^(Research (Topic|Scope|Problem|Practicability|Contribution|Purpose)|Problem Finding|Fitness for Purpose|Central Phenomenon|Theoretical Perspective|Theoretical Standpoint)$/i,
    ),
  review: (p) =>
    (planningConcept(p) || method(p)) &&
    named(
      p,
      /literature|^PICO Framework$|^Primary and Secondary Documents$|^Research (Proposal|Contribution|Purpose)$|^Purpose Statement$/i,
    ),
  question: (p) =>
    planningConcept(p) &&
    named(
      p,
      /hypothes|variable|^construct$|operationalization|^definition of terms$|^scale of measurement$|^measurement alignment$|^central (question|phenomenon)$|research question|^mixed methods question$|^nondirectional language$/i,
    ),
  sampling: (p) =>
    (concept(p) || method(p)) &&
    named(
      p,
      /sampling|sample size|^power analysis$|^study population and sample$|^unit of analysis$|^gatekeepers$|^access and acceptance in research$|^saturation$|^attrition$/i,
    ),
  qualitativeDesign: (p) =>
    qualitative(p) &&
    named(
      p,
      /^(.*ethnography|.*phenomenolog.*|.*grounded theory.*|.*case study|narrative (research|inquiry)|life history|biographical research)$/i,
    ),
  quantitativeDesign: (p) =>
    quantitative(p) &&
    named(
      p,
      /experimental|experiment(s)?$|designs?$|^cohort study$|^co-relational study$|^criterion group study$|^trend study$|^non-intervention research$|^intervention research$|^ex post facto research$|^black box rcts$|^blinding$|^cover story$|^manipulation check$|^random assignment$|^campbell and stanley notation system$|randomi[sz]ed.*trial|^(efficacy|effectiveness|multi-arm|pragmatic|pilot|feasibility) trial$|^survey research$|longitudinal|cross-sectional|factorial design|single-(subject|case) design|correlational research|repeated measures design|regression discontinuity design/i,
    ),
  mixedDesign: (p) =>
    mixed(p) &&
    named(
      p,
      /^(Convergent Design|Explanatory Sequential Design|Exploratory Sequential Design|Mixed Methods .*Design)$/i,
    ),
  collection: (p) =>
    collectionInstrument(p) ||
    ((method(p) || concept(p)) &&
      named(
        p,
        /questionnaire|interview|observation|^field notes$|^qualitative documents$|^virtual documents$|^visual data$|focus group|data (collection|extraction)|online survey|rating scale|diar(y|ies)|^pilot testing$|^scale development$|^contingency questions$|^multiple-choice questions$|^ranking questions$|^sensitive questions$|^semantic differential$|^likert scale$|^covering letter$|^internet-based survey$|^pre-test and post-test$|^electroencephalography$|^functional magnetic resonance imaging$|^sociometry$|^open-ended and closed-ended data$|^primary and secondary documents$|^rapport in qualitative research$|^researcher as key instrument$|^going native$/i,
      )),
  qualitativeAnalysis: (p) =>
    qualitative(p) && named(p, /analys[ie]s|coding|codebook|constant compar|^framework method$/i),
  quantitativeAnalysis: (p) =>
    (p.slug ?? "").startsWith("wiki/concepts/statistics/") ||
    (quantitative(p) &&
      named(
        p,
        /analys[ie]s|regression|correlation|^.*test$|effect size|model|estimation|matching|variance|interval|wald|parametric|imputation|squared|plot|least squares|shift-share|weighting|causal effect|difference|^standard error$|^statistical significance$|^fail-safe n$|^corrected covered area$|^small study effects$|^trim and fill method$|^item response theory$|^rasch measurement$|^plausible values$|^differential item functioning$|^research synthesis$/i,
      ) &&
      !named(
        p,
        /regression discontinuity|^test administration$|^power analysis$|^pre-test and post-test$|^correlational research$/i,
      )),
  mixedAnalysis: (p) =>
    (mixed(p) || concept(p)) &&
    named(
      p,
      /^(Integration in Mixed Methods|Integration Statement|Joint Display|Metainferences|Data Transformation|Connecting|Merging|Embedding)$/i,
    ),
  quality: (p) =>
    (instrument(p) && (p.slug ?? "").startsWith("wiki/instruments/checklists/")) ||
    ((qualityConcept(p) || method(p)) &&
      named(
        p,
        /validity|reliability|trustworthiness|cronbach|mcdonald|^internal consistency$|^measurement invariance$|^average variance extracted$|^multitrait-multimethod matrix$|generalizability|generalization|^.*bias$|preregistration|researcher degrees of freedom|research writing|research report|^reporting|^FAIR Principles$|^Research Ethics$|^Responsible Conduct of Research$|^Informed Consent$|^Confidentiality$|^Anonymity in Research$|^Privacy in Research$|^Member Checking$|^Audit Trail$|^Triangulation$|^Chain of Evidence$/i,
      )),
}

export function methodsFlowPool(pages, key, excluded = []) {
  const slugs = new Set(excluded.filter(Boolean).map((p) => p.slug))
  const rule = methodsFlowPoolRules[key]
  return pages.filter((p) => p.unlisted !== true && !slugs.has(p.slug) && rule?.(p))
}

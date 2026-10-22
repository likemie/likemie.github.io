import assert from "node:assert/strict"
import test from "node:test"
import { methodsFlowPool } from "./methods-flow-pools.js"
const page = (title, slug) => ({ frontmatter: { title }, slug })
test("planning, measurement tools and analysis stay in their respective reading families", () => {
  const hypothesis = page("Null Hypothesis", "wiki/concepts/research-methodology/null")
  const domainHypothesis = page(
    "Technology Driver Hypothesis",
    "wiki/concepts/science-policy/driver",
  )
  const observation = page(
    "Classroom Observation Tool",
    "wiki/instruments/observation-tools/classroom",
  )
  const appraisal = page("AMSTAR", "wiki/instruments/checklists/amstar")
  const power = page("Power Analysis", "wiki/methods/quantitative/power")
  const regression = page("Multiple Regression", "wiki/methods/quantitative/regression")
  const design = page("Regression Discontinuity Design", "wiki/methods/quantitative/rdd")
  const mixedDesign = page("Exploratory Sequential Design", "wiki/methods/mixed/exploratory")
  const mixedAnalysis = page("Joint Display", "wiki/methods/mixed/joint")
  const all = [
    hypothesis,
    domainHypothesis,
    observation,
    appraisal,
    power,
    regression,
    design,
    mixedDesign,
    mixedAnalysis,
  ]
  assert.deepEqual(methodsFlowPool(all, "question"), [hypothesis])
  assert.deepEqual(methodsFlowPool(all, "collection"), [observation])
  assert.deepEqual(methodsFlowPool(all, "quality"), [appraisal])
  assert.deepEqual(methodsFlowPool(all, "quantitativeAnalysis"), [regression])
  assert.deepEqual(methodsFlowPool(all, "quantitativeDesign"), [design])
  assert.deepEqual(methodsFlowPool(all, "mixedDesign"), [mixedDesign])
  assert.deepEqual(methodsFlowPool(all, "mixedAnalysis"), [mixedAnalysis])
})

test("qualitative paths include historical and participatory approaches without absorbing collection or coding", () => {
  const names = ["Archival Research", "Ethogenic Approach", "Feminist Research", "Fieldwork", "Historical-Comparative Method", "Participatory Research", "Participatory Action Research", "Emancipatory Action Research", "Practitioner Enquiry", "Process Tracing"]
  const candidates = names.map((title, i) => page(title, `wiki/methods/qualitative/path-${i}`))
  const collection = page("Qualitative Interview", "wiki/methods/qualitative/interview")
  const coding = page("Open Coding", "wiki/methods/qualitative/coding")
  assert.deepEqual(methodsFlowPool([...candidates, collection, coding], "qualitativeDesign"), candidates)
  const future = page("Institutional Ethnography", "wiki/methods/qualitative/institutional-ethnography")
  assert.equal(methodsFlowPool([...candidates, future], "qualitativeDesign").length, 11)
})

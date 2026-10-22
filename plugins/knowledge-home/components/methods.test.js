import assert from "node:assert/strict"
import test from "node:test"
import { methodsTopicData } from "./index.js"
const page = (title, slug) => ({ frontmatter: { title }, slug, links: [] })

test("latest methods use all categorized entries and include newly added entries", () => {
  const prefixes = [
    "wiki/concepts/research-methodology/",
    "wiki/methods/mixed/",
    "wiki/methods/qualitative/",
    "wiki/methods/quantitative/",
  ]
  const pages = prefixes.flatMap((prefix, group) =>
    Array.from({ length: 15 }, (_, i) => page(`Group ${group} entry ${i}`, `${prefix}entry-${i}`)),
  )
  const unrelated = page("Unrelated", "wiki/facts/other")
  const topic = methodsTopicData([...pages, unrelated], "2026-10-22")
  assert.equal(topic.total, 60)
  assert.equal(topic.latest.length, 6)
  assert(topic.latest.every((p) => pages.includes(p)))
  const added = {
    ...page("New quantitative method", "wiki/methods/quantitative/new"),
    dates: { modified: new Date("2026-10-23") },
  }
  const rebuilt = methodsTopicData([...pages, added], "2026-10-23")
  assert.equal(rebuilt.total, 61)
  assert.equal(rebuilt.latest[0], added)
})

test("featured methods keep one fixed reading and trace both directions without a candidate cap", () => {
  const observation = page("Observation Method", "wiki/methods/qualitative/observation")
  const classroom = page("Classroom Observation", "wiki/methods/qualitative/classroom")
  const variant = page("Structured Observation", "wiki/methods/qualitative/structured")
  const outward = page("Observation Protocol", "wiki/methods/qualitative/protocol")
  observation.links = [outward.slug]
  const incoming = Array.from({ length: 20 }, (_, i) => ({
    ...page(`Related ${i}`, `wiki/instruments/tool-${i}`),
    links: [classroom.slug],
  }))
  const variantChild = {
    ...page("New variant tool", "wiki/methods/qualitative/new"),
    links: [variant.slug],
  }
  const unrelated = page("Unrelated", "wiki/methods/qualitative/unrelated")
  const outside = { ...page("Person", "wiki/persons/someone"), links: [classroom.slug] }
  const pages = [
    observation,
    classroom,
    variant,
    outward,
    ...incoming,
    variantChild,
    unrelated,
    outside,
  ]
  const method = methodsTopicData(pages, "2026-10-22").methods[0]
  assert.equal(method.fixedPage, classroom)
  assert(method.related.includes(observation))
  assert(method.related.includes(outward))
  assert(method.related.includes(variantChild))
  assert(incoming.every((p) => method.related.includes(p)))
  assert(!method.related.includes(classroom))
  assert(!method.related.includes(unrelated))
  assert(!method.related.includes(outside))
  assert.equal(new Set(method.related).size, method.related.length)
  const added = {
    ...page("New related method", "wiki/methods/qualitative/added"),
    links: [classroom.slug],
  }
  assert(methodsTopicData([...pages, added], "2026-10-23").methods[0].related.includes(added))
})

test("research roadmap separates approach, collection and analysis and merges planning decisions", () => {
  const titles = [
    "Literature Review",
    "Research Proposal",
    "Research Question",
    "Operationalization",
    "Study Population and Sample",
    "Unit of Analysis",
    "Qualitative Research",
    "Quantitative Research",
    "Mixed Methods Research",
    "Questionnaire",
    "Qualitative Interview",
    "Observation Method",
    "Coding in Qualitative Research",
    "Descriptive Analysis",
    "Integration in Mixed Methods",
    "Joint Display",
  ]
  const pages = titles.map((title, i) => page(title, `wiki/methods/entry-${i}`))
  const stages = methodsTopicData(pages, "2026-10-22").stages
  assert.deepEqual(
    stages.map((s) => s.title),
    [
      "选题与收窄",
      "综述与研究论证",
      "问题与操作化",
      "研究对象与取样",
      "选择研究路径",
      "收集数据",
      "分析与整合",
      "质量检查与报告",
    ],
  )
  assert(stages[1].random.pages.some((p) => p.frontmatter.title === "Research Proposal"))
  assert(stages[2].links.some((p) => p.frontmatter.title === "Operationalization"))
  assert(!stages[2].conditional)
  assert(stages[3].links.some((p) => p.frontmatter.title === "Study Population and Sample"))
  assert.deepEqual(
    stages[4].branches.map((b) => b.page.frontmatter.title),
    ["Qualitative Research", "Quantitative Research", "Mixed Methods Research"],
  )
  assert.deepEqual(
    stages[6].branches.map((b) => b.page),
    stages[4].branches.map((b) => b.page),
  )
  assert(stages[5].links.some((p) => p.frontmatter.title === "Questionnaire"))
  assert(
    stages[6].branches[0].links.some(
      (p) => p.frontmatter.title === "Coding in Qualitative Research",
    ),
  )
  assert(stages[6].branches[1].links.some((p) => p.frontmatter.title === "Descriptive Analysis"))
  assert(
    stages[6].branches[2].links.some((p) => p.frontmatter.title === "Integration in Mixed Methods"),
  )
  const missing = methodsTopicData([], "2026-10-22").stages
  assert(
    missing.every(
      (s) =>
        s.links.length === 0 && (s.branches ?? []).every((b) => !b.page && b.links.length === 0),
    ),
  )
})

test("stage draws keep Literature Search fixed and use role-specific uncapped pools", () => {
  const conceptPage = (title, area = "research-methodology") =>
    page(title, `wiki/concepts/${area}/${title}`)
  const fixed = [
    conceptPage("Literature Search"),
    conceptPage("Literature Review"),
    conceptPage("Research Purpose"),
  ]
  const other = Array.from({ length: 18 }, (_, i) => conceptPage(`Literature Search Strategy ${i}`))
  const topic = methodsTopicData([...fixed, ...other], "2026-10-22")
  assert.deepEqual(topic.stages[1].links, fixed)
  assert.equal(topic.stages[1].random.pages.length, 18)
  assert(other.every((p) => topic.stages[1].random.pages.includes(p)))
  assert(fixed.every((p) => !topic.stages[1].random.pages.includes(p)))
  const added = conceptPage("Literature Search Update")
  assert(
    methodsTopicData([...fixed, ...other, added], "2026-10-23").stages[1].random.pages.includes(
      added,
    ),
  )
})

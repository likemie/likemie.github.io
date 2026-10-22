import assert from "node:assert/strict"
import test from "node:test"
import { methodsTopicData } from "./index.js"
const page = (title, slug) => ({ frontmatter: { title }, slug, links: [] })

test("method discovery includes every categorized candidate, including latest entries", () => {
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
  for (const group of topic.random) {
    assert.equal(group.count, 15)
    assert.equal(group.pages.length, 15)
    assert.equal(new Set(group.pages.map((p) => p.slug)).size, 15)
    assert(!group.pages.includes(unrelated))
  }
  for (const latest of topic.latest) assert(topic.random.some((g) => g.pages.includes(latest)))
  const added = page("New quantitative method", "wiki/methods/quantitative/new")
  const rebuilt = methodsTopicData([...pages, added], "2026-10-23")
  assert.equal(rebuilt.random.find((g) => g.key === "quantitative").count, 16)
  assert(rebuilt.random.find((g) => g.key === "quantitative").pages.includes(added))
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

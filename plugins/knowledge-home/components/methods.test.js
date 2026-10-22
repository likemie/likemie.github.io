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

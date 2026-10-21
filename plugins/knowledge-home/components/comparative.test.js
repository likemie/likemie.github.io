import assert from "node:assert/strict"
import test from "node:test"
import { comparativeTopicData } from "./index.js"

const page = (title, slug, links = []) => ({ frontmatter: { title }, slug, links })

test("comparative discovery keeps every candidate rather than an eight-entry window", () => {
  const concepts = Array.from({ length: 24 }, (_, i) =>
    page(`Concept ${i}`, `wiki/concepts/comparative-education/concept-${i}`),
  )
  const related = [
    page("Related theory", "wiki/theories/related", [concepts[0].slug]),
    page("Related method", "wiki/methods/related", [concepts[1].slug]),
    page("Related person", "wiki/persons/related", [concepts[2].slug]),
    page("Related institution", "wiki/facts/related", [concepts[3].slug]),
  ]
  const unrelated = page("Unrelated", "wiki/facts/unrelated")
  const topic = comparativeTopicData([...concepts, ...related, unrelated], "2026-10-22")
  const group = topic.random.find((group) => group.key === "concept")
  assert.equal(group.count, 24)
  assert.equal(group.pages.length, 24)
  assert.equal(new Set(group.pages.map((p) => p.slug)).size, 24)
  for (const p of related) assert(topic.random.some((g) => g.pages.includes(p)))
  assert(!topic.random.some((g) => g.pages.includes(unrelated)))

  const added = page("New relevant institution", "wiki/facts/new", [concepts[0].slug])
  const rebuilt = comparativeTopicData([...concepts, ...related, unrelated, added], "2026-10-23")
  assert(rebuilt.random.find((g) => g.key === "context").pages.includes(added))
  assert.equal(rebuilt.random.find((g) => g.key === "context").count, 2)
})

import assert from "node:assert/strict"
import { test } from "node:test"
import { decorateCallouts } from "./index.js"

function element(tagName, children = [], properties = {}) {
  return {
    type: "element",
    tagName,
    properties,
    children: children.map((value) =>
      typeof value === "string" ? { type: "text", value } : value,
    ),
  }
}

function callout(type, title, ...body) {
  return element(
    "blockquote",
    [
      element("div", [element("p", [title])], { className: ["callout-title"] }),
      element("div", body, { className: ["callout-content"] }),
    ],
    { className: ["callout", type], dataCallout: type },
  )
}

function relationTable(headings, rows) {
  return element("table", [
    element("thead", [
      element(
        "tr",
        headings.map((name) => element("th", [name])),
      ),
    ]),
    element("tbody", rows),
  ])
}

test("styles relation rows and keeps construct types visible", () => {
  const link = element("a", ["Critical Pedagogy"], {
    href: "../critical-pedagogy",
    dataSlug: "critical-pedagogy",
  })
  const explicit = element("a", ["A chosen label"], link.properties)
  const headingLink = element("a", ["Critical Pedagogy"], {
    ...link.properties,
    href: "../critical-pedagogy#details",
  })
  const relation = element("tr", [
    element("td", [link, explicit, headingLink]),
    element("td", ["事实（政策）"]),
    element("td", ["说明"]),
  ])
  const relations = relationTable(["条目", "类型", "说明"], [relation])
  const construct = element("tr", [
    element("td", ["构件 A"]),
    element("td", ["维度"]),
    element("td", ["用途"]),
  ])
  const constructs = relationTable(["构件", "类型", "功能"], [construct])
  const legacy = callout("entry-map", "理论构件", constructs)
  const tree = { type: "root", children: [callout("entry-map", "条目关联", relations), legacy] }
  const aliases = new Map([
    ["critical-pedagogy", { name: "Critical Pedagogy", display: "批判教育学" }],
  ])

  decorateCallouts(tree, aliases)
  decorateCallouts(tree, aliases)

  assert.deepEqual(relations.properties.className, ["entry-map-colors"])
  assert.equal(relation.properties.dataEntryMapKind, "fact")
  assert.equal(relation.properties.title, "事实（政策）")
  assert.equal(link.children[0].value, "批判教育学")
  assert.equal(explicit.children[0].value, "A chosen label")
  assert.equal(headingLink.children[0].value, "Critical Pedagogy")
  assert.ok(legacy.properties.className.includes("legacy-theory-constructs"))
  assert.deepEqual(constructs.properties.className, ["legacy-theory-constructs-table"])
  assert.equal(construct.properties.dataEntryMapKind, undefined)
})

test("splits timeline dates and retains inline links and undated headings", () => {
  const link = element("a", ["框架"], { href: "../framework" })
  const dated = element("strong", ["约1980–1990 — ", link, "的发展"])
  const undated = element("strong", ["理论综合"])
  const list = element("ol", [element("li", [element("p", [dated])]), element("li", [undated])])
  const tree = { type: "root", children: [callout("dev-timeline", "发展", list)] }

  decorateCallouts(tree)
  decorateCallouts(tree)

  assert.equal(dated.children[0].properties.className[0], "development-date")
  assert.equal(dated.children[0].children[0].value, "约1980–1990")
  assert.equal(dated.children[1].properties.className[0], "development-date-separator")
  assert.equal(dated.children[3], link)
  assert.equal(undated.children[0].value, "理论综合")
})

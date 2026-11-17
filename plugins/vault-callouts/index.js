import { readFileSync } from "node:fs"
import { basename, join } from "node:path"
import { slugifyFilePath } from "@quartz-community/utils"

const chinese = /\p{Script=Han}/u
const typeHeading = /^(类型|type)$/i
const entryKinds = new Map([
  ["概念", "concept"],
  ["concept", "concept"],
  ["理论", "theory"],
  ["theory", "theory"],
  ["方法", "method"],
  ["method", "method"],
  ["工具", "instrument"],
  ["量表", "instrument"],
  ["测量工具", "instrument"],
  ["instrument", "instrument"],
  ["人物", "person"],
  ["person", "person"],
  ["事实", "fact"],
  ["机构", "fact"],
  ["组织", "fact"],
  ["政策", "fact"],
  ["事件", "fact"],
  ["项目", "fact"],
  ["fact", "fact"],
])

function elements(parent, tag) {
  return (parent?.children ?? []).filter(
    (node) => node.type === "element" && (!tag || node.tagName === tag),
  )
}

function hasClass(node, name) {
  return node.properties?.className?.includes(name)
}

function addClass(node, name) {
  node.properties ??= {}
  if (!hasClass(node, name))
    node.properties.className = [...(node.properties.className ?? []), name]
}

function text(node) {
  return node?.type === "text" ? node.value : (node?.children ?? []).map(text).join("")
}

function* descendants(parent, tag, skip = () => false) {
  for (const child of elements(parent)) {
    if (skip(child)) continue
    if (child.tagName === tag) yield child
    yield* descendants(child, tag, skip)
  }
}

function localizeLinks(cell, aliases) {
  for (const link of descendants(cell, "a")) {
    const slug = link.properties?.dataSlug ?? link.properties?.["data-slug"]
    const { name, display } = aliases.get(slug) ?? {}
    if (
      name &&
      !link.properties.href?.includes("#") &&
      link.children.length === 1 &&
      link.children[0].type === "text" &&
      link.children[0].value === name
    ) {
      link.children[0].value = display
    }
  }
}

// Match the vault's entry-map-view postprocessor without requiring browser JS.
function decorateRelations(callout, content, aliases) {
  const title = elements(callout).find((node) => hasClass(node, "callout-title"))
  for (const table of descendants(content, "table", (node) => hasClass(node, "callout"))) {
    const header = elements(elements(table, "thead")[0], "tr")[0]
    const columns = elements(header, "th")
    if (/构件/.test(text(title)) || /构件/.test(text(columns[0]))) {
      addClass(callout, "legacy-theory-constructs")
      addClass(table, "legacy-theory-constructs-table")
      continue
    }
    const rows = elements(table, "tbody").flatMap((body) => elements(body, "tr"))
    const entryColumn = typeHeading.test(text(columns[0]).trim()) ? 1 : 0
    const cells = rows.map((row) => elements(row, "td"))
    for (const rowCells of cells) localizeLinks(rowCells[entryColumn], aliases)

    if (
      columns.length !== 3 ||
      !typeHeading.test(text(columns[1]).trim()) ||
      !cells.every(
        (row) => row.length === 3 && row.every((cell) => (cell.properties?.colSpan ?? 1) === 1),
      )
    ) {
      continue
    }
    addClass(table, "entry-map-colors")
    for (const [index, row] of rows.entries()) {
      const label = text(cells[index][1]).trim()
      const base = label
        .toLowerCase()
        .replace(/\s*[(（].*$/, "")
        .trim()
      row.properties ??= {}
      row.properties.dataEntryMapKind =
        entryKinds.get(base) ?? (base.endsWith("事实") ? "fact" : "other")
      if (label && row.properties.title === undefined) row.properties.title = label
    }
  }
}

function dateLabel(className, value) {
  return {
    type: "element",
    tagName: "span",
    properties: { className: [className] },
    children: [{ type: "text", value }],
  }
}

function decorateDates(content) {
  for (const list of elements(content).filter(
    (node) => node.tagName === "ul" || node.tagName === "ol",
  )) {
    for (const item of elements(list, "li")) {
      const heading = elements(item, "strong")[0] ?? elements(elements(item, "p")[0], "strong")[0]
      const lead = heading?.children[0]
      if (lead?.type !== "text") continue
      const match = lead.value.match(/^(\s*[约前]?\d[^—]{0,28}?)\s+(?:—{1,2}|–|-)\s+(?=\S|$)/u)
      if (!match) continue
      lead.value = lead.value.slice(match[0].length)
      heading.children.unshift(
        dateLabel("development-date", match[1].trim()),
        dateLabel("development-date-separator", match[0].slice(match[1].length)),
      )
    }
  }
}

export function decorateCallouts(tree, aliases = new Map()) {
  for (const node of elements(tree)) {
    const type = node.properties?.dataCallout ?? node.properties?.["data-callout"]
    if (type === "entry-map" || type === "dev-timeline") {
      const content = elements(node).find((child) => hasClass(child, "callout-content"))
      if (type === "entry-map") decorateRelations(node, content, aliases)
      else decorateDates(content)
    }
    decorateCallouts(node, aliases)
  }
}

export default function VaultCallouts() {
  return {
    name: "VaultCallouts",
    htmlPlugins(ctx) {
      let aliases = new Map()
      try {
        const index = JSON.parse(readFileSync(join(ctx.argv.directory, "wiki/index.json"), "utf8"))
        aliases = new Map(
          index.flatMap(({ path, aliases = [] }) => {
            const name = basename(path, ".md")
            const display = aliases.find(
              (alias) => typeof alias === "string" && chinese.test(alias),
            )
            return display && !chinese.test(name)
              ? [[slugifyFilePath(path), { name, display }]]
              : []
          }),
        )
      } catch (error) {
        if (error.code !== "ENOENT") throw error
      }
      return [() => (tree) => decorateCallouts(tree, aliases)]
    },
  }
}

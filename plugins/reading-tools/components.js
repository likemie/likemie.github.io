import { resolveRelative } from "@quartz-community/utils"
import { h } from "preact"
import { installReadingTools } from "./interactions.js"

const recentLimit = 20
const catalogs = new WeakMap()
const linkTypes = new Map([
  ["concepts", "概念"],
  ["theories", "理论"],
  ["methods", "方法"],
  ["instruments", "测量工具"],
  ["persons", "人物"],
  ["facts", "事实"],
  ["arguments", "论证"],
  ["sources", "文献来源"],
  ["other", "其他页面"],
])

function linkType(slug) {
  const [root, folder, entry] = slug.split("/")
  if (slug.endsWith("/index")) return "other"
  if (root === "wiki" && entry && linkTypes.has(folder)) return folder
  if ((root === "sources" || root === "books") && folder) return "sources"
  return "other"
}

function noteDate(page) {
  const { created, processed_date: processedDate } = page.frontmatter ?? {}
  for (const value of [created, processedDate, page.dates?.created]) {
    if (!(value instanceof Date) && typeof value !== "string") continue
    const time = new Date(value).getTime()
    if (Number.isFinite(time)) return time
  }
  return 0
}

function newestFirst(a, b) {
  return b.created - a.created || a.title.localeCompare(b.title, "zh-CN")
}

function readingCatalog(allFiles) {
  const existing = catalogs.get(allFiles)
  if (existing) return existing

  const notes = new Map()
  const argumentsByDate = []
  for (const page of allFiles) {
    if (!page.slug || page.unlisted || page.encrypted) continue
    const filename = page.slug.split("/").at(-1)
    const title = page.frontmatter?.argument_display_title || page.frontmatter?.title || filename
    const note = { slug: page.slug, title, created: noteDate(page), type: linkType(page.slug) }
    notes.set(note.slug, note)
    if (page.slug.startsWith("wiki/arguments/") && /^argument_/i.test(filename)) {
      argumentsByDate.push(note)
    }
  }

  const recent = argumentsByDate.sort(newestFirst).slice(0, recentLimit)
  const catalog = { notes, recent }
  catalogs.set(allFiles, catalog)
  return catalog
}

function noteList(notes, slug) {
  return h(
    "ul",
    { class: "reading-tools-list" },
    notes.map((note) => {
      const date = note.created ? new Date(note.created).toISOString().slice(0, 10) : null
      return h(
        "li",
        { key: note.slug },
        h(
          "a",
          {
            class: "internal",
            href: resolveRelative(slug, note.slug),
            "data-no-popover": "true",
          },
          h("span", null, note.title),
          date && h("time", { dateTime: date }, date),
        ),
      )
    }),
  )
}

function renderLinkTools(notes, slug) {
  const groups = new Map()
  for (const note of notes) {
    if (!groups.has(note.type)) groups.set(note.type, [])
    groups.get(note.type).push(note)
  }

  return Array.from(linkTypes).flatMap(([type, label]) => {
    const items = groups.get(type)
    if (!items) return []
    return renderTool({
      id: `type-${type}`,
      label,
      title: `本页链接 · ${label}`,
      body: noteList(items, slug),
      count: items.length,
    })
  })
}

function renderTool({ id, label, title, body, count }) {
  const panelId = `reading-tools-${id}`
  const titleId = `${panelId}-title`
  return [
    h(
      "button",
      {
        key: `${id}-trigger`,
        type: "button",
        class: "reading-tools-button",
        popovertarget: panelId,
      },
      h("span", null, label),
      count !== undefined && h("span", { class: "reading-tools-count" }, count),
    ),
    h(
      "nav",
      {
        key: id,
        id: panelId,
        class: "reading-tools-panel",
        popover: "auto",
        "aria-labelledby": titleId,
      },
      h(
        "div",
        { class: "reading-tools-panel-heading" },
        h("h2", { id: titleId }, title),
        h(
          "button",
          {
            type: "button",
            popovertarget: panelId,
            popovertargetaction: "hide",
            "aria-label": "关闭",
          },
          "×",
        ),
      ),
      h("div", { class: "reading-tools-panel-body" }, body),
    ),
  ]
}

function ReadingTools() {
  const Component = ({ fileData, allFiles }) => {
    if (!fileData.slug || fileData.encrypted) return null
    const { notes, recent } = readingCatalog(allFiles)
    const outgoing = (fileData.readingToolLinks ?? [])
      .map((slug) => notes.get(slug))
      .filter(Boolean)
      .sort(newestFirst)

    return h(
      "div",
      { class: "reading-tools", role: "group", "aria-label": "阅读工具", "data-ui": "" },
      renderLinkTools(outgoing, fileData.slug),
      renderTool({
        id: "arguments",
        label: "最新论证",
        title: "最新论证",
        body: recent.length ? noteList(recent, fileData.slug) : h("p", null, "暂无论证。"),
      }),
    )
  }

  Component.afterDOMLoaded = `(${installReadingTools.toString()})();`

  return Component
}

export { ReadingTools }

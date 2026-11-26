import { resolveRelative } from "@quartz-community/utils"
import { h } from "preact"

const recentLimit = 20
const catalogs = new WeakMap()

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
    const note = { slug: page.slug, title, created: noteDate(page) }
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

function renderTool({ id, label, title, notes, slug, empty, showCount = false }) {
  const panelId = `reading-tools-${id}`
  const titleId = `${panelId}-title`
  return [
    h(
      "button",
      { type: "button", class: "reading-tools-button", popovertarget: panelId, title },
      label,
      showCount && h("span", { class: "reading-tools-count" }, notes.length),
    ),
    h(
      "nav",
      { id: panelId, class: "reading-tools-panel", popover: "auto", "aria-labelledby": titleId },
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
      notes.length
        ? h(
            "ul",
            null,
            notes.map((note) =>
              h(
                "li",
                { key: note.slug },
                h(
                  "a",
                  {
                    class: "internal",
                    href: resolveRelative(slug, note.slug),
                    "data-no-popover": "true",
                  },
                  note.title,
                ),
                note.created
                  ? h("time", null, new Date(note.created).toISOString().slice(0, 10))
                  : null,
              ),
            ),
          )
        : h("p", null, empty),
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
      renderTool({
        id: "links",
        label: "链接",
        title: "本页链接",
        notes: outgoing,
        slug: fileData.slug,
        empty: "本页没有可打开的笔记链接。",
        showCount: true,
      }),
      renderTool({
        id: "arguments",
        label: "论证",
        title: "最新论证",
        notes: recent,
        slug: fileData.slug,
        empty: "暂无论证。",
      }),
    )
  }

  Component.afterDOMLoaded = `
    document.addEventListener("prenav", () => {
      document.querySelector(".reading-tools-panel:popover-open")?.hidePopover();
    });
  `

  return Component
}

export { ReadingTools }

import { h } from "preact"

const defaultOptions = {
  recentLimit: 8,
  constellationLimit: 10,
}

function isListedContent(page) {
  const slug = page.slug ?? ""
  return (
    slug &&
    slug !== "index" &&
    !slug.endsWith("/index") &&
    !slug.startsWith("tags/") &&
    page.unlisted !== true
  )
}

function titleFor(page) {
  return page.frontmatter?.title ?? page.slug?.split("/").pop() ?? "Untitled"
}

function sectionFor(page) {
  const slug = page.slug ?? ""
  if (slug.startsWith("wiki/concepts")) return "概念"
  if (slug.startsWith("wiki/theories")) return "理论"
  if (slug.startsWith("wiki/arguments")) return "论证"
  if (slug.startsWith("wiki/persons")) return "人物"
  if (slug.startsWith("wiki/facts")) return "事实"
  if (slug.startsWith("wiki/methods")) return "方法"
  if (slug.startsWith("sources")) return "文献"
  return "笔记"
}

function linksFor(page) {
  return Object.keys(page.links ?? {}).length
}

function pageDate(page) {
  const dateType = page.defaultDateType ?? "modified"
  return page.dates?.[dateType] ?? page.dates?.modified ?? page.dates?.created ?? page.dates?.published
}

function byDateThenLinks(a, b) {
  const dateA = pageDate(a)?.getTime() ?? 0
  const dateB = pageDate(b)?.getTime() ?? 0
  if (dateA !== dateB) return dateB - dateA
  return linksFor(b) - linksFor(a)
}

function deterministicPick(pages, seed) {
  if (pages.length === 0) return undefined
  let hash = 0
  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  }
  return pages[hash % pages.length]
}

function formatCount(value) {
  return new Intl.NumberFormat("zh-CN").format(value)
}

function formatDate(date, locale) {
  return date.toLocaleDateString(locale ?? "zh-CN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

function hrefFor(pageOrSlug) {
  const slug = typeof pageOrSlug === "string" ? pageOrSlug : pageOrSlug.slug
  return slug === "index" ? "." : slug
}

function KnowledgeHome(userOpts = {}) {
  const opts = { ...defaultOptions, ...userOpts }

  const Component = ({ cfg, fileData, allFiles, displayClass }) => {
    if (fileData.slug !== "index") return null

    const pages = allFiles.filter(isListedContent)
    const datedPages = [...pages].sort(byDateThenLinks)
    const recent = datedPages.slice(0, opts.recentLimit)
    const constellation = [...pages]
      .sort((a, b) => linksFor(b) - linksFor(a) || titleFor(a).localeCompare(titleFor(b)))
      .slice(0, opts.constellationLimit)
    const todayKey = new Date().toISOString().slice(0, 10)
    const concepts = pages.filter((page) => (page.slug ?? "").startsWith("wiki/concepts/"))
    const todayConcept = deterministicPick(concepts, todayKey)
    const wikiCount = pages.filter((page) => (page.slug ?? "").startsWith("wiki")).length
    const totalLinks = pages.reduce((sum, page) => sum + linksFor(page), 0)

    return h(
      "section",
      { class: [displayClass, "knowledge-home"].filter(Boolean).join(" ") },
      h(
        "div",
        { class: "knowledge-home-hero" },
        h(
          "div",
          { class: "knowledge-home-copy" },
          h("p", { class: "knowledge-home-kicker" }, "Knowledge Home"),
          h("h1", null, "今日驾驶舱"),
          h(
            "p",
            { class: "knowledge-home-lede" },
            "一间由论文、概念、理论和 AI 劳动痕迹搭起来的开放书房。每天进来，先看看最近亮起的节点，再随手漫游到一个旧想法。",
          ),
          todayConcept &&
            h(
              "a",
              { class: "knowledge-home-today", href: hrefFor(todayConcept) },
              h("span", null, "今日概念"),
              h("strong", null, titleFor(todayConcept)),
              h("small", null, `${todayKey} · 从 ${formatCount(concepts.length)} 个概念里抽取`),
            ),
          h(
            "div",
            { class: "knowledge-home-actions" },
            h("a", { class: "knowledge-home-button", href: hrefFor("explore") }, "打开探索页"),
            h(
              "a",
              { class: "knowledge-home-button ghost", href: hrefFor("wiki/research-map") },
              "进入研究地图",
            ),
          ),
        ),
        h(
          "div",
          { class: "knowledge-home-panel", "aria-label": "知识库概览" },
          h("div", null, h("span", null, "条目"), h("strong", null, formatCount(pages.length))),
          h("div", null, h("span", null, "Wiki"), h("strong", null, formatCount(wikiCount))),
          h("div", null, h("span", null, "概念"), h("strong", null, formatCount(concepts.length))),
          h("div", null, h("span", null, "链接"), h("strong", null, formatCount(totalLinks))),
        ),
      ),
      h(
        "div",
        { class: "knowledge-home-grid" },
        h(
          "section",
          { class: "knowledge-home-card knowledge-home-constellation" },
          h(
            "div",
            { class: "knowledge-home-section-head" },
            h("h2", null, "笔记星图"),
            h("span", null, "按连接密度点亮"),
          ),
          h(
            "div",
            { class: "knowledge-home-stars" },
            constellation.map((page, index) =>
              h(
                "a",
                {
                  class: `knowledge-star tone-${index % 5}`,
                  href: hrefFor(page),
                  style: `--delay:${index * 45}ms`,
                },
                h("span", { class: "knowledge-star-type" }, sectionFor(page)),
                h("strong", null, titleFor(page)),
                h("small", null, `${linksFor(page)} links`),
              ),
            ),
          ),
        ),
        h(
          "section",
          { class: "knowledge-home-card" },
          h(
            "div",
            { class: "knowledge-home-section-head" },
            h("h2", null, "最近亮起"),
            h("span", null, "按修改时间"),
          ),
          h(
            "ol",
            { class: "knowledge-home-recent" },
            recent.map((page) => {
              const date = pageDate(page)
              return h(
                "li",
                null,
                h("a", { class: "internal", href: hrefFor(page) }, titleFor(page)),
                date && h("time", { dateTime: date.toISOString() }, formatDate(date, cfg.locale)),
                h("span", null, sectionFor(page)),
              )
            }),
          ),
        ),
      ),
    )
  }

  Component.css = `
.knowledge-home {
  margin: 0 0 2rem;
}

.knowledge-home,
.knowledge-home * {
  box-sizing: border-box;
  min-width: 0;
}

.knowledge-home-hero {
  background:
    radial-gradient(circle at 18% 18%, color-mix(in srgb, var(--tertiary) 28%, transparent), transparent 30%),
    radial-gradient(circle at 84% 16%, color-mix(in srgb, var(--secondary) 22%, transparent), transparent 28%),
    linear-gradient(135deg, color-mix(in srgb, var(--light) 94%, var(--secondary)), var(--light));
  border: 1px solid color-mix(in srgb, var(--secondary) 24%, var(--lightgray));
  border-radius: 8px;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(0, 1.45fr) minmax(14rem, 0.55fr);
  overflow: hidden;
  padding: clamp(1.25rem, 4vw, 2.4rem);
  position: relative;
}

.knowledge-home-hero::after {
  background-image:
    linear-gradient(color-mix(in srgb, var(--secondary) 14%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--secondary) 14%, transparent) 1px, transparent 1px);
  background-size: 34px 34px;
  content: "";
  inset: 0;
  mask-image: linear-gradient(115deg, transparent, black 35%, transparent 82%);
  opacity: 0.45;
  pointer-events: none;
  position: absolute;
}

.knowledge-home-copy,
.knowledge-home-panel {
  position: relative;
  z-index: 1;
}

.knowledge-home-kicker,
.knowledge-home-section-head span,
.knowledge-star-type {
  color: var(--secondary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.knowledge-home h1 {
  font-size: clamp(2rem, 5vw, 4.2rem);
  line-height: 1;
  margin: 0.25rem 0 0.75rem;
}

.knowledge-home-lede {
  color: var(--darkgray);
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0;
  max-width: 42rem;
}

.knowledge-home-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 0.9rem;
}

.knowledge-home-today {
  background: color-mix(in srgb, var(--light) 78%, transparent);
  border: 1px solid color-mix(in srgb, var(--secondary) 18%, var(--lightgray));
  border-radius: 8px;
  color: var(--dark);
  display: grid;
  gap: 0.2rem;
  margin-top: 1.1rem;
  max-width: 34rem;
  padding: 0.75rem 0.9rem;
  text-decoration: none;
}

.knowledge-home-today:hover {
  border-color: color-mix(in srgb, var(--secondary) 48%, var(--lightgray));
  text-decoration: none;
}

.knowledge-home-today span {
  color: var(--secondary);
  font-size: 0.76rem;
  font-weight: 700;
}

.knowledge-home-today strong {
  color: var(--secondary);
  font-size: clamp(1.3rem, 3vw, 2rem);
  line-height: 1.1;
}

.knowledge-home-today small {
  color: var(--darkgray);
  font-size: 0.9rem;
}

.knowledge-home-button {
  align-items: center;
  background: var(--secondary);
  border: 1px solid var(--secondary);
  border-radius: 999px;
  color: var(--light);
  display: inline-flex;
  font-weight: 700;
  line-height: 1.2;
  padding: 0.65rem 0.9rem;
  text-decoration: none;
}

.knowledge-home-button:hover {
  filter: brightness(1.08);
  text-decoration: none;
}

.knowledge-home-button.ghost {
  background: color-mix(in srgb, var(--light) 72%, transparent);
  color: var(--secondary);
}

.knowledge-home-panel {
  align-self: end;
  border-left: 1px solid color-mix(in srgb, var(--secondary) 24%, var(--lightgray));
  display: grid;
  gap: 0.75rem;
  padding-left: 1.2rem;
}

.knowledge-home-panel div {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.knowledge-home-panel span {
  color: var(--darkgray);
}

.knowledge-home-panel strong {
  color: var(--dark);
  font-size: 1.4rem;
  line-height: 1;
}

.knowledge-home-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1.35fr) minmax(16rem, 0.65fr);
  margin-top: 1rem;
}

.knowledge-home-card {
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1rem;
}

.knowledge-home-section-head {
  align-items: baseline;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}

.knowledge-home-section-head h2 {
  font-size: 1.2rem;
  margin: 0;
}

.knowledge-home-stars {
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.knowledge-star {
  --tone: var(--secondary);
  align-items: center;
  animation: knowledge-star-rise 520ms ease both;
  animation-delay: var(--delay);
  background:
    radial-gradient(circle at 15% 15%, color-mix(in srgb, var(--tone) 24%, transparent), transparent 38%),
    color-mix(in srgb, var(--light) 92%, var(--tone));
  border: 1px solid color-mix(in srgb, var(--tone) 34%, var(--lightgray));
  border-radius: 8px;
  color: var(--dark);
  display: grid;
  gap: 0.25rem;
  grid-template-columns: 1fr auto;
  padding: 0.72rem 0.8rem;
  text-decoration: none;
}

.knowledge-star:hover {
  box-shadow: 0 10px 24px color-mix(in srgb, var(--tone) 16%, transparent);
  transform: translateY(-2px);
  text-decoration: none;
}

.knowledge-star strong {
  font-size: 0.98rem;
  grid-column: 1 / -1;
  line-height: 1.22;
  overflow-wrap: anywhere;
}

.knowledge-star small {
  color: var(--darkgray);
  font-size: 0.82rem;
  justify-self: end;
}

.knowledge-star.tone-1 { --tone: var(--tertiary); }
.knowledge-star.tone-2 { --tone: #6f8796; }
.knowledge-star.tone-3 { --tone: #5f8f83; }
.knowledge-star.tone-4 { --tone: #8d7f66; }

.knowledge-home-recent {
  display: grid;
  gap: 0.85rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.knowledge-home-recent li {
  border-bottom: 1px solid var(--lightgray);
  display: grid;
  gap: 0.2rem;
  padding-bottom: 0.75rem;
}

.knowledge-home-recent li:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.knowledge-home-recent a {
  color: var(--dark);
  font-weight: 700;
  line-height: 1.25;
}

.knowledge-home-recent time,
.knowledge-home-recent span {
  color: var(--darkgray);
  font-size: 0.9rem;
}

@keyframes knowledge-star-rise {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media all and (max-width: 900px) {
  .knowledge-home-hero,
  .knowledge-home-grid {
    grid-template-columns: 1fr;
  }

  .knowledge-home-panel {
    border-left: 0;
    border-top: 1px solid color-mix(in srgb, var(--secondary) 24%, var(--lightgray));
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 1rem 0 0;
  }

  .knowledge-home-stars {
    grid-template-columns: 1fr;
  }
}

@media all and (max-width: 520px) {
  .knowledge-home-panel {
    grid-template-columns: 1fr;
  }
}
`

  return Component
}

export { KnowledgeHome }

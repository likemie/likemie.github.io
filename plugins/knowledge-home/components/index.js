import { h } from "preact"

const defaultOptions = {
  recentLimit: 12,
  constellationLimit: 12,
}

function isListedContent(page) {
  const slug = page.slug ?? ""
  const title = titleFor(page)
  return (
    slug &&
    slug !== "index" &&
    slug !== "explore" &&
    !slug.startsWith("explore/") &&
    !slug.endsWith("/index") &&
    !slug.startsWith("tags/") &&
    !slug.split("/").includes("templates") &&
    !title.includes("<%") &&
    page.unlisted !== true
  )
}

function titleFor(page) {
  return page.frontmatter?.title ?? page.slug?.split("/").pop() ?? "Untitled"
}

function sectionFor(page) {
  const slug = page.slug ?? ""
  if (slug.startsWith("wiki/concepts/research-methodology")) return "方法概念"
  if (slug.startsWith("wiki/concepts")) return "概念"
  if (slug.startsWith("wiki/theories")) return "理论"
  if (slug.startsWith("wiki/arguments")) return "论证"
  if (slug.startsWith("wiki/persons")) return "人物"
  if (slug.startsWith("wiki/facts")) return "事实"
  if (slug.startsWith("wiki/methods")) return "方法"
  if (slug.startsWith("wiki/instruments")) return "测量工具"
  if (slug.startsWith("sources")) return "文献"
  return "笔记"
}

function linksFor(page) {
  return outgoingSlugs(page).length
}

function outgoingSlugs(page) {
  if (Array.isArray(page.links)) return page.links.filter(Boolean)
  return Object.keys(page.links ?? {})
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
  return slug === "index" ? "/" : `/${slug}`
}

function pagesIn(pages, prefix) {
  return pages.filter((page) => (page.slug ?? "").startsWith(prefix))
}

function topLinked(pages, limit) {
  return [...pages]
    .sort((a, b) => linksFor(b) - linksFor(a) || titleFor(a).localeCompare(titleFor(b)))
    .slice(0, limit)
}

function isExploreSlug(slug) {
  return slug === "explore" || slug === "explore/index"
}

function exploreRouteKey(slug) {
  const key = slug?.match(/^explore\/([^/]+)$/)?.[1]
  return ["evidence", "governance", "curriculum", "methods", "random"].includes(key) ? key : undefined
}

function pageIndexFor(pages) {
  const bySlug = new Map()
  const byTitle = new Map()

  for (const page of pages) {
    if (page.slug) bySlug.set(page.slug, page)
    const title = titleFor(page)
    if (!byTitle.has(title)) byTitle.set(title, [])
    byTitle.get(title).push(page)
  }

  const backlinks = new Map()
  for (const page of pages) {
    for (const slug of outgoingSlugs(page)) {
      if (!backlinks.has(slug)) backlinks.set(slug, [])
      backlinks.get(slug).push(page.slug)
    }
  }

  return { bySlug, byTitle, backlinks }
}

function pageByTitle(index, title, preferredPrefix) {
  const matches = index.byTitle.get(title) ?? []
  return matches.find((page) => (page.slug ?? "").startsWith(preferredPrefix ?? "")) ?? matches[0]
}

function preferredPage(index, pages, preferred, fallback, prefixes = []) {
  for (const title of preferred ?? []) {
    const page = pageByTitle(index, title, prefixes[0])
    if (page) return page
  }

  const fallbackPage = pageByTitle(index, fallback?.title, fallback?.preferredPrefix)
  if (fallbackPage) return fallbackPage

  const fallbackSlug = fallback?.slug
  if (fallbackSlug) return index.bySlug.get(fallbackSlug) ?? { slug: fallbackSlug, frontmatter: { title: fallback?.title } }

  return pages.find((page) => prefixes.some((prefix) => (page.slug ?? "").startsWith(prefix)))
}

function preferredRoutePage(index, preferred = [], prefixes = []) {
  for (const title of preferred) {
    const page = pageByTitle(index, title, prefixes[0])
    if (page) return page
  }
}

function relatedPages(index, seedPages, maxDepth = 2) {
  const seen = new Set(seedPages.map((page) => page.slug).filter(Boolean))
  const related = new Map()
  let frontier = seedPages

  for (let depth = 1; depth <= maxDepth; depth++) {
    const next = []
    for (const page of frontier) {
      const connectedSlugs = [
        ...outgoingSlugs(page),
        ...(index.backlinks.get(page.slug) ?? []),
      ].filter(Boolean)

      for (const slug of connectedSlugs) {
        const connected = index.bySlug.get(slug)
        if (!connected || !isListedContent(connected)) continue

        const existing = related.get(slug) ?? { page: connected, distance: depth, touches: 0 }
        existing.distance = Math.min(existing.distance, depth)
        existing.touches += 1
        related.set(slug, existing)

        if (!seen.has(slug)) {
          seen.add(slug)
          next.push(connected)
        }
      }
    }
    frontier = next
  }

  return [...related.values()]
}

function hashString(value) {
  let hash = 0
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  }
  return hash
}

function seededShuffle(items, seed) {
  return [...items]
    .map((item, index) => ({ item, rank: hashString(`${seed}-${index}-${item.slug ?? titleFor(item)}`) }))
    .sort((a, b) => a.rank - b.rank)
    .map(({ item }) => item)
}

function connectedPages(index, page) {
  const slugs = [...outgoingSlugs(page), ...(index.backlinks.get(page.slug) ?? [])]
  return slugs
    .map((slug) => index.bySlug.get(slug))
    .filter((connected) => connected && isListedContent(connected))
}

function randomWalkRoute({ index, pages, config, seedKey }) {
  const seedPages = config.seeds
    .map((seed) => pageByTitle(index, seed.title, seed.preferredPrefix) ?? index.bySlug.get(seed.slug))
    .filter(Boolean)
  const start = seedPages[0]
  if (!start) return undefined

  const selected = new Set([start.slug])
  const stops = [
    {
      label: "固定锚点",
      title: titleFor(start),
      href: start.slug,
      section: sectionFor(start),
      source: "关键节点",
      routeKey: config.eyebrow,
    },
  ]

  let current = start
  for (let step = 1; step < (config.limit ?? 5); step++) {
    const inRouteScope = (page) =>
      !config.routePrefixes ||
      config.routePrefixes.some((prefix) => (page.slug ?? "").startsWith(prefix))
    const direct = seededShuffle(
      connectedPages(index, current).filter((page) => !selected.has(page.slug) && inRouteScope(page)),
      `${seedKey}-${config.key}-direct-${step}`,
    )
    const fallback = seededShuffle(
      relatedPages(index, seedPages, 2)
        .map(({ page }) => page)
        .filter((page) => !selected.has(page.slug) && inRouteScope(page)),
      `${seedKey}-${config.key}-fallback-${step}`,
    )
    const chosen = direct[0] ?? fallback[0]
    if (!chosen) break

    selected.add(chosen.slug)
    stops.push({
      label: direct[0] ? "随机游走" : "邻域补位",
      title: titleFor(chosen),
      href: chosen.slug,
      section: sectionFor(chosen),
      source: direct[0] ? "直接连接" : "2 跳邻居",
      routeKey: config.eyebrow,
    })
    current = chosen
  }

  return {
    key: config.key,
    href: `explore/${config.key}`,
    eyebrow: config.eyebrow,
    title: config.title,
    body: config.body,
    meta: `每日随机 · ${formatCount(relatedPages(index, seedPages, 2).length)} 个候选邻居`,
    stops,
  }
}

function graphRoutes(pages, routeConfigs, seedKey) {
  const index = pageIndexFor(pages)

  return routeConfigs
    .map((config) => {
      const variants = []
      const seen = new Set()

      for (let indexSeed = 0; indexSeed < 18; indexSeed++) {
        const route = randomWalkRoute({
          index,
          pages,
          config,
          seedKey: `${seedKey}-${indexSeed}`,
        })
        if (!route) continue

        const signature = route.stops.map((stop) => stop.href).join(">")
        if (seen.has(signature)) continue

        seen.add(signature)
        variants.push(route)
      }

      const route = variants[0]
      return route && {
        ...route,
        meta: `随机 · ${variants.length} 条候选路径`,
        variants,
      }
    })
    .filter(Boolean)
    .filter((route) => route.stops.length > 1)
}

function routePathList(routeKey, variant, hidden = false) {
  return h(
    "ol",
    {
      class: "knowledge-route-path",
      "data-route-variant": routeKey,
      hidden: hidden ? true : undefined,
    },
    variant.stops.map((stop) =>
      h(
        "li",
        null,
        h("small", null, stop.label),
        h("a", { href: hrefFor(stop.href), class: "internal" }, stop.title),
        h("span", null, `${stop.section} · ${stop.source}`),
      ),
    ),
  )
}

function routeShuffleOnClick() {
  return `(() => { const key = this.getAttribute("data-random-route"); const board = document.querySelector("[data-route-board='" + key + "']"); if (!board) return; const variants = Array.from(board.querySelectorAll("[data-route-variant='" + key + "']")); if (variants.length === 0) return; const current = variants.findIndex((variant) => !variant.hidden && variant.style.display !== "none"); let next = Math.floor(Math.random() * variants.length); if (variants.length > 1 && next === current) next = (next + 1) % variants.length; variants.forEach((variant, index) => { const hidden = index !== next; variant.hidden = hidden; variant.style.display = hidden ? "none" : "grid"; }); this.dataset.activeRoute = String(next); const label = this.dataset.routeLabel || "换一条"; this.textContent = variants.length > 1 ? label + " · " + String(next + 1) + "/" + variants.length : label; })()`
}

function exploreRouteConfigs() {
  return [
    {
      key: "evidence",
      eyebrow: "Evidence",
      title: "循证教育路线",
      body: "固定从 Evidence-Based Education 出发，后续节点每天从证据、方法、论证和实践邻域里随机游走。",
      limit: 5,
      routePrefixes: [
        "wiki/concepts/educational-policy-reform/",
        "wiki/concepts/research-methodology/",
        "wiki/methods/",
        "wiki/facts/uk/",
        "wiki/facts/netherlands/",
        "wiki/arguments/",
      ],
      seeds: [
        {
          title: "Evidence-Based Education",
          preferredPrefix: "wiki/concepts/",
        },
      ],
    },
    {
      key: "governance",
      eyebrow: "Governance",
      title: "全球教育治理路线",
      body: "固定从 OECD 出发，后续节点每天沿国际组织、测量、全球话语和批判论证随机游走。",
      limit: 5,
      routePrefixes: [
        "wiki/facts/global/",
        "wiki/concepts/comparative-education/",
        "wiki/concepts/political-economy-geopolitics/",
        "wiki/concepts/educational-policy-reform/",
        "wiki/arguments/",
      ],
      seeds: [
        {
          title: "OECD",
          preferredPrefix: "wiki/facts/",
        },
      ],
    },
    {
      key: "curriculum",
      eyebrow: "Curriculum",
      title: "课程政策路线",
      body: "固定从中国基础教育课程改革出发，后续节点每天沿课程案例、理论和文献论证随机游走。",
      limit: 5,
      routePrefixes: [
        "wiki/facts/china/",
        "wiki/facts/finland/",
        "wiki/facts/newzealand/",
        "wiki/facts/australia/",
        "wiki/facts/hongkong/",
        "wiki/theories/curriculum/",
        "wiki/methods/qualitative/",
        "wiki/arguments/",
      ],
      seeds: [
        {
          title: "China Basic Education Curriculum Reform",
          preferredPrefix: "wiki/facts/",
        },
      ],
    },
    {
      key: "methods",
      eyebrow: "Methods",
      title: "方法与证据路线",
      body: "固定从 Causality 出发，后续节点每天沿方法、效度、测量和研究设计随机游走。",
      limit: 5,
      routePrefixes: [
        "wiki/concepts/research-methodology/",
        "wiki/methods/",
        "wiki/instruments/",
        "wiki/theories/research-methodology/",
        "wiki/arguments/",
      ],
      seeds: [
        {
          title: "Causality",
          preferredPrefix: "wiki/concepts/",
        },
      ],
    },
  ]
}

function randomRouteConfig(todayConcept) {
  if (!todayConcept) return undefined

  return {
    key: "random",
    eyebrow: "Random Walk",
    title: "随机路径",
    body: "从今日概念出发，沿真实链接随机走几步。每次打开和点击换一条，都会在知识图谱里换一条可追踪的路径。",
    limit: 4,
    seeds: [
      {
        title: titleFor(todayConcept),
        preferredPrefix: `${todayConcept.slug?.split("/").slice(0, -1).join("/")}/`,
      },
    ],
  }
}

function KnowledgeHome(userOpts = {}) {
  const opts = { ...defaultOptions, ...userOpts }

  const Component = ({ cfg, fileData, allFiles, displayClass }) => {
    const currentRouteKey = exploreRouteKey(fileData.slug)
    if (fileData.slug !== "index" && !isExploreSlug(fileData.slug) && !currentRouteKey) return null

    const pages = allFiles.filter(isListedContent)
    const datedPages = pages
      .filter((page) => (page.slug ?? "").startsWith("wiki/"))
      .sort(byDateThenLinks)
    const recent = datedPages.slice(0, opts.recentLimit)
    const constellation = [...pages]
      .sort((a, b) => linksFor(b) - linksFor(a) || titleFor(a).localeCompare(titleFor(b)))
      .slice(0, opts.constellationLimit)
    const todayKey = new Date().toISOString().slice(0, 10)
    const concepts = pages.filter((page) => (page.slug ?? "").startsWith("wiki/concepts/"))
    const todayConcept = deterministicPick(concepts, todayKey)
    const wikiCount = pages.filter((page) => (page.slug ?? "").startsWith("wiki")).length
    const totalLinks = pages.reduce((sum, page) => sum + linksFor(page), 0)
    const routes = graphRoutes(pages, exploreRouteConfigs(), todayKey)
    const randomConfig = randomRouteConfig(todayConcept)
    const randomRoute = randomConfig ? graphRoutes(pages, [randomConfig], `${todayKey}-random-route`)[0] : undefined
    const routePages = randomRoute ? [...routes, randomRoute] : routes

    if (currentRouteKey) {
      const route = routePages.find((item) => item.key === currentRouteKey)
      if (!route) return null

      return h(
        "section",
        { class: [displayClass, "knowledge-explore knowledge-route-page"].filter(Boolean).join(" ") },
        h(
          "div",
          { class: "knowledge-explore-hero knowledge-route-hero" },
          h("a", { href: hrefFor("explore"), class: "knowledge-route-back" }, "返回探索大厅"),
          h("p", { class: "knowledge-explore-kicker" }, route.eyebrow),
          h("h1", null, route.title),
          h("p", null, route.body),
          h("em", { class: "knowledge-explore-route-meta" }, `自动：${route.meta}`),
          h(
            "button",
            {
              class: "knowledge-route-shuffle",
              type: "button",
              "data-random-route": route.key,
              "data-route-label": "换一条随机路线",
              onclick: routeShuffleOnClick(),
            },
            "换一条随机路线",
          ),
        ),
        h(
          "section",
          { class: "knowledge-route-board", "data-route-board": route.key },
          h("div", { class: "knowledge-explore-head" }, h("h2", null, "路线节点"), h("span", null, "随机候选")),
          route.variants.map((variant, variantIndex) => routePathList(route.key, variant, variantIndex !== 0)),
        ),
      )
    }

    if (isExploreSlug(fileData.slug)) {
      const sections = [
        { label: "概念", prefix: "wiki/concepts/", seed: "concept" },
        { label: "论证", prefix: "wiki/arguments/", seed: "argument" },
        { label: "人物", prefix: "wiki/persons/", seed: "person" },
        { label: "事实", prefix: "wiki/facts/", seed: "fact" },
        { label: "理论", prefix: "wiki/theories/", seed: "theory" },
        { label: "方法", prefix: "wiki/methods/", seed: "method" },
        { label: "测量工具", prefix: "wiki/instruments/", seed: "instrument" },
      ]
      const randomEntries = sections
        .map((section) => {
          const pool = pagesIn(pages, section.prefix)
          const page = deterministicPick(pool, `${todayKey}-${section.seed}`)
          return page && { ...section, page, count: pool.length }
        })
        .filter(Boolean)
      const visitorEntrances = [
        { title: "快速了解这座库", href: "wiki/research-map", body: "先看研究地图，知道这里有哪些房间。" },
        { title: "找一个概念", href: "bases/concepts", body: "进入概念索引，用表格和卡片筛选。" },
        { title: "看一篇文献怎么被拆", href: "wiki/arguments", body: "从论证框架进入问题、证据链和结论。" },
        { title: "顺着国家或政策看", href: "wiki/facts", body: "从事实档案进入具体制度场景。" },
      ]
      const highNodes = topLinked(pages.filter((page) => (page.slug ?? "").startsWith("wiki/")), 10)
      const workbench = recent.slice(0, 8)

      return h(
        "section",
        { class: [displayClass, "knowledge-explore"].filter(Boolean).join(" ") },
        h(
          "div",
          { class: "knowledge-explore-hero" },
          h("p", { class: "knowledge-explore-kicker" }, "Explore"),
          h("h1", null, "探索大厅"),
          h(
            "p",
            null,
            "不按文件夹排队。按心情、问题和线索进入：抽一张研究卡，走一条主题路线，或者直接跳进连接最密的节点。",
          ),
          h(
            "div",
            { class: "knowledge-explore-stats", "aria-label": "探索页统计" },
            h("div", null, h("span", null, "条目"), h("strong", null, formatCount(pages.length))),
            h("div", null, h("span", null, "Wiki"), h("strong", null, formatCount(wikiCount))),
            h("div", null, h("span", null, "链接"), h("strong", null, formatCount(totalLinks))),
          ),
        ),
        h(
          "div",
          { class: "knowledge-explore-grid" },
          h(
            "section",
            { class: "knowledge-explore-card knowledge-explore-random" },
            h("div", { class: "knowledge-explore-head" }, h("h2", null, "随机漫游"), h("span", null, todayKey)),
            h(
              "div",
              { class: "knowledge-explore-random-grid" },
              randomEntries.map((entry) =>
                h(
                  "a",
                  { href: hrefFor(entry.page), class: "knowledge-explore-chip" },
                  h("span", null, entry.label),
                  h("strong", null, titleFor(entry.page)),
                  h("small", null, `${formatCount(entry.count)} 个候选`),
                ),
              ),
            ),
          ),
          h(
            "section",
            { class: "knowledge-explore-card" },
            h("div", { class: "knowledge-explore-head" }, h("h2", null, "访客入口"), h("span", null, "按目的")),
            h(
              "div",
              { class: "knowledge-explore-entrances" },
              visitorEntrances.map((item) =>
                h(
                  "a",
                  { href: hrefFor(item.href), class: "knowledge-explore-entrance" },
                  h("strong", null, item.title),
                  h("span", null, item.body),
                ),
              ),
            ),
          ),
        ),
        h(
          "section",
          { class: "knowledge-explore-routes" },
          h("div", { class: "knowledge-explore-head" }, h("h2", null, "主题路线"), h("span", null, "从问题进入")),
          h(
            "div",
            { class: "knowledge-explore-route-grid" },
            routes.map((route) =>
              h(
                "a",
                { href: hrefFor(route.href), class: "knowledge-explore-route" },
                h("span", null, route.eyebrow),
                h("strong", null, route.title),
                h("p", null, route.body),
                h("em", { class: "knowledge-explore-route-meta" }, `进入路线 · 自动：${route.meta}`),
              ),
            ),
          ),
        ),
        h(
          "div",
          { class: "knowledge-explore-grid bottom" },
          h(
            "section",
            { class: "knowledge-explore-card knowledge-explore-panel knowledge-explore-hubs" },
            h("div", { class: "knowledge-explore-head" }, h("h2", null, "高连接节点"), h("span", null, "按链接密度")),
            h(
              "ol",
              { class: "knowledge-explore-list" },
              highNodes.map((page, index) =>
                h(
                  "li",
                  null,
                  h("span", { class: "knowledge-explore-rank" }, String(index + 1).padStart(2, "0")),
                  h(
                    "div",
                    { class: "knowledge-explore-list-main" },
                    h("a", { href: hrefFor(page), class: "internal" }, titleFor(page)),
                    h("span", null, sectionFor(page)),
                  ),
                  h("strong", { class: "knowledge-explore-score" }, linksFor(page)),
                ),
              ),
            ),
          ),
          h(
            "section",
            { class: "knowledge-explore-card knowledge-explore-panel knowledge-explore-workbench" },
            h("div", { class: "knowledge-explore-head" }, h("h2", null, "最近工作台"), h("span", null, "按修改时间")),
            h(
              "ol",
              { class: "knowledge-explore-list" },
              workbench.map((page, index) => {
                const date = pageDate(page)
                return h(
                  "li",
                  null,
                  h("span", { class: "knowledge-explore-rank" }, String(index + 1).padStart(2, "0")),
                  h(
                    "div",
                    { class: "knowledge-explore-list-main" },
                    h("a", { href: hrefFor(page), class: "internal" }, titleFor(page)),
                    h("span", null, sectionFor(page)),
                  ),
                  date &&
                    h(
                      "time",
                      { class: "knowledge-explore-date", dateTime: date.toISOString() },
                      formatDate(date, cfg.locale),
                    ),
                )
              }),
            ),
          ),
        ),
      )
    }

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
            randomRoute &&
              h(
                "a",
                { class: "knowledge-home-button ghost", href: hrefFor("explore/random") },
                "随机路径",
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

  Component.afterDOMLoaded = `
function knowledgeRouteState(routeKey) {
  const board = document.querySelector("[data-route-board='" + routeKey + "']")
  const variants = board
    ? Array.from(board.querySelectorAll("[data-route-variant='" + routeKey + "']"))
    : []
  return { board, variants }
}

function setKnowledgeRoute(routeKey, index) {
  const { variants } = knowledgeRouteState(routeKey)
  const button = document.querySelector("[data-random-route='" + routeKey + "']")
  if (variants.length === 0) return

  const safeIndex = ((index % variants.length) + variants.length) % variants.length
  variants.forEach((variant, variantIndex) => {
    const hidden = variantIndex !== safeIndex
    variant.hidden = hidden
    variant.style.display = hidden ? "none" : "grid"
  })

  if (button) {
    button.dataset.activeRoute = String(safeIndex)
    const label = button.dataset.routeLabel || "换一条"
    button.textContent = variants.length > 1 ? label + " · " + String(safeIndex + 1) + "/" + variants.length : label
  }
}

function initKnowledgeRandomRoutes() {
  const boards = Array.from(document.querySelectorAll("[data-route-board]"))

  for (const board of boards) {
    const routeKey = board.getAttribute("data-route-board")
    const { variants } = knowledgeRouteState(routeKey)
    if (variants.length === 0) continue

    let current = variants.findIndex((variant) => !variant.hidden)
    if (current < 0) current = 0
    const initial = Math.floor(Math.random() * variants.length)
    setKnowledgeRoute(routeKey, variants.length > 1 && initial === current ? (initial + 1) % variants.length : initial)
  }
}

if (window.knowledgeRouteShuffleBound !== true) {
  window.knowledgeRouteShuffleBound = true
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-random-route]")
    if (!button) return

    event.preventDefault()
    const routeKey = button.getAttribute("data-random-route")
    const { variants } = knowledgeRouteState(routeKey)
    if (variants.length === 0) return

    const current = variants.findIndex((variant) => !variant.hidden && variant.style.display !== "none")
    let next = Math.floor(Math.random() * variants.length)
    if (variants.length > 1 && next === current) next = (next + 1) % variants.length
    setKnowledgeRoute(routeKey, next)
  })
}

document.addEventListener("nav", initKnowledgeRandomRoutes)
initKnowledgeRandomRoutes()
`

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
  height: clamp(25rem, 42vw, 31rem);
  overflow: hidden;
  padding: 1rem;
  position: relative;
}

.knowledge-home-card::after {
  background: linear-gradient(transparent, var(--light) 82%);
  bottom: 0;
  content: "";
  height: 2.5rem;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
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
  display: -webkit-box;
  font-size: 0.98rem;
  grid-column: 1 / -1;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.22;
  overflow: hidden;
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
  display: -webkit-box;
  font-weight: 700;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.25;
  overflow: hidden;
}

.knowledge-home-recent time,
.knowledge-home-recent span {
  color: var(--darkgray);
  font-size: 0.9rem;
}

body[data-slug="explore"] .breadcrumb-container,
body[data-slug="explore"] .article-title,
body[data-slug="explore"] .content-meta,
body[data-slug="explore"] article,
body[data-slug="explore/index"] .breadcrumb-container,
body[data-slug="explore/index"] .article-title,
body[data-slug="explore/index"] .content-meta,
body[data-slug="explore/index"] article,
body[data-slug^="explore/"] .breadcrumb-container,
body[data-slug^="explore/"] .article-title,
body[data-slug^="explore/"] .content-meta,
body[data-slug^="explore/"] article {
  display: none;
}

.knowledge-explore {
  display: grid;
  gap: 1rem;
  margin: 0 0 2rem;
}

.knowledge-explore,
.knowledge-explore * {
  box-sizing: border-box;
  min-width: 0;
}

.knowledge-explore-hero {
  background:
    radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--tertiary) 30%, transparent), transparent 30%),
    radial-gradient(circle at 88% 18%, color-mix(in srgb, var(--secondary) 20%, transparent), transparent 30%),
    linear-gradient(135deg, color-mix(in srgb, var(--light) 94%, var(--secondary)), var(--light));
  border: 1px solid color-mix(in srgb, var(--secondary) 24%, var(--lightgray));
  border-radius: 8px;
  overflow: hidden;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  position: relative;
}

.knowledge-explore-hero::after {
  background-image:
    linear-gradient(color-mix(in srgb, var(--secondary) 13%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--secondary) 13%, transparent) 1px, transparent 1px);
  background-size: 32px 32px;
  content: "";
  inset: 0;
  mask-image: linear-gradient(115deg, transparent, black 36%, transparent 84%);
  opacity: 0.45;
  pointer-events: none;
  position: absolute;
}

.knowledge-explore-hero > * {
  position: relative;
  z-index: 1;
}

.knowledge-explore-kicker,
.knowledge-explore-head span,
.knowledge-explore-chip span,
.knowledge-explore-route > span {
  color: var(--secondary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.knowledge-explore h1 {
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  line-height: 1;
  margin: 0.25rem 0 0.75rem;
}

.knowledge-explore-hero p:last-of-type {
  color: var(--darkgray);
  font-size: 1.06rem;
  line-height: 1.7;
  margin: 0;
  max-width: 45rem;
}

.knowledge-explore-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
}

.knowledge-explore-stats div {
  background: color-mix(in srgb, var(--light) 78%, transparent);
  border: 1px solid color-mix(in srgb, var(--secondary) 18%, var(--lightgray));
  border-radius: 8px;
  display: grid;
  gap: 0.2rem;
  min-width: 7rem;
  padding: 0.7rem 0.85rem;
}

.knowledge-explore-stats span,
.knowledge-explore-list-main span,
.knowledge-explore-entrance span,
.knowledge-explore-chip small {
  color: var(--darkgray);
}

.knowledge-explore-stats strong {
  color: var(--dark);
  font-size: 1.45rem;
  line-height: 1;
}

.knowledge-explore-grid,
.knowledge-explore-route-grid {
  display: grid;
  gap: 1rem;
}

.knowledge-explore-grid {
  grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.9fr);
}

.knowledge-explore-card,
.knowledge-explore-routes {
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1rem;
}

.knowledge-explore-card {
  background: var(--light);
}

.knowledge-explore-panel {
  --panel-tone: var(--secondary);
  background:
    radial-gradient(circle at 12% 10%, color-mix(in srgb, var(--panel-tone) 16%, transparent), transparent 34%),
    linear-gradient(180deg, color-mix(in srgb, var(--light) 96%, var(--panel-tone)), var(--light));
  display: flex;
  flex-direction: column;
  height: clamp(27rem, 42vw, 32rem);
  overflow: hidden;
  position: relative;
}

.knowledge-explore-panel::after {
  background: linear-gradient(transparent, var(--light) 82%);
  bottom: 0;
  content: "";
  height: 2rem;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
}

.knowledge-explore-workbench {
  --panel-tone: var(--tertiary);
}

.knowledge-explore-head {
  align-items: baseline;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}

.knowledge-explore-head h2 {
  font-size: 1.2rem;
  margin: 0;
}

.knowledge-explore-random-grid {
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.knowledge-explore-chip,
.knowledge-explore-entrance {
  color: var(--dark);
  text-decoration: none;
}

.knowledge-explore-chip {
  background:
    radial-gradient(circle at 14% 12%, color-mix(in srgb, var(--secondary) 16%, transparent), transparent 36%),
    color-mix(in srgb, var(--light) 94%, var(--secondary));
  border: 1px solid color-mix(in srgb, var(--secondary) 26%, var(--lightgray));
  border-radius: 8px;
  display: grid;
  gap: 0.25rem;
  padding: 0.8rem;
}

.knowledge-explore-chip strong {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.2;
  overflow: hidden;
}

.knowledge-explore-entrances,
.knowledge-explore-list {
  display: grid;
  gap: 0.7rem;
}

.knowledge-explore-entrance {
  border-bottom: 1px solid var(--lightgray);
  display: grid;
  gap: 0.25rem;
  padding-bottom: 0.7rem;
}

.knowledge-explore-entrance:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.knowledge-explore-routes {
  background:
    radial-gradient(circle at 12% 16%, color-mix(in srgb, var(--tertiary) 18%, transparent), transparent 32%),
    var(--light);
}

.knowledge-explore-route-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
}

.knowledge-explore-route {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--light) 98%, var(--secondary)), var(--light)),
    var(--light);
  border: 1px solid color-mix(in srgb, var(--secondary) 22%, var(--lightgray));
  border-radius: 8px;
  color: var(--dark);
  display: grid;
  gap: 0.5rem;
  min-height: 11.5rem;
  padding: 0.9rem;
  text-decoration: none;
}

.knowledge-explore-route::after {
  align-self: end;
  color: var(--secondary);
  content: "进入路线";
  font-size: 0.82rem;
  font-weight: 800;
  justify-self: start;
}

.knowledge-explore-route strong {
  font-family: var(--headerFont);
  font-size: 1.18rem;
  line-height: 1.2;
}

.knowledge-explore-route p {
  color: var(--darkgray);
  line-height: 1.55;
  margin: 0;
}

.knowledge-explore-route-meta {
  color: var(--darkgray);
  font-size: 0.76rem;
  font-style: normal;
  line-height: 1.2;
}

.knowledge-explore-route-stops {
  border-top: 1px solid color-mix(in srgb, var(--secondary) 18%, var(--lightgray));
  counter-reset: route-stop;
  display: grid;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0.85rem 0.9rem 0.9rem;
  position: relative;
}

.knowledge-explore-route-stops::before {
  background: color-mix(in srgb, var(--secondary) 28%, var(--lightgray));
  bottom: 1.8rem;
  content: "";
  left: 1.7rem;
  position: absolute;
  top: 1.65rem;
  width: 1px;
}

.knowledge-explore-route-stops li {
  align-items: center;
  counter-increment: route-stop;
  display: grid;
  gap: 0.2rem;
  grid-template-columns: 1.7rem minmax(0, 1fr);
  position: relative;
}

.knowledge-explore-route-stops li::before {
  align-items: center;
  background: var(--light);
  border: 1px solid color-mix(in srgb, var(--secondary) 48%, var(--lightgray));
  border-radius: 999px;
  color: var(--secondary);
  content: counter(route-stop);
  display: flex;
  font-size: 0.72rem;
  font-weight: 800;
  height: 1.7rem;
  justify-content: center;
  width: 1.7rem;
}

.knowledge-explore-route-stops small {
  color: var(--darkgray);
  font-size: 0.72rem;
  grid-column: 2;
  letter-spacing: 0.02em;
}

.knowledge-explore-route-stops span {
  color: var(--darkgray);
  font-size: 0.7rem;
  grid-column: 2;
  line-height: 1.2;
}

.knowledge-explore-route-stops a {
  border-bottom: 1px solid color-mix(in srgb, var(--secondary) 24%, transparent);
  color: var(--dark);
  font-weight: 700;
  grid-column: 2;
  line-height: 1.25;
  text-decoration: none;
}

.knowledge-explore-route-stops a:hover {
  border-color: var(--secondary);
  color: var(--secondary);
  text-decoration: none;
}

.knowledge-route-page {
  max-width: 70rem;
}

.knowledge-route-back {
  color: var(--secondary);
  font-size: 0.86rem;
  font-weight: 800;
  text-decoration: none;
}

.knowledge-route-back:hover {
  text-decoration: underline;
}

.knowledge-route-shuffle {
  background: var(--secondary);
  border: 1px solid var(--secondary);
  border-radius: 999px;
  color: var(--light);
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  justify-self: start;
  line-height: 1.2;
  margin-top: 0.9rem;
  padding: 0.65rem 0.9rem;
}

.knowledge-route-shuffle:hover {
  filter: brightness(1.08);
}

.knowledge-route-shuffle.subtle {
  background: color-mix(in srgb, var(--light) 82%, transparent);
  border-color: color-mix(in srgb, var(--secondary) 28%, var(--lightgray));
  color: var(--secondary);
  font-size: 0.82rem;
  margin-top: 0;
  padding: 0.45rem 0.65rem;
}

.knowledge-route-board {
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1rem;
}

.knowledge-route-board.compact {
  background: transparent;
  border: 0;
  padding: 0;
}

.knowledge-route-path {
  counter-reset: route-stop;
  display: grid;
  gap: 0.8rem;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.knowledge-route-path[hidden] {
  display: none !important;
}

.knowledge-route-path::before {
  background: color-mix(in srgb, var(--secondary) 28%, var(--lightgray));
  bottom: 2rem;
  content: "";
  left: 1.25rem;
  position: absolute;
  top: 2rem;
  width: 1px;
}

.knowledge-route-path li {
  align-items: center;
  background: color-mix(in srgb, var(--light) 94%, var(--secondary));
  border: 1px solid color-mix(in srgb, var(--secondary) 18%, var(--lightgray));
  border-radius: 8px;
  counter-increment: route-stop;
  display: grid;
  gap: 0.2rem 0.75rem;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  padding: 0.85rem;
  position: relative;
}

.knowledge-route-path li::before {
  align-items: center;
  background: var(--light);
  border: 1px solid color-mix(in srgb, var(--secondary) 48%, var(--lightgray));
  border-radius: 999px;
  color: var(--secondary);
  content: counter(route-stop);
  display: flex;
  font-size: 0.8rem;
  font-weight: 800;
  grid-row: 1 / span 3;
  height: 2.5rem;
  justify-content: center;
  width: 2.5rem;
}

.knowledge-route-path small,
.knowledge-route-path span {
  color: var(--darkgray);
  font-size: 0.78rem;
}

.knowledge-route-path a {
  color: var(--dark);
  font-family: var(--headerFont);
  font-size: 1.12rem;
  font-weight: 800;
  line-height: 1.2;
  text-decoration: none;
}

.knowledge-route-path a:hover {
  color: var(--secondary);
  text-decoration: none;
}

.knowledge-explore-chip:hover,
.knowledge-explore-route:hover,
.knowledge-explore-entrance:hover {
  border-color: color-mix(in srgb, var(--secondary) 46%, var(--lightgray));
  box-shadow: 0 10px 24px color-mix(in srgb, var(--secondary) 12%, transparent);
  text-decoration: none;
  transform: translateY(-2px);
}

.knowledge-explore-list {
  list-style: none;
  margin: 0;
  overflow: auto;
  padding: 0;
  scrollbar-width: thin;
}

.knowledge-explore-list li {
  align-items: center;
  background: color-mix(in srgb, var(--light) 78%, transparent);
  border: 1px solid color-mix(in srgb, var(--panel-tone) 18%, var(--lightgray));
  border-radius: 8px;
  display: grid;
  gap: 0.7rem;
  grid-template-columns: auto minmax(0, 1fr) auto;
  padding: 0.72rem 0.78rem;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.knowledge-explore-list li:hover {
  border-color: color-mix(in srgb, var(--panel-tone) 42%, var(--lightgray));
  box-shadow: 0 10px 24px color-mix(in srgb, var(--panel-tone) 10%, transparent);
  transform: translateY(-1px);
}

.knowledge-explore-list a {
  color: var(--dark);
  display: -webkit-box;
  font-weight: 700;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.25;
  overflow: hidden;
}

.knowledge-explore-list-main {
  display: grid;
  gap: 0.18rem;
}

.knowledge-explore-list-main span {
  font-size: 0.86rem;
}

.knowledge-explore-rank {
  align-items: center;
  background: color-mix(in srgb, var(--panel-tone) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--panel-tone) 32%, var(--lightgray));
  border-radius: 999px;
  color: var(--panel-tone);
  display: inline-flex;
  font-size: 0.76rem;
  font-weight: 800;
  height: 2rem;
  justify-content: center;
  letter-spacing: 0.04em;
  line-height: 1;
  width: 2rem;
}

.knowledge-explore-score {
  background: var(--panel-tone);
  border-radius: 999px;
  color: var(--light);
  font-size: 0.9rem;
  line-height: 1;
  min-width: 2.6rem;
  padding: 0.45rem 0.55rem;
  text-align: center;
}

.knowledge-explore-score::after {
  content: " links";
  display: block;
  font-size: 0.58rem;
  font-weight: 600;
  margin-top: 0.18rem;
  opacity: 0.78;
}

.knowledge-explore-date {
  color: var(--darkgray);
  font-size: 0.82rem;
  justify-self: end;
  white-space: nowrap;
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
  .knowledge-home-grid,
  .knowledge-explore-grid,
  .knowledge-explore-route-grid {
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

  .knowledge-explore-random-grid {
    grid-template-columns: 1fr;
  }

  .knowledge-explore-panel {
    height: auto;
    max-height: none;
  }

  .knowledge-explore-panel::after {
    display: none;
  }

  .knowledge-explore-list {
    overflow: visible;
  }

  .knowledge-home-card {
    height: auto;
    overflow: visible;
  }

  .knowledge-home-card::after {
    display: none;
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

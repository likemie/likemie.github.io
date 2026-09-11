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
  return (
    page.dates?.[dateType] ?? page.dates?.modified ?? page.dates?.created ?? page.dates?.published
  )
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

function formatRecentDate(date) {
  return date.toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
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
  return [
    "methods",
    "comparative-education",
    "evidence",
    "governance",
    "curriculum",
    "higher-order-assessment",
  ].includes(key)
    ? key
    : undefined
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
  if (fallbackSlug)
    return (
      index.bySlug.get(fallbackSlug) ?? {
        slug: fallbackSlug,
        frontmatter: { title: fallback?.title },
      }
    )

  return pages.find((page) => prefixes.some((prefix) => (page.slug ?? "").startsWith(prefix)))
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

function exploreTopicConfigs() {
  return [
    {
      key: "methods",
      eyebrow: "Research Methods",
      title: "教育研究方法",
      body: "把研究问题、设计、资料、分析与效度放进同一张方法地图，辨认不同证据能够支持什么结论。",
      questions: [
        "问题怎样转化为研究设计？",
        "证据如何支持因果或解释？",
        "效度与测量的边界在哪里？",
      ],
      anchors: [
        "Causality",
        "Crotty's Four Levels of Research Design",
        "Maxwell's Interactive Model of Research Design",
        "Mixed Methods Research",
        "Construct Validity",
      ],
      prefixes: [
        "wiki/concepts/research-methodology/",
        "wiki/theories/research-methodology/",
        "wiki/methods/",
        "wiki/instruments/",
      ],
    },
    {
      key: "comparative-education",
      eyebrow: "Comparative Education",
      title: "比较教育学",
      body: "围绕比较单位、历史传统、政策借鉴与知识生产，组织比较教育学的概念、人物和经典争论。",
      questions: [
        "比较的单位与尺度是什么？",
        "政策如何跨境流动与变形？",
        "谁在生产可比较的教育知识？",
      ],
      anchors: [
        "Comparative Educations",
        "Comparative History of Comparative Education",
        "Policy Borrowing",
        "Four Forms of Understanding of Comparative Education",
        "1970s Methodology Debates in Comparative Education",
      ],
      prefixes: [
        "wiki/concepts/comparative-education/",
        "wiki/theories/comparative-education/",
        "wiki/arguments/journal-articles/Comparative Education/",
      ],
    },
    {
      key: "evidence",
      eyebrow: "Evidence",
      title: "循证教育",
      body: "从“什么算证据”进入，连接清算中心、系统综述、政策实践及其批判，呈现循证教育的完整争议场。",
      questions: [
        "什么证据可以进入政策决策？",
        "研究结论如何转化为实践？",
        "循证话语遮蔽了哪些判断？",
      ],
      anchors: [
        "Evidence-Based Education",
        "Critique of Evidence-Based Education",
        "Research-Informed Teaching Practice",
        "EEF Teaching and Learning Toolkit",
        "What Works Clearinghouse",
      ],
      prefixes: [
        "wiki/concepts/educational-policy-reform/",
        "wiki/facts/uk/",
        "wiki/facts/netherlands/",
      ],
    },
    {
      key: "governance",
      eyebrow: "Governance",
      title: "全球教育治理",
      body: "追踪国际组织、指标、政策网络与全球改革话语，观察教育议程如何被比较、量化和传播。",
      questions: [
        "国际组织如何设定教育议程？",
        "指标怎样成为治理工具？",
        "全球方案如何进入地方制度？",
      ],
      anchors: [
        "OECD",
        "PISA",
        "Network Governance",
        "Government to Governance Shift",
        "Global Education Reform Movement",
      ],
      prefixes: [
        "wiki/facts/global/",
        "wiki/concepts/comparative-education/",
        "wiki/concepts/political-economy-geopolitics/",
      ],
    },
    {
      key: "curriculum",
      eyebrow: "Curriculum & Teaching",
      title: "课程与教学",
      body: "连接课程知识、教学设计、课堂实践与改革案例，既看课程为何如此组织，也看它如何真正发生。",
      questions: [
        "什么知识值得进入课程？",
        "课程目标如何变成教学活动？",
        "改革文本为何会在课堂中变形？",
      ],
      anchors: [
        "Didaktik",
        "Powerful Knowledge",
        "Constructive Alignment",
        "Teaching and Learning Activities",
        "China Basic Education Curriculum Reform",
      ],
      prefixes: [
        "wiki/concepts/curriculum/",
        "wiki/concepts/instruction-pedagogy/",
        "wiki/theories/curriculum/",
        "wiki/theories/instruction-pedagogy/",
        "wiki/facts/china/",
        "wiki/facts/finland/",
      ],
    },
    {
      key: "higher-order-assessment",
      eyebrow: "Higher-order Capabilities",
      title: "高阶能力及其测评",
      body: "以批判性思维与创造力为核心，把能力构念、教学培养、测评框架和具体工具放在一起比较。",
      questions: [
        "高阶能力由哪些构念组成？",
        "教学能否稳定促进这些能力？",
        "不同工具究竟测到了什么？",
      ],
      anchors: [
        "Higher-Order Thinking Skills",
        "Critical Thinking",
        "Creativity",
        "Critical Thinking Assessment",
        "Creativity Assessment",
        "OECD Rubrics for Creativity and Critical Thinking",
      ],
      prefixes: [
        "wiki/concepts/learning-science-cognitive-science/",
        "wiki/concepts/instruction-pedagogy/",
        "wiki/concepts/educational-psychology/",
        "wiki/theories/curriculum/",
        "wiki/instruments/",
      ],
    },
  ]
}

const topicBuckets = [
  { key: "concepts", title: "核心概念", matches: (slug) => slug.startsWith("wiki/concepts/") },
  {
    key: "frameworks",
    title: "理论与方法",
    matches: (slug) => slug.startsWith("wiki/theories/") || slug.startsWith("wiki/methods/"),
  },
  {
    key: "instruments",
    title: "测量工具",
    matches: (slug) => slug.startsWith("wiki/instruments/"),
  },
  {
    key: "arguments",
    title: "关键论证",
    matches: (slug) => slug.startsWith("wiki/arguments/") || slug.startsWith("sources/"),
  },
  {
    key: "contexts",
    title: "人物与案例",
    matches: (slug) => slug.startsWith("wiki/persons/") || slug.startsWith("wiki/facts/"),
  },
]

function buildTopicIndex(pages, config) {
  const index = pageIndexFor(pages)
  const anchors = config.anchors.map((title) => pageByTitle(index, title)).filter(Boolean)
  const scores = new Map()

  const addCandidate = (page, score) => {
    if (!page?.slug || !isListedContent(page)) return
    scores.set(page.slug, Math.max(scores.get(page.slug) ?? 0, score + linksFor(page)))
  }

  anchors.forEach((page, position) => addCandidate(page, 2000 - position * 20))
  pages.forEach((page) => {
    if (config.prefixes.some((prefix) => (page.slug ?? "").startsWith(prefix))) {
      addCandidate(page, 500)
    }
  })
  relatedPages(index, anchors, 1).forEach(({ page, distance, touches }) => {
    addCandidate(page, 300 - distance * 70 + touches * 15)
  })

  const ranked = [...scores.entries()]
    .map(([slug, score]) => ({ page: index.bySlug.get(slug), score }))
    .filter(({ page }) => page)
    .sort(
      (a, b) =>
        b.score - a.score ||
        linksFor(b.page) - linksFor(a.page) ||
        titleFor(a.page).localeCompare(titleFor(b.page)),
    )

  const buckets = topicBuckets
    .map((bucket) => ({
      ...bucket,
      pages: ranked
        .filter(({ page }) => bucket.matches(page.slug ?? ""))
        .slice(0, 6)
        .map(({ page }) => page),
    }))
    .filter((bucket) => bucket.pages.length > 0)

  const visibleSlugs = new Set([
    ...anchors.map((page) => page.slug),
    ...buckets.flatMap((bucket) => bucket.pages.map((page) => page.slug)),
  ])

  return { anchors, buckets, count: visibleSlugs.size }
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
    const topics = exploreTopicConfigs()

    if (currentRouteKey) {
      const topicConfig = topics.find((item) => item.key === currentRouteKey)
      if (!topicConfig) return null
      const topic = buildTopicIndex(pages, topicConfig)

      return h(
        "section",
        {
          class: [displayClass, "knowledge-explore knowledge-topic-page"].filter(Boolean).join(" "),
        },
        h(
          "div",
          { class: "knowledge-explore-hero knowledge-topic-hero" },
          h("a", { href: hrefFor("explore"), class: "knowledge-route-back" }, "返回专题索引"),
          h("p", { class: "knowledge-explore-kicker" }, topicConfig.eyebrow),
          h("h1", null, topicConfig.title),
          h("p", null, topicConfig.body),
          h(
            "div",
            { class: "knowledge-topic-questions", "aria-label": "专题核心问题" },
            topicConfig.questions.map((question, index) =>
              h(
                "div",
                null,
                h("span", null, String(index + 1).padStart(2, "0")),
                h("strong", null, question),
              ),
            ),
          ),
        ),
        h(
          "section",
          { class: "knowledge-topic-core" },
          h(
            "div",
            { class: "knowledge-explore-head" },
            h("h2", null, "推荐起点"),
            h("span", null, `${formatCount(topic.count)} 个精选入口`),
          ),
          h(
            "div",
            { class: "knowledge-topic-core-grid" },
            topic.anchors.map((page, index) =>
              h(
                "a",
                { href: hrefFor(page), class: "knowledge-topic-core-card internal" },
                h("span", null, String(index + 1).padStart(2, "0")),
                h("strong", null, titleFor(page)),
                h("small", null, sectionFor(page)),
              ),
            ),
          ),
        ),
        h(
          "div",
          { class: "knowledge-topic-shelves" },
          topic.buckets.map((bucket) =>
            h(
              "section",
              { class: `knowledge-topic-shelf topic-${bucket.key}` },
              h(
                "div",
                { class: "knowledge-explore-head" },
                h("h2", null, bucket.title),
                h("span", null, `${bucket.pages.length} 个入口`),
              ),
              h(
                "ol",
                null,
                bucket.pages.map((page) =>
                  h(
                    "li",
                    null,
                    h("a", { href: hrefFor(page), class: "internal" }, titleFor(page)),
                    h("span", null, `${sectionFor(page)} · ${formatCount(linksFor(page))} 个链接`),
                  ),
                ),
              ),
            ),
          ),
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
        { label: "文献", prefix: "sources/", seed: "source" },
      ]
      const randomEntries = sections
        .map((section) => {
          const pool = pagesIn(pages, section.prefix)
          const page = deterministicPick(pool, `${todayKey}-${section.seed}`)
          return page && { ...section, page, count: pool.length }
        })
        .filter(Boolean)
      const highNodes = topLinked(
        pages.filter((page) => (page.slug ?? "").startsWith("wiki/")),
        10,
      )
      const workbench = recent.slice(0, 8)
      const practicalTools = [
        {
          eyebrow: "选题指南",
          title: "教育科研选题策略指南",
          body: "用九类选题策略梳理研究问题、理论视角与可行性，适合本科生逐步阅读。",
          href: "/static/tools/topic_strategy_guide_undergrad.html",
          action: "打开指南",
          tone: "guide",
        },
        {
          eyebrow: "Prompt 生成器",
          title: "教育科研选题 Prompt 生成器",
          body: "选择策略、填写研究线索，组合出可直接交给 AI 继续打磨的选题提示词。",
          href: "/static/tools/topic_prompt_generator_undergrad.html",
          action: "开始生成",
          tone: "generator",
        },
      ]

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
            "不按文件夹排队。可以随机抽一张研究卡，也可以从专题进入，把概念、理论、方法、论证和案例放在一起阅读。",
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
          "section",
          { class: "knowledge-explore-tools", "aria-labelledby": "practical-tools-title" },
          h(
            "div",
            { class: "knowledge-explore-head" },
            h("h2", { id: "practical-tools-title" }, "实用工具"),
            h("span", null, "研究选题辅助"),
          ),
          h(
            "div",
            { class: "knowledge-explore-tool-grid" },
            practicalTools.map((tool) =>
              h(
                "a",
                {
                  href: tool.href,
                  class: `knowledge-explore-tool ${tool.tone}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                h("span", { class: "knowledge-explore-tool-eyebrow" }, tool.eyebrow),
                h("strong", null, tool.title),
                h("p", null, tool.body),
                h("em", null, tool.action),
              ),
            ),
          ),
        ),
        h(
          "section",
          { class: "knowledge-explore-routes" },
          h(
            "div",
            { class: "knowledge-explore-head" },
            h("h2", null, "专题索引"),
            h("span", null, "六个研究领域"),
          ),
          h(
            "div",
            { class: "knowledge-explore-route-grid" },
            topics.map((topicConfig) => {
              const topic = buildTopicIndex(pages, topicConfig)
              return h(
                "a",
                {
                  href: hrefFor(`explore/${topicConfig.key}`),
                  class: "knowledge-explore-route knowledge-explore-topic",
                },
                h("span", null, topicConfig.eyebrow),
                h("strong", null, topicConfig.title),
                h("p", null, topicConfig.body),
                h(
                  "em",
                  { class: "knowledge-explore-route-meta" },
                  `进入专题 · ${formatCount(topic.count)} 个精选入口`,
                ),
              )
            }),
          ),
        ),
        h(
          "div",
          { class: "knowledge-explore-grid bottom" },
          h(
            "section",
            { class: "knowledge-explore-card knowledge-explore-panel knowledge-explore-hubs" },
            h(
              "div",
              { class: "knowledge-explore-head" },
              h("h2", null, "高连接节点"),
              h("span", null, "按链接密度"),
            ),
            h(
              "ol",
              { class: "knowledge-explore-list" },
              highNodes.map((page, index) =>
                h(
                  "li",
                  null,
                  h(
                    "span",
                    { class: "knowledge-explore-rank" },
                    String(index + 1).padStart(2, "0"),
                  ),
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
            h(
              "div",
              { class: "knowledge-explore-head" },
              h("h2", null, "最近工作台"),
              h("span", null, "按提交/修改时间"),
            ),
            h(
              "ol",
              { class: "knowledge-explore-list" },
              workbench.map((page, index) => {
                const date = pageDate(page)
                return h(
                  "li",
                  null,
                  h(
                    "span",
                    { class: "knowledge-explore-rank" },
                    String(index + 1).padStart(2, "0"),
                  ),
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
                      formatRecentDate(date),
                    ),
                )
              }),
            ),
          ),
        ),
        h(
          "section",
          { class: "knowledge-explore-card knowledge-explore-random" },
          h(
            "div",
            { class: "knowledge-explore-head" },
            h("h2", null, "随机漫游"),
            h("span", null, todayKey),
          ),
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
            h("span", null, "按提交/修改时间"),
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
                date && h("time", { dateTime: date.toISOString() }, formatRecentDate(date)),
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
body[data-slug="explore"] .page-listing,
body[data-slug="explore/index"] .breadcrumb-container,
body[data-slug="explore/index"] .article-title,
body[data-slug="explore/index"] .content-meta,
body[data-slug="explore/index"] article,
body[data-slug="explore/index"] .page-listing,
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
.knowledge-explore-routes,
.knowledge-explore-tools {
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1rem;
}

.knowledge-explore-card {
  background: var(--light);
}

.knowledge-explore-tools {
  background:
    radial-gradient(circle at 88% 18%, color-mix(in srgb, var(--tertiary) 16%, transparent), transparent 34%),
    var(--light);
}

.knowledge-explore-tool-grid {
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.knowledge-explore-tool {
  --tool-tone: var(--secondary);
  background:
    radial-gradient(circle at 92% 12%, color-mix(in srgb, var(--tool-tone) 18%, transparent), transparent 34%),
    color-mix(in srgb, var(--light) 96%, var(--tool-tone));
  border: 1px solid color-mix(in srgb, var(--tool-tone) 28%, var(--lightgray));
  border-radius: 8px;
  color: var(--dark);
  display: grid;
  gap: 0.5rem;
  min-height: 12rem;
  padding: 1rem;
  text-decoration: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.knowledge-explore-tool.generator {
  --tool-tone: var(--tertiary);
}

.knowledge-explore-tool-eyebrow {
  color: var(--tool-tone);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.knowledge-explore-tool strong {
  font-family: var(--headerFont);
  font-size: clamp(1.18rem, 2vw, 1.5rem);
  line-height: 1.25;
}

.knowledge-explore-tool p {
  color: var(--darkgray);
  line-height: 1.55;
  margin: 0;
}

.knowledge-explore-tool em {
  align-self: end;
  color: var(--tool-tone);
  font-size: 0.86rem;
  font-style: normal;
  font-weight: 800;
}

.knowledge-explore-tool em::after {
  content: " ↗";
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.knowledge-explore-chip {
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

.knowledge-explore-list {
  display: grid;
  gap: 0.7rem;
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

.knowledge-explore-topic::after {
  content: "打开专题";
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

.knowledge-topic-page {
  max-width: 76rem;
}

.knowledge-topic-hero {
  display: grid;
  gap: 0.8rem;
}

.knowledge-topic-questions {
  display: grid;
  gap: 0.65rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 0.7rem;
}

.knowledge-topic-questions div {
  background: color-mix(in srgb, var(--light) 84%, transparent);
  border: 1px solid color-mix(in srgb, var(--secondary) 22%, var(--lightgray));
  border-radius: 8px;
  display: grid;
  gap: 0.35rem;
  padding: 0.85rem;
}

.knowledge-topic-questions span,
.knowledge-topic-core-card span {
  color: var(--secondary);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.knowledge-topic-questions strong {
  font-family: var(--headerFont);
  line-height: 1.45;
}

.knowledge-topic-core,
.knowledge-topic-shelf {
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1rem;
}

.knowledge-topic-core-grid {
  display: grid;
  gap: 0.65rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
}

.knowledge-topic-core-card {
  background: color-mix(in srgb, var(--light) 94%, var(--secondary));
  border: 1px solid color-mix(in srgb, var(--secondary) 22%, var(--lightgray));
  border-radius: 8px;
  color: var(--dark);
  display: grid;
  gap: 0.4rem;
  min-height: 8.5rem;
  padding: 0.85rem;
  text-decoration: none;
}

.knowledge-topic-core-card strong {
  font-family: var(--headerFont);
  line-height: 1.3;
}

.knowledge-topic-core-card small {
  align-self: end;
  color: var(--darkgray);
}

.knowledge-topic-shelves {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
}

.knowledge-topic-shelf ol {
  display: grid;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;
}

.knowledge-topic-shelf li {
  border-top: 1px solid color-mix(in srgb, var(--secondary) 14%, var(--lightgray));
  display: grid;
  gap: 0.2rem;
  padding: 0.7rem 0;
}

.knowledge-topic-shelf li:first-child {
  border-top: 0;
  padding-top: 0;
}

.knowledge-topic-shelf li:last-child {
  padding-bottom: 0;
}

.knowledge-topic-shelf a {
  color: var(--dark);
  font-weight: 700;
  line-height: 1.35;
  text-decoration: none;
}

.knowledge-topic-shelf a:hover,
.knowledge-topic-core-card:hover {
  color: var(--secondary);
  text-decoration: none;
}

.knowledge-topic-shelf li span {
  color: var(--darkgray);
  font-size: 0.76rem;
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

.knowledge-explore-chip:hover,
.knowledge-explore-route:hover,
.knowledge-explore-tool:hover {
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
  .knowledge-explore-route-grid,
  .knowledge-topic-questions,
  .knowledge-explore-tool-grid {
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

  .knowledge-explore-random-grid {
    grid-template-columns: 1fr;
  }
}
`

  return Component
}

export { KnowledgeHome }

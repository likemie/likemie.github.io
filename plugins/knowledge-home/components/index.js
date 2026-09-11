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

function cleanWikiText(value) {
  return String(value ?? "")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
}

function summaryFor(page) {
  return String(page?.frontmatter?.summary ?? "沿着条目中的概念与文献链接继续探索。")
}

function authorsFor(page) {
  const authors = page?.frontmatter?.authors
  if (!Array.isArray(authors)) return cleanWikiText(authors)
  return authors.map(cleanWikiText).filter(Boolean).join(" · ")
}

function displayTitleFor(page) {
  return page?.frontmatter?.argument_display_title ?? titleFor(page)
}

function sequentialPicks(pool, seed, limit) {
  if (pool.length === 0) return []
  const ordered = [...pool].sort((a, b) => titleFor(a).localeCompare(titleFor(b)))
  const first = deterministicPick(ordered, seed)
  const start = Math.max(0, ordered.indexOf(first))
  return Array.from({ length: Math.min(limit, ordered.length) }, (_, index) => {
    return ordered[(start + index) % ordered.length]
  })
}

function methodsTopicData(pages, todayKey) {
  const index = pageIndexFor(pages)
  const find = (title, prefix) => pageByTitle(index, title, prefix)
  const existing = (titles, prefix) => titles.map((title) => find(title, prefix)).filter(Boolean)

  const fixed = [
    {
      title: "Argument_QiMei_2015_EducationalResearchMethods",
      role: "中文入门",
      note: "从选题、课题论证到研究报告，建立完整的教育研究流程。",
    },
    {
      title: "Argument_Cohen_Manion_Morrison_2011_Routledge",
      role: "综合工具书",
      note: "按范式、设计、资料收集与分析方法查找具体操作路径。",
    },
    {
      title: "Argument_Creswell_2022_SAGE",
      role: "设计框架",
      note: "比较量化、质性与混合方法，保持问题、设计和证据一致。",
    },
  ]
    .map((item) => ({ ...item, page: find(item.title, "wiki/arguments/books/") }))
    .filter((item) => item.page)

  const stages = [
    {
      title: "选题与问题化",
      note: "从感兴趣的主题收窄到可研究的问题与边界。",
      links: existing(["Research Topic", "Research Problem", "Research Scope"]),
    },
    {
      title: "文献检索",
      note: "建立检索范围、关键词与材料来源。",
      links: existing([
        "Literature Search",
        "Inverted Triangle Literature Search",
        "Primary and Secondary Documents",
      ]),
    },
    {
      title: "综述与研究缺口",
      note: "把资料组织为论证，辨认已有研究的不足。",
      links: existing([
        "Literature Review",
        "Deficiencies in Past Literature",
        "Literature Map",
        "Research Contribution",
      ]),
    },
    {
      title: "研究目的与问题",
      note: "明确研究要解释、描述或理解什么。",
      links: existing([
        "Research Purpose",
        "Purpose Statement",
        "Research Question",
        "Central Question",
        "Mixed Methods Question",
      ]),
    },
    {
      title: "提出研究假设",
      note: "适用于量化、解释性与实验研究；质性研究可以跳过。",
      conditional: true,
      links: existing([
        "Hypothesis",
        "Null Hypothesis",
        "Alternative Hypothesis",
        "Directional and Non-directional Hypotheses",
      ]),
    },
    {
      title: "构念与操作化",
      note: "定义研究对象，并建立构念、变量与测量之间的对应。",
      links: existing([
        "Construct",
        "Definition of Terms",
        "Operationalization",
        "Variable",
        "Scale of Measurement",
      ]),
    },
    {
      title: "选择研究设计",
      note: "统筹范式、方法、抽样、资料收集与分析方案。",
      links: existing([
        "Crotty's Four Levels of Research Design",
        "Qualitative Research",
        "Quantitative Research",
        "Mixed Methods Research",
        "Study Population and Sample",
      ]),
    },
    {
      title: "效度与研究质量",
      note: "检查推论是否成立，并说明研究结论的适用边界。",
      links: existing([
        "Internal Validity",
        "External Validity",
        "Construct Validity",
        "Reliability",
        "Trustworthiness",
        "Qualitative Validity",
      ]),
    },
  ]

  const methods = [
    {
      label: "观察",
      title: "Observation Method",
      description: "在自然或结构化情境中记录行为、互动与过程。",
      variants: [
        "Participant Observation",
        "Non-participant Observation",
        "Structured Observation",
      ],
    },
    {
      label: "实验",
      title: "Experimental Research",
      description: "通过操纵、比较与控制来评估干预及其因果效果。",
      variants: [
        "True Experimental Design",
        "Quasi-Experimental Designs",
        "Pre-Experimental Designs",
      ],
    },
    {
      label: "问卷",
      title: "Questionnaire",
      description: "把构念转化为可回答的问题、选项与量表。",
      variants: ["Questionnaire Wording", "Open-Ended and Closed-Ended Data", "Response Bias"],
    },
    {
      label: "访谈",
      title: "Qualitative Interview",
      description: "借助有结构的对话理解经验、意义与行动逻辑。",
      variants: ["Semi-structured Interview", "In-depth Interview", "Group Interview"],
    },
    {
      label: "行动研究",
      title: "Action Research",
      description: "让研究、实践改进与参与者反思在循环中相互推进。",
      variants: ["Participatory Action Research", "Emancipatory Action Research"],
    },
  ]
    .map((method) => ({
      ...method,
      page: find(method.title, "wiki/methods/"),
      variantPages: existing(method.variants, "wiki/methods/"),
    }))
    .filter((method) => method.page)

  const ethics = existing([
    "Research Ethics",
    "Informed Consent",
    "Privacy in Research",
    "Reflexivity",
  ])

  const randomPools = [
    { key: "concept", label: "研究概念", prefix: "wiki/concepts/research-methodology/" },
    { key: "mixed", label: "混合方法", prefix: "wiki/methods/mixed/" },
    { key: "qualitative", label: "质性方法", prefix: "wiki/methods/qualitative/" },
    { key: "quantitative", label: "量化方法", prefix: "wiki/methods/quantitative/" },
  ]

  const latestPool = pages
    .filter((page) => randomPools.some((pool) => (page.slug ?? "").startsWith(pool.prefix)))
    .sort(byDateThenLinks)
  const latest = latestPool.slice(0, 6)

  const reserved = new Set([
    ...fixed.map(({ page }) => page.slug),
    ...stages.flatMap((stage) => stage.links.map((page) => page.slug)),
    ...methods.flatMap((method) => [method.page, ...method.variantPages].map((page) => page.slug)),
    ...latest.map((page) => page.slug),
  ])

  const random = randomPools.map((pool) => {
    const candidates = pages.filter(
      (page) => (page.slug ?? "").startsWith(pool.prefix) && !reserved.has(page.slug),
    )
    return {
      ...pool,
      count: candidates.length,
      pages: sequentialPicks(candidates, `${todayKey}-${pool.key}`, 8),
    }
  })

  return {
    fixed,
    stages,
    methods,
    ethics,
    random,
    latest,
    total: randomPools.reduce(
      (sum, pool) => sum + pages.filter((page) => (page.slug ?? "").startsWith(pool.prefix)).length,
      0,
    ),
  }
}

function renderMethodsTopicPage({ pages, topicConfig, todayKey, displayClass }) {
  const topic = methodsTopicData(pages, todayKey)

  return h(
    "section",
    {
      class: [displayClass, "knowledge-explore knowledge-topic-page knowledge-methods-page"]
        .filter(Boolean)
        .join(" "),
    },
    h(
      "header",
      { class: "knowledge-methods-hero" },
      h(
        "div",
        { class: "knowledge-methods-nav" },
        h("a", { href: hrefFor("explore"), class: "knowledge-route-back" }, "← 返回专题索引"),
        h("span", null, "专题 01 · Research Methods"),
      ),
      h(
        "div",
        { class: "knowledge-methods-hero-copy" },
        h("p", { class: "knowledge-explore-kicker" }, "Research Methods"),
        h("h1", null, "教育研究方法"),
        h("p", null, topicConfig.body),
      ),
      h(
        "div",
        { class: "knowledge-methods-hero-meta" },
        h("strong", null, formatCount(topic.total)),
        h("span", null, "个方法与研究概念"),
        h("small", null, "问题 → 设计 → 证据 → 推论"),
      ),
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
      { class: "knowledge-methods-section knowledge-methods-foundations" },
      h(
        "div",
        { class: "knowledge-methods-section-head" },
        h("div", null, h("span", null, "Foundations"), h("h2", null, "三本基础教材")),
        h("p", null, "固定入口 · 从概览到设计，再到具体方法"),
      ),
      h(
        "div",
        { class: "knowledge-methods-book-grid" },
        topic.fixed.map((item, index) =>
          h(
            "a",
            {
              href: hrefFor(item.page),
              class: `knowledge-methods-book book-${index + 1} internal`,
            },
            h(
              "div",
              { class: "knowledge-methods-book-top" },
              h("span", null, String(index + 1).padStart(2, "0")),
              h("em", null, item.role),
            ),
            h("h3", null, displayTitleFor(item.page)),
            h("small", null, authorsFor(item.page)),
            h("p", null, item.note),
            h(
              "footer",
              null,
              h(
                "span",
                null,
                `${item.page.frontmatter?.year ?? ""} · ${formatCount(linksFor(item.page))} 个链接`,
              ),
              h("strong", null, "打开 ↗"),
            ),
          ),
        ),
      ),
    ),
    h(
      "section",
      { class: "knowledge-methods-roadmap" },
      h(
        "div",
        { class: "knowledge-methods-roadmap-head" },
        h("div", null, h("span", null, "Research Spine"), h("h2", null, "从选题到可信结论")),
        h("p", null, "八个阶段不是线性配方，而是一组需要反复校准的研究决策。"),
      ),
      h(
        "ol",
        { class: "knowledge-methods-stages" },
        topic.stages.map((stage, index) =>
          h(
            "li",
            { class: stage.conditional ? "is-conditional" : undefined },
            h(
              "div",
              { class: "knowledge-methods-stage-number" },
              h("span", null, String(index + 1).padStart(2, "0")),
              index < topic.stages.length - 1 && h("i", { "aria-hidden": "true" }),
            ),
            h(
              "div",
              { class: "knowledge-methods-stage-body" },
              h(
                "div",
                { class: "knowledge-methods-stage-title" },
                h("h3", null, stage.title),
                stage.conditional && h("em", null, "条件步骤"),
              ),
              h("p", null, stage.note),
              h(
                "div",
                { class: "knowledge-methods-stage-links" },
                stage.links.map((page) =>
                  h("a", { href: hrefFor(page), class: "internal" }, titleFor(page)),
                ),
              ),
            ),
          ),
        ),
      ),
      h(
        "aside",
        { class: "knowledge-methods-ethics" },
        h("span", null, "贯穿全过程"),
        h("strong", null, "研究伦理与研究者反思"),
        h(
          "div",
          null,
          topic.ethics.map((page) =>
            h("a", { href: hrefFor(page), class: "internal" }, titleFor(page)),
          ),
        ),
      ),
    ),
    h(
      "section",
      { class: "knowledge-methods-section knowledge-methods-toolkit" },
      h(
        "div",
        { class: "knowledge-methods-section-head" },
        h("div", null, h("span", null, "Field Toolkit"), h("h2", null, "五种重点方法")),
        h("p", null, "从适用问题进入，再比较每种方法的常见变体"),
      ),
      h(
        "div",
        { class: "knowledge-methods-tool-grid" },
        topic.methods.map((method, index) =>
          h(
            "article",
            { class: `knowledge-methods-tool tool-${index + 1}` },
            h("span", null, method.label),
            h("h3", null, h("a", { href: hrefFor(method.page), class: "internal" }, method.label)),
            h("p", null, method.description),
            h(
              "div",
              null,
              method.variantPages.map((page) =>
                h("a", { href: hrefFor(page), class: "internal" }, titleFor(page)),
              ),
            ),
          ),
        ),
      ),
    ),
    h(
      "section",
      { class: "knowledge-methods-section knowledge-methods-discovery" },
      h(
        "div",
        { class: "knowledge-methods-section-head" },
        h("div", null, h("span", null, "Serendipity"), h("h2", null, "随机发现")),
        h(
          "button",
          { type: "button", class: "knowledge-methods-refresh", "data-method-random-refresh": "" },
          "换一批",
        ),
      ),
      h(
        "div",
        { class: "knowledge-methods-random-grid" },
        topic.random.map((group) =>
          h(
            "article",
            { class: "knowledge-methods-random-card", "data-method-random-card": group.key },
            h(
              "header",
              null,
              h("span", null, group.label),
              h("small", null, `${formatCount(group.count)} 个候选`),
            ),
            h(
              "div",
              { class: "knowledge-methods-random-items" },
              group.pages.map((page, index) =>
                h(
                  "a",
                  {
                    href: hrefFor(page),
                    class: "knowledge-methods-random-item internal",
                    "data-method-random-item": group.key,
                    hidden: index > 0 ? true : undefined,
                  },
                  h("strong", null, titleFor(page)),
                  h("p", null, summaryFor(page)),
                  h("span", null, `${sectionFor(page)} · ${formatCount(linksFor(page))} 个链接`),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
    h(
      "section",
      { class: "knowledge-methods-section knowledge-methods-latest" },
      h(
        "div",
        { class: "knowledge-methods-section-head" },
        h("div", null, h("span", null, "Recently Updated"), h("h2", null, "最新条目")),
        h("p", null, "研究概念、混合、质性与量化方法中的最近更新"),
      ),
      h(
        "div",
        { class: "knowledge-methods-latest-grid" },
        topic.latest.map((page) => {
          const date = pageDate(page)
          return h(
            "a",
            { href: hrefFor(page), class: "knowledge-methods-latest-card internal" },
            h(
              "header",
              null,
              h("span", null, sectionFor(page)),
              date && h("time", { dateTime: date.toISOString() }, formatDate(date, "zh-CN")),
            ),
            h("h3", null, titleFor(page)),
            h("p", null, summaryFor(page)),
            h("small", null, `${formatCount(linksFor(page))} 个链接`),
          )
        }),
      ),
    ),
  )
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

      if (currentRouteKey === "methods") {
        return renderMethodsTopicPage({ pages, topicConfig, todayKey, displayClass })
      }

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
function rotateMethodsRandomCards() {
  const cards = Array.from(document.querySelectorAll("[data-method-random-card]"))
  for (const card of cards) {
    const items = Array.from(card.querySelectorAll("[data-method-random-item]"))
    if (items.length < 2) continue
    const current = items.findIndex((item) => !item.hidden)
    let next = Math.floor(Math.random() * items.length)
    if (next === current) next = (next + 1) % items.length
    items.forEach((item, index) => { item.hidden = index !== next })
  }
}

if (window.knowledgeMethodsRandomBound !== true) {
  window.knowledgeMethodsRandomBound = true
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-method-random-refresh]")
    if (!button) return
    event.preventDefault()
    rotateMethodsRandomCards()
  })
}
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

.knowledge-methods-page {
  --methods-navy: #14232d;
  --methods-navy-soft: #203744;
  --methods-ice: #dceaf0;
  --methods-gold: #c8a86b;
  gap: clamp(1.25rem, 2vw, 2rem);
  max-width: 80rem;
}

.knowledge-methods-hero {
  background:
    radial-gradient(circle at 86% 12%, color-mix(in srgb, var(--secondary) 22%, transparent), transparent 28%),
    linear-gradient(135deg, color-mix(in srgb, var(--light) 96%, var(--secondary)), var(--light));
  border: 1px solid color-mix(in srgb, var(--secondary) 28%, var(--lightgray));
  border-radius: 14px;
  display: grid;
  gap: 1.4rem 2rem;
  grid-template-columns: minmax(0, 1fr) minmax(13rem, 0.28fr);
  overflow: hidden;
  padding: clamp(1.25rem, 4vw, 3rem);
  position: relative;
}

.knowledge-methods-hero::before {
  background-image:
    linear-gradient(color-mix(in srgb, var(--secondary) 10%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--secondary) 10%, transparent) 1px, transparent 1px);
  background-size: 32px 32px;
  content: "";
  inset: 0;
  mask-image: linear-gradient(110deg, transparent 12%, black 60%, transparent 94%);
  opacity: 0.55;
  pointer-events: none;
  position: absolute;
}

.knowledge-methods-hero > * {
  position: relative;
  z-index: 1;
}

.knowledge-methods-nav {
  align-items: center;
  display: flex;
  grid-column: 1 / -1;
  justify-content: space-between;
}

.knowledge-methods-nav > span,
.knowledge-methods-section-head > div > span,
.knowledge-methods-roadmap-head > div > span {
  color: var(--secondary);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.knowledge-methods-nav > span {
  color: var(--darkgray);
}

.knowledge-methods-hero-copy {
  align-self: end;
  max-width: 48rem;
}

.knowledge-methods-hero-copy h1 {
  font-size: clamp(2.7rem, 6vw, 5.7rem);
  letter-spacing: -0.045em;
  line-height: 0.96;
  margin: 0.35rem 0 1rem;
}

.knowledge-methods-hero-copy > p:last-child {
  color: var(--darkgray);
  font-size: clamp(1rem, 1.7vw, 1.2rem);
  line-height: 1.75;
  margin: 0;
  max-width: 42rem;
}

.knowledge-methods-hero-meta {
  align-self: end;
  border-left: 1px solid color-mix(in srgb, var(--secondary) 28%, var(--lightgray));
  display: grid;
  padding: 0.4rem 0 0.4rem 1.25rem;
}

.knowledge-methods-hero-meta strong {
  font-family: var(--headerFont);
  font-size: clamp(2.6rem, 5vw, 4.4rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1;
}

.knowledge-methods-hero-meta span {
  color: var(--darkgray);
  font-size: 0.86rem;
  margin-top: 0.45rem;
}

.knowledge-methods-hero-meta small {
  border-top: 1px solid var(--lightgray);
  color: var(--secondary);
  font-size: 0.74rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
}

.knowledge-methods-hero .knowledge-topic-questions {
  grid-column: 1 / -1;
  margin-top: 0;
}

.knowledge-methods-hero .knowledge-topic-questions div {
  backdrop-filter: blur(10px);
  border-radius: 10px;
  min-height: 5.6rem;
}

.knowledge-methods-section {
  display: grid;
  gap: 1rem;
}

.knowledge-methods-section-head,
.knowledge-methods-roadmap-head {
  align-items: end;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.knowledge-methods-section-head h2,
.knowledge-methods-roadmap-head h2 {
  font-size: clamp(1.55rem, 3vw, 2.15rem);
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0.25rem 0 0;
}

.knowledge-methods-section-head > p,
.knowledge-methods-roadmap-head > p {
  color: var(--darkgray);
  font-size: 0.82rem;
  margin: 0;
  max-width: 27rem;
  text-align: right;
}

.knowledge-methods-book-grid {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.knowledge-methods-book {
  --book-tone: var(--secondary);
  background:
    radial-gradient(circle at 92% 8%, color-mix(in srgb, var(--book-tone) 20%, transparent), transparent 30%),
    color-mix(in srgb, var(--light) 96%, var(--book-tone));
  border: 1px solid color-mix(in srgb, var(--book-tone) 28%, var(--lightgray));
  border-radius: 12px;
  color: var(--dark);
  display: flex;
  flex-direction: column;
  min-height: 18.5rem;
  padding: clamp(1rem, 2vw, 1.35rem);
  text-decoration: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.knowledge-methods-book.book-2 {
  --book-tone: #708a86;
}

.knowledge-methods-book.book-3 {
  --book-tone: #8b7658;
}

.knowledge-methods-book:hover {
  border-color: color-mix(in srgb, var(--book-tone) 62%, var(--lightgray));
  box-shadow: 0 18px 42px color-mix(in srgb, var(--book-tone) 13%, transparent);
  text-decoration: none;
  transform: translateY(-3px);
}

.knowledge-methods-book-top {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.knowledge-methods-book-top > span {
  color: var(--book-tone);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.knowledge-methods-book-top em {
  border: 1px solid color-mix(in srgb, var(--book-tone) 34%, var(--lightgray));
  border-radius: 999px;
  color: var(--book-tone);
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 700;
  padding: 0.22rem 0.5rem;
}

.knowledge-methods-book h3 {
  font-family: var(--headerFont);
  font-size: clamp(1.35rem, 2.6vw, 2rem);
  letter-spacing: -0.025em;
  line-height: 1.14;
  margin: 2rem 0 0.45rem;
}

.knowledge-methods-book > small {
  color: var(--darkgray);
  font-size: 0.76rem;
  min-height: 2.2em;
}

.knowledge-methods-book > p {
  color: var(--darkgray);
  font-size: 0.88rem;
  line-height: 1.6;
  margin: 1rem 0;
}

.knowledge-methods-book footer {
  align-items: center;
  border-top: 1px solid color-mix(in srgb, var(--book-tone) 18%, var(--lightgray));
  display: flex;
  font-size: 0.74rem;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.75rem;
}

.knowledge-methods-book footer span {
  color: var(--darkgray);
}

.knowledge-methods-book footer strong {
  color: var(--book-tone);
}

.knowledge-methods-roadmap {
  background:
    radial-gradient(circle at 86% 0%, rgba(120, 173, 198, 0.24), transparent 28%),
    linear-gradient(145deg, var(--methods-navy-soft), var(--methods-navy) 45%, #0f1b22);
  border: 1px solid rgba(184, 214, 228, 0.22);
  border-radius: 14px;
  color: #f6f8f8;
  display: grid;
  gap: 1.6rem;
  overflow: hidden;
  padding: clamp(1.2rem, 3.5vw, 2.5rem);
  position: relative;
}

.knowledge-methods-roadmap::after {
  border: 1px solid rgba(220, 234, 240, 0.08);
  border-radius: 50%;
  content: "";
  height: 22rem;
  pointer-events: none;
  position: absolute;
  right: -12rem;
  top: -12rem;
  width: 22rem;
}

.knowledge-methods-roadmap-head {
  position: relative;
  z-index: 1;
}

.knowledge-methods-roadmap-head > div > span {
  color: #a9d2e5;
}

.knowledge-methods-roadmap-head > p {
  color: rgba(239, 246, 248, 0.68);
}

.knowledge-methods-stages {
  display: grid;
  gap: 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
}

.knowledge-methods-stages > li {
  border-top: 1px solid rgba(220, 234, 240, 0.15);
  display: grid;
  gap: 1rem;
  grid-template-columns: 2rem 1fr;
  min-height: 13.5rem;
  padding: 1.25rem 1.25rem 1.25rem 0;
}

.knowledge-methods-stages > li:nth-child(even) {
  border-left: 1px solid rgba(220, 234, 240, 0.15);
  padding-left: 1.25rem;
}

.knowledge-methods-stage-number {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.knowledge-methods-stage-number span {
  align-items: center;
  background: rgba(220, 234, 240, 0.08);
  border: 1px solid rgba(220, 234, 240, 0.28);
  border-radius: 50%;
  color: #b5d8e8;
  display: flex;
  flex: 0 0 2rem;
  font-size: 0.68rem;
  font-weight: 800;
  height: 2rem;
  justify-content: center;
  letter-spacing: 0.06em;
  width: 2rem;
}

.knowledge-methods-stage-number i {
  background: linear-gradient(rgba(181, 216, 232, 0.32), transparent);
  flex: 1;
  margin-top: 0.4rem;
  width: 1px;
}

.knowledge-methods-stage-title {
  align-items: center;
  display: flex;
  gap: 0.55rem;
}

.knowledge-methods-stage-title h3 {
  color: #f6f8f8;
  font-family: var(--headerFont);
  font-size: 1.18rem;
  line-height: 1.2;
  margin: 0;
}

.knowledge-methods-stage-title em {
  background: rgba(200, 168, 107, 0.14);
  border: 1px solid rgba(224, 194, 136, 0.36);
  border-radius: 999px;
  color: #e0c288;
  font-size: 0.64rem;
  font-style: normal;
  font-weight: 700;
  padding: 0.18rem 0.42rem;
  white-space: nowrap;
}

.knowledge-methods-stage-body > p {
  color: rgba(239, 246, 248, 0.66);
  font-size: 0.8rem;
  line-height: 1.55;
  margin: 0.45rem 0 0.8rem;
}

.knowledge-methods-stage-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.knowledge-methods-stage-links a,
.knowledge-methods-ethics a {
  background: rgba(238, 246, 249, 0.07);
  border: 1px solid rgba(220, 234, 240, 0.14);
  border-radius: 5px;
  color: #dceaf0;
  font-size: 0.68rem;
  line-height: 1.25;
  padding: 0.3rem 0.45rem;
  text-decoration: none;
}

.knowledge-methods-stage-links a:hover,
.knowledge-methods-ethics a:hover {
  background: rgba(220, 234, 240, 0.14);
  border-color: rgba(220, 234, 240, 0.36);
  color: white;
  text-decoration: none;
}

.knowledge-methods-ethics {
  align-items: center;
  background: rgba(4, 11, 15, 0.25);
  border: 1px solid rgba(220, 234, 240, 0.15);
  border-radius: 9px;
  display: grid;
  gap: 0.35rem 1rem;
  grid-template-columns: auto auto 1fr;
  padding: 0.8rem 1rem;
  position: relative;
  z-index: 1;
}

.knowledge-methods-ethics > span {
  color: #a9d2e5;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.knowledge-methods-ethics > strong {
  color: #f6f8f8;
  font-family: var(--headerFont);
  font-size: 0.95rem;
}

.knowledge-methods-ethics > div {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  justify-content: flex-end;
}

.knowledge-methods-tool-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.knowledge-methods-tool {
  --tool-tone: #557a8a;
  background: color-mix(in srgb, var(--light) 96%, var(--tool-tone));
  border: 1px solid color-mix(in srgb, var(--tool-tone) 28%, var(--lightgray));
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  min-height: 17rem;
  overflow: hidden;
  padding: 1rem;
  position: relative;
}

.knowledge-methods-tool::before {
  background: var(--tool-tone);
  content: "";
  height: 3px;
  inset: 0 0 auto;
  opacity: 0.75;
  position: absolute;
}

.knowledge-methods-tool.tool-2 { --tool-tone: #816b60; }
.knowledge-methods-tool.tool-3 { --tool-tone: #6f8062; }
.knowledge-methods-tool.tool-4 { --tool-tone: #746d91; }
.knowledge-methods-tool.tool-5 { --tool-tone: #937456; }

.knowledge-methods-tool > span {
  color: var(--tool-tone);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.knowledge-methods-tool h3 {
  font-size: 1.35rem;
  margin: 1.15rem 0 0.65rem;
}

.knowledge-methods-tool h3 a {
  color: var(--dark);
  text-decoration: none;
}

.knowledge-methods-tool > p {
  color: var(--darkgray);
  font-size: 0.8rem;
  line-height: 1.55;
  margin: 0 0 1rem;
}

.knowledge-methods-tool > div {
  border-top: 1px solid color-mix(in srgb, var(--tool-tone) 18%, var(--lightgray));
  display: grid;
  gap: 0.4rem;
  margin-top: auto;
  padding-top: 0.75rem;
}

.knowledge-methods-tool > div a {
  color: var(--darkgray);
  font-size: 0.68rem;
  line-height: 1.25;
  text-decoration: none;
}

.knowledge-methods-tool > div a:hover,
.knowledge-methods-tool h3 a:hover {
  color: var(--secondary);
}

.knowledge-methods-random-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.knowledge-methods-refresh {
  background: var(--dark);
  border: 1px solid var(--dark);
  border-radius: 7px;
  color: var(--light);
  cursor: pointer;
  font: inherit;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.48rem 0.75rem;
}

.knowledge-methods-refresh:hover {
  background: var(--secondary);
  border-color: var(--secondary);
}

.knowledge-methods-random-card {
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 10px;
  display: grid;
  min-height: 14rem;
  overflow: hidden;
}

.knowledge-methods-random-card > header {
  align-items: center;
  border-bottom: 1px solid var(--lightgray);
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0.85rem;
}

.knowledge-methods-random-card > header span {
  color: var(--secondary);
  font-size: 0.74rem;
  font-weight: 800;
}

.knowledge-methods-random-card > header small {
  color: var(--darkgray);
  font-size: 0.64rem;
}

.knowledge-methods-random-items {
  display: grid;
}

.knowledge-methods-random-item {
  color: var(--dark);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-decoration: none;
}

.knowledge-methods-random-item[hidden] {
  display: none;
}

.knowledge-methods-random-item strong {
  font-family: var(--headerFont);
  font-size: 1.15rem;
  line-height: 1.25;
}

.knowledge-methods-random-item p,
.knowledge-methods-latest-card p {
  color: var(--darkgray);
  display: -webkit-box;
  font-size: 0.78rem;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.55;
  overflow: hidden;
}

.knowledge-methods-random-item > span {
  color: var(--darkgray);
  font-size: 0.65rem;
  margin-top: auto;
}

.knowledge-methods-random-item:hover {
  background: color-mix(in srgb, var(--light) 96%, var(--secondary));
  text-decoration: none;
}

.knowledge-methods-latest-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.knowledge-methods-latest-card {
  border-top: 1px solid color-mix(in srgb, var(--secondary) 32%, var(--lightgray));
  color: var(--dark);
  display: flex;
  flex-direction: column;
  min-height: 12rem;
  padding: 0.9rem 0.2rem 0.2rem;
  text-decoration: none;
}

.knowledge-methods-latest-card > header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.knowledge-methods-latest-card > header span,
.knowledge-methods-latest-card > header time,
.knowledge-methods-latest-card > small {
  color: var(--darkgray);
  font-size: 0.66rem;
}

.knowledge-methods-latest-card > header span {
  color: var(--secondary);
  font-weight: 800;
}

.knowledge-methods-latest-card h3 {
  font-size: 1rem;
  line-height: 1.3;
  margin: 1rem 0 0;
}

.knowledge-methods-latest-card p {
  margin: 0.55rem 0 0.8rem;
}

.knowledge-methods-latest-card > small {
  margin-top: auto;
}

.knowledge-methods-latest-card:hover {
  border-color: var(--secondary);
  color: var(--secondary);
  text-decoration: none;
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

@media all and (max-width: 1100px) {
  .knowledge-methods-tool-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .knowledge-methods-random-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

  .knowledge-methods-hero,
  .knowledge-methods-book-grid,
  .knowledge-methods-stages {
    grid-template-columns: 1fr;
  }

  .knowledge-methods-hero-meta {
    border-left: 0;
    border-top: 1px solid color-mix(in srgb, var(--secondary) 28%, var(--lightgray));
    grid-template-columns: auto 1fr;
    padding: 1rem 0 0;
  }

  .knowledge-methods-hero-meta strong {
    grid-row: 1 / 3;
    margin-right: 1rem;
  }

  .knowledge-methods-hero-meta small {
    border-top: 0;
    margin: 0.2rem 0 0;
    padding: 0;
  }

  .knowledge-methods-book {
    min-height: 15rem;
  }

  .knowledge-methods-stages > li,
  .knowledge-methods-stages > li:nth-child(even) {
    border-left: 0;
    min-height: 0;
    padding: 1.15rem 0;
  }

  .knowledge-methods-stage-number i {
    background: rgba(181, 216, 232, 0.25);
  }

  .knowledge-methods-ethics {
    align-items: start;
    grid-template-columns: 1fr;
  }

  .knowledge-methods-ethics > div {
    justify-content: flex-start;
  }

  .knowledge-methods-latest-grid {
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

  .knowledge-methods-nav > span {
    display: none;
  }

  .knowledge-methods-section-head,
  .knowledge-methods-roadmap-head {
    align-items: start;
    flex-direction: column;
  }

  .knowledge-methods-section-head > p,
  .knowledge-methods-roadmap-head > p {
    text-align: left;
  }

  .knowledge-methods-tool-grid,
  .knowledge-methods-random-grid,
  .knowledge-methods-latest-grid {
    grid-template-columns: 1fr;
  }

  .knowledge-methods-tool,
  .knowledge-methods-random-card,
  .knowledge-methods-latest-card {
    min-height: 0;
  }
}
`

  return Component
}

export { KnowledgeHome }

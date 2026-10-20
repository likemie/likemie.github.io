import { h } from "preact"

const concepts = [
  ["Evidence-Based Education", "循证教育", "了解研究证据在教育政策与实践中的位置。"],
  ["Evidence-Informed Practice", "证据知情实践", "结合研究证据与具体情境中的专业判断。"],
  [
    "Research-Informed Teaching Practice",
    "研究知情的教学实践",
    "关注学术研究如何参与教师的教学决策。",
  ],
  ["Research Utilization", "研究利用", "辨认研究进入政策与实践的不同方式。"],
  ["Evidence Standards", "证据标准", "了解研究被纳入审查和评价的依据。"],
]

const methods = [
  {
    key: "produce",
    title: "产生证据",
    note: "从研究设计进入，了解干预效果怎样被研究。",
    items: [
      ["Randomised Controlled Trials", "随机对照试验", "将参与者随机分配到干预组与对照组。"],
      ["Quasi-Experimental Designs", "准实验设计", "在无法完全随机分配的条件下设计比较。"],
      ["Regression Discontinuity Design", "断点回归设计", "利用干预分配的阈值开展因果分析。"],
      ["Random Assignment", "随机分配", "理解实验组与对照组的分配程序。"],
    ],
  },
  {
    key: "synthesize",
    title: "综合证据",
    note: "把多项研究放在一起，检查综合结论怎样形成。",
    items: [
      ["Systematic Review", "系统综述", "依据明确的检索与纳入规则整理研究。"],
      ["Meta-analysis", "元分析", "提取并合并多项研究的效应量。"],
      ["Meta-meta-analysis", "元元分析", "在元分析的基础上开展进一步综合。"],
    ],
  },
  {
    key: "appraise",
    title: "评价证据",
    note: "结合统计指标与质量评价工具阅读研究。",
    items: [
      ["Effect Size", "效应量", "描述干预效果或变量关联的大小。"],
      ["EEF Padlock Security Rating", "EEF 证据可信度评级", "了解 EEF 对评估结果可信度的评价。"],
      [
        "Study Design and Implementation Assessment Device",
        "研究设计与实施评价工具",
        "查看研究设计与实施质量的审查工具。",
      ],
    ],
  },
]

const fixedCases = [
  [
    "Education Endowment Foundation",
    "EEF",
    "英国",
    "机构",
    "从研究资助到教学工具包",
    "连接教育评估、研究综合与学校中的证据使用。",
    ["EEF Teaching and Learning Toolkit", "Research Schools Network"],
  ],
  [
    "What Works Clearinghouse",
    "WWC",
    "美国",
    "清算中心",
    "从研究审查到实践指南",
    "查看教育干预的证据审查与项目评价。",
    ["Institute of Education Sciences"],
  ],
  [
    "Visible Learning",
    "Visible Learning",
    "新西兰",
    "研究与教学框架",
    "从元分析到教学框架",
    "了解可见的学习及其研究综合资料。",
    ["Visible Learning Meta-X"],
  ],
  [
    "Evidence for ESSA",
    "Evidence for ESSA",
    "美国",
    "检索平台",
    "从证据标准到项目检索",
    "了解对齐 ESSA 证据标准的教学项目平台。",
    ["Every Student Succeeds Act", "Best Evidence Encyclopedia"],
  ],
]

const countryCases = [
  ["Clearing House Unterricht", "德国", "教学研究清算中心"],
  ["Danish Clearinghouse for Educational Research", "丹麦", "教育研究清算中心"],
  ["Best Evidence Synthesis", "新西兰", "最佳证据综合项目"],
  ["Kennisrotonde", "荷兰", "面向实践问题的研究问答"],
  ["Australian Education Research Organisation", "澳大利亚", "教育研究机构"],
  ["Evidence for Learning", "澳大利亚", "教育证据中介"],
  ["EPPI-Centre", "英国", "研究综合与证据使用"],
  ["Centre for the Use of Research and Evidence in Education", "英国", "研究与教育证据使用"],
]

const international = [
  [
    "Campbell Collaboration",
    "Campbell Collaboration",
    "系统综述协作",
    "探索教育与社会领域的研究综合。",
  ],
  [
    "Evidence for Education Network",
    "Evidence for Education Network",
    "跨国证据网络",
    "了解教育证据机构之间的协作。",
  ],
  ["OECD", "OECD", "国际组织", "从教育研究与政策关系进入经合组织的工作。"],
]

const caseBrands = {
  "Education Endowment Foundation": [
    "eef-logo.svg",
    "https://educationendowmentfoundation.org.uk/",
    "EEF 官网",
  ],
  "What Works Clearinghouse": ["wwc-logo.png", "https://ies.ed.gov/ncee/wwc/", "WWC 官网"],
  "Visible Learning": [
    "visible-learning-logo.svg",
    "https://www.visiblelearningmetax.com/",
    "Visible Learning MetaX 官网",
  ],
  "Evidence for ESSA": [
    "essa-logo.svg",
    "https://www.evidenceforessa.org/",
    "Evidence for ESSA 官网",
  ],
}

const stages = [
  ["证据标准", "确定哪些研究可以纳入审查。", "Evidence Standards"],
  ["检索与筛选", "按范围与纳入规则寻找研究。", "Systematic Review"],
  ["质量审查", "检查研究设计及实施质量。", "Study Design and Implementation Assessment Device"],
  ["研究综合", "综合符合要求的研究结果。", "Meta-analysis"],
  ["发布与使用", "通过评级或指南向使用者呈现证据。", "Research Utilization"],
]

const titleFor = (page) => page.frontmatter?.title ?? page.slug.split("/").pop()
const hrefFor = (page) => `/${page.slug}`
const heading = (id, title, note, action) =>
  h(
    "header",
    { class: "evidence-section-head" },
    h("div", null, h("h2", { id }, title), note && h("p", null, note)),
    action,
  )

export function evidenceTopicData(pages) {
  const byTitle = new Map(pages.map((page) => [titleFor(page), page]))
  const find = (title) => byTitle.get(title)
  const curated = new Set([
    ...concepts.map(([title]) => title),
    ...methods.flatMap((group) => group.items.map(([title]) => title)),
    ...fixedCases.flatMap(([title, , , , , , related]) => [title, ...related]),
    ...countryCases.map(([title]) => title),
    ...international.map(([title]) => title),
    "Educational Evidence Clearinghouses",
    "Educational Brokerage Agency",
    "Research Utilization Models",
  ])
  const roots = [
    "Evidence-Based Education",
    "Educational Evidence Clearinghouses",
    "Educational Brokerage Agency",
    "Research Utilization",
    ...fixedCases.map(([title]) => title),
  ]
    .map(find)
    .filter(Boolean)
  const argumentSlugs = new Set(
    roots.flatMap((page) => {
      const links = Array.isArray(page.links) ? page.links : Object.keys(page.links ?? {})
      return links.filter((slug) => slug.startsWith("wiki/arguments/"))
    }),
  )
  const scope = pages.filter((page) => curated.has(titleFor(page)) || argumentSlugs.has(page.slug))
  const dateFor = (page) => page.dates?.modified ?? page.dates?.created
  const latest = [...scope]
    .sort((first, second) => (dateFor(second)?.getTime() ?? 0) - (dateFor(first)?.getTime() ?? 0))
    .slice(0, 6)
  return { find, scope, latest, dateFor }
}

export function renderEvidenceTopicPage({ pages, displayClass }) {
  const { find, scope, latest, dateFor } = evidenceTopicData(pages)
  const link = (title, label, className = "") => {
    const page = find(title)
    return page && h("a", { href: hrefFor(page), class: `internal ${className}` }, label ?? title)
  }
  const entry = ([title, label, note]) => {
    const page = find(title)
    return (
      page &&
      h(
        "a",
        { href: hrefFor(page), class: "internal evidence-entry" },
        h("h3", null, label),
        h("span", null, title),
        note && h("p", null, note),
      )
    )
  }
  const caseLogo = (title) => {
    const [image, source, label] = caseBrands[title]
    return h(
      "a",
      { class: "evidence-case-logo", href: source, "aria-label": `访问${label}` },
      h("img", { src: `/static/evidence/${image}`, alt: `${title} logo`, loading: "lazy" }),
    )
  }
  const randomGroup = (label, candidates) =>
    candidates.length > 0 &&
    h(
      "article",
      { class: "evidence-random-group", "data-evidence-pool": true },
      h("h3", null, label),
      candidates.map((page, index) =>
        h(
          "a",
          {
            class: "internal evidence-random-item",
            href: hrefFor(page),
            "data-evidence-item": true,
            hidden: index > 0,
          },
          h("strong", null, page.frontmatter?.argument_display_title ?? titleFor(page)),
          h("span", null, page.frontmatter?.year ? `${page.frontmatter.year}` : "打开条目"),
        ),
      ),
    )
  return h(
    "div",
    {
      class: [displayClass, "knowledge-explore knowledge-topic-page evidence-page"]
        .filter(Boolean)
        .join(" "),
    },
    h(
      "header",
      { class: "evidence-hero" },
      h(
        "nav",
        { "aria-label": "返回知识库" },
        h("a", { href: "/", class: "evidence-home" }, "返回首页"),
      ),
      h("h1", null, "循证教育"),
      h(
        "p",
        { class: "evidence-intro" },
        "探索教育研究如何形成证据，如何通过清算中心进入政策与教学。",
      ),
      h("a", { href: "#evidence-transfer", class: "evidence-action" }, "探索教育证据清算中心 ↗"),
      h(
        "nav",
        { class: "evidence-folders", "aria-label": "循证教育栏目" },
        [
          ["concepts", "重要概念"],
          ["methods", "产生与评价"],
          ["transfer", "传播与使用"],
          ["cases", "各国案例"],
          ["international", "国际机构"],
          ["discover", "随机发现"],
          ["latest", "最新条目"],
        ].map(([id, label]) => h("a", { href: `#evidence-${id}` }, label)),
      ),
    ),
    h(
      "section",
      { class: "evidence-section evidence-concepts" },
      heading("evidence-concepts", "重要概念", "从概念出发，建立阅读坐标。"),
      h("div", { class: "evidence-concept-index" }, concepts.map(entry)),
    ),
    h(
      "section",
      { class: "evidence-section evidence-methods" },
      heading("evidence-methods", "证据的产生与评价", "选择研究环节，查看相应的方法与工具。"),
      h(
        "div",
        {
          class: "evidence-method-tabs",
          "aria-label": "按研究环节浏览",
          "data-evidence-tabs": "methods",
        },
        methods.map((group) =>
          h(
            "button",
            {
              type: "button",
              "data-evidence-tab": group.key,
              "aria-pressed": "true",
              "aria-controls": `evidence-panel-${group.key}`,
            },
            group.title,
          ),
        ),
      ),
      h(
        "div",
        { class: "evidence-method-panels" },
        methods.map((group) =>
          h(
            "section",
            { id: `evidence-panel-${group.key}`, "data-evidence-panel": group.key },
            h("h3", null, group.title),
            h("p", null, group.note),
            h("div", { class: "evidence-method-index" }, group.items.map(entry)),
          ),
        ),
      ),
    ),
    h(
      "section",
      { class: "evidence-section evidence-transfer" },
      heading("evidence-transfer", "证据的传播与使用"),
      h(
        "div",
        { class: "evidence-clearinghouse" },
        h(
          "div",
          { class: "evidence-clearinghouse-title" },
          h("h3", null, link("Educational Evidence Clearinghouses", "教育证据清算中心")),
          h("p", { lang: "en" }, "Educational Evidence Clearinghouses"),
          h("p", null, "从研究审查到项目评级，了解连接研究与教育决策的证据中介。"),
          link("Educational Evidence Clearinghouses", "阅读主条目 ↗", "evidence-action"),
        ),
        h(
          "div",
          { class: "evidence-process" },
          h("p", null, "浏览清算中心的工作环节"),
          h(
            "div",
            {
              class: "evidence-process-buttons",
              "data-evidence-tabs": "process",
              "aria-label": "清算中心工作环节",
            },
            stages.map(([title], index) =>
              h(
                "button",
                {
                  type: "button",
                  "data-evidence-tab": `stage-${index}`,
                  "aria-pressed": "true",
                  "aria-controls": `evidence-panel-stage-${index}`,
                },
                title,
              ),
            ),
          ),
          stages.map(([title, note, target], index) =>
            h(
              "section",
              { id: `evidence-panel-stage-${index}`, "data-evidence-panel": `stage-${index}` },
              h("h4", null, title),
              h("p", null, note),
              link(target, "查看相关条目"),
            ),
          ),
        ),
      ),
      h(
        "nav",
        { class: "evidence-transfer-links", "aria-label": "传播与使用相关条目" },
        link("Educational Brokerage Agency", "教育中介机构"),
        link("Research Utilization", "研究利用"),
        link("Research Utilization Models", "研究利用模型"),
      ),
    ),
    h(
      "section",
      { class: "evidence-section evidence-cases" },
      heading("evidence-cases", "各国机构与案例", "四个固定入口，连接各国的证据工作。"),
      h(
        "div",
        { class: "evidence-case-index" },
        fixedCases.map(
          ([title, label, country, kind, tagline, note, related]) =>
            find(title) &&
            h(
              "article",
              { class: "evidence-case" },
              h(
                "div",
                { class: "evidence-case-name" },
                caseLogo(title),
                h("p", null, `${country} · ${kind}`),
                h("h3", null, link(title, label)),
              ),
              h(
                "div",
                { class: "evidence-case-copy" },
                h("h4", null, tagline),
                h("p", null, note),
                h(
                  "nav",
                  { "aria-label": `${label}相关条目` },
                  related.map((target) => link(target)),
                ),
              ),
            ),
        ),
      ),
      h(
        "div",
        { class: "evidence-country-discovery", "data-evidence-country-pool": true },
        h(
          "div",
          { class: "evidence-discovery-head" },
          h("h3", null, "发现一个国家案例"),
          h("button", { type: "button", "data-evidence-refresh": "country" }, "换一个案例"),
        ),
        h(
          "div",
          { class: "evidence-country-items", "aria-live": "polite", "aria-atomic": "true" },
          countryCases
            .filter(([title]) => find(title))
            .map(([title, country, note], index) =>
              h(
                "a",
                {
                  href: hrefFor(find(title)),
                  class: "internal evidence-country-item",
                  "data-evidence-item": true,
                  hidden: index > 0,
                },
                h("span", null, country),
                h("strong", null, note),
                h("p", null, title),
              ),
            ),
        ),
      ),
    ),
    h(
      "section",
      { class: "evidence-section evidence-international" },
      heading("evidence-international", "国际机构", "从研究综合与跨国协作进入。"),
      h(
        "div",
        { class: "evidence-international-index" },
        international.map(
          ([title, label, role, note]) =>
            find(title) &&
            h(
              "article",
              null,
              h("p", null, role),
              h("h3", null, link(title, label)),
              h("p", null, note),
            ),
        ),
      ),
    ),
    h(
      "section",
      { class: "evidence-section evidence-discover" },
      heading(
        "evidence-discover",
        "随机发现",
        "换一组入口，发现相关概念与文献。",
        h("button", { type: "button", "data-evidence-refresh": "discover" }, "换一组"),
      ),
      h(
        "div",
        { class: "evidence-random-index", "aria-live": "polite", "aria-atomic": "true" },
        randomGroup(
          "概念",
          scope.filter((page) => page.slug.startsWith("wiki/concepts/")),
        ),
        randomGroup(
          "方法与工具",
          scope.filter((page) => /^wiki\/(methods|instruments)\//.test(page.slug)),
        ),
        randomGroup(
          "研究文献",
          scope.filter((page) => page.slug.startsWith("wiki/arguments/")),
        ),
      ),
    ),
    h(
      "section",
      { class: "evidence-section evidence-latest" },
      heading("evidence-latest", "最新条目", "本专题相关条目的最近更新。"),
      h(
        "div",
        { class: "evidence-latest-index" },
        latest.map((page) =>
          h(
            "a",
            { href: hrefFor(page), class: "internal" },
            h("strong", null, page.frontmatter?.argument_display_title ?? titleFor(page)),
            dateFor(page) &&
              h(
                "time",
                { dateTime: dateFor(page).toISOString() },
                dateFor(page).toLocaleDateString("zh-CN", { timeZone: "Asia/Shanghai" }),
              ),
          ),
        ),
      ),
    ),
  )
}

export const evidenceScript = `
function bindEvidencePage() {
  const root = document.querySelector('.evidence-page')
  if (!root || root.dataset.bound) return
  root.dataset.bound = 'true'
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const select = (container, key) => {
    const buttons = [...container.querySelectorAll('[data-evidence-tab]')]
    buttons.forEach((button) => {
      const active = button.dataset.evidenceTab === key
      button.setAttribute('aria-pressed', String(active))
      const panel = root.querySelector('#' + button.getAttribute('aria-controls'))
      if (panel) panel.hidden = !active
    })
  }
  root.querySelectorAll('[data-evidence-tabs]').forEach((container) => {
    const buttons = [...container.querySelectorAll('[data-evidence-tab]')]
    if (!buttons.length) return
    select(container, buttons[0].dataset.evidenceTab)
    container.addEventListener('click', (event) => {
      const button = event.target.closest('[data-evidence-tab]')
      if (button) select(container, button.dataset.evidenceTab)
    })
    container.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
      const index = buttons.indexOf(document.activeElement)
      if (index < 0) return
      event.preventDefault()
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length
      buttons[next].focus()
      select(container, buttons[next].dataset.evidenceTab)
    })
  })
  const rotate = (container) => {
    const items = [...container.querySelectorAll('[data-evidence-item]')]
    if (items.length < 2) return
    const current = items.findIndex((item) => !item.hidden)
    const next = (Math.max(0, current) + 1 + Math.floor(Math.random() * (items.length - 1))) % items.length
    items.forEach((item, index) => { item.hidden = index !== next })
  }
  root.querySelectorAll('[data-evidence-pool], [data-evidence-country-pool]').forEach(rotate)
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-evidence-refresh]')
    if (!button) return
    const selector = button.dataset.evidenceRefresh === 'country' ? '[data-evidence-country-pool]' : '[data-evidence-pool]'
    root.querySelectorAll(selector).forEach(rotate)
  })
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('evidence-reveal')
      observer.unobserve(entry.target)
    }), { threshold: 0.08 })
    root.querySelectorAll('.evidence-section-head, .evidence-entry, .evidence-case, .evidence-international-index article, .evidence-latest-index a').forEach((element) => observer.observe(element))
    window.addCleanup?.(() => observer.disconnect())
  }
}
document.addEventListener('nav', bindEvidencePage)
bindEvidencePage()
`

export const evidenceCss = `
body[data-slug="explore/evidence"] .breadcrumb-container, body[data-slug="explore/evidence"] .article-title { display: none; }
body[data-slug="explore/evidence"] #quartz-body .center > hr { display: none; }
.evidence-page { --ev-ink: var(--dark); --ev-ground: color-mix(in srgb, var(--light) 96%, var(--secondary)); --ev-paper: var(--light); --ev-soft: color-mix(in srgb, var(--light) 90%, var(--secondary)); --ev-accent: var(--secondary); --ev-on-accent: var(--light); --ev-border: color-mix(in srgb, var(--secondary) 25%, var(--lightgray)); color: var(--ev-ink); display: grid; gap: 24px; max-width: 80rem; font-family: var(--bodyFont); padding: 0; }
.evidence-page *, .evidence-page *::before, .evidence-page *::after { box-sizing: border-box; min-width: 0; }
.evidence-page h1, .evidence-page h2, .evidence-page h3, .evidence-page h4, .evidence-page p { margin: 0; color: inherit; }
.evidence-page h1, .evidence-page h2, .evidence-page h3, .evidence-page h4 { font-family: var(--headerFont); text-wrap: balance; }
.evidence-page h2 { font-size: clamp(24px, 2.5vw, 30px); line-height: 1.3; }
.evidence-page h3, .evidence-page h4 { font-size: 19px; line-height: 1.4; }
.evidence-page p, .evidence-page a, .evidence-page button { font-size: 16px; line-height: 1.6; }
.evidence-page p, .evidence-page a { font-weight: 400; }
.evidence-page a { color: inherit; background: none; text-decoration: none; }
.evidence-page h3 a, .evidence-page h4 a { font: inherit; }
.evidence-page a.internal { background: none; }
.evidence-page a.evidence-action { background: var(--ev-accent); }
.evidence-page a:hover { color: var(--ev-accent); }
.evidence-page a:focus-visible, .evidence-page button:focus-visible { outline: 3px solid var(--ev-accent); outline-offset: 5px; }
.evidence-page button, .evidence-page .evidence-action { border: 1px solid var(--ev-border); border-radius: 7px; background: var(--ev-accent); color: var(--ev-on-accent); padding: 8px 14px; cursor: pointer; font-family: inherit; font-weight: 600; min-height: 44px; display: inline-block; transition: transform 180ms ease, opacity 180ms ease; }
.evidence-page button:hover, .evidence-page .evidence-action:hover { transform: translateY(-3px); color: var(--ev-on-accent); }
.evidence-page button:active, .evidence-page .evidence-action:active { transform: translateY(1px); }
.evidence-hero { background: var(--ev-soft); border: 1px solid var(--ev-border); border-radius: 14px; padding: 24px; }
.evidence-home { display: inline-block; margin-bottom: 20px; }
.evidence-page h1 { font-size: clamp(42px, 5vw, 68px); line-height: 1.05; letter-spacing: -0.04em; }
.evidence-page .evidence-intro { font-size: 17px; max-width: 38em; margin: 16px 0; }
.evidence-folders { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0 0; }
.evidence-folders a { padding: 8px 12px; background: var(--ev-paper); border: 1px solid var(--ev-border); border-radius: 6px; font-size: 14px; font-weight: 600; flex-grow: 1; text-align: center; transition: transform 180ms ease; }
.evidence-folders a:hover { transform: translateY(-4px); }
.evidence-section { margin: 0; scroll-margin-top: 24px; }
.evidence-section-head { display: flex; align-items: end; justify-content: space-between; gap: 16px; margin-bottom: 14px; }
.evidence-section-head p { margin-top: 6px; color: var(--darkgray); }
.evidence-section-head h2 { scroll-margin-top: 24px; }
.evidence-concept-index { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
.evidence-page a.evidence-entry { display: block; padding: 14px; background: var(--ev-ground); border: 1px solid var(--ev-border); border-radius: 10px; transition: transform 200ms ease; overflow-wrap: anywhere; }
.evidence-entry:hover { transform: translateX(5px); }
.evidence-entry h3 { display: block; font-size: 19px; }
.evidence-entry span { display: block; font-size: 14px; margin: 6px 0; color: var(--darkgray); }
.evidence-concept-index a.evidence-entry:first-child { grid-row: span 2; background: var(--ev-soft); padding: 18px; display: flex; flex-direction: column; justify-content: center; }
.evidence-concept-index .evidence-entry:first-child h3 { font-size: 28px; }
.evidence-method-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
.evidence-method-tabs button[aria-pressed="false"] { background: var(--ev-soft); color: var(--ev-ink); }
.evidence-method-panels { background: var(--ev-ground); border: 1px solid var(--ev-border); border-radius: 12px; padding: 16px; margin-top: 10px; }
.evidence-method-panels section > p { margin: 8px 0 12px; }
.evidence-method-index { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.evidence-method-index .evidence-entry { background: var(--ev-paper); }
.evidence-clearinghouse { display: grid; grid-template-columns: 1fr 1.2fr; background: var(--ev-soft); border: 1px solid var(--ev-border); border-radius: 14px; overflow: hidden; }
.evidence-clearinghouse-title, .evidence-process { padding: 20px; }
.evidence-clearinghouse-title h3 { font-size: 27px; }
.evidence-clearinghouse-title > p { margin: 12px 0; overflow-wrap: anywhere; }
.evidence-process { background: var(--ev-ground); }
.evidence-process-buttons { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0; }
.evidence-process-buttons button { padding: 6px 10px; font-size: 14px; }
.evidence-process-buttons button[aria-pressed="false"] { background: var(--ev-soft); color: var(--ev-ink); }
.evidence-process section { padding: 14px; background: var(--ev-paper); border-radius: 8px; }
.evidence-process section p { margin: 8px 0; }
.evidence-process section a, .evidence-case-copy nav a, .evidence-transfer-links a { text-decoration: underline; text-underline-offset: 5px; }
.evidence-transfer-links { display: flex; flex-wrap: wrap; gap: 10px 20px; margin-top: 14px; }
.evidence-case-index { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.evidence-case { display: flex; flex-direction: column; background: var(--ev-ground); border: 1px solid var(--ev-border); border-radius: 12px; overflow: hidden; }
.evidence-case-name, .evidence-case-copy { padding: 16px; }
.evidence-case-name { background: var(--ev-soft); }
.evidence-case-copy { padding-top: 14px; }
.evidence-case-name h3 { margin-top: 8px; font-size: 24px; }
.evidence-page a.evidence-case-logo { display: flex; align-items: center; justify-content: flex-start; height: 70px; padding: 12px 18px; margin-bottom: 12px; background: #fff; border-radius: 8px; }
.evidence-case-logo img { display: block; width: auto; max-width: 100%; height: auto; max-height: 60px; margin: 0; border-radius: 0; object-fit: contain; }
.evidence-case-copy > h4 { font-size: 18px; }
.evidence-case-copy > p { margin: 8px 0 12px; }
.evidence-case-copy nav { display: flex; flex-wrap: wrap; gap: 8px 14px; }
.evidence-country-discovery { margin-top: 12px; padding: 16px; background: var(--ev-soft); border: 1px solid var(--ev-border); border-radius: 12px; color: var(--ev-ink); }
.evidence-discovery-head { display: flex; justify-content: space-between; align-items: center; gap: 24px; }
.evidence-country-discovery button { background: var(--ev-paper); color: var(--ev-ink); }
.evidence-country-discovery button:hover { color: var(--ev-ink); }
.evidence-country-item { display: block; margin-top: 12px; }
.evidence-country-item strong { display: block; font-size: 22px; margin: 6px 0; overflow-wrap: anywhere; }
.evidence-country-discovery a:hover { color: inherit; }
.evidence-international-index { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.evidence-international-index article { background: var(--ev-ground); border: 1px solid var(--ev-border); border-radius: 10px; padding: 16px; }
.evidence-international-index h3 { margin: 8px 0; overflow-wrap: anywhere; }
.evidence-random-index { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
.evidence-random-group { background: var(--ev-ground); border: 1px solid var(--ev-border); border-radius: 10px; padding: 16px; }
.evidence-random-group h3 { margin-bottom: 12px; }
.evidence-random-item { display: block; }
.evidence-random-item strong { font-size: 16px; overflow-wrap: anywhere; display: block; }
.evidence-random-item span { display: block; margin-top: 8px; }
.evidence-latest-index { display: grid; gap: 8px; }
.evidence-latest-index > a { display: grid; grid-template-columns: minmax(0, 1fr) max-content; align-items: baseline; gap: 16px; padding: 12px; border: 1px solid var(--ev-border); border-radius: 8px; background: var(--ev-ground); }
.evidence-latest-index strong { overflow-wrap: anywhere; }
.evidence-latest-index time { white-space: nowrap; font-variant-numeric: tabular-nums; }
.evidence-page [hidden] { display: none !important; }
@media (max-width: 800px) {
  .evidence-clearinghouse, .evidence-random-index, .evidence-international-index { grid-template-columns: 1fr; }
  .evidence-random-group { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; }
  .evidence-random-group h3 { margin: 0; }
}
@media (max-width: 520px) {
  .evidence-page { gap: 20px; }
  .evidence-hero { padding: 20px; }
  .evidence-home { margin-bottom: 16px; }
  .evidence-page .evidence-intro { font-size: 16px; margin-top: 14px; }
  .evidence-folders { margin-top: 16px; }
  .evidence-folders a { flex-basis: 40%; padding: 8px; }
  .evidence-section-head, .evidence-discovery-head { align-items: start; flex-direction: column; gap: 12px; }
  .evidence-concept-index, .evidence-method-index, .evidence-case-index { grid-template-columns: 1fr; }
  .evidence-concept-index a.evidence-entry:first-child { grid-row: auto; padding: 16px; }
  .evidence-concept-index .evidence-entry:first-child h3, .evidence-clearinghouse-title h3 { font-size: 26px; }
  .evidence-method-panels, .evidence-clearinghouse-title, .evidence-process, .evidence-case-name, .evidence-case-copy, .evidence-country-discovery { padding: 16px; }
  .evidence-method-tabs button { flex-grow: 1; padding: 12px; }
  .evidence-case-name h3, .evidence-country-item strong { font-size: 22px; }
  .evidence-random-group { display: block; }
  .evidence-random-group h3 { margin-bottom: 12px; }
.evidence-latest-index > a { grid-template-columns: minmax(0, 1fr); gap: 8px; }
}
@keyframes evidence-enter { from { opacity: .4; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
.evidence-reveal { animation: evidence-enter 500ms ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .evidence-page *, .evidence-page *::before, .evidence-page *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .evidence-page a:hover, .evidence-page button:hover { transform: none; }
}
`

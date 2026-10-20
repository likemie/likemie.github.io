import { h } from "preact"

// ---------------------------------------------------------------------------
// Curated entries. Every title must match a wiki entry title exactly; entries
// that are missing at build time are skipped, never rendered as dead links.
// ---------------------------------------------------------------------------

const concepts = [
  [
    "Evidence-Based Education",
    "循证教育",
    "研究证据在教育政策与实践中应占何种位置，以及因果证据、专业判断与地方语境如何平衡。",
  ],
  [
    "Evidence-Based Policy-Making",
    "循证决策",
    "源自循证医学的决策范式，以实验评估与系统评价作为配置公共资源的依据。",
  ],
  [
    "Evidence-Informed Practice",
    "证据知情实践",
    "把研究证据视为多元决策资源之一，以专业判断整合研究、系统数据与课堂数据。",
  ],
  [
    "Research Utilization",
    "研究利用",
    "研究进入政策与实践的路径与机制，从单向推送演进到协同生产与证据生态。",
  ],
  ["Evidence Standards", "证据标准", "中介机构筛选和评定研究可信度的方法准则与功效判定体系。"],
  [
    "Evidence Ecosystem",
    "证据生态系统",
    "研究者、决策者、实践者与中介机构在多向反馈中共同推动证据演化。",
  ],
]

const methods = [
  {
    key: "produce",
    code: "01",
    title: "产生证据",
    note: "因果识别的设计，以及解释干预为何有效的过程评估。",
    items: [
      ["Randomised Controlled Trials", "随机对照试验", "Critique of Randomized Controlled Trials"],
      ["Quasi-Experimental Designs", "准实验设计"],
      ["Regression Discontinuity Design", "断点回归设计"],
      ["Cluster Randomized Trials", "集群随机试验"],
      ["Implementation and Process Evaluation", "实施与过程评估", "Black Box RCTs"],
    ],
  },
  {
    key: "synthesize",
    code: "02",
    title: "综合证据",
    note: "把多项研究放进同一个透明规程，检查综合结论如何形成。",
    items: [
      ["Systematic Review", "系统综述"],
      ["Meta-analysis", "元分析", "Critique of Meta-analysis"],
      ["Meta-meta-analysis", "元-元分析", "Critique of Meta-meta-analysis"],
      ["Research Synthesis", "研究综合"],
      ["PRISMA", "PRISMA 报告规范"],
    ],
  },
  {
    key: "appraise",
    code: "03",
    title: "评价证据",
    note: "效应大小、效度框架与评级工具，各自回答“可信到什么程度”。",
    items: [
      ["Effect Size", "效应量", "Critique of Effect Size"],
      ["Campbellian Validity Framework", "坎贝尔效度框架"],
      ["EEF Padlock Security Rating", "EEF 挂锁评级"],
      ["Weight of Evidence Framework", "证据权重框架"],
      ["AMSTAR", "AMSTAR 系统评价质量工具"],
    ],
  },
]

const critiqueLabels = {
  "Critique of Randomized Controlled Trials": "随机对照试验批判",
  "Black Box RCTs": "黑箱随机对照试验",
  "Critique of Meta-analysis": "元分析批判",
  "Critique of Meta-meta-analysis": "元-元分析批判",
  "Critique of Effect Size": "效应量批判",
}

const stages = [
  ["证据标准", "设定哪些研究设计与报告可以进入审查。", "Evidence Standards", "证据标准"],
  ["检索与筛选", "按明确的范围与纳入规则寻找研究。", "Systematic Review", "系统综述"],
  [
    "质量审查",
    "逐项检查研究设计与实施质量。",
    "Study Design and Implementation Assessment Device",
    "研究设计与实施评估工具",
  ],
  ["综合与评级", "合并符合要求的研究结果，并给出证据强度。", "Research Synthesis", "研究综合"],
  [
    "发布与动员",
    "通过工具包、指南与中介网络进入学校和政策。",
    "Knowledge Mobilisation",
    "知识动员",
  ],
]

const mechanisms = [
  ["Educational Brokerage Agency", "教育中介机构"],
  ["Research-Practice Partnership", "研究-实践伙伴关系"],
  ["Quality Use of Research Evidence Framework", "研究证据质量使用框架"],
  ["Implementation Fidelity", "实施忠实度"],
  ["Research Utilization Models", "研究利用模型"],
]

const debates = [
  [
    "运动",
    ["What Works Movement", "什么有效运动"],
    ["Critique of Evidence-Based Education", "循证教育批判"],
    "以因果证据识别有效干预，还是把教育目的与民主判断让位于技术问题？",
  ],
  [
    "决策",
    ["Evidence-Based Policy-Making", "循证决策"],
    ["Policy-Based Evidence-Making", "基于政策的证据制造"],
    "证据先于政策，还是政策意图先行，再选择性地组织证据？",
  ],
  [
    "形态",
    ["Engineered Evidence", "工程化证据"],
    ["Practice-Based Evidence", "基于实践的证据"],
    "把证据封装进教案与拨款门槛，还是承认课堂中生成的情境知识？",
  ],
  [
    "情境",
    ["Evidence Standards", "证据标准"],
    ["Local Knowledge in Evidence-Based Policy", "证据本位政策中的地方知识"],
    "统一的证据门槛能否替代对本地约束与关系的理解？",
  ],
  [
    "参与",
    ["Educational Brokerage Agency", "教育中介机构"],
    ["Democratising Evidence", "证据民主化"],
    "由专业中介传递证据，还是让实践者共同设定研究议程？",
  ],
  [
    "治理",
    ["Evidence Era", "证据时代"],
    ["Evidence Backlash", "证据反弹"],
    "更多证据带来更理性的政策，还是引发怀疑与认知防卫？",
  ],
]

const voices = [
  ["Robert Slavin", "倡导", "证据本位改革"],
  ["John Hattie", "综合", "可见的学习"],
  ["Chris Brown", "使用", "证据知情学校"],
  ["Stephen Gorard", "审查", "研究可信度筛子"],
  ["Ray Pawson", "评估", "实在论综合"],
  ["Nancy Cartwright", "质疑", "证据外推"],
  ["Gert Biesta", "批判", "教育目的"],
]

const fixedCases = [
  [
    "Education Endowment Foundation",
    "EEF",
    "英国",
    "资助与工具包",
    "从试验资助到学校里的教学工具包。",
    [
      "EEF Teaching and Learning Toolkit",
      "Research Schools Network",
      "EEF Padlock Security Rating",
    ],
  ],
  [
    "What Works Clearinghouse",
    "WWC",
    "美国",
    "清算中心",
    "从研究审查标准到面向教师的实践指南。",
    [
      "Institute of Education Sciences",
      "Every Student Succeeds Act",
      "Study Design and Implementation Assessment Device",
    ],
  ],
  [
    "Visible Learning",
    "Visible Learning",
    "新西兰",
    "元分析框架",
    "把八百多项元分析排成影响因素序列。",
    ["John Hattie", "Visible Learning Meta-X", "Meta-meta-analysis"],
  ],
  [
    "Evidence for ESSA",
    "Evidence for ESSA",
    "美国",
    "项目检索",
    "按 ESSA 证据层级检索可采用的教学项目。",
    ["Robert Slavin", "Best Evidence Encyclopedia", "Every Student Succeeds Act"],
  ],
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

const regions = [
  ["all", "全部"],
  ["europe", "欧洲"],
  ["uk-us", "英美"],
  ["oceania", "大洋洲"],
  ["asia", "亚洲"],
]

const registry = [
  ["uk", "UK", "英国", "EPPI-Centre", "政策与实践证据信息协调中心"],
  ["uk", "UK", "英国", "What Works Network", "有效性中心网络"],
  [
    "uk",
    "UK",
    "英国",
    "Centre for the Use of Research and Evidence in Education",
    "教育研究与证据使用中心",
  ],
  ["us", "US", "美国", "Best Evidence Encyclopedia", "最佳证据百科全书"],
  [
    "us",
    "US",
    "美国",
    "Foundations for Evidence-Based Policymaking Act of 2018",
    "2018 年循证决策基础法案",
  ],
  ["europe", "DE", "德国", "Clearing House Unterricht", "教学研究清算中心"],
  ["europe", "DK", "丹麦", "Danish Clearinghouse for Educational Research", "教育研究清算中心"],
  ["europe", "NL", "荷兰", "Kennisrotonde", "面向实践问题的研究问答"],
  [
    "europe",
    "NL",
    "荷兰",
    "Top Institute for Evidence-Based Education Research",
    "证据本位教育研究顶尖研究所",
  ],
  [
    "oceania",
    "AU",
    "澳大利亚",
    "Australian Education Research Organisation",
    "澳大利亚教育研究组织",
  ],
  ["oceania", "AU", "澳大利亚", "Evidence for Learning", "证据学习中心"],
  ["oceania", "NZ", "新西兰", "Best Evidence Synthesis", "最佳证据综合项目"],
  ["asia", "CN", "中国", "ECNU Declaration on Evidence-Based Research", "华东师大循证研究宣言"],
]

const international = [
  ["Campbell Collaboration", "系统综述协作", "教育与社会政策领域的系统综述生产与注册。"],
  ["Evidence for Education Network", "跨国证据网络", "连接各国教育证据中介机构的协作网络。"],
  ["OECD", "国际组织", "从教育研究与政策关系进入经合组织的证据工作。"],
  [
    "Building Evidence in Education",
    "多边捐助协调",
    "世界银行、FCDO 与 USAID 协调全球教育评估规程。",
  ],
  [
    "EU Evidence-Informed Education Policy Initiatives",
    "区域政策倡议",
    "欧盟以软法治理与中介网络推动证据知情决策。",
  ],
  [
    "Building a Global Evidence Ecosystem for Teaching",
    "跨国合作项目",
    "EEF 与 BHP Foundation 把工具包模式推广到多国。",
  ],
]

const ladder = [
  ["Meta-analysis", "系统综述与元分析", 4],
  ["Randomised Controlled Trials", "随机对照试验", 3],
  ["Quasi-Experimental Designs", "准实验设计", 2],
  ["Practice-Based Evidence", "实践中的经验", 1],
]

const sections = [
  ["concepts", "重要概念", "Key Concepts"],
  ["methods", "产生与评价", "Production"],
  ["transfer", "传播与使用", "Transfer"],
  ["debates", "争议与反思", "Debates"],
  ["cases", "各国案例", "Cases"],
  ["international", "国际机构", "International"],
  ["discover", "随机发现", "Discover"],
  ["latest", "最新条目", "Latest"],
]

// ---------------------------------------------------------------------------

const titleFor = (page) => page.frontmatter?.title ?? page.slug.split("/").pop()
const hrefFor = (page) => `/${page.slug}`
const displayFor = (page) => page.frontmatter?.argument_display_title ?? titleFor(page)
const linksOf = (page) => (Array.isArray(page.links) ? page.links : Object.keys(page.links ?? {}))
const pad = (index) => String(index + 1).padStart(2, "0")

export function evidenceTopicData(pages) {
  const byTitle = new Map(pages.map((page) => [titleFor(page), page]))
  const find = (title) => byTitle.get(title)
  const inbound = new Map()
  for (const page of pages) {
    for (const slug of new Set(linksOf(page))) inbound.set(slug, (inbound.get(slug) ?? 0) + 1)
  }
  const countFor = (page) => (page ? (inbound.get(page.slug) ?? 0) : 0)
  const curated = new Set([
    ...concepts.map(([title]) => title),
    ...methods.flatMap((group) => group.items.flatMap(([title, , critique]) => [title, critique])),
    ...stages.map(([, , title]) => title),
    ...mechanisms.map(([title]) => title),
    ...debates.flatMap(([, claim, counter]) => [claim[0], counter[0]]),
    ...voices.map(([title]) => title),
    ...fixedCases.flatMap(([title, , , , , related]) => [title, ...related]),
    ...registry.map(([, , , title]) => title),
    ...international.map(([title]) => title),
    "Educational Evidence Clearinghouses",
    "Research Utilization Models",
  ])
  curated.delete(undefined)
  const roots = [
    "Evidence-Based Education",
    "Critique of Evidence-Based Education",
    "Educational Evidence Clearinghouses",
    "Educational Brokerage Agency",
    "Research Utilization",
    ...fixedCases.map(([title]) => title),
  ]
    .map(find)
    .filter(Boolean)
  const argumentSlugs = new Set(
    roots.flatMap((page) => linksOf(page).filter((slug) => slug.startsWith("wiki/arguments/"))),
  )
  const scope = pages.filter((page) => curated.has(titleFor(page)) || argumentSlugs.has(page.slug))
  const dateFor = (page) => page.dates?.modified ?? page.dates?.created
  const latest = [...scope]
    .sort((first, second) => (dateFor(second)?.getTime() ?? 0) - (dateFor(first)?.getTime() ?? 0))
    .slice(0, 6)
  return { find, scope, latest, dateFor, countFor }
}

export function renderEvidenceTopicPage({ pages, displayClass }) {
  const { find, scope, latest, dateFor, countFor } = evidenceTopicData(pages)
  const link = (title, label, className = "") => {
    const page = find(title)
    return (
      page && h("a", { href: hrefFor(page), class: `internal ${className}`.trim() }, label ?? title)
    )
  }
  const count = (title) => countFor(find(title))
  const head = (id, index, eyebrow, title, note, action) =>
    h(
      "header",
      { class: "ev-head" },
      h(
        "div",
        null,
        h("span", { class: "ev-eyebrow" }, h("b", null, `§${pad(index)}`), eyebrow),
        h("h2", { id: `evidence-${id}` }, title),
      ),
      h("div", { class: "ev-head-side" }, note && h("p", null, note), action),
    )
  const randomGroup = (label, candidates) =>
    candidates.length > 0 &&
    h(
      "article",
      { class: "ev-draw", "data-evidence-pool": true },
      h("h3", null, label, h("small", null, `${candidates.length} 条`)),
      candidates.map((page, index) =>
        h(
          "a",
          {
            class: "internal ev-draw-item",
            href: hrefFor(page),
            "data-evidence-item": true,
            hidden: index > 0,
          },
          h("strong", null, displayFor(page)),
          h("span", null, page.frontmatter?.year ? `${page.frontmatter.year}` : "打开条目 ↗"),
        ),
      ),
    )
  const [lead, ...rest] = concepts.filter(([title]) => find(title))

  return h(
    "div",
    {
      class: [displayClass, "knowledge-explore knowledge-topic-page ev-page"]
        .filter(Boolean)
        .join(" "),
    },
    // ----------------------------------------------------------------- hero
    h(
      "header",
      { class: "ev-hero" },
      h(
        "nav",
        { class: "ev-hero-nav", "aria-label": "专题位置" },
        h("a", { href: "/", class: "knowledge-route-back" }, "← 返回首页"),
        h("span", null, "专题 03 · Evidence-Based Education"),
      ),
      h(
        "div",
        { class: "ev-hero-copy" },
        h("p", { class: "ev-kicker" }, "Evidence Ledger"),
        h("h1", null, "循证教育"),
        h(
          "p",
          null,
          "从“什么算证据”进入：研究如何产生和评价证据，清算中心如何把它送进学校与政策，以及这套逻辑为何不断受到质疑。",
        ),
      ),
      h(
        "aside",
        { class: "ev-hero-meta" },
        h("strong", null, String(scope.length)),
        h("span", null, "个专题关联条目"),
        h("small", null, "产生 → 审查 → 使用 → 质疑"),
      ),
      h(
        "figure",
        { class: "ev-ladder" },
        h(
          "figcaption",
          null,
          h("b", null, "证据等级"),
          h("span", null, "常见的排序方式，数字为库内引用次数；§04 讨论它为何受到质疑"),
        ),
        h(
          "ol",
          null,
          ladder.map(([title, label, level]) => {
            const page = find(title)
            return (
              page &&
              h(
                "li",
                { style: `--ev-level:${level}` },
                h(
                  "a",
                  { href: hrefFor(page), class: "internal" },
                  h(
                    "span",
                    { class: "ev-pips", "aria-hidden": "true" },
                    [1, 2, 3, 4].map((pip) => h("i", { class: pip <= level ? "on" : "" })),
                  ),
                  h("strong", null, label),
                  h("em", null, `${countFor(page)}`),
                ),
              )
            )
          }),
        ),
      ),
      h(
        "nav",
        { class: "ev-compass", "aria-label": "循证教育栏目" },
        sections.map(([id, label, english], index) =>
          h(
            "a",
            { href: `#evidence-${id}` },
            h("span", null, pad(index)),
            h("strong", null, label),
            h("small", null, english),
          ),
        ),
      ),
    ),
    // ------------------------------------------------------------- concepts
    h(
      "section",
      { class: "ev-section ev-concepts" },
      head("concepts", 0, "Key Concepts", "重要概念", "先建立阅读坐标；右侧数字为库内被引用次数。"),
      h(
        "div",
        { class: "ev-concept-grid" },
        lead &&
          h(
            "a",
            { href: hrefFor(find(lead[0])), class: "internal ev-concept-lead" },
            h("span", { class: "ev-tag" }, "起点"),
            h("h3", null, lead[1]),
            h("span", { lang: "en" }, lead[0]),
            h("p", null, lead[2]),
            h("em", null, h("b", null, count(lead[0])), " 次引用"),
          ),
        h(
          "ol",
          { class: "ev-ledger" },
          rest.map(([title, label, note]) =>
            h(
              "li",
              null,
              h(
                "a",
                { href: hrefFor(find(title)), class: "internal" },
                h(
                  "span",
                  { class: "ev-ledger-name" },
                  h("strong", null, label),
                  h("span", { lang: "en" }, title),
                ),
                h("p", null, note),
                h("em", null, count(title)),
              ),
            ),
          ),
        ),
      ),
    ),
    // -------------------------------------------------------------- methods
    h(
      "section",
      { class: "ev-section ev-methods" },
      head(
        "methods",
        1,
        "Production & Appraisal",
        "证据的产生与评价",
        "按研究环节切换；带“对照阅读”的条目可直接跳到它的批判。",
      ),
      h(
        "div",
        { class: "ev-bench" },
        h(
          "div",
          {
            class: "ev-tabs",
            role: "group",
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
              h("span", null, group.code),
              h("strong", null, group.title),
              h("small", null, `${group.items.filter(([title]) => find(title)).length} 项`),
            ),
          ),
        ),
        methods.map((group) =>
          h(
            "section",
            {
              id: `evidence-panel-${group.key}`,
              class: "ev-panel",
              "data-evidence-panel": group.key,
            },
            h("h3", null, group.title),
            h("p", null, group.note),
            h(
              "ol",
              { class: "ev-method-list" },
              group.items.map(
                ([title, label, critique]) =>
                  find(title) &&
                  h(
                    "li",
                    null,
                    h(
                      "a",
                      { href: hrefFor(find(title)), class: "internal ev-method-main" },
                      h("strong", null, label),
                      h("span", { lang: "en" }, title),
                    ),
                    h("em", null, count(title)),
                    critique && find(critique)
                      ? h(
                          "a",
                          { href: hrefFor(find(critique)), class: "internal ev-counter" },
                          h("span", null, "对照阅读"),
                          critiqueLabels[critique],
                        )
                      : h("span", { class: "ev-counter is-empty", "aria-hidden": "true" }),
                  ),
              ),
            ),
          ),
        ),
      ),
    ),
    // ------------------------------------------------------------- transfer
    h(
      "section",
      { class: "ev-section ev-transfer" },
      head(
        "transfer",
        2,
        "Clearinghouses & Use",
        "证据的传播与使用",
        "清算中心是研究进入学校与政策的主要通道。",
      ),
      h(
        "div",
        { class: "ev-pipeline" },
        h(
          "div",
          { class: "ev-pipeline-lead" },
          h("span", { class: "ev-tag" }, "主条目"),
          h("h3", null, link("Educational Evidence Clearinghouses", "教育证据清算中心")),
          h("p", { lang: "en" }, "Educational Evidence Clearinghouses"),
          h("p", null, "从审查标准到项目评级，连接研究与教育决策的证据中介。"),
          link("Educational Evidence Clearinghouses", "阅读主条目 ↗", "ev-action"),
        ),
        h(
          "div",
          { class: "ev-flow" },
          h(
            "div",
            {
              class: "ev-flow-steps",
              role: "group",
              "aria-label": "清算中心的五个工作环节",
              "data-evidence-tabs": "process",
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
                h("span", null, pad(index)),
                h("strong", null, title),
              ),
            ),
          ),
          stages.map(([title, note, target, targetLabel], index) =>
            h(
              "section",
              {
                id: `evidence-panel-stage-${index}`,
                class: "ev-flow-panel",
                "data-evidence-panel": `stage-${index}`,
              },
              h("span", null, `环节 ${pad(index)} / 05`),
              h("h4", null, title),
              h("p", null, note),
              link(target, `${targetLabel} ↗`),
            ),
          ),
        ),
      ),
      h(
        "nav",
        { class: "ev-mechanisms", "aria-label": "证据使用的机制" },
        h("span", null, "使用的机制"),
        mechanisms.map(([title, label]) => link(title, label)),
      ),
    ),
    // -------------------------------------------------------------- debates
    h(
      "section",
      { class: "ev-section ev-debates" },
      head("debates", 3, "Debates", "争议与反思", "每一行把一个主张与它的质疑放在一起阅读。"),
      h(
        "div",
        { class: "ev-debate-head", "aria-hidden": "true" },
        h("span", null, "议题"),
        h("span", null, "主张"),
        h("span", null, ""),
        h("span", null, "质疑"),
      ),
      h(
        "ol",
        { class: "ev-debate-list" },
        debates.map(
          ([topic, [claim, claimLabel], [counter, counterLabel], question]) =>
            find(claim) &&
            find(counter) &&
            h(
              "li",
              null,
              h("span", { class: "ev-debate-topic" }, topic),
              link(claim, claimLabel, "ev-claim"),
              h("span", { class: "ev-versus", "aria-label": "对照" }, "↔"),
              link(counter, counterLabel, "ev-doubt"),
              h("p", null, question),
            ),
        ),
      ),
      h(
        "div",
        { class: "ev-voices" },
        h("h3", null, "关键人物"),
        h(
          "ul",
          null,
          voices.map(
            ([title, stance, note]) =>
              find(title) &&
              h(
                "li",
                { "data-stance": stance === "质疑" || stance === "批判" ? "doubt" : "claim" },
                h(
                  "a",
                  { href: hrefFor(find(title)), class: "internal" },
                  h("span", null, stance),
                  h("strong", null, title),
                  h("small", null, note),
                ),
              ),
          ),
        ),
      ),
    ),
    // ---------------------------------------------------------------- cases
    h(
      "section",
      { class: "ev-section ev-cases" },
      head(
        "cases",
        4,
        "Institutions & Cases",
        "各国机构与案例",
        "四个固定入口，加上一份可按地区筛选的机构登记表。",
      ),
      h(
        "div",
        { class: "ev-case-grid" },
        fixedCases.map(([title, label, country, kind, note, related]) => {
          if (!find(title)) return null
          const [image, source, sourceLabel] = caseBrands[title]
          return h(
            "article",
            { class: "ev-case" },
            h(
              "a",
              { class: "ev-case-logo", href: source, "aria-label": `访问${sourceLabel}` },
              h("img", { src: `/static/evidence/${image}`, alt: `${title} logo`, loading: "lazy" }),
            ),
            h("p", { class: "ev-case-meta" }, `${country} · ${kind}`),
            h("h3", null, link(title, label)),
            h("p", null, note),
            h(
              "nav",
              { "aria-label": `${label}相关条目` },
              related.map((target) => link(target)),
            ),
          )
        }),
      ),
      h(
        "div",
        { class: "ev-registry" },
        h(
          "div",
          { class: "ev-registry-head" },
          h("h3", null, "机构登记表"),
          h(
            "div",
            {
              class: "ev-filters",
              role: "group",
              "aria-label": "按地区筛选",
              "data-evidence-filter": true,
            },
            regions.map(([key, label]) =>
              h(
                "button",
                { type: "button", "data-region": key, "aria-pressed": String(key === "all") },
                label,
              ),
            ),
          ),
        ),
        h(
          "ol",
          { class: "ev-registry-list", "aria-live": "polite" },
          registry.map(
            ([region, code, country, title, note]) =>
              find(title) &&
              h(
                "li",
                { "data-region": region === "uk" || region === "us" ? "uk-us" : region },
                h(
                  "a",
                  { href: hrefFor(find(title)), class: "internal" },
                  h("abbr", { title: country }, code),
                  h("strong", null, note),
                  h("span", { lang: "en" }, title),
                ),
              ),
          ),
        ),
      ),
    ),
    // -------------------------------------------------------- international
    h(
      "section",
      { class: "ev-section ev-international" },
      head("international", 5, "International", "国际机构", "跨国的研究综合、证据网络与政策倡议。"),
      h(
        "ol",
        { class: "ev-intl" },
        international.map(
          ([title, role, note]) =>
            find(title) &&
            h(
              "li",
              null,
              h(
                "a",
                { href: hrefFor(find(title)), class: "internal" },
                h("span", null, role),
                h("strong", { lang: "en" }, title),
                h("p", null, note),
              ),
            ),
        ),
      ),
    ),
    // ------------------------------------------------------------- discover
    h(
      "section",
      { class: "ev-section ev-discover" },
      head(
        "discover",
        6,
        "Discover",
        "随机发现",
        "从专题范围内随机抽取，每组一条。",
        h(
          "button",
          { type: "button", class: "ev-shuffle", "data-evidence-refresh": "discover" },
          "换一组 ↻",
        ),
      ),
      h(
        "div",
        { class: "ev-draws", "aria-live": "polite", "aria-atomic": "true" },
        randomGroup(
          "概念",
          scope.filter((page) => page.slug.startsWith("wiki/concepts/")),
        ),
        randomGroup(
          "方法与工具",
          scope.filter((page) => /^wiki\/(methods|instruments|theories)\//.test(page.slug)),
        ),
        randomGroup(
          "人物",
          scope.filter((page) => page.slug.startsWith("wiki/persons/")),
        ),
        randomGroup(
          "研究文献",
          scope.filter((page) => page.slug.startsWith("wiki/arguments/")),
        ),
      ),
    ),
    // --------------------------------------------------------------- latest
    h(
      "section",
      { class: "ev-section ev-latest" },
      head("latest", 7, "Latest", "最新条目", "本专题相关条目的最近更新。"),
      h(
        "ol",
        { class: "ev-latest-list" },
        latest.map((page) =>
          h(
            "li",
            null,
            h(
              "a",
              { href: hrefFor(page), class: "internal" },
              dateFor(page) &&
                h(
                  "time",
                  { dateTime: dateFor(page).toISOString() },
                  dateFor(page).toLocaleDateString("zh-CN", { timeZone: "Asia/Shanghai" }),
                ),
              h("strong", null, displayFor(page)),
            ),
          ),
        ),
      ),
    ),
  )
}

export const evidenceScript = `
function bindEvidencePage() {
  const root = document.querySelector('.ev-page')
  if (!root || root.dataset.bound) return
  root.dataset.bound = 'true'
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const animate = (element, frames, duration = 320) => {
    if (!reduced && element?.animate) element.animate(frames, { duration, easing: 'cubic-bezier(.2,.8,.2,1)' })
  }
  const select = (container, key, focus) => {
    container.querySelectorAll('[data-evidence-tab]').forEach((button) => {
      const active = button.dataset.evidenceTab === key
      button.setAttribute('aria-pressed', String(active))
      const panel = root.querySelector('#' + button.getAttribute('aria-controls'))
      if (!panel) return
      const entering = active && panel.hidden
      panel.hidden = !active
      if (entering && focus) animate(panel, [{ opacity: .3, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }])
    })
    container.style.setProperty('--ev-step', [...container.querySelectorAll('[data-evidence-tab]')].findIndex((b) => b.dataset.evidenceTab === key))
  }
  root.querySelectorAll('[data-evidence-tabs]').forEach((container) => {
    const buttons = [...container.querySelectorAll('[data-evidence-tab]')]
    if (!buttons.length) return
    select(container, buttons[0].dataset.evidenceTab)
    container.addEventListener('click', (event) => {
      const button = event.target.closest('[data-evidence-tab]')
      if (button) select(container, button.dataset.evidenceTab, true)
    })
    container.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return
      const index = buttons.indexOf(document.activeElement)
      if (index < 0) return
      event.preventDefault()
      const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + step + buttons.length) % buttons.length
      buttons[next].focus()
      select(container, buttons[next].dataset.evidenceTab, true)
    })
  })
  const filter = root.querySelector('[data-evidence-filter]')
  if (filter) {
    const rows = [...root.querySelectorAll('.ev-registry-list > li')]
    filter.addEventListener('click', (event) => {
      const button = event.target.closest('[data-region]')
      if (!button) return
      const region = button.dataset.region
      filter.querySelectorAll('[data-region]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)))
      let shown = 0
      rows.forEach((row) => {
        const visible = region === 'all' || row.dataset.region === region
        const wasHidden = row.hidden
        row.hidden = !visible
        if (visible && wasHidden) animate(row, [{ opacity: 0, transform: 'translateX(-6px)' }, { opacity: 1, transform: 'none' }], 260 + shown++ * 30)
      })
    })
  }
  const rotate = (container, animated) => {
    const items = [...container.querySelectorAll('[data-evidence-item]')]
    if (items.length < 2) return
    const current = items.findIndex((item) => !item.hidden)
    const next = (Math.max(0, current) + 1 + Math.floor(Math.random() * (items.length - 1))) % items.length
    items.forEach((item, index) => { item.hidden = index !== next })
    if (animated) animate(items[next], [{ opacity: .2, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }])
  }
  root.querySelectorAll('[data-evidence-pool]').forEach((pool) => rotate(pool, false))
  root.addEventListener('click', (event) => {
    if (!event.target.closest('[data-evidence-refresh]')) return
    root.querySelectorAll('[data-evidence-pool]').forEach((pool) => rotate(pool, true))
  })
  const compass = [...root.querySelectorAll('.ev-compass a')]
  const heads = [...root.querySelectorAll('.ev-section h2[id]')]
  const mark = () => {
    const current = heads.reduce((selected, item) => item.getBoundingClientRect().top <= innerHeight * .35 ? item : selected, null)
    compass.forEach((anchor) => {
      if (current && anchor.hash.slice(1) === current.id) anchor.setAttribute('aria-current', 'location')
      else anchor.removeAttribute('aria-current')
    })
  }
  let frame = 0
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(() => { mark(); frame = 0 }) }
  document.addEventListener('scroll', onScroll, { passive: true, capture: true })
  mark()
  window.addCleanup?.(() => { document.removeEventListener('scroll', onScroll, { capture: true }); cancelAnimationFrame(frame) })
  if (!reduced && 'IntersectionObserver' in window) {
    root.classList.add('ev-motion')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('ev-in')
      observer.unobserve(entry.target)
    }), { threshold: 0.12 })
    root.querySelectorAll('.ev-ladder, .ev-section').forEach((element) => {
      if (element.getBoundingClientRect().top < innerHeight * .9) element.classList.add('ev-in')
      else observer.observe(element)
    })
    addEventListener('beforeprint', () => root.querySelectorAll('.ev-ladder, .ev-section').forEach((element) => element.classList.add('ev-in')))
    window.addCleanup?.(() => observer.disconnect())
  }
}
document.addEventListener('nav', bindEvidencePage)
bindEvidencePage()
`

export const evidenceCss = `
body[data-slug="explore/evidence"] .breadcrumb-container, body[data-slug="explore/evidence"] .article-title { display: none; }
body[data-slug="explore/evidence"] #quartz-body .center > hr { display: none; }
body[data-slug="explore/evidence"] #quartz-body .page-header { margin: 0; }
.ev-page {
  --ev-ink: var(--dark);
  --ev-muted: var(--darkgray);
  --ev-line: color-mix(in srgb, var(--dark) 13%, transparent);
  --ev-rule: color-mix(in srgb, var(--dark) 6%, transparent);
  --ev-signal: #a35d12;
  --ev-signal-soft: color-mix(in srgb, var(--ev-signal) 11%, var(--light));
  --ev-doubt: #8e3b46;
  --ev-doubt-soft: color-mix(in srgb, var(--ev-doubt) 9%, var(--light));
  --ev-card: color-mix(in srgb, var(--light) 94%, var(--dark));
  --ev-mono: var(--codeFont), ui-monospace, monospace;
  color: var(--ev-ink);
  display: grid;
  gap: clamp(2.6rem, 5vw, 4rem);
  font-family: var(--bodyFont);
  padding-bottom: 1rem;
}
:root[saved-theme="dark"] .ev-page { --ev-signal: #e2a35a; --ev-doubt: #e08a96; --ev-card: color-mix(in srgb, var(--light) 90%, var(--dark)); --ev-signal-soft: color-mix(in srgb, var(--ev-signal) 12%, var(--light)); --ev-doubt-soft: color-mix(in srgb, var(--ev-doubt) 10%, var(--light)); }
.ev-page *, .ev-page *::before, .ev-page *::after { box-sizing: border-box; min-width: 0; }
.ev-page h1, .ev-page h2, .ev-page h3, .ev-page h4, .ev-page p, .ev-page ol, .ev-page ul, .ev-page figure { margin: 0; padding: 0; color: inherit; }
.ev-page ol, .ev-page ul { list-style: none; }
.ev-page li { margin: 0; }
.ev-page h1, .ev-page h2, .ev-page h3, .ev-page h4 { font-family: var(--headerFont); text-wrap: balance; }
.ev-page a { color: inherit; text-decoration: none; background: none; font-weight: inherit; }
:where(.ev-page) a.internal { background: none; padding: 0; border-radius: 0; }
.ev-page [hidden] { display: none !important; }
.ev-page a:focus-visible, .ev-page button:focus-visible { outline: 2px solid var(--ev-signal); outline-offset: 3px; border-radius: 6px; }
.ev-page button { font: inherit; color: inherit; cursor: pointer; }
.ev-page [lang="en"] { font-feature-settings: "kern"; }
.ev-page em { font-style: normal; }

/* hero ------------------------------------------------------------------ */
.ev-hero {
  position: relative; overflow: hidden; display: grid; gap: 1.6rem 2.4rem;
  grid-template-columns: minmax(0, 1fr) minmax(15rem, 0.42fr);
  padding: clamp(1.25rem, 4vw, 3rem); border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--ev-signal) 26%, var(--lightgray));
  background:
    radial-gradient(circle at 92% 0%, color-mix(in srgb, var(--ev-signal) 20%, transparent), transparent 34%),
    linear-gradient(160deg, color-mix(in srgb, var(--light) 93%, var(--ev-signal)), var(--light) 70%);
}
.ev-hero::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(180deg, transparent 0 31px, var(--ev-rule) 31px 32px);
  mask-image: linear-gradient(100deg, transparent 8%, #000 55%, transparent 98%);
}
.ev-hero > * { position: relative; z-index: 1; }
.ev-hero-nav { grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
.ev-hero-nav > span { color: var(--ev-muted); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.13em; text-transform: uppercase; }
.ev-hero-copy { align-self: end; }
.ev-kicker { color: var(--ev-signal); font-family: var(--ev-mono); font-size: 0.76rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }
.ev-hero-copy h1 { font-size: clamp(2.7rem, 6vw, 5.7rem); letter-spacing: -0.045em; line-height: 0.96; margin: 0.4rem 0 1.1rem; }
.ev-hero-copy > p:last-child { color: var(--ev-muted); font-size: clamp(1rem, 1.6vw, 1.15rem); line-height: 1.75; max-width: 40rem; }
.ev-hero-meta { align-self: end; display: grid; border-left: 1px solid var(--ev-line); padding: 0.3rem 0 0.3rem 1.25rem; }
.ev-hero-meta strong { font-family: var(--headerFont); font-size: clamp(2.6rem, 5vw, 4.4rem); font-weight: 500; letter-spacing: -0.04em; line-height: 1; font-variant-numeric: tabular-nums; }
.ev-hero-meta span { color: var(--ev-muted); font-size: 0.86rem; margin-top: 0.45rem; }
.ev-hero-meta small { color: var(--ev-signal); border-top: 1px solid var(--ev-line); font-family: var(--ev-mono); font-size: 0.72rem; margin-top: 1rem; padding-top: 0.75rem; }

.ev-ladder { grid-column: 1 / -1; display: grid; grid-template-columns: minmax(10rem, 0.32fr) 1fr; gap: 1rem 2rem; align-items: center; border-top: 1px solid var(--ev-line); padding-top: 1.3rem; }
.ev-ladder figcaption { display: grid; gap: 0.3rem; }
.ev-ladder figcaption b { font-family: var(--headerFont); font-size: 1.05rem; }
.ev-ladder figcaption span { color: var(--ev-muted); font-size: 0.82rem; line-height: 1.55; }
.ev-ladder ol { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.6rem; }
.ev-ladder li a { display: grid; grid-template-columns: 1fr auto; gap: 0.5rem 0.6rem; height: 100%; min-height: 5.2rem; align-content: space-between; padding: 0.8rem 0.9rem; border: 1px solid var(--ev-line); border-radius: 10px; background: color-mix(in srgb, var(--light) 70%, transparent); backdrop-filter: blur(8px); transition: border-color 180ms ease, transform 180ms ease, background 180ms ease; }
.ev-ladder li a:hover { border-color: var(--ev-signal); transform: translateY(-2px); background: var(--ev-signal-soft); }
.ev-ladder strong { grid-column: 1 / -1; font-size: 0.92rem; line-height: 1.35; }
.ev-ladder em { grid-row: 1; grid-column: 2; color: var(--ev-muted); font-family: var(--ev-mono); font-size: 0.68rem; }
.ev-pips { grid-row: 1; display: flex; gap: 3px; align-items: end; }
.ev-pips i { width: 7px; height: 14px; border-radius: 2px; background: var(--ev-line); }
.ev-pips i:nth-child(2) { height: 17px; } .ev-pips i:nth-child(3) { height: 20px; } .ev-pips i:nth-child(4) { height: 23px; }
.ev-pips i.on { background: var(--ev-signal); }
.ev-motion .ev-ladder:not(.ev-in) .ev-pips i.on { transform: scaleY(0.15); }
.ev-pips i { transform-origin: bottom; transition: transform 520ms cubic-bezier(.2,.8,.2,1); }
.ev-ladder li:nth-child(2) .ev-pips i { transition-delay: 80ms; } .ev-ladder li:nth-child(3) .ev-pips i { transition-delay: 160ms; } .ev-ladder li:nth-child(4) .ev-pips i { transition-delay: 240ms; }

.ev-compass { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid var(--ev-line); }
.ev-compass a { display: grid; grid-template-columns: auto 1fr; gap: 0.1rem 0.6rem; align-items: baseline; padding: 0.8rem 0.8rem 0.7rem; border-left: 1px solid var(--ev-line); position: relative; transition: color 160ms ease; }
.ev-compass a:nth-child(4n + 1) { border-left: 0; padding-left: 0; }
.ev-compass a:nth-child(n + 5) { border-top: 1px solid var(--ev-line); }
.ev-compass a::before { content: ""; position: absolute; top: -1px; left: 0; right: 0; height: 2px; background: var(--ev-signal); transform: scaleX(0); transform-origin: left; transition: transform 240ms ease; }
.ev-compass a[aria-current]::before, .ev-compass a:hover::before { transform: scaleX(1); }
.ev-compass span { color: var(--ev-signal); font-family: var(--ev-mono); font-size: 0.68rem; }
.ev-compass strong { font-size: 0.9rem; }
.ev-compass small { grid-column: 2; color: var(--ev-muted); font-size: 0.7rem; letter-spacing: 0.04em; }

/* section heads ---------------------------------------------------------- */
.ev-section { display: grid; gap: 1.1rem; scroll-margin-top: 1.5rem; }
.ev-head { display: flex; align-items: end; justify-content: space-between; gap: 1rem 2rem; padding-bottom: 0.9rem; border-bottom: 1px solid var(--ev-line); }
.ev-head h2 { font-size: clamp(1.7rem, 3vw, 2.35rem); letter-spacing: -0.03em; line-height: 1.15; margin-top: 0.35rem; scroll-margin-top: 1.5rem; }
.ev-eyebrow { display: inline-flex; gap: 0.6rem; align-items: baseline; color: var(--ev-muted); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.13em; text-transform: uppercase; }
.ev-eyebrow b { color: var(--ev-signal); font-family: var(--ev-mono); font-weight: 600; letter-spacing: 0.04em; }
.ev-head-side { display: flex; align-items: end; gap: 1rem; }
.ev-head-side p { color: var(--ev-muted); font-size: 0.86rem; line-height: 1.6; max-width: 22rem; text-align: right; }
.ev-tag { display: inline-block; justify-self: start; color: var(--ev-signal); border: 1px solid color-mix(in srgb, var(--ev-signal) 40%, transparent); border-radius: 999px; padding: 0.1rem 0.6rem; font-size: 0.72rem; font-weight: 700; }
.ev-page .ev-action, .ev-page .ev-shuffle { display: inline-flex; align-items: center; justify-self: start; min-height: 44px; padding: 0.55rem 1.1rem; border-radius: 999px; border: 1px solid var(--ev-ink); background: var(--ev-ink); color: var(--light); font-size: 0.9rem; font-weight: 700; white-space: nowrap; transition: transform 160ms ease, background 160ms ease; }
.ev-page .ev-action:hover, .ev-page .ev-shuffle:hover { transform: translateY(-2px); background: var(--ev-signal); border-color: var(--ev-signal); color: var(--light); }

/* concepts --------------------------------------------------------------- */
.ev-concept-grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.6fr); gap: 1rem; }
.ev-page .ev-concept-lead { display: flex; flex-direction: column; gap: 0.5rem; min-height: 100%; padding: 1.6rem; border-radius: 12px; background: var(--ev-signal-soft); border: 1px solid color-mix(in srgb, var(--ev-signal) 30%, transparent); transition: transform 180ms ease; }
.ev-page .ev-concept-lead:hover { transform: translateY(-3px); }
.ev-concept-lead .ev-tag { align-self: flex-start; }
.ev-concept-lead h3 { font-size: clamp(1.8rem, 3vw, 2.4rem); letter-spacing: -0.03em; margin-top: auto; padding-top: 3rem; }
.ev-concept-lead > span[lang] { color: var(--ev-muted); font-size: 0.85rem; }
.ev-concept-lead p { font-size: 0.95rem; line-height: 1.7; }
.ev-concept-lead em { color: var(--ev-muted); font-size: 0.8rem; border-top: 1px solid var(--ev-line); padding-top: 0.7rem; margin-top: 0.4rem; }
.ev-concept-lead em b { color: var(--ev-signal); font-family: var(--ev-mono); font-size: 1rem; }
.ev-ledger { border-top: 1px solid var(--ev-line); }
.ev-ledger a { display: grid; grid-template-columns: minmax(10rem, 0.8fr) minmax(0, 1.3fr) 3.2rem; gap: 0.4rem 1.2rem; align-items: baseline; padding: 0.95rem 0.4rem; border-bottom: 1px solid var(--ev-line); transition: background 160ms ease, padding 160ms ease; }
.ev-ledger a:hover { background: color-mix(in srgb, var(--ev-signal) 7%, transparent); padding-left: 0.8rem; }
.ev-ledger-name { display: grid; gap: 0.1rem; }
.ev-ledger-name strong { font-size: 1.02rem; }
.ev-ledger-name span, .ev-method-main span { color: var(--ev-muted); font-size: 0.76rem; }
.ev-ledger p { color: var(--ev-muted); font-size: 0.86rem; line-height: 1.6; }
.ev-ledger em, .ev-method-list > li > em { color: var(--ev-ink); font-family: var(--ev-mono); font-size: 0.82rem; text-align: right; font-variant-numeric: tabular-nums; }

/* methods ---------------------------------------------------------------- */
.ev-bench { display: grid; grid-template-columns: minmax(12rem, 0.32fr) 1fr; border: 1px solid var(--ev-line); border-radius: 12px; overflow: hidden; background: var(--ev-card); }
.ev-tabs { display: grid; align-content: start; border-right: 1px solid var(--ev-line); }
.ev-tabs button { display: grid; grid-template-columns: auto 1fr auto; gap: 0.75rem; align-items: baseline; text-align: left; min-height: 64px; padding: 1rem 1.1rem; border: 0; border-bottom: 1px solid var(--ev-line); background: transparent; position: relative; transition: background 160ms ease; }
.ev-tabs button::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--ev-signal); transform: scaleY(0); transition: transform 220ms ease; }
.ev-tabs button[aria-pressed="true"] { background: var(--light); }
.ev-tabs button[aria-pressed="true"]::before { transform: scaleY(1); }
.ev-tabs button:hover { background: var(--light); }
.ev-tabs span { color: var(--ev-signal); font-family: var(--ev-mono); font-size: 0.75rem; }
.ev-tabs strong { font-size: 1rem; }
.ev-tabs small { color: var(--ev-muted); font-size: 0.75rem; }
.ev-panel { padding: 1.3rem 1.4rem 1.1rem; background: var(--light); display: grid; gap: 0.3rem; align-content: start; }
.ev-panel > h3 { font-size: 1.25rem; }
.ev-panel > p { color: var(--ev-muted); font-size: 0.9rem; margin-bottom: 0.6rem; }
.ev-method-list > li { display: grid; grid-template-columns: minmax(0, 1fr) 3rem minmax(9rem, 0.6fr); gap: 1rem; align-items: center; padding: 0.7rem 0; border-top: 1px solid var(--ev-line); }
.ev-method-main { display: grid; gap: 0.1rem; }
.ev-method-main strong { font-size: 1rem; transition: color 160ms ease; }
.ev-method-main:hover strong { color: var(--ev-signal); }
.ev-page .ev-counter { display: inline-flex; flex-wrap: wrap; gap: 0.1rem 0.5rem; align-items: baseline; justify-self: start; padding: 0.35rem 0.7rem; border-radius: 8px; background: var(--ev-doubt-soft); color: var(--ev-doubt); font-size: 0.82rem; font-weight: 600; transition: transform 160ms ease; }
.ev-counter span { font-size: 0.66rem; letter-spacing: 0.08em; opacity: 0.85; }
a.ev-counter:hover { transform: translateX(3px); }
.ev-page .ev-counter.is-empty { background: none; padding: 0; }

/* transfer --------------------------------------------------------------- */
.ev-pipeline { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr); gap: 1rem; }
.ev-pipeline-lead { display: grid; gap: 0.5rem; align-content: start; padding: 1.5rem; border-radius: 12px; color: var(--light); background: var(--ev-ink); }
.ev-pipeline-lead .ev-tag { color: color-mix(in srgb, var(--ev-signal) 70%, var(--light)); border-color: color-mix(in srgb, var(--light) 30%, transparent); }
.ev-pipeline-lead h3 { font-size: 1.6rem; letter-spacing: -0.02em; margin-top: 0.6rem; }
.ev-pipeline-lead p { font-size: 0.92rem; line-height: 1.7; opacity: 0.86; }
.ev-pipeline-lead p[lang] { font-size: 0.78rem; opacity: 0.65; }
.ev-page .ev-pipeline-lead .ev-action { margin-top: 0.8rem; background: var(--light); color: var(--ev-ink); border-color: var(--light); }
.ev-page .ev-pipeline-lead .ev-action:hover { background: var(--ev-signal); border-color: var(--ev-signal); color: var(--light); }
.ev-flow { display: grid; grid-template-rows: auto 1fr; gap: 0.9rem; padding: 1.2rem; border: 1px solid var(--ev-line); border-radius: 12px; background: var(--ev-card); }
.ev-flow-steps { --ev-step: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); position: relative; }
.ev-flow-steps::before, .ev-flow-steps::after { content: ""; position: absolute; top: 21px; left: 10%; height: 2px; background: var(--ev-line); right: 10%; }
.ev-flow-steps::after { right: auto; width: calc(var(--ev-step) * 20%); background: var(--ev-signal); transition: width 360ms cubic-bezier(.2,.8,.2,1); }
.ev-flow-steps button { position: relative; z-index: 1; display: grid; justify-items: center; gap: 0.45rem; min-height: 44px; padding: 0 0.2rem 0.3rem; border: 0; background: none; text-align: center; }
.ev-flow-steps span { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--ev-line); background: var(--light); font-family: var(--ev-mono); font-size: 0.78rem; transition: background 200ms ease, color 200ms ease, border-color 200ms ease; }
.ev-flow-steps strong { font-size: 0.84rem; line-height: 1.35; color: var(--ev-muted); }
.ev-flow-steps button[aria-pressed="true"] span { background: var(--ev-signal); border-color: var(--ev-signal); color: var(--light); }
.ev-flow-steps button[aria-pressed="true"] strong { color: var(--ev-ink); }
.ev-flow-steps button:hover span { border-color: var(--ev-signal); }
.ev-flow-panel { display: grid; gap: 0.35rem; align-content: start; padding: 1.1rem 1.2rem; border-radius: 10px; background: var(--light); border-left: 3px solid var(--ev-signal); }
.ev-flow-panel > span { color: var(--ev-signal); font-family: var(--ev-mono); font-size: 0.72rem; }
.ev-flow-panel h4 { font-size: 1.15rem; }
.ev-flow-panel p { color: var(--ev-muted); font-size: 0.92rem; }
.ev-flow-panel a { justify-self: start; margin-top: 0.3rem; font-size: 0.9rem; font-weight: 700; border-bottom: 1px solid var(--ev-signal); }
.ev-flow-panel a:hover { color: var(--ev-signal); }
.ev-mechanisms { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.ev-mechanisms > span { color: var(--ev-muted); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.1em; margin-right: 0.4rem; }
.ev-mechanisms a { display: inline-flex; align-items: center; min-height: 38px; padding: 0.3rem 0.9rem; border: 1px solid var(--ev-line); border-radius: 999px; font-size: 0.86rem; transition: border-color 160ms ease, color 160ms ease; }
.ev-mechanisms a:hover { border-color: var(--ev-signal); color: var(--ev-signal); }

/* debates ---------------------------------------------------------------- */
.ev-debate-head, .ev-debate-list > li { display: grid; grid-template-columns: 4rem minmax(0, 1fr) 2rem minmax(0, 1fr); gap: 0.4rem 1rem; align-items: center; }
.ev-debate-head { color: var(--ev-muted); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; padding: 0 0.2rem; }
.ev-debate-head span:nth-child(2) { color: var(--ev-signal); } .ev-debate-head span:nth-child(4) { color: var(--ev-doubt); }
.ev-debate-list { border-top: 1px solid var(--ev-line); }
.ev-debate-list > li { padding: 0.9rem 0.2rem; border-bottom: 1px solid var(--ev-line); transition: background 160ms ease; }
.ev-debate-list > li:hover { background: linear-gradient(90deg, var(--ev-signal-soft), transparent 50%, var(--ev-doubt-soft)); }
.ev-debate-topic { font-family: var(--ev-mono); font-size: 0.78rem; color: var(--ev-muted); }
.ev-page .ev-claim, .ev-page .ev-doubt { font-family: var(--headerFont); font-size: 1.05rem; font-weight: 700; line-height: 1.4; }
.ev-page .ev-claim { border-left: 3px solid var(--ev-signal); padding-left: 0.7rem; }
.ev-page .ev-doubt { border-left: 3px solid var(--ev-doubt); padding-left: 0.7rem; }
.ev-claim:hover { color: var(--ev-signal); } .ev-doubt:hover { color: var(--ev-doubt); }
.ev-versus { color: var(--ev-muted); text-align: center; font-size: 1.1rem; }
.ev-debate-list > li > p { grid-column: 2 / -1; color: var(--ev-muted); font-size: 0.86rem; line-height: 1.6; }
.ev-voices { display: grid; gap: 0.7rem; margin-top: 0.6rem; }
.ev-voices h3 { font-size: 0.78rem; letter-spacing: 0.12em; color: var(--ev-muted); font-family: var(--bodyFont); font-weight: 800; }
.ev-voices ul { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 0.5rem; }
.ev-voices a { display: grid; gap: 0.15rem; height: 100%; padding: 0.75rem 0.8rem; border-radius: 10px; border: 1px solid var(--ev-line); border-top: 3px solid var(--ev-signal); transition: transform 160ms ease; }
.ev-voices li[data-stance="doubt"] a { border-top-color: var(--ev-doubt); }
.ev-voices a:hover { transform: translateY(-3px); }
.ev-voices span { font-size: 0.7rem; font-weight: 800; color: var(--ev-signal); }
.ev-voices li[data-stance="doubt"] span { color: var(--ev-doubt); }
.ev-voices strong { font-size: 0.9rem; line-height: 1.3; }
.ev-voices small { color: var(--ev-muted); font-size: 0.74rem; }

/* cases ------------------------------------------------------------------ */
.ev-case-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.8rem; }
.ev-case { display: grid; grid-template-rows: auto auto auto 1fr auto; gap: 0.45rem; padding: 1rem; border: 1px solid var(--ev-line); border-radius: 12px; background: var(--ev-card); transition: transform 180ms ease, border-color 180ms ease; }
.ev-case:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--ev-signal) 45%, transparent); }
.ev-page .ev-case-logo { display: flex; align-items: center; justify-content: center; height: 72px; margin-bottom: 0.4rem; padding: 0.8rem 1rem; border-radius: 8px; background: #fff; }
.ev-page .ev-case-logo img { display: block; height: 44px; width: 100%; max-width: 100%; object-fit: contain; margin: 0; border-radius: 0; }
.ev-case-meta { color: var(--ev-signal); font-family: var(--ev-mono); font-size: 0.7rem; }
.ev-case h3 { font-size: 1.2rem; }
.ev-case h3 a:hover { color: var(--ev-signal); }
.ev-case > p:not(.ev-case-meta) { color: var(--ev-muted); font-size: 0.86rem; line-height: 1.6; }
.ev-case nav { display: grid; gap: 0.15rem; border-top: 1px solid var(--ev-line); padding-top: 0.6rem; }
.ev-case nav a { font-size: 0.8rem; color: var(--ev-muted); padding: 0.15rem 0; }
.ev-case nav a::before { content: "→ "; color: var(--ev-signal); }
.ev-case nav a:hover { color: var(--ev-ink); }
.ev-registry { display: grid; gap: 0.6rem; margin-top: 0.6rem; }
.ev-registry-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.8rem; }
.ev-registry-head h3 { font-size: 1.15rem; }
.ev-filters { display: flex; flex-wrap: wrap; gap: 0.3rem; padding: 0.25rem; border: 1px solid var(--ev-line); border-radius: 999px; }
.ev-filters button { min-height: 36px; padding: 0.2rem 0.9rem; border: 0; border-radius: 999px; background: none; font-size: 0.84rem; color: var(--ev-muted); transition: background 160ms ease, color 160ms ease; }
.ev-filters button[aria-pressed="true"] { background: var(--ev-ink); color: var(--light); }
.ev-registry-list { border-top: 1px solid var(--ev-line); }
.ev-registry-list a { display: grid; grid-template-columns: 2.6rem minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 0.1rem 1rem; align-items: baseline; padding: 0.65rem 0.2rem; border-bottom: 1px solid var(--ev-line); transition: padding 160ms ease; }
.ev-registry-list a:hover { padding-left: 0.6rem; }
.ev-registry-list abbr { text-decoration: none; font-family: var(--ev-mono); font-size: 0.74rem; color: var(--ev-signal); border: 1px solid color-mix(in srgb, var(--ev-signal) 40%, transparent); border-radius: 4px; text-align: center; padding: 0.05rem 0; }
.ev-registry-list strong { font-size: 0.95rem; }
.ev-registry-list a:hover strong { color: var(--ev-signal); }
.ev-registry-list span { color: var(--ev-muted); font-size: 0.76rem; }

/* international ---------------------------------------------------------- */
.ev-intl { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--ev-line); border-left: 1px solid var(--ev-line); }
.ev-intl a { display: grid; gap: 0.35rem; align-content: start; height: 100%; padding: 1.1rem 1.1rem 1.2rem; border-right: 1px solid var(--ev-line); border-bottom: 1px solid var(--ev-line); transition: background 160ms ease; }
.ev-intl a:hover { background: var(--ev-card); }
.ev-intl span { color: var(--ev-signal); font-family: var(--ev-mono); font-size: 0.7rem; }
.ev-intl strong { font-family: var(--headerFont); font-size: 1.05rem; line-height: 1.35; }
.ev-intl p { color: var(--ev-muted); font-size: 0.84rem; line-height: 1.6; }

/* discover --------------------------------------------------------------- */
.ev-draws { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.8rem; }
.ev-draw { display: grid; grid-template-rows: auto 1fr; gap: 0.8rem; padding: 1rem; border-radius: 12px; border: 1px dashed color-mix(in srgb, var(--ev-signal) 45%, var(--lightgray)); background: repeating-linear-gradient(180deg, transparent 0 27px, var(--ev-rule) 27px 28px); min-height: 10rem; }
.ev-draw h3 { display: flex; justify-content: space-between; align-items: baseline; font-size: 0.8rem; letter-spacing: 0.1em; font-family: var(--bodyFont); font-weight: 800; color: var(--ev-muted); }
.ev-draw h3 small { font-family: var(--ev-mono); font-weight: 400; letter-spacing: 0; color: var(--ev-signal); }
.ev-draw-item { display: grid; gap: 0.5rem; align-content: space-between; }
.ev-draw-item strong { font-family: var(--headerFont); font-size: 1rem; line-height: 1.45; overflow-wrap: anywhere; }
.ev-draw-item span { color: var(--ev-muted); font-size: 0.78rem; font-family: var(--ev-mono); }
.ev-draw-item:hover strong { color: var(--ev-signal); }

/* latest ----------------------------------------------------------------- */
.ev-latest-list { border-top: 1px solid var(--ev-line); }
.ev-latest-list a { display: grid; grid-template-columns: 7rem minmax(0, 1fr); gap: 1rem; align-items: baseline; padding: 0.75rem 0.2rem; border-bottom: 1px solid var(--ev-line); transition: padding 160ms ease; }
.ev-latest-list a:hover { padding-left: 0.6rem; }
.ev-latest-list time { color: var(--ev-signal); font-family: var(--ev-mono); font-size: 0.76rem; font-variant-numeric: tabular-nums; }
.ev-latest-list strong { font-size: 0.95rem; line-height: 1.5; }

/* entrance --------------------------------------------------------------- */
.ev-motion .ev-section:not(.ev-in) > * { opacity: 0; transform: translateY(14px); }
.ev-motion .ev-section > * { transition: opacity 520ms ease, transform 520ms cubic-bezier(.2,.8,.2,1); }
.ev-motion .ev-section > *:nth-child(2) { transition-delay: 70ms; } .ev-motion .ev-section > *:nth-child(3) { transition-delay: 140ms; } .ev-motion .ev-section > *:nth-child(4) { transition-delay: 210ms; }

/* responsive ------------------------------------------------------------- */
@media (max-width: 1100px) {
  .ev-voices ul { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .ev-case-grid, .ev-draws { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 860px) {
  .ev-hero { grid-template-columns: 1fr; }
  .ev-hero-meta { border-left: 0; border-top: 1px solid var(--ev-line); padding: 1rem 0 0; grid-template-columns: auto 1fr; column-gap: 1rem; align-items: end; }
  .ev-hero-meta small { grid-column: 1 / -1; }
  .ev-ladder { grid-template-columns: 1fr; }
  .ev-ladder ol { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ev-head { flex-direction: column; align-items: start; }
  .ev-head-side { width: 100%; justify-content: space-between; }
  .ev-head-side p { text-align: left; }
  .ev-concept-grid, .ev-pipeline, .ev-bench { grid-template-columns: 1fr; }
  .ev-tabs { grid-template-columns: repeat(3, minmax(0, 1fr)); border-right: 0; border-bottom: 1px solid var(--ev-line); }
  .ev-tabs button { grid-template-columns: 1fr; gap: 0.1rem; border-bottom: 0; border-right: 1px solid var(--ev-line); padding: 0.8rem; }
  .ev-tabs button:last-child { border-right: 0; }
  .ev-tabs button::before { top: auto; bottom: 0; right: 0; width: auto; height: 3px; transform: scaleX(0); }
  .ev-tabs button[aria-pressed="true"]::before { transform: scaleX(1); }
  .ev-intl { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ev-registry-list a { grid-template-columns: 2.6rem minmax(0, 1fr); }
  .ev-registry-list abbr { grid-row: span 2; }
}
@media (max-width: 600px) {
  .ev-hero-nav { flex-direction: column; align-items: start; gap: 0.3rem; }
  .ev-compass { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ev-compass a, .ev-compass a:nth-child(4n + 1) { border-left: 0; padding-left: 0; border-top: 1px solid var(--ev-line); }
  .ev-compass a:nth-child(-n + 2) { border-top: 0; }
  .ev-ledger a { grid-template-columns: minmax(0, 1fr) 2.6rem; }
  .ev-ledger a p { grid-column: 1 / -1; grid-row: 2; }
  .ev-method-list > li { grid-template-columns: minmax(0, 1fr) 2.6rem; }
  .ev-method-list .ev-counter { grid-column: 1 / -1; }
  .ev-method-list .ev-page .ev-counter.is-empty { display: none; }
  .ev-flow { padding: 0.9rem; }
  .ev-flow-steps span { width: 38px; height: 38px; }
  .ev-flow-steps::before, .ev-flow-steps::after { top: 19px; }
  .ev-flow-steps strong { font-size: 0.72rem; }
  .ev-debate-head { display: none; }
  .ev-debate-list > li { grid-template-columns: 1fr; gap: 0.4rem; }
  .ev-debate-list > li > p { grid-column: 1; }
  .ev-versus { text-align: left; line-height: 1; padding-left: 0.8rem; transform: rotate(90deg); justify-self: start; }
  .ev-voices ul { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ev-case-grid, .ev-draws, .ev-intl { grid-template-columns: 1fr; }
  .ev-latest-list a { grid-template-columns: 1fr; gap: 0.2rem; }
}
@media (prefers-reduced-motion: reduce) {
  .ev-page *, .ev-page *::before, .ev-page *::after { transition: none !important; animation: none !important; }
  .ev-page a:hover, .ev-page button:hover, .ev-case:hover { transform: none !important; }
}
`

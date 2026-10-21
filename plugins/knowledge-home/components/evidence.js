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
    note: "效果是怎样识别出来的？",
    review:
      "随机分配与准实验设计用于识别干预效果；实施与过程评估进一步考察干预如何开展，以及结果出现的情境。阅读时，把效果估计与实施过程放在一起。",
    items: [
      ["Randomised Controlled Trials", "随机对照试验", "Critique of Randomized Controlled Trials"],
      ["Quasi-Experimental Designs", "准实验设计"],
      ["Regression Discontinuity Design", "断点回归设计"],
      ["Cluster Randomized Trials", "集群随机试验"],
      ["Single-Case Design", "单一个案实验设计"],
      ["Implementation and Process Evaluation", "实施与过程评估", "Black Box RCTs"],
      ["Random Assignment", "随机分配"],
      ["True Experimental Design", "真实验设计"],
      ["Efficacy Trial", "效力试验"],
      ["Effectiveness Trial", "实效试验"],
      ["Multi-Arm Trial", "多臂试验"],
      ["Mixed Methods Experimental Design", "混合方法实验设计"],
      ["Intent-to-Treat Analysis", "意向治疗分析"],
      ["Propensity Score Matching", "倾向得分匹配"],
      ["Difference-in-Differences", "双重差分"],
    ],
  },
  {
    key: "synthesize",
    code: "02",
    title: "综合证据",
    note: "多项研究可以合并成什么结论？",
    review:
      "系统综述明确检索与筛选过程，元分析合并可比较的研究结果，主题综合整合质性发现。阅读综合结论时，还需要检查研究之间的差异及结论的适用情境。",
    items: [
      ["Systematic Review", "系统综述"],
      ["Meta-analysis", "元分析", "Critique of Meta-analysis"],
      ["Meta-meta-analysis", "元-元分析", "Critique of Meta-meta-analysis"],
      ["Research Synthesis", "研究综合"],
      ["Thematic Synthesis", "主题综合"],
      ["PRISMA", "PRISMA 报告规范"],
      ["Narrative Synthesis", "叙事综合"],
      ["Framework Synthesis", "框架综合"],
      ["Umbrella Review", "伞状综述"],
      ["Comparative Meta-synthesis", "比较性元综合"],
      ["Three-Level Meta-Analysis", "三层元分析"],
      ["Random-Effects Model", "随机效应模型"],
    ],
  },
  {
    key: "appraise",
    code: "03",
    title: "评价证据",
    note: "效果有多大，结论有多可信？",
    review:
      "效应量描述效果或关联的大小；效度框架与评级工具检查结论的依据。评读时分别判断研究能否支持其推论，以及结论可以推广到哪些人群和情境。",
    items: [
      ["Effect Size", "效应量", "Critique of Effect Size"],
      ["Campbellian Validity Framework", "坎贝尔效度框架"],
      ["EEF Padlock Security Rating", "EEF 挂锁评级"],
      ["Weight of Evidence Framework", "证据权重框架"],
      ["AMSTAR", "AMSTAR 系统评价质量工具"],
      ["Mixed Methods Appraisal Tool", "MMAT 混合方法评价工具"],
      ["Internal Validity", "内部效度"],
      ["External Validity", "外部效度"],
      ["Construct Validity", "构念效度"],
      ["Publication Bias", "发表偏倚"],
      ["Threats to Internal Validity", "内部效度威胁"],
      ["Threats to External Validity", "外部效度威胁"],
      ["Study Design and Implementation Assessment Device", "Study DIAD 研究设计与实施评价工具"],
      ["Gating Procedure", "门控程序"],
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

// These are reading stages, not a claim that every intermediary uses one fixed workflow.
const stages = [
  [
    "形成问题",
    "从学校与研究者共同关心的问题出发，明确证据要服务的判断。",
    "Research-Practice Partnership",
    "研究-实践伙伴关系",
  ],
  ["检索筛选", "界定研究范围，按公开的纳入规则寻找与筛选研究。", "Systematic Review", "系统综述"],
  [
    "审查综合",
    "检查研究设计与实施质量，再组织能够支持判断的研究结果。",
    "Research Synthesis",
    "研究综合",
  ],
  [
    "转译交流",
    "通过知识中介和专业交流，让研究与政策、学校实践发生联系。",
    "Knowledge Mediation",
    "知识中介",
  ],
  [
    "实施调适",
    "在具体学校中实施干预，记录实施过程与情境条件。",
    "Implementation Fidelity",
    "实施忠实度",
  ],
  [
    "使用反馈",
    "考察研究怎样进入判断，并持续检查证据使用的质量。",
    "Research Utilization Models",
    "研究利用模型",
  ],
]

const stageTopics = [
  [["Research-Practice Partnership", "研究-实践伙伴关系", "研究者与实践者怎样持续协作。"]],
  [["Evidence Standards", "证据标准", "哪些设计与报告可以进入审查。"]],
  [
    [
      "Study Design and Implementation Assessment Device",
      "研究设计与实施评估工具",
      "逐项检查研究设计与实施质量。",
    ],
    ["EEF Padlock Security Rating", "EEF 挂锁评级", "阅读研究可信度评级的依据。"],
  ],
  [
    [
      "Educational Brokerage Agency",
      "教育中介机构",
      "机构怎样连接研究与实践。",
      ["Democratising Evidence", "证据民主化"],
    ],
    ["Knowledge Mediation", "知识中介", "通过转译与沟通连接知识生产和使用。"],
  ],
  [
    ["Implementation Fidelity", "实施忠实度", "干预实施与原方案怎样保持一致。"],
    [
      "Engineered Evidence",
      "工程化证据",
      "把证据用于具体方案时，连同实践中的情境知识一起阅读。",
      ["Practice-Based Evidence", "基于实践的证据"],
    ],
  ],
  [
    ["Research Utilization Models", "研究利用模型", "研究进入决策的不同路径。"],
    [
      "Quality Use of Research Evidence Framework",
      "研究证据质量使用框架",
      "怎样判断研究证据是否得到高质量使用。",
      ["Poor Research Use", "劣质研究使用"],
    ],
  ],
]

const mechanisms = [
  ["Educational Brokerage Agency", "教育中介机构"],
  ["Research-Practice Partnership", "研究-实践伙伴关系"],
  ["Quality Use of Research Evidence Framework", "研究证据质量使用框架"],
  ["Implementation Fidelity", "实施忠实度"],
  ["Research Utilization Models", "研究利用模型"],
  ["Knowledge Mediation", "知识中介"],
]

const useReadings = {
  "Educational Brokerage Agency": [["Knowledge Mobilisation", "知识动员"]],
  "Research-Practice Partnership": [
    ["Engagement in and with Research", "教师科研参与"],
    ["School Enquiry Cycle", "学校探究循环"],
  ],
  "Quality Use of Research Evidence Framework": [
    ["Profession-Sensitive Conceptualisations of Research Use", "专业敏感型研究使用"],
  ],
  "Implementation Fidelity": [["Implementation and Process Evaluation", "实施与过程评估"]],
  "Research Utilization Models": [
    ["Four Generations of Research Use", "研究使用的四代演进"],
    ["Push and Pull Models of Knowledge Mobilisation", "知识动员的推拉模型"],
  ],
  "Knowledge Mediation": [["Research Knowledge Mobilisation Model", "研究知识动员模型"]],
}

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

// Countries and functions were traced from wiki bodies and their cited Arguments.
// This pool contains organizations; policy texts, portals and projects stay in context links.
const institutions = [
  [
    "EPPI-Centre",
    "政策与实践证据信息协调中心",
    "英国",
    "研究综合",
    "开展系统综述方法研究，连接政策与实践。",
  ],
  [
    "What Works Network",
    "有效性中心网络",
    "英国",
    "证据协作",
    "连接不同公共政策领域的有效性中心。",
  ],
  [
    "Centre for the Use of Research and Evidence in Education",
    "教育研究与证据使用中心",
    "英国",
    "教师专业学习",
    "面向教师转译研究，支持专业学习。",
  ],
  [
    "Institute for Effective Education",
    "有效教育研究所",
    "英国",
    "干预研究",
    "连接教育干预研究与学校实践。",
  ],
  [
    "Evidence-Based Teachers Network",
    "循证教师网络",
    "英国",
    "教师网络",
    "连接教师与循证教学实践。",
  ],
  ["Education Media Centre", "教育媒体中心", "英国", "公共传播", "为教育新闻报道提供研究证据。"],
  [
    "Education Endowment Foundation",
    "教育捐赠基金会",
    "英国",
    "资助与工具包",
    "资助独立评估，向学校提供教学证据。",
  ],
  [
    "What Works Clearinghouse",
    "有效干预清算中心",
    "美国",
    "研究审查",
    "按公开标准审查教育干预研究；阅读条目中的运行沿革。",
  ],
  [
    "Institute of Education Sciences",
    "教育科学研究所",
    "美国",
    "教育科研",
    "教育研究资助与证据基础设施的制度入口。",
  ],
  [
    "Clearing House Unterricht",
    "教学研究清算中心",
    "德国",
    "元分析转译",
    "将教学元分析转译为面向教师教育者的简要评介。",
  ],
  [
    "Danish Clearinghouse for Educational Research",
    "教育研究清算中心",
    "丹麦",
    "历史机构",
    "系统综述中介案例；Burns 与 Schuller（2022）追踪其关闭。",
  ],
  [
    "Kunnskapssenter for utdanning",
    "教育知识中心",
    "挪威",
    "研究综合",
    "综合教育研究，并纳入实践者参与。",
  ],
  [
    "Swedish Institute for Educational Research",
    "瑞典教育研究所",
    "瑞典",
    "综述与资助",
    "通过系统综述和实践者对话识别研究需求。",
  ],
  [
    "Swiss Coordination Centre for Research in Education",
    "教育研究协调中心",
    "瑞士",
    "研究协调",
    "连接联邦与州的教育研究及政策需求。",
  ],
  [
    "Netherlands Initiative for Education Research",
    "荷兰教育研究倡议",
    "荷兰",
    "科研资助与协调",
    "统筹教育研究及资助，并通过 Kennisrotonde 回应实践问题。",
  ],
  [
    "Top Institute for Evidence-Based Education Research",
    "证据本位教育研究顶尖研究所",
    "荷兰",
    "跨大学研究",
    "把干预评价与知识传播连接到教师培训。",
  ],
  [
    "National Institute for Educational Policy Research",
    "国立教育政策研究所",
    "日本",
    "政策研究",
    "连接教育研究与国家教育政策需求。",
  ],
  [
    "Education Reform Initiative",
    "教育改革倡议",
    "土耳其",
    "政策中介",
    "依托大学与民间基金会支持开展教育政策研究。",
  ],
  [
    "Canadian Council on Learning",
    "加拿大学习委员会",
    "加拿大",
    "历史机构",
    "跨省知识中介案例；Burns 与 Schuller（2022）追踪其关闭。",
  ],
  [
    "Australian Education Research Organisation",
    "澳大利亚教育研究组织",
    "澳大利亚",
    "国家证据机构",
    "支持教育证据生成与实践转化。",
  ],
  [
    "Evidence for Learning",
    "证据学习中心",
    "澳大利亚",
    "工具包本土化",
    "把教学证据综合转译到澳大利亚学校语境。",
  ],
  [
    "Centre for Evidence and Implementation",
    "证据与实施中心",
    "澳大利亚 / 跨国",
    "实施支持",
    "开展研究综合与评估，支持公共服务中的证据实施。",
  ],
  [
    "SUMMA",
    "拉美和加勒比教育研究与创新实验室",
    "智利 / 拉美",
    "区域中介",
    "连接区域教育研究、教学工具包与本土评估。",
  ],
  [
    "Campbell Collaboration",
    "坎贝尔协作组织",
    "全球",
    "系统综述协作",
    "生产与传播教育和社会政策领域的系统综述。",
  ],
  [
    "Evidence for Education Network",
    "教育证据网络",
    "全球",
    "跨国证据网络",
    "连接教育证据机构，支持工具本土化与知识交流。",
  ],
  [
    "Centre for Educational Research and Innovation",
    "教育研究与创新中心",
    "OECD",
    "教育研发",
    "通过跨国研究探索教育研究与政策实践的联系。",
  ],
  [
    "Building Evidence in Education",
    "构建教育证据工作组",
    "全球",
    "捐助协调",
    "协调教育研究与评估的证据准则。",
  ],
  ["BHP Foundation", "必和必拓基金会", "跨国", "慈善资助", "资助 EEF 的全球教学证据合作项目。"],
]

const practiceNetworks = [
  ["Forschungsmonitor Schule", "学校研究监测平台", "德国", "面向教师与教师教育者评介教育研究。"],
  [
    "Knowledge Network for Applied Education Research",
    "应用教育研究知识网络",
    "加拿大",
    "连接安大略省研究者与学校的知识动员网络。",
  ],
  ["Research Schools Network", "研究学校网络", "英国", "由学校支持证据使用与专业学习。"],
  ["ResearchED", "researchED", "英国 / 跨国", "通过会议连接教师与研究者。"],
  ["Kennisrotonde", "知识环岛", "荷兰", "NRO 面向实践问题的研究问答门户。"],
  ["Best Evidence Synthesis", "最佳证据综合项目", "新西兰", "以研究综合连接教育政策与实践。"],
]

const international = [
  {
    key: "network",
    title: "Evidence for Education Network",
    label: "教育证据网络",
    role: "跨国协作网络",
    note: "从全球研究综合到本土教学工具，沿合作机构、合作项目与资助关系阅读证据的跨国转译。",
    entries: [
      ["Education Endowment Foundation", "EEF", "英国 · 网络协调", "教学工具包与研究评估经验。"],
      ["SUMMA", "SUMMA", "拉美和加勒比 · 区域合作", "连接区域教育研究与本土教学实践。"],
      [
        "Evidence for Learning",
        "Evidence for Learning",
        "澳大利亚 · 本土转译",
        "在澳大利亚语境中使用与转译教学证据。",
      ],
    ],
    links: [
      ["Building a Global Evidence Ecosystem for Teaching", "合作项目 · 构建全球教学证据生态系统"],
      ["BHP Foundation", "项目资助 · 必和必拓基金会"],
    ],
  },
  {
    key: "synthesis",
    title: "Campbell Collaboration",
    label: "坎贝尔协作组织",
    role: "国际研究综合协作",
    note: "组织教育与社会政策领域的系统综述，综合分散研究，为政策与实践提供研究依据。",
    entries: [
      ["Systematic Review", "系统综述", "主要研究形式", "按明确规程检索、筛选与综合研究。"],
      ["Meta-analysis", "元分析", "定量综合方法", "对可比较的研究结果进行统计合并。"],
    ],
    links: [
      ["EPPI-Centre", "相关研究中心 · EPPI-Centre"],
      ["Kunnskapssenter for utdanning", "各国综述机构 · 挪威教育知识中心"],
      ["Swedish Institute for Educational Research", "各国综述机构 · 瑞典教育研究所"],
    ],
  },
  {
    key: "policy",
    title: "OECD",
    label: "经济合作与发展组织",
    role: "政府间政策研究",
    note: "从组织、研究中心到具体项目，考察各国研究如何参与教育政策与实践。",
    entries: [
      [
        "Centre for Educational Research and Innovation",
        "CERI",
        "所属研究中心",
        "教育研究与创新中心开展跨国教育研发。",
      ],
      [
        "Strengthening the Impact of Education Research Project",
        "强化教育研究影响力项目",
        "CERI 研究项目",
        "研究教育证据的使用、中介活动及其支持条件。",
      ],
    ],
    links: [
      [
        "EU Evidence-Informed Education Policy Initiatives",
        "区域政策延伸 · 欧盟证据知情教育政策倡议",
      ],
    ],
  },
  {
    key: "donors",
    title: "Building Evidence in Education",
    label: "构建教育证据工作组",
    role: "多边捐助协调 · BE2",
    note: "协调教育研究与评估的证据准则。阅读这条路径，可以同时关注评估标准和教育援助中的资金安排。",
    entries: [["World Bank", "世界银行", "BE2 发起方之一", "教育研究与发展援助的组织入口。"]],
    links: [["Global Partnership for Education", "教育援助延伸 · 全球教育伙伴关系"]],
  },
]

// The random library also includes the six networks, portals and programmes requested by the user.
const institutionPool = [
  ...institutions,
  ...practiceNetworks.map(([title, label, country, note], index) => [
    title,
    label,
    country,
    ["研究门户", "知识动员网络", "学校网络", "教师会议网络", "知识问答门户", "研究综合项目"][index],
    note,
  ]),
]

const eenNodes = [
  {
    key: "een",
    title: "Evidence for Education Network",
    label: "EEN",
    detail: "教育证据网络",
    kind: "hub",
    x: 500,
    y: 285,
    relation: "EEN · 连接教育证据机构的跨国协作网络。",
  },
  {
    key: "eef",
    title: "Education Endowment Foundation",
    label: "EEF",
    detail: "英国 · 网络协调",
    kind: "partner",
    x: 165,
    y: 110,
    relation: "EEF · 承担网络协调，并提供教学工具包与研究评估经验。",
  },
  {
    key: "nro",
    title: "Netherlands Initiative for Education Research",
    label: "NRO",
    detail: "荷兰 · 合作机构",
    kind: "partner",
    x: 835,
    y: 110,
    relation: "NRO · 荷兰教育研究与知识中介机构，见 EEN 条目的伙伴矩阵。",
  },
  {
    key: "summa",
    title: "SUMMA",
    label: "SUMMA",
    detail: "拉美和加勒比",
    kind: "partner",
    x: 835,
    y: 305,
    relation: "SUMMA · 拉美和加勒比地区的教育研究与本土转译伙伴。",
  },
  {
    key: "e4l",
    title: "Evidence for Learning",
    label: "Evidence for Learning",
    detail: "澳大利亚 · 本土转译",
    kind: "partner",
    x: 835,
    y: 510,
    relation: "Evidence for Learning · 在澳大利亚开展教学证据的本土转译与使用。",
  },
  {
    key: "project",
    title: "Building a Global Evidence Ecosystem for Teaching",
    label: "全球教学证据生态",
    detail: "合作项目 · 网络沿革",
    kind: "project",
    x: 165,
    y: 350,
    relation: "全球教学证据生态项目 · 连接 EEF 的跨国合作与 EEN 的网络沿革。",
  },
  {
    key: "bhp",
    title: "BHP Foundation",
    label: "BHP Foundation",
    detail: "项目资助方",
    kind: "project",
    x: 165,
    y: 560,
    relation: "BHP Foundation → 全球教学证据生态项目 · 资助关系。",
  },
  {
    key: "toolkit",
    title: "EEF Teaching and Learning Toolkit",
    label: "教学与学习工具包",
    detail: "共同资源 · 本土转译",
    kind: "resource",
    x: 500,
    y: 560,
    relation: "教学与学习工具包 · 网络合作中的共同资源与本土转译对象。",
  },
]
const eenEdges = [
  ["een", "eef", "M500 285 C370 250 300 110 165 110"],
  ["een", "nro", "M500 285 C630 250 700 110 835 110"],
  ["een", "summa", "M500 285 C650 285 690 305 835 305"],
  ["een", "e4l", "M500 285 C625 365 695 510 835 510"],
  ["een", "project", "M500 285 C355 285 320 350 165 350"],
  ["bhp", "project", "M165 560 L165 350"],
  ["een", "toolkit", "M500 285 L500 560"],
]
// Project relations and interpretive links are separate edge types.
const oecdNodes = [
  {
    key: "oecd",
    title: "OECD",
    label: "OECD",
    detail: "经济合作与发展组织",
    kind: "hub",
    x: 500,
    y: 350,
    relation: "OECD · 沿学生测评、教育指标与研究使用三条支线阅读。",
  },
  {
    key: "pisa",
    title: "PISA",
    label: "PISA",
    detail: "学生素养评估",
    kind: "project",
    x: 140,
    y: 110,
    relation: "OECD → PISA · 国际学生评估项目，比较学生运用知识的素养。",
  },
  {
    key: "talis",
    title: "Teaching and Learning International Survey",
    label: "TALIS",
    detail: "教师与学校调查",
    kind: "project",
    x: 140,
    y: 290,
    relation: "OECD → TALIS · 教师教学国际调查，关注工作条件与教学实践。",
  },
  {
    key: "piaac",
    title: "Programme for the International Assessment of Adult Competencies",
    label: "PIAAC",
    detail: "成人技能评估",
    kind: "project",
    x: 140,
    y: 470,
    relation: "OECD → PIAAC · 国际成人能力评估，研究成人的信息处理与问题解决技能。",
  },
  {
    key: "ahelo",
    title: "OECD AHELO Project",
    label: "AHELO",
    detail: "高等教育 · 可行性研究",
    kind: "project",
    x: 140,
    y: 650,
    relation: "OECD → AHELO · 探索跨国比较高等教育学习成果的可行性。",
  },
  {
    key: "ines",
    title: "International Indicators of Education Systems",
    label: "INES",
    detail: "教育系统指标",
    kind: "project",
    x: 860,
    y: 110,
    relation: "OECD → INES →《教育概览》· 教育指标开发与报告产出。",
  },
  {
    key: "eag",
    title: "Education at a Glance",
    label: "教育概览",
    detail: "Education at a Glance",
    kind: "resource",
    x: 860,
    y: 290,
    relation: "INES →《教育概览》· 教育系统指标的报告产出。",
  },
  {
    key: "ceri",
    title: "Centre for Educational Research and Innovation",
    label: "CERI",
    detail: "教育研究与创新中心",
    kind: "partner",
    x: 860,
    y: 470,
    relation: "OECD → CERI · OECD 所属的教育研究与创新中心。",
  },
  {
    key: "impact",
    title: "Strengthening the Impact of Education Research Project",
    label: "强化教育研究影响力",
    detail: "CERI 研究项目",
    kind: "project",
    x: 860,
    y: 650,
    relation: "CERI → 强化教育研究影响力项目 · 考察研究如何进入教育政策与学校实践。",
  },
  {
    key: "numbers",
    title: "Governing by Numbers",
    label: "数字治理",
    detail: "Governing by Numbers",
    kind: "lens",
    x: 300,
    y: 860,
    relation: "解读视角 · 从量化指标、国际排名与跨国比较理解 OECD 的教育治理。",
  },
  {
    key: "brokerage",
    title: "Policy Brokerage",
    label: "政策中介",
    detail: "Policy Brokerage",
    kind: "lens",
    x: 700,
    y: 860,
    relation: "解读视角 · 考察 OECD 怎样选择、包装与转译研究证据，为教育政策提供依据。",
  },
]
const oecdEdges = [
  ["oecd", "pisa", "M500 350 C330 350 340 110 140 110", "project"],
  ["oecd", "talis", "M500 350 C330 350 330 290 140 290", "project"],
  ["oecd", "piaac", "M500 350 C330 350 330 470 140 470", "project"],
  ["oecd", "ahelo", "M500 350 C320 420 340 650 140 650", "project"],
  ["oecd", "ines", "M500 350 C670 350 660 110 860 110", "project"],
  ["ines", "eag", "M860 110 L860 290", "resource"],
  ["oecd", "ceri", "M500 350 C670 350 670 470 860 470", "partner"],
  ["ceri", "impact", "M860 470 L860 650", "project"],
  ["oecd", "numbers", "M500 350 C500 620 300 620 300 860", "lens"],
  ["oecd", "brokerage", "M500 350 C500 620 700 620 700 860", "lens"],
]

const conceptContrasts = {
  "Evidence-Based Education": ["Critique of Evidence-Based Education", "循证教育批判"],
  "Evidence-Based Policy-Making": ["Policy-Based Evidence-Making", "基于政策的证据制造"],
  "Evidence Standards": ["Local Knowledge in Evidence-Based Policy", "证据本位政策中的地方知识"],
  "Evidence Ecosystem": ["Evidence Backlash", "证据反弹"],
}

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
  ["cases", "各国案例", "Cases"],
  ["international", "国际机构与协作", "International"],
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
    ...stageTopics.flatMap((topics) =>
      topics.flatMap(([title, , , critique]) => [title, critique?.[0]]),
    ),
    ...mechanisms.map(([title]) => title),
    ...Object.values(useReadings).flatMap((entries) => entries.map(([title]) => title)),
    "Poor Research Use",
    ...Object.entries(conceptContrasts).flatMap(([title, [counter]]) => [title, counter]),
    "What Works Movement",
    "Engineered Evidence",
    "Practice-Based Evidence",
    "Democratising Evidence",
    "Evidence Era",
    ...voices.map(([title]) => title),
    ...fixedCases.flatMap(([title, , , , , related]) => [title, ...related]),
    ...institutions.map(([title]) => title),
    ...eenNodes.map((node) => node.title),
    ...oecdNodes.map(({ title }) => title),
    "International Large-Scale Assessments",
    "Governing at a Distance",
    "Critique of PISA",
    ...practiceNetworks.map(([title]) => title),
    ...international.flatMap((group) => [
      group.title,
      ...group.entries.map(([title]) => title),
      ...group.links.map(([title]) => title),
    ]),
    "Educational Evidence Clearinghouses",
    "Research Utilization Models",
    "Professional Judgment",
    "Evidence-Informed Decision-Making",
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
  // Follow evidence-specific entries to their Arguments, including reverse links.
  // Broad organizations (OECD, World Bank, funders) do not seed unrelated research.
  const seedTitles = new Set([
    ...concepts.map(([title]) => title),
    ...mechanisms.map(([title]) => title),
    ...institutions.map(([title]) => title),
    ...practiceNetworks.map(([title]) => title),
    "Critique of Evidence-Based Education",
    "Educational Evidence Clearinghouses",
  ])
  const evidenceSeeds = pages.filter(
    (page) => seedTitles.has(titleFor(page)) && titleFor(page) !== "BHP Foundation",
  )
  const seedSlugs = new Set([...roots, ...evidenceSeeds].map((page) => page.slug))
  const argumentSlugs = new Set(
    [...roots, ...evidenceSeeds].flatMap((page) =>
      linksOf(page).filter((slug) => slug.startsWith("wiki/arguments/")),
    ),
  )
  const scope = pages.filter(
    (page) =>
      curated.has(titleFor(page)) ||
      argumentSlugs.has(page.slug) ||
      (page.slug.startsWith("wiki/arguments/") &&
        linksOf(page).some((slug) => seedSlugs.has(slug))),
  )
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
      { class: "ev-draw", "data-evidence-pool": "discover" },
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
  const contrast = (title) => {
    const pair = conceptContrasts[title]
    return pair && link(pair[0], `对照阅读 · ${pair[1]}`, "ev-counter")
  }
  const evidenceDrawing = h(
    "svg",
    {
      class: "ev-evidence-drawing ev-lens-drawing",
      viewBox: "0 -24 400 340",
      role: "group",
      "aria-label": "研究证据、专业判断与地方语境共同参与教育决策，四个节点可点击阅读",
    },
    h(
      "defs",
      null,
      h(
        "radialGradient",
        { id: "ev-lens-core", cx: "35%", cy: "25%", r: "80%" },
        h("stop", { offset: "0%", "stop-color": "var(--ev-lens-highlight)" }),
        h("stop", { offset: "100%", "stop-color": "var(--ev-lens-depth)" }),
      ),
      h(
        "radialGradient",
        { id: "ev-lens-node", cx: "30%", cy: "20%", r: "90%" },
        h("stop", { offset: "0%", "stop-color": "var(--ev-lens-highlight)" }),
        h("stop", { offset: "100%", "stop-color": "var(--ev-lens-depth)" }),
      ),
    ),
    h("ellipse", {
      class: "ev-lens-orbit",
      cx: 200,
      cy: 235,
      rx: 145,
      ry: 57,
      transform: "rotate(-15 200 235)",
    }),
    h("ellipse", {
      class: "ev-lens-orbit",
      cx: 200,
      cy: 235,
      rx: 145,
      ry: 57,
      transform: "rotate(15 200 235)",
    }),
    h(
      "g",
      { class: "ev-lens-links", fill: "none" },
      [
        "M68 90 C68 170 140 170 200 235",
        "M200 48 L200 235",
        "M332 90 C332 170 260 170 200 235",
      ].map((d) => h("g", null, h("path", { d }), h("path", { d, class: "ev-lens-signal" }))),
    ),
    h("circle", { class: "ev-lens-aura", cx: 200, cy: 235, r: 70 }),
    h("circle", { class: "ev-lens-rim", cx: 200, cy: 239, r: 56 }),
    h("circle", { class: "ev-lens-core", cx: 200, cy: 235, r: 54, fill: "url(#ev-lens-core)" }),
    [
      [68, 90],
      [200, 48],
      [332, 90],
    ].map(([cx, cy]) =>
      h(
        "g",
        { class: "ev-lens-source" },
        h("circle", { cx, cy: cy + 3, r: 28, class: "ev-lens-rim" }),
        h("circle", { cx, cy, r: 27, fill: "url(#ev-lens-node)" }),
      ),
    ),
    h(
      "g",
      {
        class: "ev-lens-icons",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
      h("path", {
        d: "M55 100h26 M58 95v-10 M67 95V79 M76 95V86 M188 47l8 8 16-17 M320 79h24v22h-24z M320 86h24 M328 79v22",
      }),
    ),
    h(
      "g",
      { class: "ev-lens-labels", "text-anchor": "middle" },
      h("text", { x: 68, y: 144 }, "研究证据"),
      h("text", { x: 200, y: 2 }, "专业判断"),
      h("text", { x: 332, y: 144 }, "地方语境"),
      h("text", { x: 200, y: 244, class: "ev-lens-decision" }, "教育决策"),
    ),
    [
      ["Research Synthesis", "研究证据 · 阅读研究综合", 8, 57, 120, 99],
      ["Professional Judgment", "专业判断", 132, -20, 136, 102],
      ["Local Knowledge in Evidence-Based Policy", "地方语境 · 阅读本地知识", 272, 57, 120, 99],
      ["Evidence-Informed Decision-Making", "教育决策 · 阅读证据知情决策", 140, 177, 120, 120],
    ].map(
      ([title, label, x, y, width, height]) =>
        find(title) &&
        h(
          "a",
          {
            href: hrefFor(find(title)),
            class: "internal ev-lens-link",
            "aria-label": label,
          },
          h("title", null, label),
          h("rect", { x, y, width, height, rx: 12, class: "ev-lens-hit" }),
        ),
    ),
  )
  const networkGraph = ({ key, nodes, edges, height = 660, legend }) => {
    const graphNodes = nodes.filter((node) => find(node.title))
    const graphKeys = new Set(graphNodes.map((node) => node.key))
    return h(
      "div",
      { class: `ev-network-figure ev-${key}-network`, "data-evidence-graph": key },
      h(
        "div",
        { class: "ev-network-canvas" },
        h(
          "svg",
          {
            class: "ev-network-edges",
            viewBox: `0 0 1000 ${height}`,
            preserveAspectRatio: "none",
            "aria-hidden": "true",
          },
          edges
            .filter(([from, to]) => graphKeys.has(from) && graphKeys.has(to))
            .map(([from, to, d, kind]) =>
              h(
                "g",
                {
                  class: `ev-network-edge ${kind === "lens" || (key === "een" && (from === "bhp" || to === "project" || to === "toolkit")) ? "is-context" : ""} ${kind === "lens" ? "is-lens" : ""}`,
                  "data-from": from,
                  "data-to": to,
                },
                h("path", { d }),
                h("path", { d, class: "ev-network-stream" }),
              ),
            ),
        ),
        h(
          "ul",
          { class: "ev-network-nodes", "aria-label": `${key.toUpperCase()} 关联条目` },
          graphNodes.map((node) =>
            h(
              "li",
              {
                style: { "--node-x": `${node.x / 10}%`, "--node-y": `${(node.y / height) * 100}%` },
                class: `ev-graph-position is-${node.kind}`,
              },
              h(
                "a",
                {
                  class: `internal ev-graph-node is-${node.kind}`,
                  href: hrefFor(find(node.title)),
                  "data-graph-node": node.key,
                  "data-relation": node.relation,
                },
                h("strong", null, node.label),
                h("span", null, node.detail),
              ),
            ),
          ),
        ),
      ),
      h(
        "div",
        { class: "ev-network-legend" },
        legend.map(([kind, label]) => h("span", { class: `is-${kind}` }, label)),
      ),
      h(
        "p",
        { class: "ev-network-caption", "data-graph-caption": true, "aria-live": "polite" },
        "点击节点进入条目；悬停或聚焦查看关系。",
      ),
    )
  }
  const methodEntry = ([title, label, critique], props = {}) =>
    find(title) &&
    h(
      "li",
      props,
      h(
        "a",
        { href: hrefFor(find(title)), class: "internal ev-method-main" },
        h("strong", null, label),
        h("span", { lang: "en" }, title),
      ),
      h("em", { "aria-label": `${count(title)} 次库内引用` }, count(title)),
      critique &&
        find(critique) &&
        link(critique, `对照阅读 · ${critiqueLabels[critique]}`, "ev-counter"),
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
          h("b", null, link("What Works Movement", "证据等级与什么有效")),
          h("span", null, "常见的排序方式；数字为库内引用次数，方法条目附对照阅读。"),
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
            "article",
            { class: "ev-concept-lead" },
            h("span", { class: "ev-tag" }, "起点"),
            evidenceDrawing,
            h("h3", null, link(lead[0], lead[1])),
            h("span", { lang: "en" }, lead[0]),
            h("p", null, lead[2]),
            h("em", null, h("b", null, count(lead[0])), " 次引用"),
            contrast(lead[0]),
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
              contrast(title),
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
        "点击展开一个研究环节，先读简评，再进入方法与对照阅读。",
      ),
      h(
        "div",
        { class: "ev-method-chapters" },
        methods.map((group, index) =>
          h(
            "details",
            { class: "ev-method-chapter", open: index === 0, "data-evidence-chapter": group.key },
            h(
              "summary",
              {
                "aria-controls": `evidence-chapter-${group.key}`,
                "aria-expanded": String(index === 0),
              },
              h("span", { class: "ev-chapter-number" }, group.code),
              h(
                "span",
                { class: "ev-chapter-heading" },
                h("strong", null, group.title),
                h("span", null, group.note),
              ),
              h("small", null, "固定 2 + 随机 4"),
              h("span", { class: "ev-chapter-toggle", "aria-hidden": "true" }, "+"),
            ),
            h(
              "div",
              { id: `evidence-chapter-${group.key}`, class: "ev-chapter-body" },
              h(
                "div",
                { class: "ev-method-review" },
                h("h3", null, "怎样读这一环节"),
                h("p", null, group.review),
              ),
              h("h4", { class: "ev-method-label" }, "固定阅读"),
              h(
                "ol",
                { class: "ev-method-readings ev-method-fixed", "data-method-fixed": group.key },
                group.items.slice(0, 2).map((item) => methodEntry(item)),
              ),
              h(
                "div",
                { class: "ev-method-random-heading" },
                h(
                  "h4",
                  { class: "ev-method-label" },
                  "随机延伸",
                  h(
                    "small",
                    null,
                    `从 ${group.items.slice(2).filter(([title]) => find(title)).length} 条中抽取 4 条`,
                  ),
                ),
                h(
                  "button",
                  {
                    type: "button",
                    class: "ev-shuffle",
                    "data-evidence-refresh": `methods-${group.key}`,
                  },
                  "换四条 ↻",
                ),
              ),
              h(
                "ol",
                {
                  class: "ev-method-readings ev-method-random",
                  "data-evidence-pool": `methods-${group.key}`,
                  "data-evidence-limit": 4,
                  "aria-live": "polite",
                  "aria-atomic": "true",
                },
                group.items
                  .slice(2)
                  .filter(([title]) => find(title))
                  .map((item, index) =>
                    methodEntry(item, { "data-evidence-item": true, hidden: index >= 4 }),
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
        "从研究问题到课堂使用，把相关概念放回具体环节。",
      ),
      h(
        "div",
        { class: "ev-transfer-intro" },
        h(
          "div",
          null,
          h("h3", null, link("Educational Evidence Clearinghouses", "教育证据清算中心")),
          h("p", null, "从形成问题到使用反馈，按阅读环节连接研究、证据中介与学校实践。"),
        ),
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
            "aria-label": "证据传播与使用的六个阅读环节",
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
            h(
              "header",
              { class: "ev-stage-intro" },
              h("span", null, `环节 ${pad(index)} / 06`),
              h("h3", null, title),
              h("p", null, note),
              link(target, `${targetLabel} ↗`),
            ),
            h(
              "div",
              { class: "ev-stage-readings" },
              stageTopics[index].map(
                ([topic, label, comment, critique]) =>
                  find(topic) &&
                  h(
                    "div",
                    { class: "ev-stage-entry" },
                    h("h4", null, link(topic, label)),
                    h("p", null, comment),
                    h(
                      "nav",
                      { class: "ev-stage-links", "aria-label": `${label}延伸阅读` },
                      (useReadings[topic] ?? []).map(([related, text]) => link(related, text)),
                    ),
                    critique && link(critique[0], `对照阅读 · ${critique[1]}`, "ev-counter"),
                  ),
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
        3,
        "Institutions & Cases",
        "各国机构与案例",
        "从四个案例进入，也可随机认识一家证据机构。",
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
        { class: "ev-institution-draw" },
        h(
          "div",
          { class: "ev-institution-intro" },
          h("h3", null, "认识一家证据机构"),
          h("p", null, "从证据机构、实践网络及知识服务中抽取一条，了解其工作与制度背景。"),
          h(
            "button",
            { type: "button", class: "ev-shuffle", "data-evidence-refresh": "institutions" },
            "换一家 ↻",
          ),
        ),
        h(
          "div",
          {
            "data-evidence-pool": "institutions",
            class: "ev-institution-pool",
            "aria-live": "polite",
            "aria-atomic": "true",
          },
          institutionPool
            .filter(([title]) => find(title))
            .map(([title, label, country, role, note], index) =>
              h(
                "article",
                { "data-evidence-item": true, hidden: index > 0 },
                h("p", { class: "ev-institution-meta" }, `${country} · ${role}`),
                h("h3", null, link(title, label)),
                h("p", { lang: "en" }, title),
                h("p", null, note),
                link(title, "阅读条目 ↗", "ev-action"),
              ),
            ),
        ),
      ),
    ),
    // -------------------------------------------------------- international
    h(
      "section",
      { class: "ev-section ev-international" },
      head(
        "international",
        4,
        "International",
        "国际机构与协作",
        "顺着组织、合作方与具体项目，阅读跨国证据工作。",
      ),
      find("Evidence for Education Network") &&
        h(
          "article",
          { class: "ev-een-hub" },
          h(
            "header",
            { class: "ev-een-heading" },
            h(
              "div",
              null,
              h("h3", null, link("Evidence for Education Network", "教育证据网络")),
              h("p", { lang: "en" }, "Evidence for Education Network"),
            ),
            h("p", null, "围绕 EEN 阅读合作机构、共同工具与项目沿革；资助关系连接到对应项目。"),
          ),
          networkGraph({
            key: "een",
            nodes: eenNodes,
            edges: eenEdges,
            legend: [
              ["partner", "合作机构"],
              ["resource", "共同资源"],
              ["project", "项目与资助"],
            ],
          }),
        ),
      find("OECD") &&
        h(
          "article",
          { class: "ev-oecd" },
          h(
            "header",
            { class: "ev-oecd-heading" },
            h(
              "div",
              null,
              h("h3", null, link("OECD", "经济合作与发展组织")),
              h("p", { lang: "en" }, "OECD"),
            ),
            h("p", null, "从学生测评与教育指标进入，再沿研究使用项目与治理概念展开阅读。"),
          ),
          networkGraph({
            key: "oecd",
            nodes: oecdNodes,
            edges: oecdEdges,
            height: 1000,
            legend: [
              ["partner", "研究中心"],
              ["project", "项目与报告"],
              ["lens", "治理视角 · 虚线"],
            ],
          }),
          h(
            "nav",
            { class: "ev-oecd-readings", "aria-label": "OECD 对照与延伸阅读" },
            link("Critique of PISA", "对照阅读 · PISA 批判", "ev-counter"),
            link("International Large-Scale Assessments", "国际大规模评估"),
            link("Governing at a Distance", "远处治理"),
            link("EU Evidence-Informed Education Policy Initiatives", "欧盟证据知情政策倡议"),
          ),
        ),
      h(
        "div",
        { class: "ev-secondary-orgs" },
        h("h3", null, "其他国际协作入口"),
        international
          .filter((group) => group.key === "synthesis" || group.key === "donors")
          .map(
            (group) =>
              find(group.title) &&
              h(
                "article",
                null,
                h("h4", null, link(group.title, group.label)),
                h("p", { lang: "en" }, group.title),
                h("p", null, group.note),
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
        5,
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
      head("latest", 6, "Latest", "最新条目", "本专题相关条目的最近更新。"),
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
  const chapterMotion = new Map()
  const chapters = [...root.querySelectorAll('[data-evidence-chapter]')]
  const setChapter = (chapter, expanded) => {
    const start = chapter.getBoundingClientRect().height
    chapterMotion.get(chapter)?.cancel()
    chapterMotion.delete(chapter)
    chapter.dataset.expanded = String(expanded)
    chapter.querySelector('summary').setAttribute('aria-expanded', String(expanded))
    if (reduced || !chapter.animate) { chapter.open = expanded; return }
    chapter.open = true
    const end = expanded ? chapter.scrollHeight : chapter.querySelector('summary').getBoundingClientRect().height
    const motion = chapter.animate([{ height: start + 'px' }, { height: end + 'px' }], { duration: 340, easing: 'cubic-bezier(.2,.8,.2,1)' })
    chapterMotion.set(chapter, motion)
    motion.finished.then(() => {
      if (chapterMotion.get(chapter) !== motion) return
      chapter.open = expanded
      chapterMotion.delete(chapter)
    }).catch(() => {})
  }
  chapters.forEach((chapter) => {
    chapter.dataset.expanded = String(chapter.open)
    chapter.querySelector('summary').addEventListener('click', (event) => {
      event.preventDefault()
      const expanded = chapter.dataset.expanded !== 'true'
      if (expanded) chapters.forEach((other) => { if (other !== chapter && other.dataset.expanded === 'true') setChapter(other, false) })
      setChapter(chapter, expanded)
    })
  })
  window.addCleanup?.(() => { chapterMotion.forEach((motion) => motion.cancel()); chapterMotion.clear() })
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
  root.querySelectorAll('[data-evidence-graph]').forEach((graph) => {
    const nodes = [...graph.querySelectorAll('[data-graph-node]')]
    const edges = [...graph.querySelectorAll('.ev-network-edge')]
    const caption = graph.querySelector('[data-graph-caption]')
    const fallback = caption.textContent
    const focus = (key) => {
      const related = new Set(key ? [key] : [])
      edges.forEach((edge) => {
        const active = !!key && (edge.dataset.from === key || edge.dataset.to === key)
        edge.classList.toggle('is-connected', active)
        if (active) { related.add(edge.dataset.from); related.add(edge.dataset.to) }
      })
      graph.dataset.active = String(!!key)
      nodes.forEach((node) => node.classList.toggle('is-connected', related.has(node.dataset.graphNode)))
      caption.textContent = nodes.find((node) => node.dataset.graphNode === key)?.dataset.relation ?? fallback
    }
    graph.addEventListener('pointerover', (event) => { const node = event.target.closest('[data-graph-node]'); if (node) focus(node.dataset.graphNode) })
    graph.addEventListener('pointerleave', () => focus(document.activeElement?.closest('[data-graph-node]')?.dataset.graphNode))
    graph.addEventListener('focusin', (event) => focus(event.target.closest('[data-graph-node]')?.dataset.graphNode))
    graph.addEventListener('focusout', (event) => { if (!graph.contains(event.relatedTarget)) focus() })
  })
  const rotate = (container, animated) => {
    const items = [...container.querySelectorAll('[data-evidence-item]')]
    if (items.length < 2) return
    const limit = Math.min(items.length, Number(container.dataset.evidenceLimit) || 1)
    if (limit > 1) {
      const previous = items.filter((item) => !item.hidden)
      const shuffled = [...items]
      for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] }
      const selected = shuffled.slice(0, limit)
      if (animated && items.length > limit && selected.every((item) => previous.includes(item))) {
        selected[limit - 1] = shuffled.find((item) => !previous.includes(item))
      }
      items.forEach((item) => { item.hidden = !selected.includes(item) })
      if (animated) selected.forEach((item) => animate(item, [{ opacity: .2, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }]))
      return
    }
    const current = items.findIndex((item) => !item.hidden)
    const next = animated ? (Math.max(0, current) + 1 + Math.floor(Math.random() * (items.length - 1))) % items.length : Math.floor(Math.random() * items.length)
    items.forEach((item, index) => { item.hidden = index !== next })
    if (animated) animate(items[next], [{ opacity: .2, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }])
  }
  root.querySelectorAll('[data-evidence-pool]').forEach((pool) => rotate(pool, false))
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-evidence-refresh]')
    if (!button) return
    root.querySelectorAll('[data-evidence-pool]').forEach((pool) => {
      if (pool.dataset.evidencePool === button.dataset.evidenceRefresh) rotate(pool, true)
    })
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
.ev-concept-lead h3 { font-size: clamp(1.8rem, 3vw, 2.4rem); letter-spacing: -0.03em; margin-top: 0; padding-top: 0; }
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
.ev-ledger em { color: var(--ev-ink); font-family: var(--ev-mono); font-size: 0.82rem; text-align: right; font-variant-numeric: tabular-nums; }

/* methods ---------------------------------------------------------------- */
.ev-page .ev-counter { display: inline-flex; flex-wrap: wrap; gap: 0.1rem 0.5rem; align-items: baseline; justify-self: start; padding: 0.35rem 0.7rem; border-radius: 8px; background: var(--ev-doubt-soft); color: var(--ev-doubt); font-size: 0.82rem; font-weight: 600; transition: transform 160ms ease; }
.ev-counter span { font-size: 0.66rem; letter-spacing: 0.08em; opacity: 0.85; }
a.ev-counter:hover { transform: translateX(3px); }
.ev-page .ev-counter.is-empty { background: none; padding: 0; }

/* transfer --------------------------------------------------------------- */
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

/* Refined evidence components -------------------------------------------- */
.ev-evidence-drawing { display: block; width: 100%; min-height: 160px; max-height: 260px; flex: 1 1 auto; color: var(--ev-signal); margin: 0.5rem 0 1rem; }
.ev-concept-lead .ev-counter { margin-top: 0.5rem; }
.ev-ledger > li { padding-bottom: 0.65rem; border-bottom: 1px solid var(--ev-line); }
.ev-ledger > li > a.internal:not(.ev-counter) { border-bottom: 0; }
.ev-ledger > li > .ev-counter { margin-left: 0.4rem; }
.ev-ledger .ev-counter { display: inline-flex; grid-template-columns: none; }
.ev-institution-draw { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.5fr); gap: 2rem; padding: 1.5rem; background: var(--ev-signal-soft); border-radius: 12px; }
.ev-institution-intro { display: grid; gap: 0.7rem; align-content: start; }
.ev-institution-intro h3 { font-size: 1.25rem; }
.ev-institution-intro p { color: var(--ev-muted); font-size: 0.9rem; }
.ev-institution-pool { min-height: 13.5rem; }
.ev-institution-pool article { display: grid; gap: 0.65rem; align-content: start; }
.ev-institution-pool h3 { font-size: clamp(1.4rem, 2.4vw, 1.8rem); line-height: 1.35; }
.ev-institution-pool p { font-size: 0.95rem; }
.ev-institution-pool p[lang] { color: var(--ev-muted); font-size: 0.88rem; overflow-wrap: anywhere; }
.ev-institution-meta { color: var(--ev-signal); font-size: 0.85rem; }
.ev-institution-pool .ev-action { margin-top: 0.4rem; }
.ev-compass { grid-template-columns: repeat(4, minmax(0, 1fr)); }
@media (max-width: 860px) {
  .ev-method-review, .ev-flow-panel { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .ev-institution-pool { min-height: 16rem; }
  .ev-evidence-drawing { max-height: 200px; }
}

/* Reading chapters ------------------------------------------------------- */
.ev-method-chapters { display: grid; gap: 0.8rem; }
.ev-method-chapter { overflow: hidden; border-radius: 12px; background: var(--ev-card); }
.ev-method-chapter > summary { display: grid; grid-template-columns: 2rem minmax(0,1fr) auto 1.5rem; align-items: center; gap: 1rem; padding: 1.2rem 1.4rem; cursor: pointer; list-style: none; min-height: 100px; }
.ev-method-chapter > summary::-webkit-details-marker { display: none; }
.ev-chapter-number { color: var(--ev-signal); font-variant-numeric: tabular-nums; }
.ev-chapter-heading { display: grid; gap: 0.3rem; }
.ev-chapter-heading > strong { font-family: var(--headerFont); font-size: 1.35rem; }
.ev-chapter-heading > span, .ev-method-chapter summary > small { color: var(--ev-muted); font-size: 0.9rem; }
.ev-chapter-toggle { color: var(--ev-signal); font-size: 1.5rem; transition: transform 250ms ease; text-align: center; }
.ev-method-chapter[data-expanded="true"] > summary, .ev-method-chapter[open]:not([data-expanded]) > summary { background: var(--ev-signal-soft); }
.ev-method-chapter[data-expanded="true"] .ev-chapter-toggle, .ev-method-chapter[open]:not([data-expanded]) .ev-chapter-toggle { transform: rotate(45deg); }
.ev-method-chapter summary:hover { background: var(--ev-signal-soft); }
.ev-method-chapter summary:focus-visible { outline: 2px solid var(--ev-signal); outline-offset: -3px; }
.ev-chapter-body { display: grid; gap: 1.4rem; padding: 1.4rem; }
.ev-method-review { display: grid; grid-template-columns: 8rem minmax(0,1fr); gap: 1rem; }
.ev-method-review h3 { font-size: 0.95rem; color: var(--ev-signal); padding-top: 0.15rem; }
.ev-method-review p { font-size: 1rem; line-height: 1.75; }
.ev-method-readings { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 0.75rem 1.5rem; }
.ev-method-readings > li { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 0.5rem 0.8rem; align-content: start; padding: 0.9rem 0; border-top: 1px solid var(--ev-line); }
.ev-method-main { display: grid; gap: 0.2rem; }
.ev-method-main strong { font-size: 1rem; }
.ev-method-main > span { font-size: 0.84rem; color: var(--ev-muted); }
.ev-method-readings em { color: var(--ev-muted); font-size: 0.85rem; font-variant-numeric: tabular-nums; }
.ev-method-readings .ev-counter { grid-column: 1 / -1; }
/* Concepts integrated into use stages ------------------------------------ */
.ev-transfer-intro { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }
.ev-transfer-intro h3 { font-size: 1.3rem; }
.ev-transfer-intro p { color: var(--ev-muted); font-size: 0.95rem; margin-top: 0.4rem; }
.ev-flow-steps { grid-template-columns: repeat(6,minmax(0,1fr)); gap: 0.6rem; }
.ev-flow-steps::before, .ev-flow-steps::after { display: none; }
.ev-flow-panel { grid-template-columns: minmax(0,0.8fr) minmax(0,1.25fr); gap: 1.5rem 2rem; padding: 1.4rem; }
.ev-stage-intro { display: grid; gap: 0.5rem; align-content: start; }
.ev-stage-intro > span { color: var(--ev-signal); font-size: 0.85rem; }
.ev-stage-intro h3 { font-size: 1.6rem; }
.ev-stage-intro p { font-size: 1rem; line-height: 1.75; }
.ev-stage-intro a { font-size: 0.9rem; }
.ev-stage-readings { display: grid; align-content: start; gap: 1.4rem; }
.ev-stage-entry h4 { font-size: 1.05rem; }
.ev-stage-entry > p { font-size: 0.92rem; color: var(--ev-muted); margin-top: 0.4rem; }
.ev-stage-entry .ev-counter { margin-top: 0.7rem; border: 0; }
.ev-stage-links { display: flex; flex-wrap: wrap; gap: 0.4rem 1rem; }
.ev-stage-links a { font-size: 0.9rem; color: var(--ev-signal); border: 0; }
@media (max-width: 860px) {
  .ev-method-review, .ev-flow-panel { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .ev-method-chapter > summary { grid-template-columns: minmax(0,1fr) auto 1.2rem; gap: 0.6rem; padding: 1rem; }
  .ev-chapter-number { display: none; }
  .ev-chapter-heading > strong { font-size: 1.25rem; }
  .ev-chapter-heading > span { font-size: 0.85rem; }
  .ev-method-chapter summary > small { font-size: 0.8rem; }
  .ev-chapter-body { padding: 1rem; }
  .ev-method-readings { grid-template-columns: 1fr; }
  .ev-flow-steps { grid-template-columns: repeat(3,minmax(0,1fr)); gap: 0.9rem 0.4rem; }
  .ev-flow-panel { padding: 1rem; }
  .ev-transfer-intro { align-items: start; flex-direction: column; gap: 0.7rem; }
  .ev-institution-draw { grid-template-columns: 1fr; }
}

/* Rendered evidence lens ------------------------------------------------- */
.ev-lens-drawing { --ev-lens-highlight: color-mix(in srgb,var(--ev-signal) 35%,var(--light)); --ev-lens-depth: color-mix(in srgb,var(--ev-signal) 10%,var(--light)); overflow: visible; }
.ev-lens-orbit { fill: none; stroke: var(--ev-signal); stroke-width: 0.8; opacity: 0.14; }
.ev-lens-links > g > path { stroke: var(--ev-signal); stroke-width: 1.3; opacity: 0.3; }
.ev-lens-links > g > .ev-lens-signal { stroke-width: 2.3; stroke-dasharray: 4 26; opacity: 0.9; animation: ev-evidence-stream 8s linear infinite; }
.ev-lens-links > g:nth-child(2) > .ev-lens-signal { animation-delay: -2s; }
.ev-lens-links > g:nth-child(3) > .ev-lens-signal { animation-delay: -4s; }
.ev-lens-aura { fill: var(--ev-signal); opacity: 0.06; transform-box: fill-box; transform-origin: center; animation: ev-lens-breathe 5s ease-in-out infinite; }
.ev-lens-rim { fill: var(--ev-lens-depth); stroke: var(--ev-signal); stroke-width: 1; opacity: 0.5; }
.ev-lens-core, .ev-lens-source > circle:last-child { stroke: var(--ev-signal); stroke-width: 1.4; }
.ev-lens-icons { stroke: var(--ev-signal); stroke-width: 2.2; }
.ev-lens-hit { fill: transparent; stroke: transparent; stroke-width: 2; transition: fill 180ms ease, stroke 180ms ease; }
.ev-lens-link { cursor: pointer; }
.ev-lens-link:hover .ev-lens-hit, .ev-lens-link:focus-visible .ev-lens-hit { fill: color-mix(in srgb,var(--ev-signal) 7%,transparent); stroke: var(--ev-signal); }
.ev-lens-link:focus-visible { outline: none; }
.ev-lens-labels { fill: var(--ev-ink); font-family: var(--bodyFont); font-size: 23px; font-weight: 600; }
.ev-lens-labels .ev-lens-decision { font-size: 24px; fill: var(--ev-ink); }
@keyframes ev-evidence-stream { to { stroke-dashoffset: -120; } }
@keyframes ev-lens-breathe { 50% { transform: scale(1.13); opacity: 0.1; } }
/* EEN clickable association graph ---------------------------------------- */
.ev-een-hub { background: var(--ev-signal-soft); padding: 1.5rem; border-radius: 12px; }
.ev-een-heading, .ev-oecd-heading { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
.ev-een-heading h3, .ev-oecd-heading h3 { font-size: 1.6rem; }
.ev-een-heading [lang], .ev-oecd-heading [lang] { color: var(--ev-muted); font-size: 0.9rem; margin-top: 0.4rem; }
.ev-een-heading > p, .ev-oecd-heading > p { font-size: 0.98rem; line-height: 1.7; }
.ev-network-canvas { position: relative; width: 100%; min-width: 0; aspect-ratio: 1000 / 660; min-height: 33rem; margin-top: 0.6rem; }
.ev-network-edges { width: 100%; height: 100%; position: absolute; inset: 0; pointer-events: none; overflow: visible; }
.ev-network-edge path { fill: none; stroke: var(--ev-signal); stroke-width: 1.6; opacity: 0.35; transition: opacity 200ms ease; }
.ev-network-edge.is-context > path { stroke-dasharray: 5 7; }
.ev-network-edge .ev-network-stream { stroke-dasharray: 2 20; stroke-width: 2.5; opacity: 0.6; animation: ev-evidence-stream 12s linear infinite; }
.ev-network-nodes { position: absolute; inset: 0; }
.ev-graph-position { position: absolute; left: var(--node-x); top: var(--node-y); width: 22%; transform: translate(-50%,-50%); }
.ev-graph-position.is-hub { width: 28%; z-index: 2; }
.ev-page .ev-graph-node { display: grid; justify-items: center; gap: 0.45rem; text-align: center; padding: 1rem 0.7rem; border-radius: 12px; background: var(--light); box-shadow: 0 5px 18px color-mix(in srgb,var(--ev-ink) 5%,transparent); border: 1px solid color-mix(in srgb,var(--ev-signal) 28%,transparent); transition: transform 200ms ease, opacity 200ms ease, border-color 200ms ease; }
.ev-graph-node strong { font-size: 1rem; line-height: 1.35; }
.ev-graph-node span { font-size: 0.83rem; line-height: 1.4; color: var(--ev-muted); }
.ev-page .ev-graph-node.is-hub { padding: 1.4rem 0.7rem; background: var(--ev-ink); color: var(--light); border-color: var(--ev-signal); }
.ev-graph-node.is-hub strong { font-size: 2rem; }
.ev-graph-node.is-hub span { color: var(--light); opacity: 0.85; font-size: 0.95rem; }
.ev-graph-node.is-project { border-style: dashed; }
.ev-graph-node.is-resource { border-color: var(--ev-doubt); }
.ev-page .ev-graph-node:hover, .ev-page .ev-graph-node:focus-visible { transform: translateY(-4px); border-color: var(--ev-signal); }
.ev-network-figure[data-active="true"] .ev-graph-node:not(.is-connected) { opacity: 0.35; }
.ev-network-figure[data-active="true"] .ev-network-edge:not(.is-connected) path { opacity: 0.08; }
.ev-network-figure .ev-network-edge.is-connected path { opacity: 0.95; stroke-width: 2.8; }
.ev-network-legend { display: flex; flex-wrap: wrap; gap: 0.6rem 1.3rem; justify-content: center; }
.ev-network-legend span { color: var(--ev-muted); font-size: 0.85rem; }
.ev-network-legend span::before { content: ""; display: inline-block; vertical-align: middle; width: 9px; height: 9px; margin-right: 0.4rem; border-radius: 50%; background: var(--ev-signal); }
.ev-network-legend .is-resource::before { background: var(--ev-doubt); }
.ev-network-legend .is-project::before { background: transparent; outline: 1px dashed var(--ev-signal); }
.ev-network-caption { min-height: 3.5rem; margin-top: 0.9rem !important; font-size: 0.92rem; line-height: 1.65; color: var(--ev-muted) !important; text-align: center; }
/* OECD projects and analytic concepts ------------------------------------ */
.ev-oecd { display: grid; gap: 1.4rem; margin-top: 1rem; }
.ev-secondary-orgs { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1rem 2rem; }
.ev-secondary-orgs > h3 { grid-column: 1 / -1; font-size: 1.2rem; }
.ev-secondary-orgs article { padding-top: 1rem; border-top: 1px solid var(--ev-line); }
.ev-secondary-orgs h4 { font-size: 1.15rem; }
.ev-secondary-orgs p { font-size: 0.93rem; line-height: 1.7; margin-top: 0.5rem; }
.ev-secondary-orgs p[lang] { color: var(--ev-muted); font-size: 0.85rem; }
@media (max-width: 860px) { .ev-een-heading, .ev-oecd-heading { grid-template-columns: 1fr; gap: 0.7rem; } }
@media (max-width: 600px) {
  .ev-een-hub { padding: 1rem; }
  .ev-network-canvas { aspect-ratio: auto; min-height: 0; margin-top: 1.4rem; }
  .ev-network-edges { display: none; }
  .ev-network-nodes { position: static; display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 0.7rem; }
  .ev-graph-position, .ev-graph-position.is-hub { position: static; transform: none; width: auto; }
  .ev-graph-position.is-hub { grid-column: 1 / -1; grid-row: 1; }
  .ev-page .ev-graph-node { height: 100%; padding: 0.9rem 0.6rem; }
  .ev-graph-node strong { font-size: 0.95rem; }
  .ev-graph-node.is-hub strong { font-size: 1.6rem; }
  .ev-network-legend { margin-top: 1.3rem; }
  .ev-network-caption { min-height: 4.7rem; }
  .ev-secondary-orgs { grid-template-columns: 1fr; }
}

/* Fixed anchors, sampled reading pools and OECD relationship map */
.ev-method-label { font-size: 0.95rem; color: var(--ev-muted); margin: 0; }
.ev-method-label small { font-size: 0.82rem; font-weight: 400; margin-left: 0.8rem; }
.ev-method-random-heading { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-top: 1.2rem; }
.ev-method-random-heading .ev-shuffle { padding: 0.5rem 0.9rem; font-size: 0.85rem; }
.ev-oecd-network .ev-network-canvas { aspect-ratio: 1; min-height: 52rem; }
.ev-oecd-network .ev-graph-position { width: 26%; }
.ev-oecd-network .ev-graph-position.is-hub { width: 30%; }
.ev-oecd-network .ev-graph-node.is-project { border-style: solid; }
.ev-graph-node.is-lens { border-color: var(--ev-doubt); border-style: dashed; }
.ev-network-edge.is-lens path { stroke: var(--ev-doubt); }
.ev-network-legend .is-lens::before { background: var(--ev-doubt); }
.ev-oecd-readings { display: flex; flex-wrap: wrap; gap: 0.6rem 1.2rem; align-items: center; margin-top: 1rem; }
.ev-oecd-readings > a { font-size: 0.9rem; }
@media (max-width: 600px) {
  .ev-oecd-network .ev-network-canvas { min-height: 0; aspect-ratio: auto; }
  .ev-oecd-network .ev-graph-position, .ev-oecd-network .ev-graph-position.is-hub { width: auto; }
  .ev-method-label small { display: block; margin: 0.3rem 0 0; }
  .ev-method-random-heading { align-items: start; }
}

/* responsive ------------------------------------------------------------- */
@media (max-width: 1100px) {
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
  .ev-concept-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .ev-hero-nav { flex-direction: column; align-items: start; gap: 0.3rem; }
  .ev-compass { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ev-compass a, .ev-compass a:nth-child(4n + 1) { border-left: 0; padding-left: 0; border-top: 1px solid var(--ev-line); }
  .ev-compass a:nth-child(-n + 2) { border-top: 0; }
  .ev-ledger a { grid-template-columns: minmax(0, 1fr) 2.6rem; }
  .ev-ledger a p { grid-column: 1 / -1; grid-row: 2; }
  .ev-flow { padding: 0.9rem; }
  .ev-flow-steps span { width: 38px; height: 38px; }
  .ev-flow-steps::before, .ev-flow-steps::after { top: 19px; }
  .ev-flow-steps strong { font-size: 0.72rem; }
  .ev-case-grid, .ev-draws { grid-template-columns: 1fr; }
  .ev-latest-list a { grid-template-columns: 1fr; gap: 0.2rem; }
}
@media (prefers-reduced-motion: reduce) {
  .ev-page *, .ev-page *::before, .ev-page *::after { transition: none !important; animation: none !important; }
  .ev-page a:hover, .ev-page button:hover, .ev-case:hover { transform: none !important; }
}
`

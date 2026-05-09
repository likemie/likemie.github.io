---
title: Campbellian Validity Framework
type: theory
tags: [Campbellian-validity, internal-validity, external-validity, experimental-design, causal-inference, research-methodology]
related_concepts: ["[[Single-Case Design (SCD)]]", "[[Gating Procedure]]", "[[Evidence-Based Education]]", "[[Educational Evidence Clearinghouses]]", "[[5-3-20 Rule]]"]
related_persons: []
related_methods: ["[[Single-Case Design (SCD)]]", "[[Randomised Controlled Trials]]"]
sources: ["sources/Hitchcock_2015_JBE.md", "sources/Wadhwa_2024_RER.md"]
confidence: low
status: draft
created: 2026-05-02
updated: 2026-05-05
---

## 核心主张

Campbellian 效度框架是一个关于实验设计中因果推断效度的系统理论框架，其核心主张是：任何能够产生因果证据的实验设计都需要通过排除对内部效度的威胁来建立因果关系，然后才能进一步考虑这种因果关系的推广范围（Hitchcock et al., 2015, p.462）。

> "The Campbellian validity framework (Shadish 1995; Shadish et al. 2002) applies to a broad number of designs that are capable of yielding causal evidence." (Hitchcock et al., 2015, p.462)

该框架的适用范围不限于某一特定设计类型——它统一适用于随机对照试验（RCT）、准实验设计、单一个案设计（SCD）等多种能够产生因果证据的设计（Hitchcock et al., 2015, p.462）。

> 例：无论是 RCT 通过随机分配控制选择偏差，还是 SCD 通过重复测量和阶段对比排除成熟效应，两者都在应用 Campbellian 框架的同一逻辑——识别并排除对因果推断的替代解释。

## 理论内部结构

### 内部效度（Internal Validity）

**定义**：内部效度指干预与结果变量之间因果关系的成立程度——即我们能否确信观察到的变化确实是由干预引起的（Shadish et al., 2002; Hitchcock et al., 2015, p.461）。

> "Internal validity, or the degree to which a causal relationship exists between a treatment and outcome variable is valid, is the sin qua non of experimental design." (Hitchcock et al., 2015, p.461, citing Shadish et al., 2002)

**判断程序**：首先明确手中的因果问题，然后选择能够控制常见内部效度威胁的设计。这些威胁本质上是干预后因变量变化的各种替代解释（Hitchcock et al., 2015, p.462）。

> 例：在评估一种新的阅读干预时，如果学生的阅读成绩在干预后提高了，这可能是干预的效果，也可能是因为学生自然成熟（maturation）或在干预期间学校同时推行了其他阅读计划（history）。一个好的实验设计需要排除这些替代解释。

**内部效度的常见威胁**（Shadish et al., 2002; Hitchcock et al., 2015, p.462）：

| 威胁 | 含义 | SCD 中的控制方式 |
|------|------|-----------------|
| 成熟（Maturation） | 被试随时间自然发展或变化 | 通过 ABAB 设计中的撤除和再引入阶段，若行为随干预的有无系统性变化则排除成熟效应 |
| 历史（History） | 实验期间发生的外部事件 | 多基线设计在不同时间点引入干预，若每个基线在干预引入时才变化则排除历史效应 |
| 回归均值（Regression to the Mean） | 极端分数向均值自然回归 | 稳定的基线模式（足够多的基线数据点）可排除此威胁 |
| 处理扩散（Diffusion of Treatment） | 干预效果扩散到控制条件 | 需要验证控制条件是否未被干预"污染" |
| 工具化（Instrumentation） | 测量工具或观察者标准变化 | 要求结果被可靠测量（信度证据） |

SCD 可以通过设计使这些替代解释变得不可信。识别这些设计特征的存在即可产生关于"干预是否按预期起作用"的判断（Hitchcock et al., 2015, p.462）。

### 外部效度（External Validity）

**定义**：外部效度指某项研究的因果推断在不同情境、场所、测量工具、人群等条件下仍然成立的程度——可视为推广性（generalization）的一个广泛面向（Shadish et al., 2002; Hitchcock et al., 2015, p.462）。

> "External validity refers to the extent to which causal inference from a particular study holds over different contexts, settings, measures, populations, and so on." (Hitchcock et al., 2015, p.462)

> 例：一项在郊区高收入学校进行的 SCD 研究发现某种行为干预有效——但该发现能否推广到城市低收入学校？能否推广到不同年龄的学生？能否推广到不同的行为结果（如从课堂参与推广到学业成绩）？这些都是外部效度问题。

**评估外部效度的复杂性**（Hitchcock et al., 2015, pp.462–463）：

Hitchcock et al. 指出，评估外部效度远比评判内部效度复杂，原因至少有三：

1. **威胁种类繁多且不穷尽**：许多因素或实验特征可能代表推广能力的威胁，"有些因素容易识别，有些则不是"（p.462）
2. **推广目标未知**：进行证据综合的审查者"可能不知道信息消费者希望推广到哪个点"（p.463）——消费者可能是政策制定者（关注全国范围推广）、学区管理者（关注本地适配）或一线教师（关注特定学生群体）
3. **SCD 面临额外偏见**：存在一种普遍（但错误）的信念认为 SCD 证据不能推广，尽管事实上它可以（Barlow et al., 2009; Hitchcock et al., 2015, p.467）

**外部效度的常见威胁**（Kazdin, 2011; Shadish et al., 2002; Hitchcock et al., 2015, p.462）：

| 威胁 | 含义 |
|------|------|
| 多重处理干扰（Multiple-Treatment Interference） | 观察到的效果可能由多个交互作用的处理导致，则该效果不会推广到单一处理的情境 |
| 跨情境推广性（Generality across Settings） | 效果是否在不同类型的场所（学校/诊所/家庭）中成立 |
| 跨被试推广性（Generality across Subjects） | 效果是否适用于不同于原研究被试特征的人群 |
| 跨结果推广性（Generality across Outcomes） | 效果是否在类似但不同的结果变量上成立 |

这些威胁处理的基本问题：观察到的效果是否会在被试特征、场所细节和类似但不同的结果类型的变化下仍然成立（Hitchcock et al., 2015, p.462）。

### 内部效度与外部效度的关系

**内部效度优先原则**：Shadish et al. (2002) 论证内部效度是实验设计的"必要条件"（sin qua non），因为"如果无法证明给定干预对某个结果负责，那么就没有多大意义去考察证据是否推广到不同情境"（Hitchcock et al., 2015, p.461）。这一原则直接解释了 WWC 为何采用[[Gating Procedure]]——先用内部效度门槛筛选研究，再评估通过者的推广性。

**非互斥性**：内外部效度问题并非总是可以完全分离的。Hitchcock et al. (2015, p.463) 给出了一个具体例子：

> 例：基线描述（baseline description）同时服务于内部效度和外部效度——必须看到基线和干预程序的详细描述才能理解处理对比（内部效度），但基线细节描述的是现状（status quo），因此也为推广性提供了信息（外部效度）。

## 发展脉络

该框架的演进可追溯至 Campbell 和 Stanley 的开创性工作（Campbell & Stanley, 1963），经 Cook 和 Campbell（1979）修订，最终由 Shadish, Cook & Campbell（2002）整合为最完整的版本，将效度类型学扩展并系统化为四个维度（统计结论效度、内部效度、构念效度、外部效度）。

Hitchcock et al. (2015) 在论文中主要依赖 Shadish et al. (2002) 的表述，聚焦于内部效度和外部效度两个维度。通过 WWC 标准开发工作和学校心理学循证干预工作组（Task Force for Evidence-Based Interventions in School Psychology）的实践，作者确认"Campbellian 效度框架适用于能够产生因果证据的多种设计类型"（p.462），这一发现解释了为何 Maggin et al. (2013) 比较的 7 种 SCD 量规在内部效度判断上产生了合理一致的结果。

## 研究范式

- **认识论立场**：Campbellian 框架植根于后实证主义传统（编者类比）——它接受因果推断的可行性，但要求通过系统性排除威胁来逐步逼近，而非一次性"证明"
- **对实验设计的统一性**：该框架的关键洞察是不同实验设计（RCT、准实验、SCD）共享相同的因果推断逻辑——都通过排除替代解释来建立因果关系——因此可以被统一的理论框架所涵盖（Hitchcock et al., 2015, p.462）
- **常用方法**：RCT、准实验设计、[[Single-Case Design (SCD)]]——该框架为所有这些设计提供统一的效度评估语言

## 争议与批评

- **外部效度的结构性不对称**：Hitchcock et al. (2015, p.462, 467) 指出，内部效度有"一套明确定义的常见替代解释（威胁）"，这些威胁已被系统编目；但外部效度的威胁"有些容易识别，有些则不是"，且审查者不知道消费者希望推广到何处。这种不对称意味着框架对外部效度的指导远弱于对内部效度的指导（编者类比）
- **在实践中更多是门控工具而非推广工具**：WWC 使用该框架时，内部效度用于严格的门控判断（达标/不达标），但外部效度仅被"描述"而不被"评分"，由消费者自行判断（Hitchcock et al., 2015, p.466）——这实质上将框架中最困难的部分（推广性判断）转嫁给了可能缺乏方法论训练的政策制定者和从业者
- **SCD 推广性的特殊偏见**：存在"一种普遍（且错误）的信念认为 SCD 证据不能推广"（Hitchcock et al., 2015, p.467）——这意味着框架在面对 SCD 时面临额外的社会认识论障碍，不仅仅是方法论障碍

## 相关研究

- [[Argument_Hitchcock_2015_JBE]] — 以 Campbellian 框架论证 WWC 审查程序的内部效度判断一致性，并澄清其外部效度信息的捕获方式
- [[Argument_Wadhwa_2024_RER]] — 将 Campbell & Fiske (1959) 的 multitrait-multimethod 思路用于检验"evidence-based"在教育清算中心实践中的构念效度；如果多个清算中心对同一项目的效果判断不收敛，就说明该构念在实践中并不稳定。例：同一教育项目可能因某清算中心要求独立复制、另一清算中心只要求单项显著研究而获得不同推荐等级（Wadhwa et al., 2024, pp.4, 26）。

## 应用领域

- [[Single-Case Design (SCD)]] — Campbellian 框架为 SCD 研究提供统一的效度评估语言，WWC 和学校心理学循证干预工作组均依赖此框架
- [[Gating Procedure]] — 门控程序的操作逻辑直接来源于 Campbellian 框架的"内部效度优先"原则
- [[Evidence-Based Education]] — Campbellian 框架是 WWC 评估教育研究证据的方法论基础
- [[Educational Evidence Clearinghouses]] — Wadhwa et al. (2024) 用构念效度问题重新审视清算中心对"evidence-based"项目的认证实践，显示跨机构评级收敛不足会削弱该术语的实践效度（Wadhwa et al., 2024, p.26）

## 来源

- [[Hitchcock_2015_JBE]]
- [[Wadhwa_2024_RER]]

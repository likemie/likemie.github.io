---
title: Argument_Simpson_2019
type: argument
citation: "Simpson, A. (2019). Separating arguments from conclusions: The mistaken role of effect size in educational policy research. Educational Research and Evaluation, 25(1-2), 99-109."
tags: [effect-size, evidence-based-education, category-error, methodology, statistics, stance/critique]
related_concepts: ["[[Effect Size]]", "[[Evidence-Based Education]]", "[[Visible Learning]]"]
related_theories: []
related_methods: []
related_persons: ["[[Adrian Simpson]]", "[[John Hattie]]", "[[Gene Glass]]"]
sources: ["sources/Simpson_2019_ERE.md"]
status: draft
created: 2026-05-03
updated: 2026-05-03
---

## 研究问题

效应量（effect size）被广泛假定为测量教育干预有效性的指标，并以此为基础驱动全球教育政策（Hattie 的 Visible Learning、EEF Toolkit 等）。本文试图回答：**效应量是否真正测量教育的有效性或影响力？如果不是，它对教育政策应该扮演什么角色？**

## 理论框架

本文不依赖于特定的理论框架，而是通过**思想实验（thought experiment）**和**现实案例**进行概念分析和逻辑论证，揭示效应量作为"教育有效性"代理指标的范畴错误（category error）。

## 研究方法

- 方法：思想实验 + 概念分析 + 现实案例验证
- 核心策略：构造一个简单可控的教学干预（教一个匈牙利单词），展示仅改变测量方式即可使同一干预的效应量在 0 到无穷大之间变化
- 现实案例：引用 Merrell & Kasim (2015)、Sibieta (2016)、Sibieta et al. (2016) 等 EEF 资助的评估报告，验证同一干预在不同测量上产生截然不同的效应量

## 核心论证

### 1. 思想实验：教一个匈牙利单词

假设随机抽取英语使用者，随机分为两组。实验组被告知匈牙利语单词 *oktatás* 的英文翻译是 "education"，对照组无任何信息。两组立即参加包含 10 个匈牙利语单词的翻译测试（其中一个是 *oktatás*）。

- **基准情况**（测试包含 *oktatás*，开放式作答）：实验组平均得 1 分（几乎全对 *oktatás*），对照组平均得 0 分。标准差接近零 → **效应量趋向无穷大**。按 Hattie 的标准，这使"教一个匈牙利单词"成为有史以来最强的教育干预；按 EEF 的"月数进步"指标，这相当于"几十年的额外学校进步"（p.100-101）。

仅改变测试设计（不改变干预内容、样本、控制组活动）：

- **情况 1**（测试不含 *oktatás*）：两组均得 0 分 → 效应量 ≈ **0**
- **情况 2**（加入一个约一半人可猜对的词如 *mobil*）：实验组平均 1.5，对照组 0.5，SD ≈ 0.25 → 效应量 ≈ **4**
- **情况 3**（10 题四选一选择题）：实验组约 3.25，对照组约 2.5 → 效应量 ≈ **0.6**
- **情况 4**（20 题四选一）：效应量 ≈ **0.4**
- **情况 5**（40 题四选一）：效应量 ≈ **0.3**
- **情况 6**（测试问 *okádás* 而非 *oktatás*，选项含 "teacher"）：实验组可能因错误类比而更倾向选 "teacher" → 效应量为**负**

> "In each of these examples, the educational intervention (and control activity and population and sample size, etc.) is exactly the same... yet the effect size varies from 0 to 0.4, to 0.6, to 4, to infinity." (p.102)

### 2. 现实案例验证

**Merrell & Kasim (2015) 语音干预**：同一干预在同一样本上，NGRT d=0.43，SWRT d=0.38，PhAB d=0.23（p.102）。

**REACH 阅读支持项目**（Sibieta, 2016）：同一样本，NGRT d=0.33，阅读理解 d=-0.08，阅读准确性 d=0.17——"按 EEF 的月数进步指标，我们不得不得出结论：同一干预导致了 4 个月进步、2 个月进步和 1 个月退步"（p.103）。

**Nuffield 早期语言干预**（Sibieta, Kotecha, & Skipp, 2016）：主要结果（四项测量复合）d=0.27，次要结果（三项测量复合）d=0.06（p.103）。

### 3. 效应量的真实含义：试验清晰度

效应量测量的是**试验的清晰度**（clarity of the experimental difference），即信号相对于噪声的强度——而非干预的教育有效性。对于固定的样本量、显著性水平和统计检验，**统计功效（power）和效应量事实上是同一个东西的连续变换**（p.103-104, Figure 1）。

研究者可以通过以下设计选择增大效应量（而不改变干预本身）：
- 选择更窄化、与干预内容更匹配的结果测量
- 选择更同质的样本（减小标准差）
- 增强干预与控制组的对比度（如"无干预"对照 vs. "替代干预"对照）
- 缩短干预与测试之间的间隔

> "The enemy of clarity being noise — anything which acts to increase the noise of an experiment... will decrease effect size." (p.104)

### 4. 范畴错误的严重程度

将效应量误认为教育影响力的测量是一个**范畴错误（category error）**，但范畴错误有轻重之分（p.105）：
- 按身高而非腿长选购裤子——**较小的范畴错误**（两者有相关性，偶尔能碰对）
- 按姓氏长度选购裤子——**较大的范畴错误**（无相关，不比随机更好）
- 效应量作为教育影响力的代理——属于后者：教育影响力是情境绑定的概念，效应量取决于研究者设计选择，"几乎没有明显的理由相信教育影响力与研究的清晰度（或噪声的缺乏）密切相关"（p.105）

**CPR 教学反例**（p.105-106）：教人心脏复苏术——在正确情境下"字面意义上救命"——如果在异质样本上测试、使用标准化急救测试（而非 CPR 专项测试）、与某种较有效的替代教学法比较（而非"无 CPR 教学"对照），可能产生很小的效应量。"如果我们把效应量解读为实践显著性而非试验清晰度，我们可能拒绝一个实际上非常重要的方法。"

### 5. 效应量的合法技术角色

效应量在**研究设计**中有合法用途：它可以告诉未来的研究者，在类似的测试（以及样本和控制活动）下，他们可以预期的噪声水平，从而调整样本量、减少样本异质性、选择和修改测量工具、增强与控制组的对比度等（p.104）。

合并效应量仅在极端条件下有意义："当且仅当同一干预在多项研究中使用相同的样本、与相同的控制活动比较、在相同的测量上（并使用相同的研究设计和统计分析方法）进行评估时，才能合并这些研究的效应量"（p.106）。"当然，在现实中，这种直接复制和比较并不会发生，也不是'证据本位政策'的基础"（p.106）。

## 主要发现

- **效应量不是教育有效性的测量**：同一干预可以产生从 0 到无穷大的效应量，取决于研究者的设计选择（p.102）
- **效应量是试验清晰度的测量**：它反映的是研究设计的信噪比，而非干预的教育价值（p.104）
- **直接教学干预在元-元分析排名中位居前列，仅仅说明研究者更容易在这些领域进行低噪声的试验**——而非这些干预更具教育影响力（p.105）
- **EBE 支持者使用 Freedman (2009) 识别的多种防御策略**：列举假设（但不检验）、声称批评者未能证伪假设、质问"有什么危害"（pp.106-108）

## 关键引用

> "Effect size is a measure of the trial as a whole; it is not a measure of the intervention alone." (p.100)

> "Mistaking effect size for a measure of educational importance or influence is, then, a category error." (p.105)

> "The appearance of direct instruction interventions like feedback and meta-cognition at the top of meta-meta-analytic tables should be taken only as evidence that researchers have found it easier to conduct less noisy experiments in these areas compared to behaviour interventions or summer schools." (p.105)

> "Forms of intervention are promoted as more effective when, in fact, the evidence merely indicates they are areas in which it may be easier to conduct clearer studies. This misidentification is leading policy, driving the use of scarce resources and causing major changes in teaching methods. There's the harm." (p.108)

## 局限性与批评

- 论文自身承认效应量在特定条件下有合法技术用途（研究设计中的样本量计算），但强调这与政策用途有根本区别（p.104, 106）
- 效应量的合法使用需要研究者在选择设计特征时有一定自由度——在行为干预等情境中，伦理约束（如不能使用"无干预"对照）限制了研究者操控信噪比的能力（p.105）
- Cheung & Slavin (2016) 发现研究者自编测量的效应量平均是独立测量效应量的两倍——这一发现直接从思想实验的逻辑中得出：研究者可以（也确实）通过设计与干预内容紧密结合的测试来减少噪声（p.108, Note 3）

## 来源

- [[Simpson_2019_ERE]]

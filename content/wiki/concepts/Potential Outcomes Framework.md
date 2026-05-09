---
title: Potential Outcomes Framework
type: concept
tags: [potential-outcomes-framework, causal-inference, subject/research-methodology, paradigm/positivist]
related_concepts: ["[[Stable Unit Treatment Value Assumption (SUTVA)]]", "[[Causal Modeling]]", "[[Randomised Controlled Trials]]"]
related_methods: ["[[Randomised Controlled Trials]]", "[[Matching]]"]
related_persons: []
sources: ["sources/Berk_2011_ER.md"]
confidence: low
status: draft
created: 2026-05-03
updated: 2026-05-03
---

## 定义

潜在结果框架（Potential Outcomes Framework）是因果推断的核心概念框架，其关键思想是：**因果效应需要被概念化为假设性的比较**，而非直接可观测的量。因果效应通过比较同一主体在两种条件下的潜在结果来定义——一个是接受处理条件下的结果，另一个是接受对照条件下的结果。这两个结果都是假设性的，在分析任何数据之前被仔细考虑（Berk, 2011, p.193）。

> "One imagines what the outcome would be for an inmate under the treatment condition, and what the outcome would be for that same inmate under the comparison condition. Both outcomes are hypothetical. They are carefully considered before any data are analyzed." (Berk, 2011, p.193)

例：假设一项监狱犯人职业培训评估——处理条件是提供职业培训，对照条件是在监狱院子里自由活动，结果是释放后的劳动力市场成功。因果效应被定义为该犯人在职业培训条件下的潜在收入与同一犯人在自由活动条件下的潜在收入之间的比较（Berk, 2011, p.193）。

## 历史沿革

- **1923** — Jerzy Neyman 在农业实验中首次提出潜在结果的基本构想（Neyman [1923] 1990），为因果推断提供了数学基础
- **1974** — Donald Rubin 将 Neyman 的公式扩展至社会科学领域，提出"Rubin 因果模型"（Rubin, 1986）
- **1986** — Paul Holland 发表 "Statistics and Causal Inference"，提出"没有操纵就没有因果"（no causation without manipulation）的核心命题
- **2000** — Judea Pearl 出版 *Causality: Models, Reasoning and Inference*，引入有向无环图（DAG）作为因果推断的补充形式化工具
- Berk (2011, p.193) 指出，尽管存在异议者（如 Dawid, 2000），源自 Neyman 论文的潜在结果公式已主导了因果推断的技术文献

## 核心要素

### 因果效应的定义与估计的区分

潜在结果框架的核心贡献在于清楚地区分了因果效应的**定义**与因果效应的**估计**——此前两者常被混淆。如果因果效应没有被明确定义，正在估计什么也必然是不清楚的（Berk, 2011, p.193）。

> "The potential outcomes formulation allows one to clearly distinguish between the definition of a causal effect and the estimation of a causal effect. This is an important advance. Too often the two have been conflated with confusion the usual result." (Berk, 2011, p.193)

### 五种平均处理效应（Imbens, 2004）

不同的平均处理效应定义导致不同的估计目标（estimands），这一区分常被忽视，导致估计的性质和估计目标的性质都变得模糊（Berk, 2011, p.193）：

1. **总体平均处理效应**（population average treatment effect）——全体目标人群的平均因果效应
2. **处理组总体平均处理效应**（population average treatment effect on the treated）——实际接受处理者的平均因果效应
3. **样本平均处理效应**（sample average treatment effect）——研究样本中的平均因果效应
4. **处理组样本平均处理效应**（sample average treatment effect on the treated）——研究样本中实际接受处理者的平均因果效应
5. **条件于协变量的样本平均处理效应**（average sample treatment effect conditional on sample covariates）——特定协变量子群中的平均因果效应

每种定义识别了一组特定的研究对象，对其需要平均因果效应（Berk, 2011, p.194; Imbens, 2004, pp.6–7）。如果这些区分被忽视，"可信的证据不太可能产生"（Berk, 2011, p.194）。

### 稳定单位处理价值假设（SUTVA）

潜在结果框架的一个关键假定是稳定单位处理价值假设（SUTVA），其违反——即主体间干扰（subject interference）——会导致因果效应不再被唯一地定义（详见 [[Stable Unit Treatment Value Assumption (SUTVA)]]）。

### 在评估研究中的传播

Berk (2011, p.194) 观察到潜在结果公式已逐渐在评估研究实践中取得重要进展，尤其在经济学家中，但进展"非常缓慢"。

## 与相关概念的区别

- vs [[Causal Modeling]] — 潜在结果框架为因果效应提供定义性基础；因果建模（SEM）尝试通过模型假设从观察数据中估计因果参数，但 Berk (2011) 认为后者存在严重的过度依赖不可检验假设的问题
- vs [[Randomised Controlled Trials]] — RCT 是估计因果效应的一种方法；潜在结果框架为理解 RCT 为何有效（随机分配使潜在结果独立于处理分配）提供了概念基础

## 理论基础

- Neyman-Rubin 因果模型 — 该框架的数学基础，将因果效应形式化为潜在结果的比较

## 来源

- [[Berk_2011_ER]]

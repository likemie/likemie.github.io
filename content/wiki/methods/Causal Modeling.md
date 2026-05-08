---
title: Causal Modeling
type: method
tags: [causal-modeling, structural-equation-modeling, SEM, subject/research-methodology, paradigm/positivist]
related_concepts: ["[[Potential Outcomes Framework]]", "[[Recommendations for Practice]]"]
related_methods: ["[[Matching]]", "[[Covariate Adjustment]]", "[[Randomised Controlled Trials]]", "[[Non-intervention Research]]", "[[Observational and Correlational Research]]"]
related_persons: []
sources: ["sources/Berk_2011_ER.md", "sources/Allerup_2015_Paideia.md", "sources/Brady_2023_EPR.md"]
confidence: low
status: draft
created: 2026-05-03
updated: 2026-05-05
---

## 定义

因果建模（Causal Modeling），也称为结构方程建模（Structural Equation Modeling, SEM），是随机实验之外最常用的因果推断替代方法。其目标是对观察性研究施加一个关于"自然如何生成数据"的模型，然后从数据中估计自然使用的参数值。它于 1970 年代进入社会科学领域，承诺将实质性社会科学理论与统计学进行形式上的整合（Berk, 2011, p.196）。

> "Its aim is to impose on an observational study a model of how nature generated the data and then from the data, to estimate the values of the parameters nature employed." (Berk, 2011, p.196)

## 认识论立场

因果建模隐含一种强假设：研究者可以通过统计模型捕捉数据生成过程的结构性特征。这与潜在结果框架形成对比——后者从假设性比较出发定义因果效应，而非从模型假设出发估计因果参数。Berk (2011, p.196) 认为因果建模对评估研究的影响"最好说是好坏参半的"（mixed at best）。

## 操作步骤

典型的因果建模流程包括：
1. 基于理论构建因果模型——指定变量之间的因果路径（箭头方向）
2. 从数据中估计路径系数（参数）
3. 检验模型拟合度
4. 如有必要，修改模型并重复步骤 2-3（模型选择）

Berk (2011, p.197) 特别警告最后一步：许多因果模型是**模型选择**的产物——"在一组数据上使用一系列模型，并选择一个'最佳'模型。结果是使用该数据集的后续所有统计推断都很可能是错误的，常常是严重错误的"（Leeb & Pötscher, 2005, 2006; Berk, Brown, & Zhao, 2010）。

## 历史沿革

- **1970s** — 因果建模在计量经济学的推动下进入社会科学，承诺将理论整合与统计建模正式结合——"作为实质性和统计性理论的结合，还有什么能比这更好？"（Berk, 2011, p.196）
- **1973** — Goldberger 发表 "Structural Equation Models: An Overview"
- **1975** — Duncan 出版 *Introduction to Structural Equation Models*
- **1983** — Ed Leamer 发表著名批评文章 "Let's Take the Con Out of Econometrics"（Berk, 2011, p.196）
- **2005** — David Freedman 出版 *Statistical Models: Theory and Practice*，基于二十年的批判性关切提供了对因果建模"可能最彻底的处理"（Berk, 2011, p.196）
- **2004** — Berk 出版 *Regression Analysis: A Constructive Critique*

## 局限性

### 模型选择问题

Berk (2011, p.197) 识别的最核心问题：因果建模的常见实践涉及在多个模型中选择"最佳"模型，但这使得基于同一数据集的统计推断变得无效（Leeb & Pötscher, 2005, 2006; Berk, Brown, & Zhao, 2010）。

### 缺乏明确的经验边界

"因果建模的错误是程度问题。模型'足够接近正确'与模型'不正确'之间没有明确的经验界限。结果之一就是大量的回旋余地"（Berk, 2011, p.197）。

### 点按软件使因果建模"看似容易"

Berk (2011, p.197) 提供了一个更具批判性的解释：广泛可用的点按式统计软件包使因果建模看似容易——"不需要深入理解"。他观察到许多论文"所使用的统计建模程序被以软件包的名称来引用（如'进行了一项 LISREL 分析'）"——"稍微不那么虔诚的关切是引用所使用的软件，仿佛这就是全部需要知道的（如'使用 proc mixed 进行分析'）"。

### 对批评的回应的修辞性

Berk (2011, p.197) 引用了 Freedman (2005, p.195) 编纂的一份"有启发性但不完整"的清单，列举了因果建模支持者对批评的常见修辞性回应：

> "我们都知道。没有什么是完美的。线性必须是一个好的第一近似。对数线性必须是一个好的第一近似。假设是合理的。假设不重要。假设是保守的。你无法证明假设是错误的。偏误会相互抵消。我们可以对偏误建模。我们只是在做其他人都在做的事。现在我们将使用更复杂的技术。如果我们不做，其他人会做。你会怎么做？决策者有了我们比没有我们更好。我们都有心智模型，不使用模型仍然是一个模型。模型并非完全无用。你必须尽可能利用数据。你必须做出假设才能取得进展。你必须给模型怀疑的好处。这有什么害处？"

### 与匹配的对比

Berk (2011, pp.197–198) 将匹配作为因果建模的推荐替代方法——匹配"更少依赖不可检验的假设，更多受实证诊断约束，更不容易受统计不当行为的影响"，且回避了模型选择问题（因为在匹配中，匹配变量是在不参考结果变量的情况下确定的）。

### 观察数据中的因果语言风险

Brady et al. (2023) 从教育心理学期刊实践层面补充了 Berk 的方法论批评：Reinhart et al. (2013) 曾发现，依赖建模作为分析方法的观察/相关研究更可能包含 RFP，可能因为建模语汇会"导致"更多类似 "predictors""mediators""outcomes" 的因果化命名。Brady et al. (2023) 原本计划继续编码"建模"，但 2010 年后建模类型和用途急剧增加，以至于区分"什么算建模"已不再有实质意义（Brady et al., 2023, p.9）。

## 适用场景

Berk (2011) 的立场暗示因果建模的适用场景极为有限——只有在研究者能对模型假设提供有力辩护、且模型选择过程透明且预先注册的情况下，才可能产生可信的结果。他推荐的替代路径是匹配（参见 [[Matching]]）。

## 相关理论

- [[Potential Outcomes Framework]] — 为评估因果建模的因果主张提供了替代性概念框架，强调因果效应的定义独立于估计模型

## 相关方法

- [[Observational and Correlational Research]] — 因果建模通常试图在未操纵自变量的观察/相关数据中估计因果路径，因此其推论风险与观察性研究的因果边界直接相关
- [[Matching]] — Berk (2011) 推荐的替代策略，试图以协变量平衡降低观察性研究中的混杂风险
- [[Covariate Adjustment]] — 因果建模常通过纳入协变量调整效应估计；控制变量选择会改变效应量和显著性判断
- [[Recommendations for Practice]] — Brady et al. (2023) 关注因果建模语汇如何可能推动观察/相关研究越界提出实践建议

## 来源

- [[Berk_2011_ER]]
- [[Allerup_2015_Paideia]]
- [[Brady_2023_EPR]]

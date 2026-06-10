---
title: Statistical Significance
type: concept
tags: [statistical-significance, p-value, hypothesis-testing, effect-size, research-methodology]
related_concepts: ["[[Effect Size]]", "[[Confidence Interval]]", "[[Publication Bias]]", "[[Educational Evidence Clearinghouses]]"]
related_methods: ["[[Meta-analysis]]", "[[Meta-meta-analysis]]", "[[Randomised Controlled Trials]]"]
related_persons: ["[[Jacob Cohen]]", "[[John Hattie]]"]
sources: ["sources/Allerup_2015_Paideia.md", "sources/Terhart_2011_JCS.md", "sources/Wadhwa_2024_RER.md"]
confidence: low
status: draft
created: 2026-05-05
updated: 2026-05-05
---

## 定义

统计显著性（Statistical Significance）用于判断观察到的差异是否足以拒绝"两个总体均值相同"之类的零假设。统计检验的核心不是把差异评为"大"或"小"，而是判断检验统计量是否超过临界值；超过则认为差异具有统计显著性，否则不能排除零假设仍然成立的可能（Allerup, 2015, p.45）。

## 历史沿革

- 2011 Terhart 在解释 Hattie 的 [[Effect Size]] 时区分了统计显著性和效应大小：统计显著性只说明结果不太可能由随机因素造成，却不说明效应有多大或实践意义是什么（Terhart, 2011, p.427）。
- 效应量与显著性检验可以在给定样本量时发生数学联系：标准化均值差 d 可通过 `t=d√n` 转换为 t 检验统计量；以 n=25 为例，d≈0.412 对应双侧检验 p≈0.05 的临界点（Allerup, 2015, p.45）。
- 2024 Wadhwa et al. 发现，不同教育证据清算中心对统计显著性和效应量阈值的要求并不一致：有的清算中心要求统计显著正向效果，有的还额外要求最低效应量（Wadhwa et al., 2024, pp.12–15）。

## 核心要素

- **零假设**：在两个分布均值比较中，零假设可以写为 `H: µ1=µ2`（Allerup, 2015, p.45）。
- **t 值与样本量**：在效应量 d 已知时，若观测数为 n，可构造 `t=d√n`；样本量越大，同样 d 值对应的 t 值越大，也越容易达到统计显著（Allerup, 2015, p.45）。
- **p 值**：p 值表示在零假设成立时获得当前或更极端 t 值的概率。研究报告常把 p 值作为统计分析结果呈现的核心（Allerup, 2015, p.45）。
- **显著不等于重要**：Terhart 强调，统计显著性不说明效应大小和实践意义；这部分信息需要 [[Effect Size]] 或原始量表差异来补充（Terhart, 2011, p.427）。

## 与相关概念的区别

- vs [[Effect Size]] — 统计显著性回答"差异是否足以排除随机波动"，效应量回答"差异有多大"。`t=d√n` 说明二者可在特定样本量下关联，但不能相互替代（Allerup, 2015, p.45）。
- vs [[Confidence Interval]] — 统计显著性通常以是否越过临界值或 p 值阈值呈现；置信区间则把估计值的误差范围显示出来，使读者能判断相邻估计是否可能重叠（Allerup, 2015, pp.47–48）。

## 相关方法

- [[Meta-analysis]] — 元分析若只合并点估计而忽略显著性检验和置信区间，容易把不同精度的研究结果放在同一层级比较。
- [[Meta-meta-analysis]] — 联合标准误、95% CI 和显著性检验是判断二级综合点估计是否稳定的必要信息（Wecker et al., 2016, p.30）。

## 实证发现

- 在 n=25 的示例中，d≈0.412 对应 t=2.060，接近双侧检验 p≈0.05 的临界值；换成其他样本量，这一对应关系会改变（Allerup, 2015, p.45）。
- 在教育证据清算中心中，统计显著性并不总是以同样方式进入评级标准；部分机构要求统计显著正向效果，部分机构还加入最低效应量门槛（Wadhwa et al., 2024, pp.12–15）。

## 争议与批评

- 如果只报告统计显著性，研究者可能忽略实际效应大小；如果只报告效应量点估计，则无法判断该估计是否稳定。只有 d 值而缺少 [[Confidence Interval]]、标准误或相邻排名显著性检验时，读者无法判断数值接近的干预是否真的不同（Allerup, 2015, pp.47–48）。
- [[Publication Bias]] 与统计显著性偏好相关：发表系统更容易接纳显著或正面结果，从而可能使元分析平均效应量偏高。

## 相关案例／政策

- [[Educational Evidence Clearinghouses]] — 清算中心把统计显著性、效应方向和最低效应量阈值组合成项目评级规则（Wadhwa et al., 2024, pp.12–15）。
- [[Visible Learning]] — Hattie 将 d=0.40 作为实践阈值，但该值与显著性的关系依赖样本量（Allerup, 2015, p.45）。

## 来源

- [[Allerup_2015_Paideia]]
- [[Terhart_2011_JCS]]
- [[Wadhwa_2024_RER]]

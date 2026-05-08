---
title: Seasonal Comparison
type: method
tags: [seasonal-comparison, research-design, quasi-experimental, causal-inference, paradigm/positivist]
related_theories: ["[[Refraction Framework]]"]
related_facts: ["[[Coleman Report 1966]]"]
sources: ["sources/Downey_2016_SoE.md"]
confidence: medium
status: draft
created: 2026-05-04
updated: 2026-05-04
---

## 定义

季节性比较（Seasonal Comparison）是一种准实验研究设计，利用学校日历的季节性特征——九个月的学年后接三个月的暑假——作为自然实验来理解学校如何影响不平等。其核心逻辑类似于医学研究中的交叉设计（crossover design）：被试在治疗期（学年）和非治疗期（暑假）被反复观测，通过比较两种条件下成就差距的变化来推断学校的因果效应（Downey & Condron, 2016, p.4）。

> "Similar to a crossover design in medical research, where patients are observed on and off treatment, seasonal comparison researchers observe how achievement gaps change when children are on treatment (in school) versus out (summer)." (Downey & Condron, 2016, p.4)

## 认识论立场

季节性比较属于准实验因果推断传统，其认识论核心是反事实推理（counterfactual reasoning）。设计试图回答的问题不是传统的"学校 A vs 学校 B 哪个更好"，而是更根本的："如果学校不存在，不平等会是什么样？"（Raudenbush & Eschmann, 2015, cited in Downey & Condron, 2016, p.3）。暑假被用作这一反事实的经验近似（Downey & Condron, 2016, p.4）。

这种设计绕过了传统方法面临的三个核心难题（Downey & Condron, 2016, pp.3–4）：
1. 如何分离学校效应与非学校效应
2. 如何权衡所有加剧性机制与补偿性机制的净效应
3. 如何判断学校不平等是否超过非学校不平等

## 操作步骤

### 基本设计

1. **数据要求**：需要季节性收集的测试数据——至少包含秋季（学年开始）和春季（学年结束）两个测量点，理想情况下还包含秋季的基线测量以捕捉暑假变化
2. **比较逻辑**：
   - 暑假期间（非学校期）：成就差距的变化主要反映非学校因素
   - 学年期间（混合期）：成就差距的变化反映学校因素 + 非学校因素
   - 比较两者 → 推断学校的净效应
3. **判断标准**：如果 SES 成就差距在学年期间增长更慢（或缩小），而在暑假期间增长更快 → 学校是补偿性的；反之 → 学校是加剧性的（Downey & Condron, 2016, pp.5–6）

> 例：即便高 SES 和低 SES 儿童在学年期间以大致相同的速度学习（差距保持不变而非缩小），只要暑假期间差距加速扩大，学校仍被判定为补偿性的——因为相对于反事实（无学校状态），学校减少了差距本应扩大的幅度。这类似于减肥项目：即使治疗组体重未下降，只要对照组体重增加了，治疗就是有效的（Downey & Condron, 2016, p.6）。

### 主要数据来源

- **ECLS-K 1998**（Early Childhood Longitudinal Study–Kindergarten Cohort）：第一个全国代表性的季节性收集数据，追踪从幼儿园到八年级（Downey et al., 2004）
- **ECLS-K 2011**：更新的队列，用于复制和扩展早期发现（Downey, Workman & von Hippel, 2016）
- **NWEA 数据**（Northwest Evaluation Association）：大规模学生评估数据（Yoon & Merry, 2015）
- **巴尔的摩纵向研究**：Entwisle & Alexander 在 1980 年代开始的标志性地方性季节性研究（Entwisle & Alexander, 1992, 1994）

## 适用场景

- 评估学校对不平等的**总体效应**（所有学校机制的综合后果），而非单个学校实践的效果
- 研究 SES、种族／族裔、性别等多维度成就差距的学校效应
- 可扩展到非认知结果：肥胖（BMI）、社交／行为技能等（von Hippel et al., 2007; Downey, Workman & von Hippel, 2016）
- 适用于有明确学校／非学校交替周期的教育系统（学年制）
- 可用于跨国比较——如果不同国家有类似季节性数据

## 局限性

Downey & Condron (2016, pp.4–5) 明确讨论了季节性比较方法依赖的关键假设及潜在问题：

### 处理溢出（Treatment Spillover）

方法假设学校实践对暑假学习几乎没有影响（学校"处理"不污染非学校学习估计）。实际上这一假设几乎总是被违反，因为学生通常不在开学第一天和最后一天被测试。学者通过将学校时段的学习建模并从中减去来缓解此问题。此外，春季学校实践（如发送暑假阅读书单）可能影响暑假学习——尽管对年幼儿童的证据很少（Downey et al., 2004）（Downey & Condron, 2016, p.4）。

### 等距量表的假设

比较起点低（A 组）和起点高（B 组）的增长需要等距量表（interval-level scales），即底部的增长与顶部的增长可比较（如同等距台阶）。某些较好的认知技能量表可能接近此要求，能减少困扰纵向比较的天花板效应问题，但该领域需要更多讨论，或许更大程度使用不依赖等距假设的非参数方法（Ho & Reardon, 2011）（Downey & Condron, 2016, pp.4–5）。

### 暑假作为反事实的效度

暑假模式真的是无学校状态的好的指标吗？如果家长知道孩子不会在秋季返校，他们的行为会与暑假期间不同吗？Downey & Condron 承认需要对这些假设进行更有力的学术讨论，但认为这些假设比传统方法要求的假设（模型可成功分离学校效应、我们知道所有机制的净效应、学校不平等大于非学校不平等）更为合理（Downey & Condron, 2016, p.5）。

### 对种族模式的解释困难

种族认知技能差距的季节性模式在不同研究中不一致：Heyns (1978) 在亚特兰大发现学校对种族差距是补偿性的，但 ECLS-K 全国数据暗示学校可能是加剧性的。种族差距在幼儿园入学前已很大，这使得整理学校和非学校因素变得复杂（Downey & Condron, 2016, p.5）。

## 使用此方法的研究

关键研究及其发现（Downey & Condron, 2016, pp.4–5）：

- **Heyns (1978)**：亚特兰大 42 所学校 3,000+ 名六七年级学生（1971–1972 学年和暑假）——开创性发现：暑假学习是纯粹的非学校因素产物，比较两个季节揭示学校如何发挥作用
- **Entwisle & Alexander (1992, 1994)**：巴尔的摩纵向研究：1980 年代追踪儿童在学校系统中的进展——进一步引起对季节性模式的关注
- **Downey et al. (2004)**：首次全国代表性 ECLS-K 分析——确认 SES 技能差距在暑假比在学年增长更快
- **Alexander (1997:12)**：总结季节性比较的含义："当涉及不平等时，'学校教育更多的是解决方案的一部分而非问题的一部分'"
- **von Hippel et al. (2007)**：ECLS-K 数据分析发现儿童 BMI 在暑假期间增长速度约为学年期间的两倍——黑人和低 SES 儿童尤其脆弱
- **Downey, Workman & von Hippel (2016)**：ECLS-K 2011 数据分析社交／行为技能差距——SES、种族和性别差距在学校期间 vs 暑假期间增长无显著差异

## 来源

- [[Downey_2016_SoE]]

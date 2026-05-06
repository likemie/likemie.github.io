---
title: Covariate Adjustment
type: method
tags: [covariate-adjustment, covariate, causal-inference, statistical-modeling, quantitative-methods]
related_theories: []
related_concepts: ["[[Effect Size]]", "[[Statistical Significance]]"]
related_methods: ["[[Causal Modeling]]", "[[Matching]]", "[[Observational and Correlational Research]]", "[[Meta-analysis]]", "[[Meta-meta-analysis]]"]
related_persons: []
sources: ["sources/Allerup_2015_Paideia.md", "sources/Berk_2011_ER.md"]
confidence: low
status: draft
created: 2026-05-05
updated: 2026-05-05
---

## 定义

协变量控制（Covariate Adjustment）是在分析某一因素与结果之间关系时，把可能影响结果的第三变量纳入模型，以检验原有差异是否仍然存在。在教育数据中，学生社会经济背景、学校条件和既有成绩都可能成为协变量，并改变某一教学因素与成绩之间的估计关系（Allerup, 2015, pp.49–51）。

## 认识论立场

协变量控制承认教育数据中的因素往往相互纠缠：一个看似由教师或教学因素造成的成绩差异，可能部分来自学生背景、学校规模或其他未被控制的条件。未控制的边际效应量不应直接被当作干预本身的效果（Allerup, 2015, pp.49–51）。

## 操作步骤

1. **识别可能的第三变量**：当教师特征、教学条件和学生背景并不随机分布时，学生社会经济背景等变量可能是教学因素与学习结果关系中的潜在协变量（Allerup, 2015, pp.49–50）。
2. **重新估计效应**：在模型中加入协变量后，重新计算或检验原有因素的效应量与显著性（Allerup, 2015, pp.50–51）。
3. **比较控制前后结果**：若效应量明显变化，说明原始边际结果可能混入了协变量影响；例如教师学科专业资格效应量可在控制学生社会经济背景后由 0.15 降至 0.08，并且不再显著（Allerup, 2015, pp.50–51）。

## 适用场景

- 当研究者怀疑某个教学因素与学生背景、学校条件或测量条件相关时，可用协变量控制检验边际效应是否稳健。
- 在 [[Meta-analysis]] 或 [[Meta-meta-analysis]] 中，协变量控制提醒研究者：不同一级研究或元分析使用的模型不同，可能产生不可直接比较的 [[Effect Size]]。
- 在观察性数据中，协变量控制可与 [[Matching]] 等方法形成互补：匹配试图先使协变量分布平衡，协变量控制则在模型中调整这些变量。

## 局限性

### 协变量选择依赖理论判断

协变量控制只有在关键第三变量被识别并被测量时才有效。Berk 对观察性因果推断的提醒同样适用：样本在已观测协变量上达到平衡，并不意味着未观测协变量也平衡；研究者需要用既有研究和理论为变量选择辩护（Berk, 2011, p.198）。

### 控制后效应并不自动等于因果效应

控制社会经济背景会改变教师资格效应量，但这并不等于已穷尽所有可能混杂因素。它更稳妥地说明：原始边际效应量不是最终结论，统计模型选择会改变排名和解释（Allerup, 2015, pp.49–51）。

## 相关概念

- [[Effect Size]] — 协变量控制会改变效应量分子或残差结构，使同一因素在不同模型下得到不同 d 值。

## 来源

- [[Allerup_2015_Paideia]]
- [[Berk_2011_ER]]

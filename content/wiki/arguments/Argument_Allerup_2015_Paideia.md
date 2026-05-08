---
title: Argument_Allerup_2015_Paideia
type: argument
citation: "Allerup, P. (2015). Hatties brug af effect size som grundlag for rangordning af pædagogiske indsatser. Paideia, 9, 42-51."
tags: [Visible-Learning, effect-size, meta-meta-analysis, methodology-critique, statistics, subject/research-methodology]
related_concepts: ["[[Visible Learning]]", "[[Effect Size]]", "[[Statistical Significance]]", "[[Confidence Interval]]"]
related_methods: ["[[Meta-meta-analysis]]", "[[Meta-analysis]]", "[[Covariate Adjustment]]", "[[Rasch Measurement]]"]
related_persons: ["[[John Hattie]]", "[[Jacob Cohen]]"]
sources: ["sources/Allerup_2015_Paideia.md"]
part_of:
status: draft
created: 2026-05-05
updated: 2026-05-05
---

## 研究问题

Allerup 追问：[[John Hattie]] 在 *[[Visible Learning]]* 中用[[Effect Size|效应量]]对教学干预排序时，哪些统计技术前提必须成立，d 值才具有可比较的意义（Allerup, 2015, p.42）。论文明确不讨论 Hattie 的教学理论和具体排名清单，而是从统计学角度检查效应量计算本身是否足以支撑跨干预排序（Allerup, 2015, p.42）。这一问题直接关联 [[Meta-meta-analysis]] 的政策用途：当多个[[Meta-analysis|元分析]]被压缩为单一排名表时，点估计是否足以支持"哪个干预更有效"的判断。

## 理论框架

- 统计检验理论：用均值、标准差、t 检验、p 值和[[Confidence Interval|置信区间]]解释 d 的含义及其限制（Allerup, 2015, pp.42–46；参见 [[Effect Size#技术定义与计算方法]]、[[Statistical Significance]]）。
- 分布假设：以正态分布、偏态分布和 Cauchy 分布说明效应量解释依赖基础数据分布（Allerup, 2015, pp.45–49；参见 [[Effect Size#基本公式与构成逻辑]]）。
- 边际分析与多变量分析：用[[Covariate Adjustment|协变量控制]]说明单一边际 d 值会随统计模型改变（Allerup, 2015, pp.49–51；参见 [[Meta-meta-analysis#技术方法论缺陷]]）。

## 研究方法

- **方法**：统计方法论批判。
- **分析对象**：[[John Hattie|Hattie]] (2009) 以效应量对 138 类教育干预排序的做法（Allerup, 2015, p.42）。
- **说明方式**：用公式解释、图形分布、Hattie 排名与 PISA 排名对照、TIMSS 2011 丹麦四年级数学例子进行论证；PISA/TIMSS/PIRLS 的分数转换背景见 [[Rasch Measurement]]（Allerup, 2015, pp.42–51）。

## 核心论证

1. **效应量只是均值差的标准化表达。** Allerup 将 d 写作 `(µ1-µ2)/σ`，说明其直观含义是干预前后两个分布的均值差相当于多少个标准差（Allerup, 2015, pp.42–43）。这个表达需要前后分布足够相似，才能被解释为一个分布相对另一个分布的平移。
2. **d 本身不是[[Statistical Significance|显著性]]统计量。** 若要进行常规显著性判断，需要把 d 乘以观测数平方根，形成 `t=d√n`，再按 t 分布判断；以 n=25 为例，t=2.060 对应 d≈0.412，因此 Hattie 的 0.40 阈值只是在特定样本量和检验设定下接近 p=0.05（Allerup, 2015, pp.45–46）。
3. **d 的解释依赖强分布前提。** 若分布偏态，均值不再位于"中间"；若干预前后标准差不同，均值差不再表示简单平移；若基础分布类似 Cauchy 分布，均值和方差都不稳定，d 的计算基础会变得脆弱（Allerup, 2015, pp.45–49）。
4. **Hattie 的排名未报告置信区间或标准误。** PISA 排名会用区间显示均值估计的误差范围，Hattie 的效应量排名只给点估计，读者无法判断相邻干预的 d 值差异是否显著；例如 feedback d=0.71 与 teacher-student relationship d=0.72 的差别可能并不具有可解释意义（Allerup, 2015, pp.47–48）。这一点与 [[Meta-meta-analysis#6 项方法论要求]] 中"联合标准误和置信区间"的要求相互呼应。
5. **边际效应量会被协变量改变。** 在 TIMSS 2011 丹麦四年级数学例子中，教师学科专业资格的未控制效应量约为 0.15；控制学生社会经济背景后，效应量降至 0.08 且不再显著（Allerup, 2015, pp.49–51）。因此，把单个 d 当作最终排序依据会遮蔽模型选择和第三变量影响；这也是 [[Visible Learning]] 排名表作为实践指南时的关键限制。

## 主要发现

- Hattie 的 d=0.40 阈值在 n=25 的例子中对应 p≈0.05，但这种对应关系依赖样本量，不能作为脱离情境的固定教育阈值（Allerup, 2015, pp.45–46）。
- 若未报告置信区间、标准误或显著性检验，效应量排名只能呈现数值顺序，不能判断相邻项目是否真的不同（Allerup, 2015, pp.47–48）。
- 偏态分布、前后标准差不等、厚尾分布都会削弱效应量的直观解释（Allerup, 2015, pp.45–49）。
- 多变量控制可显著改变效应量，TIMSS 2011 例子中教师学科专业资格效应从 0.15 降至 0.08（Allerup, 2015, pp.49–51）。

## 关键引用

> "Effect size er altså ikke en statistisk størrelse, som kan underkastes statistisk vurdering med hensyn til størrelse."（Allerup, 2015, p.45）

> "Man har derfor ikke som ved PISA-rangordningen adgang til en erkendelse af, at to eller flere indsatser/lande ikke adskiller sig signifikant fra hinanden - selv om de numerisk set er forskellige."（Allerup, 2015, p.47）

## 局限性与批评

- 论文有意限制在统计技术层面，不评价 Hattie 的教学分析、具体干预类别或教育理论，因此不能单独构成对 VL 教育哲学的全面批判（Allerup, 2015, p.42）。
- 论文用 TIMSS 2011 和 PISA 作为说明性案例，不是对 Hattie 全部 800+ 元分析数据的再分析（Allerup, 2015, pp.47–51）。
- 对 Cauchy 分布与 Hattie 极端波动效应量之间的关联是可能性提示，而非基于 Hattie 原始数据的实证检验（Allerup, 2015, pp.48–49）。

## 来源

- [[Allerup_2015_Paideia]]

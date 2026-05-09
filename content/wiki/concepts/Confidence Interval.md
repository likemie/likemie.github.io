---
title: Confidence Interval
type: concept
tags: [confidence-interval, standard-error, statistical-inference, effect-size, research-methodology]
related_concepts: ["[[Effect Size]]", "[[Statistical Significance]]"]
related_methods: ["[[Meta-analysis]]", "[[Meta-meta-analysis]]", "[[Rasch Measurement]]"]
related_persons: ["[[John Hattie]]"]
sources: ["sources/Allerup_2015_Paideia.md", "sources/Wecker_2016_ZfE.md"]
confidence: low
status: draft
created: 2026-05-05
updated: 2026-05-05
---

## 定义

置信区间（Confidence Interval, CI）是在点估计周围给出的误差范围，用来表示估计值的精度。带有置信区间的排名或比较表可以显示两个数值相邻的估计是否可能没有统计显著差异；如果只给点估计，读者容易把微小数值差异误读为真实差异（Allerup, 2015, pp.47–48）。

## 历史沿革

- 2015 教育效应量排名批评中，PISA 的区间呈现常被用来对照只列出 d 值的效应量排名：前者显示估计误差，后者难以判断相邻教学干预是否真的不同（Allerup, 2015, pp.47–48）。
- 2016 Wecker et al. 在二级元分析方法要求中明确提出，联合效应量应报告标准误和 95% CI，并进行显著性检验；缺少这些信息会使排名中的相邻位置无法解释（Wecker et al., 2016, p.30）。

## 核心要素

- **点估计**：点估计给出一个数值，但不说明估计精度；效应量排名若只给 d 值，就无法呈现该估计可能的误差范围（Allerup, 2015, p.47）。
- **标准误**：用于计算置信区间。二级元分析若缺少标准误，读者无法自行判断联合效应量估计是否稳定（Wecker et al., 2016, p.29）。
- **区间重叠**：当两个估计值的置信区间重叠时，仅凭点估计大小不能判断二者有统计显著差异；d=0.71 与 d=0.72 这类相邻值本身不足以证明两个干预不同（Allerup, 2015, p.47）。

## 与相关概念的区别

- vs [[Statistical Significance]] — 显著性检验通常给出是否拒绝零假设的判断；置信区间直接呈现估计误差范围，使点估计的精度可见。
- vs [[Effect Size]] — 效应量是差异大小的点估计；置信区间说明这个点估计可能有多不稳定。没有 CI 时，效应量排名只能呈现数值顺序，不能说明相邻 d 值是否真的不同（Allerup, 2015, pp.47–48）。

## 相关方法

- [[Meta-analysis]] — 元分析中，平均效应量需要伴随标准误或置信区间，才能说明估计精度。
- [[Meta-meta-analysis]] — 联合标准误和置信区间是二级元分析报告联合效应量时的必要信息（Wecker et al., 2016, p.30）。

## 实证发现

- 只给点估计的效应量表不像带有横向误差范围的排名那样呈现估计精度，因此无法知道 d=0.71 与 d=0.72 这类相邻值是否有统计上可区分的差异（Allerup, 2015, p.47）。
- Hattie 的二级综合通常不进行显著性检验或不给出效应量估计的置信区间；对于效应量较小的因素，是否存在效应因此并不清楚（Wecker et al., 2016, p.30）。

## 报告实践问题

- 在面向实践者的证据工具中，置信区间常被省略以换取简洁排名；但这种简洁会把估计精度隐藏起来，使排名看起来比实际更确定（Allerup, 2015, pp.47–48）。
- Wecker et al. 进一步指出，如果标准误本身计算错误或缺失，即使读者想自行判断相邻排名是否显著不同，也缺少必要信息（Wecker et al., 2016, p.30）。

## 相关案例／政策

- [[Visible Learning]] — Hattie 排名仅列出 d 值，未系统报告各干预的 CI/SE，成为 Allerup 和 Wecker et al. 方法论批评的共同焦点。
- [[Rasch Measurement]] — PISA 等国际评估中的 Rasch 分数排名通常伴随误差区间，能帮助读者避免过度解释相邻排名（Allerup, 2015, pp.47–48）。

## 来源

- [[Allerup_2015_Paideia]]
- [[Wecker_2016_ZfE]]

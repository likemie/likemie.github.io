---
title: Intent-to-Treat Analysis
type: concept
tags: [Intent-to-Treat Analysis, subject/research-methodology]
related_concepts: ["[[Randomised Controlled Trials]]", "[[Cluster Randomized Trials]]", "[[Effect Size]]", "[[Educational Evidence Clearinghouses]]"]
related_methods: ["[[Randomised Controlled Trials]]"]
sources: ["sources/Pampaka_2016_IJRME.md", "sources/Wadhwa_2024_RER.md"]
confidence: low
status: draft
created: 2026-05-02
updated: 2026-05-05
---

## 定义

意向治疗（ITT）分析是 RCT 中的一种估计方法：无论被试是否实际接受了干预，均按其原始随机分配组别进行分析。ITT 估计反映的是"干预可获得性（availability）"的效果，而非"干预实际接受（uptake）"的效果（Pampaka et al., 2016, p.233）。

> "such models usually offer intent-to-treat (ITT) estimates which is of great importance for policy and practice 'as policymakers and administrators often have control only over the availability of an intervention, and not its uptake'"（Pampaka et al., 2016, p.233）

## 核心要素

- **政策意义**：政策制定者通常只能控制干预是否可用，而无法强制接受——ITT 估计因此直接对应政策决策的实际参数
- **与依从性问题**：当存在"非合规（non-compliance）"时，传统的多水平模型"不再估计处理效应，因为它们不模拟每个个体实际接受的处理"（Pampaka et al., 2016, p.233）
- **ITT 的局限**：ITT 可能低估实际干预效果（当非合规率高时），因为它混合了接受者和未接受者的结果

## 与相关概念的区别

- vs 处理效应（Treatment Effect） — ITT 估计干预"提供"的效果，而非"接受"的效果
- vs 依从者平均因果效应（CACE） — CACE 估计实际接受干预者的效果，需要额外建模

## 实证发现

- Schweig & Pane (2016) 的模拟研究表明，在部分嵌套 RCT 设计中，集群效应和非合规"可能对 ITT 效应的统计推断产生实质性影响"（Pampaka et al., 2016, p.233）
- 非合规在教育研究中是"具有实际重要性的问题"（Pampaka et al., 2016, p.233）
- 在教育证据清算中心的评级标准中，[[Blueprints for Healthy Youth Development]]、[[Social Programs That Work (SPTW)]] 和 [[Promise Neighborhoods Research Consortium (PNRC)]] 明确要求 ITT 分析；[[What Works Clearinghouse (WWC)]] 则在特定条件下允许计算 CACE。这说明 ITT 不只是 RCT 统计技术，也是部分清算中心判定研究质量的显性标准（Wadhwa et al., 2024, p.9）。

## 争议与批评

- 如果技术性"依从"的教师中有一部分并非有效参与者，则 ITT 可能高估大规模推广时实际可达到的效果——这是大规模实施经常失败的另一原因（Pampaka et al., 2016, p.233-234）

## 来源

- [[Pampaka_2016_IJRME]]
- [[Wadhwa_2024_RER]]

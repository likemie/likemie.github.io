---
title: Cluster Randomized Trials
type: concept
tags: [Cluster Randomized Trials, subject/research-methodology, level/k12]
related_concepts: ["[[Randomised Controlled Trials]]", "[[Intent-to-Treat Analysis]]", "[[Effect Size]]", "[[Stable Unit Treatment Value Assumption (SUTVA)]]"]
related_methods: ["[[Randomised Controlled Trials]]"]
sources: ["sources/Pampaka_2016_IJRME.md", "sources/Berk_2011_ER.md"]
confidence: low
status: draft
created: 2026-05-02
updated: 2026-05-03
---

## 定义

集群随机试验（CRT）是一种 RCT 设计变体，其中随机分配的单位不是个体学生，而是学校或班级等集群。因为教育干预通常在班级或学校层面实施，CRT 已成为教育评估中的"标准实践"（Pampaka et al., 2016, p.232）。

> "typically interventions are implemented at the school or classroom level, rather than individual pupil level"（Pampaka et al., 2016, p.232）

## 核心要素

- **随机化单位**：学校或班级，而非个体学生——因为干预无法在不造成交叉污染的情况下对个体实施
- **统计功效**：CRT 的功效取决于集群数量而非个体数量，集群内相关性（ICC）显著降低有效样本量
- **最小可检测效应量（MDES）**：衡量研究精度的关键指标，指给定功效下可检测的最小效应量。"近期争论的焦点，因为其主要由经验法则（rules of thumb）决定"（Pampaka et al., 2016, p.233）
- **多层设计**：两级 CRT（学生嵌套于学校）和三级 CRT（学生嵌套于班级嵌套于学校）均有相应功效计算公式（Spybrook et al., 2016）
- **SUTVA 违反（主体间干扰）**：当随机化单位为教室而政策兴趣单位为个体学生时，同一教室内的学生互动导致结果不独立——"因为任何一个学生的结果取决于他/她与之互动的学生，而这又取决于哪些学生被分配到哪些干预，因果效应不仅由干预定义，而且由哪些学生恰好被分配到哪里定义"（Berk, 2011, p.195）。每个可能的随机分配实现都产生不同的因果效应，"单一的因果效应不再存在"（Berk, 2011, p.195）。截至 Berk 写作时对此没有有效的统计补救方法，但若将分析单位从个体学生改为教室（使用聚合统计量），该问题消失（Berk, 2011, footnote 2, p.200）

## 与相关概念的区别

- vs [[Randomised Controlled Trials]] — CRT 是 RCT 的子类，处理教育中不可化约为个体层面的干预实施单位问题
- vs [[Intent-to-Treat Analysis]] — CRT 通常报告 ITT 估计（因随机化发生在集群层面），而非实际接受处理的效应

## 实证发现

- Spybrook, Shi & Kelcey (2016) 比较 NCER 资助的两组 CRT：早期（2002-2004，16 项研究）与近期（2011-2013，22 项研究），发现近期研究的精度（MDES）有所提高，原因包括知识基础增长和专业发展机会增加（Pampaka et al., 2016, p.233）

## 争议与批评

- 即使 CRT 设计精度提高，RCT 领域仍弥漫"萎靡感（malaise）"，因其未能识别大规模有效的干预（Pampaka et al., 2016, p.233）
- 技术改进（如更精确的 CRT 设计）未必能解决"什么有效"议程的根本问题（Pampaka et al., 2016, p.233）
- **SUTVA 违反导致单一因果效应消失**：Berk (2011, p.195) 论证，当 CRT 中的个体学生结果取决于互动学生群体时，因果效应不再被单一地定义——"对于研究单位的每一种可能的重新洗牌，都存在一个因果效应，单一的因果效应不再存在"。这一问题"太少被认识到"且"远比通常认为的更严重"——它不仅影响统计检验（对此存在补救方法），而是从本体论层面动摇了 CRT 估计的因果效应定义。唯一的解决方案是将分析单位与随机化单位对齐（如使用教室层面的聚合统计量），但这改变了研究问题本身（Berk, 2011, footnote 2, p.200）

## 相关案例／政策

- NCER 资助的 CRT 研究：美国教育部教育科学研究所对集群随机试验的系统资助

## 来源

- [[Pampaka_2016_IJRME]]
- [[Berk_2011_ER]]

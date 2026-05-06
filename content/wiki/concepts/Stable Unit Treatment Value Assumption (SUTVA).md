---
title: Stable Unit Treatment Value Assumption (SUTVA)
type: concept
tags: [SUTVA, stable-unit-treatment-value-assumption, causal-inference, subject/research-methodology]
related_concepts: ["[[Potential Outcomes Framework]]", "[[Cluster Randomized Trials]]", "[[Randomised Controlled Trials]]"]
related_methods: ["[[Randomised Controlled Trials]]"]
related_persons: []
sources: ["sources/Berk_2011_ER.md"]
confidence: low
status: draft
created: 2026-05-03
updated: 2026-05-03
---

## 定义

稳定单位处理价值假设（Stable Unit Treatment Value Assumption, SUTVA）是潜在结果框架下因果推断的一个核心假定：每个研究主体的潜在结果仅取决于该主体自身接受的处理，不受其他主体接受何种处理的影响。当 SUTVA 被违反时，即出现**主体间干扰**（subject interference），因果效应不再被唯一地定义——每个可能的研究单位分配方式都可能产生不同的因果效应（Berk, 2011, pp.194–195）。

> "Because the outcome for any one student depends on the students with whom he or she interacts, and because that depends on which students are assigned to which interventions, causal effects are defined not just by the interventions, but by which students happen to be assigned where." (Berk, 2011, p.195)

## 核心要素

### 违反机制：集群随机化中的主体间干扰

SUTVA 在教育研究中最重要的违反场景是**集群随机试验（CRT）**。在典型的教室集群随机化中：

- 整个教室的学生被分配至一种干预，但政策兴趣聚焦于个体学生如何回应（即政策利益单位是学生，但随机分配单位是教室）（Berk, 2011, p.194）
- 同一教室内的学生之间会互动，因此测量的结果在学生之间不是独立实现的——"一个学生的结果取决于他/她与之互动的学生，而这又取决于哪些学生被分配到哪些干预"（Berk, 2011, p.195）

### 后果：单一因果效应的消失

当 SUTVA 被违反时，"对于研究单位的每一种可能的重新洗牌，都存在一个因果效应，单一的因果效应不再存在"（Berk, 2011, p.195）。这意味着：

- 因果效应部分由随机分配的结果决定——哪些学生恰好被分配到哪里
- 研究者无法报告单一的处理效应估计，因为效应本身取决于特定的随机分配实现
- 这不仅仅是统计检验和置信区间的问题（对此存在有效补救方法）；问题更为根本——因果效应本身的定义取决于单位之间的分配模式

### 目前没有有效的统计补救方法

Berk (2011, p.195) 明确指出："截至目前，对主体间干扰没有有效的统计补救方法。"但他同时指出，如果分析单位从个体学生改为教室（使用教室层面的聚合统计量，如均值），则问题消失——因为此时随机分配单位与分析单位一致（Berk, 2011, footnote 2, p.200）。

## 与相关概念的区别

- vs [[Cluster Randomized Trials]] — SUTVA 是 CRT 设计中的一个核心威胁；CRT 设计正是因干预需要在集群层面实施而产生，但由此引入的 SUTVA 违反常被研究者忽视
- vs [[Potential Outcomes Framework]] — SUTVA 是该框架下因果效应能够被唯一定义的前提条件之一
- vs [[Randomised Controlled Trials]] — 个体随机分配的 RCT 同样需要满足 SUTVA，但在集群随机化中 SUTVA 违反更为系统性和难以避免

## 争议与批评

- Berk (2011, p.195) 指出，SUTVA 违反虽然被认为"只是"统计检验和置信区间的问题（对此存在有效补救），但"问题远为严重"——它从本体论层面动摇了因果效应的可定义性。然而，部分研究者可能认为这一区分过于学术化，对实践政策的直接影响有限

## 相关案例／政策

- 教室层面的教育干预评估：学校或班级被随机分配至不同课程或教学方法，但研究者想了解对个体学生的影响——这是教育 RCT 中最常见的 SUTVA 违反场景（Berk, 2011, pp.194–195）

## 来源

- [[Berk_2011_ER]]

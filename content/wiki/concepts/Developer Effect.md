---
title: Developer Effect
type: concept
tags: [developer-effect, program-evaluation, meta-analysis, evidence-based-education, research-methodology]
related_concepts: ["[[Effect Size]]", "[[Publication Bias]]", "[[Researcher Degrees of Freedom]]", "[[Preregistration]]", "[[Evidence-Based Education]]"]
related_theories: []
related_persons: ["[[Robert Slavin]]"]
sources: ["sources/Wolf_2020_JREE.md"]
confidence: medium
status: draft
created: 2026-05-02
updated: 2026-05-02
---

## 定义

开发者效应（Developer Effect）指教育项目评估中，由项目开发者委托或实施的研究所报告的平均效应量系统地大于独立第三方评估的现象。Wolf et al. (2020) 使用 What Works Clearinghouse (WWC) 数据库中的 755 个效应量（来自 169 项研究）首次以元分析技术系统量化了这一效应。

> "We find evidence of a 'developer effect,' where program evaluations carried out or commissioned by developers produced average effect sizes that were substantially larger than those identified in evaluations conducted by independent parties." (Wolf et al., 2020, p. 428)

## 核心要素

### 效应量差异

Wolf et al. (2020) 通过多元元回归模型（multivariate meta-regression）得出以下核心发现：

- **全样本**（755 个效应量，169 项研究）：控制研究设计特征和项目特征后，独立研究的平均效应量为 +0.168，开发者研究的平均效应量为 +0.309，差异为 0.141 标准差（Wolf et al., 2020, p. 441）。即开发者研究的效应量约为独立研究的 **1.8 倍**。
- **同一干预子样本**（350 个效应量，91 项研究）：控制协变量并加入每个干预的虚拟变量后，独立研究平均效应量为 +0.194，开发者研究为 +0.324，差异为 0.130 标准差（Wolf et al., 2020, p. 439）。即对于**同一个项目**，开发者研究效应量约为独立研究的 **1.7 倍**。

> 例：在 28 个同时有开发者和独立研究的干预中，除 Sound Partners（一个辅导项目）外，所有干预的开发者平均效应量方向性上均大于独立研究平均效应量（Wolf et al., 2020, pp. 438–439）。

### 已排除的解释

开发者效应**不能**由以下可观测特征解释（控制后效应依然存在）（Wolf et al., 2020, p. 441）：

- **研究设计**（实验 vs. 准实验）：开发者的准实验比例更高（51% vs. 15%），但控制后效应仍在
- **结果测量类型**（研究者/开发者自编 vs. 独立测量）
- **样本量**（开发者研究样本量更小，均值 392 vs. 659）
- **年级段、学科、项目类型、交付方式、是否教育技术**

### 可能的解释机制

Wolf et al. (2020, pp. 442–443) 讨论了五种可能解释，但强调无法确定因果关系：

1. **选择性报告（Selective Reporting）**：开发者研究中负面效应量仅占 14%，独立研究占 20%；开发者效应量 >0.20 的占 61%，独立研究占 49%
2. **发表偏倚（Publication Bias）**：使用 Vevea & Hedges (1995) 权重函数模型校正后，开发者与独立研究的效应量差异从 0.115 降至 0.076，表明发表偏倚可能解释约 **66%** 的开发者效应（Wolf et al., 2020, p. 442）
3. **研究者自由度（Researcher Degrees of Freedom）**：开发者可能在样本选择、变量选择、案例排除等分析决策中更积极地优化结果
4. **控制组差异**：开发者研究中 86% 为"照常教学"控制组，独立研究为 80%——差异不大
5. **实施忠实度（Treatment Fidelity）**：开发者可能在委托研究中确保更高的实施质量，但 WWC 数据中无实施忠实度信息，无法检验

### 异质性

开发者效应的背后存在大量异质性。控制协变量后，独立研究的 95% 预测区间为 (−0.452, +0.788)，开发者研究为 (−0.311, +0.929)（Wolf et al., 2020, p. 441）。这意味着并非所有开发者研究的效应量都大——而是分布整体向右偏移。

## 历史沿革

- **2016** — Munter, Cobb & Shekell 首次比较 K-12 数学项目评估中开发者与独立研究的效应量，发现开发者研究效应量平均高 0.21 SD，但未使用元分析技术或控制混淆因素（Wolf et al., 2020, p. 429）
- **2020** — Wolf et al. 发表首篇使用元分析技术和 WWC 全数据库系统量化开发者效应的研究

## 与相关概念的区别

- **vs [[Publication Bias]]** — 发表偏倚是开发者效应的可能解释机制之一（估计解释约 66%），但开发者效应是一个更广泛的现象，可能还涉及选择性报告、研究者自由度和实施忠实度
- **vs [[Researcher Degrees of Freedom]]** — 研究者自由度是产生开发者效应的可能行为机制；开发者效应是这一机制在开发者 vs. 独立评估者比较中表现出的系统性结果

## 实证发现

- 在 28 个同时有开发者和独立研究的干预中，27/28 的开发者的平均效应量方向性更大（Wolf et al., 2020, p. 438）
- 开发者研究更倾向使用准实验设计（51% vs. 15%）、研究者/开发者自编测量（29% vs. 8%）和更小样本量（均值 392 vs. 659）（Wolf et al., 2020, pp. 434–436）
- 开发者研究平均发表年份更早（Wolf et al., 2020, p. 436）
- 敏感性分析（移除研究生研究、仅实验设计、仅准实验设计）均未改变开发者效应的大小和方向（Wolf et al., 2020, p. 441）

## 争议与批评

- **因果不确定性**：Wolf et al. (2020, p. 442) 明确承认"我们无法确定此开发者效应的来源"，研究本质上是描述性的而非因果性的
- **Vevea-Hedges 校正的局限**：该校正使用研究级平均效应量而非个体效应量，且对开发者研究，校正后效应量与原始效应量差异不显著（Wolf et al., 2020, p. 442）
- **WWC 数据的样本偏差**：由于联邦报告要求，独立研究中的零结果可能在 WWC 中比在其他数据源中被包含得更多（Wolf et al., 2020, p. 442）

## 相关案例／政策

- [[ESSA 2015 Evidence Standards]] — ESSA 的通过使开发者有更大的经济激励去证明其产品的有效性，可能加剧开发者效应
- [[What Works Clearinghouse (WWC)]] — WWC 数据库是 Wolf et al. 研究的数据源
- [[Creation of REES 2018]] — 预注册制度被提出作为缓解开发者效应的关键机制

## 来源

- [[Wolf_2020_JREE]]

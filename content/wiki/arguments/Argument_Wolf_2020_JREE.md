---
title: Argument_Wolf_2020_JREE
type: argument
citation: "Wolf, R., Morrison, J., Inns, A., Slavin, R., & Risman, K. (2020). Average effect sizes in developer-commissioned and independent evaluations. Journal of Research on Educational Effectiveness, 13(2), 428–447."
tags: [developer-effect, program-evaluation, meta-analysis, WWC, ESSA, publication-bias, preregistration]
related_concepts: ["[[Developer Effect]]", "[[Effect Size]]", "[[Publication Bias]]", "[[Researcher Degrees of Freedom]]", "[[Preregistration]]"]
related_theories: []
related_methods: ["[[Meta-analysis]]", "[[Randomised Controlled Trials]]"]
sources: ["sources/Wolf_2020_JREE.md"]
status: draft
created: 2026-05-02
updated: 2026-05-02
---

## 研究问题

开发者委托或实施的教育项目评估是否比独立第三方评估产生系统性更大的效应量？如果存在差异，这些差异可否由可观测的研究设计特征（研究设计、测量类型、样本量、年级段、项目类型等）解释——还是开发者的干预本身更有效？（Wolf et al., 2020, p. 429）

## 理论框架

研究以 ESSA 2015 通过后开发者经济激励增强为背景，将 Simmons et al. (2011) 的"研究者自由度"和发表偏倚（Polanin et al., 2016）作为解释开发者效应的理论机制，并参考医学领域关于药企资助偏倚（Lundh et al., 2017; Lexchin, 2012）的文献作为类比框架。（Wolf et al., 2020, pp. 429–431）

## 研究方法

- **方法**：[[Meta-analysis]]（多元元回归，multivariate meta-regression），使用 robust variance estimation (RVE) 处理效应量依赖性，small-sample correction (Tipton, 2015) 防止 I 类错误膨胀
- **样本**：WWC 数据库中 K-12 数学和阅读/读写领域的 755 个效应量，来自 169 项研究（均达到 WWC 标准）（Wolf et al., 2020, p. 433）
- **数据来源**：What Works Clearinghouse (WWC) 数据库（2018 年 1 月提取），辅以对原始研究的个别审查以填充缺失数据、作者邮件询问资金来源（Wolf et al., 2020, pp. 433–434）
- **关键编码**：每个研究编码为开发者委托（作者为开发者雇员 或 开发者资助）vs. 独立研究；结果测量编码为研究者/开发者自编 vs. 独立测量（Wolf et al., 2020, pp. 434–435）
- **发表偏倚检验**：Vevea & Hedges (1995) 权重函数模型（Wolf et al., 2020, p. 438）
- **软件**：R packages metafor, clubSandwich, weightr（Wolf et al., 2020, p. 437）

## 核心论证

1. **前提/观察**：ESSA 2015 将联邦拨款与项目有效性证据绑定，开发者面临前所未有的经济激励去证明其产品有效（Wolf et al., 2020, p. 428）
2. **假设**：开发者可能通过研究设计特征（更小样本、自编测量）、文件抽屉效应、研究者自由度三重机制抬高效应量（Wolf et al., 2020, p. 429）
3. **方法步骤**：使用 WWC 全数据库，先估计零模型，再加入开发者和协变量的元回归模型，最后限制在同时有开发者和独立研究的干预子样本并加入干预固定效应——逐步排除替代解释（Wolf et al., 2020, pp. 437–438）
4. **结论**：在控制可观测研究设计特征和项目特征后，开发者效应仍然存在（全样本差异 0.141 SD，同一干预差异 0.130 SD），发表偏倚估计可解释约 66%，但剩余部分不能由现有数据明确解释（Wolf et al., 2020, pp. 441–443）

## 主要发现

- **全样本**：控制协变量后，独立研究 ES = +0.168，开发者研究 ES = +0.309，差异 = 0.141 SD（Wolf et al., 2020, p. 441）
- **同一干预子样本**：控制协变量和干预固定效应后，独立研究 ES = +0.194，开发者研究 ES = +0.324，差异 = 0.130 SD（Wolf et al., 2020, p. 439）
- **效应量分布异质性**：独立研究 95% 预测区间 (−0.452, +0.788)；开发者研究 (−0.311, +0.929)（Wolf et al., 2020, p. 441）
- **发表偏倚**：Vevea-Hedges 校正后开发者-独立研究差异从 0.115 降至 0.076，约 66% 的差异可归因于发表偏倚（Wolf et al., 2020, p. 442）
- **描述性差异**：开发者研究更倾向准实验设计（51% vs. 15%）、自编测量（29% vs. 8%）、更小样本量（均值 392 vs. 659），控制后效应仍在（Wolf et al., 2020, pp. 434–436）
- **敏感性分析**：移除研究生研究、仅实验设计、仅准实验设计——开发者效应均持续存在且大小相似（Wolf et al., 2020, p. 441）

## 关键引用

> "We find evidence of a 'developer effect,' where program evaluations carried out or commissioned by developers produced average effect sizes that were substantially larger than those identified in evaluations conducted by independent parties." (Wolf et al., 2020, p. 428)

> "When looking within the same program, developer-commissioned studies produced average effect sizes that were 1.7 times greater than those in independent studies." (Wolf et al., 2020, p. 439)

> "Open access to study data holds the greatest promise for mitigating bias when authors publish complete datasets, including missing values and all participants who were included in the study at the onset, to the extent possible." (Wolf et al., 2020, p. 444)

## 局限性与批评

- **因果不确定性**：研究本质是描述性而非因果性——可以量化开发者效应的存在和大小，但不能确定其来源（Wolf et al., 2020, p. 442）
- **实施忠实度数据缺失**：WWC 数据中无实施忠实度信息，无法检验开发者是否通过更高实施质量达成更大效应量（Wolf et al., 2020, p. 443）
- **控制组细节有限**：WWC 仅提供控制组的简要描述，控制组之间的微妙差异可能未充分捕捉（Wolf et al., 2020, p. 443）
- **Vevea-Hedges 校正局限**：使用研究级平均效应量，且对开发者研究的校正差异不显著（Wolf et al., 2020, p. 442）
- **发表偏倚的双向性**：独立研究的校正效应量反而高于原始值（+0.200 vs. +0.177, p<.05），说明发表偏倚的校正方向不一定总是向下（Wolf et al., 2020, p. 442）

## 来源

- [[Wolf_2020_JREE]]

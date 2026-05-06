---
title: Publication Bias
type: concept
tags: [publication-bias, file-drawer-effect, meta-analysis, research-methodology, evidence-based-education]
related_concepts: ["[[Effect Size]]", "[[Statistical Significance]]", "[[Developer Effect]]", "[[Preregistration]]", "[[Researcher Degrees of Freedom]]", "[[Evidence-Based Education]]"]
related_theories: []
related_persons: []
sources: ["sources/Wolf_2020_JREE.md", "sources/Wecker_2016_ZfE.md", "sources/Snook_2009_NZJES.md", "sources/Kraft_2023_ER.md"]
confidence: medium
status: draft
created: 2026-05-02
updated: 2026-05-05
---

## 定义

发表偏倚（Publication Bias），也称"文件抽屉效应"（File Drawer Effect），指具有[[Statistical Significance|统计显著]]或正面结果的研究比零结果或负面结果的研究更有可能被发表或传播的系统性倾向。在教育项目评估中，发表偏倚意味着已发表文献中的平均效应量可能高估了干预的真实有效性。

> "Developer-commissioned studies with lackluster results may be withheld to a greater extent than those of independent parties, resulting in more bias due to a 'file drawer effect'." (Wolf et al., 2020, p. 429, citing Polanin, Tanner-Smith, & Hennessy, 2016; Sterling, Rosenbaum, & Weinkam, 1995)

## 核心要素

### 在教育评估中的双重机制

Wolf et al. (2020, p. 429) 识别了教育评估中发表偏倚的双重来源：

1. **学术发表压力**：学术机构研究者面临发表压力，期刊偏好发表"引人注目、'干净'的故事"（John, Loewenstein, & Prelec, 2012; McBee, Makel, Peters, & Matthews, 2017）
2. **开发者经济激励**：开发者有更强的动机不传播关于其产品功效的零结果或负面结果——即使是开发者雇佣的独立评估者也可能因不愿破坏与客户关系而压制零结果

> 例：假设一个教育科技公司委托评估其阅读项目。如果结果显示效应量接近零，公司可能选择不发布该报告；与此同时，一个显示正面结果的独立研究即使效应量很小也更可能被期刊接受。长期来看，文献中该项目的平均效应量将被人为抬高。

### Vevea-Hedges 权重函数模型

Wolf et al. (2020, p. 438) 使用 Vevea & Hedges (1995) 权重函数模型估计经发表偏倚校正后的平均效应量。该模型的逻辑是：根据效应量的 p 值区间赋予不同权重，模拟不同显著水平下的发表概率差异，然后通过似然比检验（likelihood ratio test）判断校正模型是否比原始模型更好地拟合数据。

### 在开发者效应中的角色

Wolf et al. (2020, p. 442) 发现发表偏倚可解释约 66% 的开发者效应：

- 开发者研究的原始研究级平均效应量：+0.292；校正后：+0.276（差异不显著）
- 独立研究的原始研究级平均效应量：+0.177；校正后：+0.200（差异显著，p<.05，但方向为反向——独立研究的校正效应量反而更大）
- 原始差异：0.115；校正后差异：0.076

### 对教育干预效应量分布的影响

Kraft（2023）指出，教育干预 RCT 的已发表效应量分布很可能已经被发表偏倚推向较大的正效应，因此"36% 的效应量小于 0.05"仍可能低估失败频率。他给出两条证据：第一，小样本研究若只发现很小估计效应，往往因为统计功效不足而难以区分于零，更不容易发表；第二，美国教育部委托且要求研究者提交结果报告的研究子样本中位数效应量为 0.03，低于完整样本的 0.10（Kraft, 2023, p.186）。

Kraft 对这一解释保持谨慎：这些模式并不能直接证明发表偏倚，因为较小平均效应也可能来自政府资助的大规模有效性试验与普通发表研究之间的系统性差异。但他认为，完全没有发表偏倚、且发表偏倚没有在某种程度上把分布推向更大正估计，是不太可能的（Kraft, 2023, p.186）。

### 与选择性报告的区别

发表偏倚指整篇研究不被发表（study-level suppression），选择性报告指同一研究内某些结果被报告而另一些不被报告（finding-level suppression）。Wolf et al. (2020, p. 441) 发现两种机制可能同时在运作：负面效应量在开发者研究中占 14%，在独立研究中占 20%；效应量 >0.20 的在开发者研究中占 61%，在独立研究中占 49%。

## 历史沿革

- **1995** — Sterling, Rosenbaum & Weinkam 系统记录"文件抽屉效应"
- **1995** — Vevea & Hedges 提出权重函数模型用于元分析中发表偏倚的统计校正
- **2016** — Polanin, Tanner-Smith & Hennessy 发表关于已发表与未发表效应量差异的元综述（meta-review）
- **2020** — Wolf et al. 首次将 Vevea-Hedges 校正应用于开发者 vs. 独立研究的效应量比较
- **2023** — Kraft 在教育 RCT 效应量经验分布讨论中指出，发表偏倚意味着教育干预"失败"（效应量接近零）的比例可能高于已发表文献显示的 36%（Kraft, 2023, pp.183, 186）

## 与相关概念的区别

- **vs [[Developer Effect]]** — 发表偏倚是开发者效应的一个子机制，估计贡献约 66%，但不是全部解释
- **vs [[Researcher Degrees of Freedom]]** — 研究者自由度关注数据分析阶段的选择性决策，发表偏倚关注发表阶段的选择性传播；两者可以同时存在并叠加

## 争议与批评

- **Vevea-Hedges 校正的假设**：权重函数模型依赖于对发表概率与 p 值关系的假设，且仅适用于研究级平均效应量，忽略研究内效应量变异（Wolf et al., 2020, p. 442）
- **WWC 数据的特殊性**：由于联邦报告要求，WWC 可能比一般学术期刊包含更多独立研究的零结果，因此发表偏倚在一般文献中可能比在 WWC 中更严重（Wolf et al., 2020, p. 442）

### Wecker 等人（2016）的中央证据数据库提案

Wecker, Vogel & Hetmanek（2016）在对 Hattie *Visible Learning* 的方法论批判中，提出了建立**中央证据数据库**的方案作为系统性缓解发表偏倚的路径（Wecker et al., 2016, p.34-36）：

- **不分发表状态的全量归档**："收集实证研究的方法和结果——无论期刊出版物如何——并以标准化和元分析可用的格式在中央数据库中提供"
- **减少选择性发表扭曲**："可以显著减少由选择性发表研究结果引起的扭曲，并且对个别发现的元分析总结变得更加容易"
- **统一效应量标准**：推荐使用 Hedges' g（标准化均值差的无偏估计量），并制定既定的处理标准
- **每个元分析发布完整的主要研究表**：使结果可用于更新和其他主要研究的综合——而非像 Hattie 那样的不透明做法
- **方法论理由**：目前"公共资源在全球范围内不断被用于研究——结果往往不是可靠的"（p.35）；"由于缺乏统计显著影响而在期刊上发表的机会很小"时，相关参数被埋没在文件抽屉中

这一提案的独特之处在于它将发表偏倚的解决方案定位于**基础设施层面**（集中式开放数据库），而非仅依赖预注册或期刊政策等程序性改革。Stanat（2012）的 DFG 备忘录也呼吁在教育研究中提供和使用定量研究数据。

## 相关案例／政策

- [[Creation of REES 2018]] — 预注册制度被设计用于减少发表偏倚和选择性报告
- [[ESSA 2015 Evidence Standards]] — ESSA 要求采用有证据支持的项目，间接增加了开发者的发表偏倚激励

## 来源

- [[Wolf_2020_JREE]]
- [[Wecker_2016_ZfE]]
- [[Kraft_2023_ER]]

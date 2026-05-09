---
title: Meta-analysis
type: method
tags: [meta-analysis, effect-size, evidence-based-education, statistical-synthesis, methodology]
related_theories: ["[[Critical Realism]]"]
related_concepts: ["[[Effect Size]]", "[[Statistical Significance]]", "[[Confidence Interval]]", "[[Evidence-Based Education]]", "[[Visible Learning]]", "[[Publication Bias]]"]
related_methods: ["[[Meta-meta-analysis]]", "[[Covariate Adjustment]]"]
related_persons: ["[[Dylan Wiliam]]", "[[John Hattie]]", "[[Adrian Simpson]]", "[[Ray Pawson]]", "[[Lars Qvortrup]]"]
sources: ["sources/Snook_2009_NZJES.md", "sources/Snook_2010_NZJES.md", "sources/Terhart_2011_JCS.md", "sources/Berk_2011_ER.md", "sources/Hattie_2015_SOTLP.md", "sources/Qvortrup_2015_Paideia.md", "sources/Allerup_2015_Paideia.md", "sources/Simpson_2017_JEP.md", "sources/Wecker_2016_ZfE.md", "sources/Qvortrup_2019_NordSTEP.md", "sources/Wiliam_2019_ERE.md", "sources/Wrigley_2019_ERE.md", "sources/OConnor_2020_AJLL.md", "sources/ONeill_2012_NZJES.md"]
confidence: medium
status: draft
created: 2026-05-01
updated: 2026-05-07
---

## 定义

元分析（Meta-analysis）是一种统计方法，通过计算多项原始研究的平均[[Effect Size|效应量]]来综合研究证据。它由 Gene Glass 于 1976 年提出，最初旨在系统性地总结某一主题的研究发现。在[[Evidence-Based Education|证据本位教育]]中，元分析被用作综合 RCT 证据的核心工具，其结论（平均效应量）被视为"什么有效"的主要证据来源（Wrigley & McCusker, 2019, p. 118）。

[[Dylan Wiliam|Wiliam]] (2019, p.11) 在定义上增加了关键的**层级区分**：元分析综合原始研究的效应量；而**[[Meta-meta-analysis|元-元分析]]**——即通过效应量的加权合并综合多个元分析的结果——是另一回事。Wiliam 断言后者"在教育政策制定中绝对没有任何角色"。

## 认识论立场

元分析隐含经验主义认识论：假设通过对多个研究的效应量进行统计平均，可以产生关于干预有效性的可靠知识。批判实在论从三层本体论（实在/实际/经验）角度批评这一假设——元分析停留在"经验"层面（观察到的效应量），未能深入"实在"层面（产生效应的因果机制及其激活条件）（Wrigley & McCusker, 2019, pp. 116–117）。

## 操作步骤

1. **选择源研究**：基于技术标准（如是否为 RCT）筛选相关研究
2. **提取效应量**：从每项源研究中提取或计算标准化效应量
3. **加权与平均**：对效应量进行加权（通常按样本量），计算平均效应量
4. **报告**：以平均效应量（有时转换为更直观的单位，如 EEF Toolkit 的"额外学习月数"）呈现结果

元-元分析（Meta-meta-analysis）是在元分析基础上进一步聚合——综合多个元分析的效应量产生更高层次的排名或估计。Wecker, Vogel & Hetmanek（2016）从固定效应模型推导了该方法必须满足的 6 项方法论要求（包括公式 1-9 的完整数学推导和等价性证明），并论证 [[John Hattie|Hattie]] 的 *[[Visible Learning]]* 在六个分析步骤中均存在方法论不足。完整技术细节见 [[Meta-meta-analysis]]。

## 适用场景

- 当有大量使用可比较设计和结果测量的研究时，元分析可以提供效果的总体估计
- 在医学领域（其起源领域），元分析在已有充分理论理解治疗机制的前提下可以补充回答"效果平均多大"
- 教育领域中使用元分析的倡导者认为它适合为实践者和政策制定者提供关于"什么有效"的总结性指导（Wrigley & McCusker, 2019, pp. 110–111）
- [[Lars Qvortrup|Qvortrup]] (2015, pp.25–27) 从支持者立场认为，教育元分析不需要等待所有研究使用完全相同的学习结果定义才可比较；效应量提供的是干预组与控制组或干预前后之间的相对效果，因此可以跨研究比较"相对学习结果"。但这种比较的代价是学习结果变得抽象，研究者难以说明测量的是表层知识、深层理解、社会能力还是概念性学习（Qvortrup, 2015, p.27）。
- Wiliam (2019, p.11) 的谨慎立场：如果（且仅当）满足 11 项条件，元分析"可能值得严肃对待"
- Qvortrup (2019, p.5) 从支持者立场提出"观察透镜"论证：元分析是系统观察的一种形式，所有观察都从特定位置和特定透镜进行（von Foerster, 1984），元分析透镜产生的图像与定性观察研究的图像不同但互补——前提是两者均遵循高效度标准

## 局限性

### 输入质量与纳入标准问题

**Eysenck (1978) — "垃圾进，垃圾出"（Garbage In, Garbage Out）**

Eysenck（1978, p.517）对元分析提出了著名的早期批评，指出元分析的不加区分性质——每个与选定领域相关的研究都被用于计算效应量，而不论不同研究的质量或严谨性：

> "大量报告——好的、坏的和平庸的——被输入计算机，希望人们不再关心结论所基于的材料的质量。……'垃圾进——垃圾出'是计算机专家熟知的格言；它在这里同样有力。"（引自 O'Connor, 2020, p.143）

这一批评奠定了后续所有元分析方法论批评的基础命题：**聚合的质量取决于输入的质量**。

**Snook et al. (2009) — 元分析在教育领域的五项方法论问题**

Snook et al.（2009, p.96–98）在 VL 出版同年识别了元分析在教育中应用的五项特有局限：

1. **偏差不受控**：设计不良研究的元分析（无论设计多好）不可避免地导致不可靠结论（p.96–97）
2. **[[Publication Bias|发表偏差]]**：支持有利结论的研究更可能被发表——在药物公司资助的研究和利润丰厚的教育时尚（如学习风格）中尤其严重（p.97）
3. **教育变量难以清晰界定**：与医学中"药物 A vs 药物 B"不同，"以儿童为中心 vs 以教师为中心"等教育变量通常处于连续谱上，主观判断不可或缺。Hattie 本人承认[[Whole Language|全语言]]的两项元分析因分类差异导致结论矛盾（p.97）
4. **平均化消除复杂性**：以家庭作业为例，总体 d=0.29 掩盖了小学 d=0.15、中学 d=0.64 以及数学、科学、社会研究之间的巨大差异（p.97）
5. **可推广性有限**：大多数研究来自美国等英语发达国家，不可直接推广至非英语或发展中国家——在发展中国家学校效应（相对于教师效应）远更大（p.97–98）

**"苹果和橙子"问题（1980s–）**

根本不同的研究（不同学生年龄、课程领域、先前成就水平、干预时长、结果测量类型）被聚合产生单一的平均效应量。Gene Glass——元分析的创始人——本人警告："元分析的结果永远不应该是平均值；它应该是一张图"（Robinson, 2004, p. 29, cited in Wrigley & McCusker, 2019, p. 119）。

**源研究选择的纯技术标准**

元分析通常基于技术质量（如 RCT 设计）而非理论相关性选择源研究，且讨论部分的理论内容在最终报告中往往消失（Wrigley & McCusker, 2019, pp. 119, 123）。

**发表偏倚**

学术发表对[[Statistical Significance|统计显著性]]的偏好可能筛选掉"效应量可观但统计不显著"的结果，使元分析平均值系统性地高估真实效应。详见 [[Publication Bias]]。

**源研究不充分问题**

EEF Toolkit 的体育参与条目仅基于三个元分析中的四个效应量（Wrigley & McCusker, 2019, pp. 121–122）。

**Snook et al. (2010) — 元分析从医学到教育的移植问题**

Snook et al.（2010, p.96）在回应 Hattie (2010) 时，提出了一个常被忽略的更深层问题：元分析技术起源于医学科学——医学有经过仔细界定的概念和严谨的（通常为实验性）研究设计。然而在教育领域，"被研究的变量往往概念化差，研究也经常不够严格"：

> "如何为研究目的清晰区分一个'以教师为中心'和一个'以学生为中心'的课堂？在比较它们时，如何在一个嘈杂繁忙、可能有 30 多个参与者的课堂中控制所有变量？"（Snook et al., 2010, p.96）

经过四十年课堂细粒度研究，Graham Nuthall（2007, p.16）得出结论：虽然有大量已发表的教育研究报告，但"在识别那些对课堂教学有值得信赖的内容的研究时，你需要非常有选择性"（Snook et al., 2010, p.97）。Snook et al. 以 Nuthall 的 *The Hidden Lives of Learners*（基于数十年新西兰课堂研究）与 Hattie 的 *Visible Learning*（基于国际元分析）的书名对比，暗示两者在认识论取向上存在本质差异（Snook et al., 2010, p.97）。

这一批评的核心在于：元分析在医学中成功运作的条件（概念清晰、设计标准化、机制可分离）在教育领域经常不成立——这不是方法论执行缺陷的问题，而是方法本身与研究对象之间的基础性不匹配。

### 平均效应的误导性与因果信息的丧失

**Kluger & DeNisi (1996) — 反馈元分析：平均效应的误导性案例**

[[Dylan Wiliam|Wiliam]]（2019, pp.10–11）以 Kluger & DeNisi（1996）的反馈元分析为例展示平均效应量的误导性：

- 131 项研究、607 个效应量，平均效应量约 0.4 SD——这使 Hattie（1999）提出"改善教育的最简单处方必须是大量的反馈"
- 然而效应量的标准差约为 **1**（即效应量分布极为分散），约 **38% 的效应量为负**——在超过三分之一的案例中，给予反馈反而比不给予反馈更差
- Wiliam 指出：不了解干预如何产生效果，在特定情境中应用干预可能产生持续负效果——对 EBE 倡导者而言"反馈可能适得其反"不是相关的替代状态；对教师而言高度相关

> "In over one third of the cases they examined, it would have been better simply not to give the feedback." (Wiliam, 2019, p.10)

**[[Ray Pawson|Pawson]] (2006) — 因果信息的系统性消除**

Pawson（2006, pp.42-43, 72）论证在元分析综述的每一阶段，解释干预如何起作用的关键特征被系统性地从考虑中消除：

> "假设被删节、研究被丢弃、项目细节被过滤、情境信息被消除、选定发现被利用、平均值被计算、估计被做出……这种简化、标准化和聚合的过程不产生任何持久的真理。它产生的描述性总结很可能令人失望、误导或需要进一步澄清。"（引自 O'Connor, 2020, p.143; 另见 Wrigley & McCusker, 2019, p. 122）

### 效应量与统计推断的方法论缺陷

**Berk (2011) — 不可比研究、有偏估计与统计推断的三重批判**

Berk (2011, pp.198–199) 基于 35 年编辑经验，对元分析在因果效应估计中的使用提出了三重批判：

**1. 研究不可比导致平均效应无政策意义**

"当被合并的研究不是可比较的随机实验时，元分析开始脱轨"（Berk, 2011, p.198）。Berk 给出具体例证：如果合并职业培训研究和职业咨询研究，发现平均而言"效果有益"——这对政策意味着什么？应该增加培训项目、咨询项目，还是两者都增加？"在跨处理的平均值中，没有证据表明任何一种干预单独有效，也没有证据表明两者一起引入时都有效"（Berk, 2011, p.199）。标准化效应量的常规做法只是掩盖了这个问题。

**2. 有偏估计不会相互抵消**

"当研究不是随机实验时，极有可能正在合并一组有偏的处理效应估计。这如何使人更好？有偏估计不是随机误差，不会相互抵消。结果可能只是一个更精确的因果估计，但符号错误且系统性地过大或过小"（Berk, 2011, p.199）。

**3. 统计推断的基本假设几乎从未被满足**

在缺乏随机分配的情况下，元分析的统计推断"变得非常难以辩护"（Berk, 2007）。必须假设被合并的研究是"所有可能（或已完成）研究的一个概率样本，且研究之间彼此独立实现"（Berk, 2011, p.199）。Berk 指出："随便做一下项目评估社会学就会发现，综述的研究不是任何真实事物的概率样本。而独立性的通常要求意味着研究者不阅读彼此的工作、不在学术会议上讨论这些工作、从不合作、也不雇佣彼此的学生"（Berk, 2011, p.199）。

> "In short, the importance of meta-analysis for estimating causal effects has been grossly overrated. A conventional literature review will often do better. At the very least, readers will not be swayed by statistical malpractice disguised as statistical razzle-dazzle." (Berk, 2011, p.199)

**[[Adrian Simpson|Simpson]] (2017) — 元分析两项核心假设的系统性违背**

Simpson（2017, pp.4–5）论证教育元分析依赖两项核心假设，两者均被系统性地违背：

1. **可比较性假设**：效应量更大的干预通常与更大的教育显著性相关联——即效应量可以跨不同研究进行比较
2. **可合并性假设**：不同研究的效应量可被合并产生有意义的估计

三个系统性偏差来源（详细论证见 [[Effect Size#Simpson (2017) 的三大系统性偏差：原始论证]]）：
- **比较组的不对等性**：不同研究使用不同比较基线（无干预 vs 替代处理 vs 照常教学），使效应量不可比——"一个分析的实验组是另一个分析的控制组"（Simpson, 2017, p.7）；Camilli et al. (2010) 发现比较"无干预"的效应量是"替代处理"的 3 倍以上
- **范围限制**：选择窄化样本减小方差→放大效应量，10,000 次模拟显示中等能力组效应量膨胀 40%（Simpson, 2017, pp.8–9）；Elbaum et al. (2000) 故意选择阅读失败风险学生的元分析在 EEF Toolkit 中与未限制范围的元分析合并且未调整
- **测量设计（聚焦度+精确度）**：研究者自编测试效应量比标准化测试平均高约 40%（Simpson, 2017, p.12）；测试长度翻倍可膨胀效应量 ~20%–100%+（Figure 3）——Kluger & DeNisi (1996) 中测试从 6 任务到 300 算术题，未调整

**关键洞察**：这些偏差不是随机噪声——"good experimenters legitimately manipulate d to enhance the sensitivity of their experiments, but their freedom to do so varies between educational contexts"（Simpson, 2017, p.5）。偏差随研究领域系统性变化：反馈研究容易使用无反馈比较、限制样本范围、设计聚焦测试；而延长学校日或校服研究无法做到这些。**元分析合并效应量时，实际合并的是不同领域中不同程度的研究设计操纵自由度**（Simpson, 2017, pp.5–14）。详见 [[Effect Size]]、[[Argument_Simpson_2017_JEP]]。

### 元-元分析（二级聚合）的特有局限

**Terhart (2011) — 稳定性/变异性双重困境**

Terhart（2011）识别了元-元分析的特有问题：信息在聚合层级间系统性损失、稳定性/变异性双重困境、纳入标准不透明、数据库质量异质。详见 [[Meta-meta-analysis]]。

**LeLorier et al. (1997) — 偏倚在聚合层级间传播**

LeLorier et al.（1997）在医学文献中已警告偏倚在聚合层级间传播——一级聚合的偏倚在二级聚合中被进一步放大。

**O'Connor (2020) — 全语言案例的方法论审查**

O'Connor（2020）通过 [[John Hattie|Hattie]] 对全语言效应量（d=0.06）处理的详细案例审查，揭示了元-元分析中分类错误、不对称审查（接受 -0.65 / 修正 +0.65）、选择性修正和不加权平均等具体问题。详见 [[Meta-meta-analysis]]。

**O'Neill (2012) — 跨教育阶段混合综合与排名扭曲**

O'Neill（2012, pp.155-156）识别了 VL 元-元分析的一个具体方法论问题：Hattie 的综合涵盖早教、学校教育和高等教育所有阶段，非学校阶段的研究对学校教育政策无已证明的相关性，但其纳入扭曲了特定主题的平均效应量和排名位置。典型例证是 VL 中"教学质量"（quality of teaching）的元分析证据全部来自大学生评教研究，却被用于论证增加中小学班级规模的政策合理性——暴露了跨阶段混合综合在政策应用中可能产生的具体误导。

### 评估清单

**[[Dylan Wiliam|Wiliam]] (2019) — 11 点评估清单**

Wiliam（2019, p.11）提出以下检查清单用于评估元分析是否值得严肃对待：

1. 包含的研究是否**相关**？
2. 效应量是**干预**的结果还是仅仅是**关联**？
3. 效应量比较的是**相同的事物**（如与替代干预比较或"照常教学"比较，而非仅前后比较）？
4. 效应量在**同一层面**（如个体层面 vs. 群体层面）？
5. 是否检查了**发表偏倚**（如漏斗图）？
6. 被比较的干预在**持续时间**上是否相似？
7. 被比较的干预在**强度**上是否相似？
8. 使用的所有**结果测量**是否测量**同一事物**？
9. 测量属性的**离散度**在被比较的研究中是否相似？
10. 使用的**结果测量**对被调查的处理是否**同等敏感**？
11. 研究参与者在被调查的处理上是否具有**同等的资质（aptitude）**？

> "If the answers to all of these questions is 'yes', or at least if the meta-analysis at least examines these issues, for example, by including these issues as moderators of effect, then the meta-analysis may be worth taking seriously. If, however, the answers to any of these questions is no, then it is unlikely that the meta-analysis has much relevance to real educational settings." (Wiliam, 2019, p.11)

## 相关理论

- [[Critical Realism]] — 为元分析的经验主义假设提供了系统的哲学批判：因果机制而非效应量平均值才是科学知识的真正对象

## 使用此方法的研究

- [[Argument_Hattie_2015_SOTLP]] — Hattie 将 1200 项元分析（65,000+ 研究）综合应用于高等教育，提出六项关键发现、DIE 模型和八项思维框架
- [[Argument_Wrigley_2019_ERE]] — 通过 EEF Toolkit 体育参与案例的深度追踪揭示元-元分析的程序缺陷
- [[Argument_Wrigley_2018_BERJ]] — 对元分析和元-元分析（Hattie / EEF Toolkit）的系统方法论批判

## 替代方案

Pawson (2006) 提出**实在论综合（Realist Synthesis）**作为替代：研究综述应基于因果理论（干预"为什么有效、对谁有效、在什么条件下有效"），基于理论和相关性而非纯技术标准选择源研究，并以揭示效应变异性的分散图景（而非单一平均值）为输出形式（Wrigley & McCusker, 2019, pp. 119, 123）。

## 来源

- [[Simpson_2017_JEP]]
- [[Terhart_2011_JCS]]
- [[Berk_2011_ER]]
- [[Allerup_2015_Paideia]]
- [[Wecker_2016_ZfE]]
- [[Qvortrup_2019_NordSTEP]]
- [[Wiliam_2019_ERE]]
- [[Wrigley_2019_ERE]]
- [[OConnor_2020_AJLL]]

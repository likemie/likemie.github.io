---
title: Meta-meta-analysis
type: method
tags: [meta-meta-analysis, mega-analysis, meta-analysis, effect-size, evidence-based-education, statistical-synthesis, methodology]
related_concepts: ["[[Effect Size]]", "[[Statistical Significance]]", "[[Confidence Interval]]", "[[Evidence-Based Education]]", "[[Visible Learning]]", "[[EEF Teaching and Learning Toolkit]]", "[[Whole Language]]", "[[Cargo Cult Science]]"]
related_methods: ["[[Meta-analysis]]", "[[Covariate Adjustment]]"]
related_persons: ["[[John Hattie]]", "[[Adrian Simpson]]", "[[Dylan Wiliam]]", "[[Terry Wrigley]]", "[[Ewald Terhart]]", "[[Lars Qvortrup]]"]
related_theories: ["[[Critical Realism]]"]
sources: ["sources/Snook_2009_NZJES.md", "sources/Terhart_2011_JCS.md", "sources/Qvortrup_2015_Paideia.md", "sources/Allerup_2015_Paideia.md", "sources/Wecker_2016_ZfE.md", "sources/Simpson_2017_JEP.md", "sources/Simpson_2019_ERE.md", "sources/OConnor_2020_AJLL.md", "sources/Johnson_2023_CE.md"]
confidence: medium
status: draft
created: 2026-05-03
updated: 2026-05-05
---

## 定义

元-元分析（Meta-meta-analysis，也称 Mega-analysis）是一种将多个已发表的元分析结果在更高层次上进行统计综合的方法——"改变层次，组合元分析，尝试开发一个元-元分析"（Terhart, 2011, p.436）。与普通[[Meta-analysis|元分析]]综合原始研究不同，元-元分析综合的是已聚合的[[Effect Size|效应量]]，从而大幅扩大参照范围（Terhart, 2011, p.436）。

> 例：[[John Hattie|Hattie]] (2009) 的 *[[Visible Learning]]* 综合了 816 项元分析（涵盖 52,649 项原始研究、83,033,433 名参与者、146,626 个效应量），产生 138 个影响因素的效应量排名——这是该方法的标志性应用（Terhart, 2011, pp.427–428）。[[EEF Teaching and Learning Toolkit]] 是另一个采用类似逻辑的政策工具，将效应量转换为"额外学习月数"并按成本、有效性和证据确定性三个维度排名。

Hattie 本人坚持其工作不是"元分析的元分析"，而是"综合"（synthesis）——但 Snook et al.（2009, p.94）指出，根据 Evidence Informed Policy Network 的定义，"研究综合"必须包含协议制定、系统和明确方法的使用、数据收集、分析、解释和结果报告，而 Hattie 声称不关心纳入研究的质量，这与综合的方法论要求直接矛盾。

Qvortrup (2015) 从支持者角度为 Hattie 的综合方式辩护：元-元分析可以比较跨研究的相对学习结果，因为[[Effect Size|效应量]]把具体测量转换为共同表达式（Qvortrup, 2015, p.27）。但他同时指出，这一共同表达式的代价是结果层次变得抽象，研究者难以判断总体效应究竟来自表层知识、深层理解还是概念性学习；因此未来元-元分析需要借助[[Dynamic Knowledge and Learning Model]]更精确地区分学习结果（Qvortrup, 2015, pp.27–33）。

## 认识论立场

元-元分析共享[[Meta-analysis|元分析]]的经验主义认识论假设——通过对多项研究的效应量进行统计平均产生可靠知识——但在更高的抽象层次上操作。从[[Critical Realism|批判实在论]]的三层本体论（实在/实际/经验）来看，元-元分析停留在"经验"层面的第三级聚合——原始研究的经验数据被元分析聚合一次，元分析的聚合结果再次被聚合——每一级都进一步远离了"实在"层面的因果机制（Wrigley & McCusker, 2019, pp.116–117）。

Terhart（2011, p.436）从认识论角度提出根本性质疑：将已聚合的结果再次聚合在原则上是否合理——"当然可以通过不同渠道累积金钱并将不同货币汇集在一起——但你能用来自不同项目、不同方法的研究结果做同样的事吗？"

Wecker, Vogel & Hetmanek（2016, p.33）从方法论角度补充：即使二级汇总本身执行正确，也无法纠正一级中的偏差——"随后不能在一级元分析中纠正的也将是"——这一误差传播特性意味着元-元分析的可靠性受到其纳入的每一项元分析质量的硬性约束。

## 操作步骤

### Hattie 的元-元分析程序

Terhart（2011, pp.426–428）描述了 Hattie 的操作步骤：

1. **确定影响因素分组**：将影响因素分为 6 组——学生、家庭、学校、教师、课程、教学方法（各组平均效应量分别为 0.40, 0.31, 0.23, 0.49, 0.45, 0.42，见表 1, p.428）
2. **收集已发表的元分析**：在每组下收集所有可及的元分析
3. **计算每个因素的"平均效应量"**：从每个元分析中提取或计算[[Effect Size|效应量 d]]，汇总为该因素的单一效应量
4. **构建"影响气压计"（barometer of influence）**：将每个因素的效应量可视化呈现，分为四个区域——负面效应区（d < 0）、发展效应区（0.0–0.15）、教师效应区（0.15–0.40）、期望效应区（d > 0.40，即"铰链点"hinge point）
5. **排名**：将所有 138 个因素按效应量从高到低排名

### 固定效应模型的数学基础与方法论要求

Wecker, Vogel & Hetmanek（2016, pp.24–26, 37–38）从固定效应模型（Fixed-Effect Model）的数学基础出发，系统推导了二级元分析必须满足的方法论要求，并提供了完整的数学等价性证明。详见 [[Argument_Wecker_2016_ZfE]]。

#### 数学模型

当 Hattie 声明"应用了固定效应模型"（Hattie, 2009, p.12）时，他从方法论上承诺了一个特定的数学模型。核心假设：固定效应模型假设所有主要研究估计同一个恒定的"真实"效应量——观察到的不同效应量仅由主要研究内的抽样误差造成（Hedges & Olkin, 1985, p.107; Borenstein et al., 2009, p.63）。主要研究按其精度加权——精度定义为效应量方差的倒数。

**第一级：元分析 j 内主要研究效应的汇总**

> **公式 (1)**：$w_{ji} = 1 / v_{ji}$，其中 $v_{ji}$ = 主要研究 $i$ 中效应量 $d_{ji}$ 的方差
>
> **公式 (2)**：$d_j = \frac{\sum_{i=1}^{k_j} w_{ji} d_{ji}}{\sum_{i=1}^{k_j} w_{ji}}$
>
> **公式 (3)**：$v_{d_j} = 1 / \sum_{i=1}^{k_j} w_{ji}$

**第二级：跨元分析的效应汇总**

> **公式 (4)**：$w_j = 1 / v_{d_j}$
>
> **公式 (5)**：$d = \frac{\sum_{j=1}^{m} w_j d_j}{\sum_{j=1}^{m} w_j}$
>
> **公式 (6)**：$v_d = 1 / \sum_{j=1}^{m} w_j$

#### 等价性证明

将公式 (4) 和 (3) 代入公式 (5)，再将公式 (2) 代入，得到：

> **公式 (7)**：$d = \frac{\sum_{j=1}^{m} \left(\sum_{i=1}^{k_j} w_{ji}\right) d_j}{\sum_{j=1}^{m} \left(\sum_{i=1}^{k_j} w_{ji}\right)}$
>
> **公式 (8)**：$d = \frac{\sum_{j=1}^{m} \sum_{i=1}^{k_j} w_{ji} d_{ji}}{\sum_{j=1}^{m} \sum_{i=1}^{k_j} w_{ji}}$
>
> **公式 (9)**：$d = \frac{\sum_{\text{all } i} w_i d_i}{\sum_{\text{all } i} w_i}$

公式 (9) 与对所有主要研究直接进行单级固定效应元分析的公式在形式上完全相同。

**等价性证明的关键含义**：当且仅当所有一级元分析使用的**主要研究互不重叠**时，二级元分析才等同于一级元分析。如果同一项主要研究的数据通过多个元分析路径进入二级汇总，则违反了统计独立性假设——该研究的数据被多次计数，人为降低了标准误，效应量被不成比例地影响（Wecker et al., 2016, pp.27–28）。

#### 6 项方法论要求

从上述数学模型出发，Wecker 等人推导出 6 项要求（pp.24–26, Table 1）：

**要求 1（效应量与方差的正确确定）**
- 选择统一的效应量测度（推荐 Hedges' g）
- 正确计算合并标准差：$SD_{pooled} = \sqrt{\frac{(n_E - 1)SD^2_E + (n_C - 1)SD^2_C}{n_E + n_C - 2}}$
- 正确区分标准误（$SE = SD/\sqrt{n}$）与标准差（SD）
- Fisher's z 转换必须执行：$z = \frac{1}{2}\ln\left(\frac{1+r}{1-r}\right)$

**要求 2（一级加权估计）**：按精度反比加权（wⱼᵢ = 1/vⱼᵢ），不能使用简单算术平均值。

**要求 3（非重叠主要研究）**：纳入的元分析必须基于互不重叠的主要研究集，否则违反统计独立性。

**要求 4（一级元分析效应量与方差的可用性）**：每个一级元分析必须提供联合效应量估计值 dⱼ 及其方差/标准误/置信区间。

**要求 5（二级加权估计）**：使用精度反比（wⱼ = 1/v_dⱼ）对一级元分析加权，不能使用简单算术平均值。

**要求 6（联合标准误和置信区间）**：SE_d = √(1/Σwⱼ)，95% CI = d ± 1.96·SE_d，必须进行显著性检验。

#### 可靠性分析：要求违背的后果

| 违背类型 | 对 d 的影响 | 对 SE_d 的影响 | 可靠性后果 |
|---------|------------|--------------|-----------|
| 效应量测度混合 | 不可预测 | 无直接影响 | 跨元分析汇总失去意义 |
| SE/SD 混淆 | 可放大或缩小数倍（案例：d 从 ~−0.80 → −8.29） | 连锁错误 | 极端值扭曲平均值 |
| 未加权平均 | 高估或低估 | 系统性低估 SE_d | 估计非最优；p 值和 CI 错误 |
| 重复数据 | 被重复计算的数据不成比例影响 d | 系统性低估 SE_d | CI 过窄；显著性检验膨胀 |
| 方差缺失 | 无法确定 | 无法确定 | 效应量无精度信息 |
| 二级未加权 | 幅度可能更大（两级偏差复合） | 系统性低估 | 排名可能对调（案例：d=0.59→0.23，#26→#98） |
| 标准误武断设定 | 无直接影响 | 人为限制 SE（0.05 下限） | CI 不可靠；显著性不可解释 |

**误差传播特性**：一级元分析中的偏差（效应量测度混合、SE/SD 混淆、未加权汇总）在二级汇总时作为"输入"进一步复合——即使二级本身执行正确，也无法纠正一级的偏差（Wecker et al., 2016, p.33）。

**固定效应模型的根本性限制**：即使所有 6 项要求都被满足，固定效应模型的假设——所有研究估计同一恒定真实效应——在教育研究中几乎从不成立。"鉴于通常不同的教学主题、不同实现的方法——在初级研究之间从一开始就比假设一个共同常数更合理"（Wecker et al., 2016, p.32）。随机效应模型在方法论上更适当，但 Hattie 的数据基础（每个因素平均仅 ~63 项一级元分析）不足以估计 τ²（Wecker et al., 2016, pp.32–33）。

## 适用场景

- 当某一研究领域已积累大量[[Meta-analysis|元分析]]，再做新的元分析只是"more of the same"时，元-元分析提供了更高层次的综合视角（Terhart, 2011, p.436）
- 适合为政策制定者和实践者提供关于"什么有效"的宏观概览——[[EEF Teaching and Learning Toolkit]]和[[Visible Learning]]是这一用途的标志性产物

## 局限性

元-元分析面临的批评覆盖了从概念基础到具体案例的多个层面，以下按主题分组，组内按时间排序。

### 概念基础：被聚合对象不测量有效性

**Simpson（2017）——联盟表是"研究设计操纵开放程度"的排名。** Simpson（2017, pp.5, 14–15）论证：三个系统性偏差（比较组不对等、范围限制、测量设计）随研究领域系统性变化——反馈和元认知研究容易使用无反馈比较、限制样本、设计聚焦测试；延长学校日或校服研究无法如此。因此，效应量排名高的领域仅说明研究者**更容易设计低噪声试验**，而非干预更具教育影响力。

> "Areas which rank highly in Marzano (1998), Hattie (2009) and Higgins et al. (2013) are those in which researchers can design more sensitive experiments." (Simpson, 2017, p.2)

> 例：反馈研究的效应量系统性高于早期干预研究——不是因为反馈更有效，而是因为反馈研究者可以轻松设计高度聚焦的测试（仅 9/68 个效应量使用标准化测试），而早期干预研究者几乎必须使用标准化测量（37/39 个效应量）（Simpson, 2017, pp.13–14）。

以这些排名驱动公共政策是"误导"：标准ised效应量是**研究工具**而非**政策工具**——"these meta-meta-analyses which order areas on the basis of effect size are thus poor selection mechanisms for driving educational policy and should not be used for directing large portions of a country's education budget"（Simpson, 2017, p.15）。详见 [[Effect Size#Simpson (2017) 的三大系统性偏差：原始论证]]、[[Argument_Simpson_2017_JEP]]。

**Simpson（2019）——对一个已无效的指标进行更高级的统计操作。** Simpson（2019, pp.105–106）将 2017 年的论证推进为更一般的陈述：[[Effect Size|效应量]]不是教育有效性的测量而是试验清晰度的测量——将元分析再聚合成元-元分析，是对一个已经无效的指标进行更高级的统计操作。详见 [[Effect Size#Simpson (2019) 的思想实验：教一个匈牙利单词]]、[[Argument_Simpson_2019_ERE]]。

### 技术方法论缺陷

**LeLorier et al.（1997）——偏倚在聚合层级间传播。** LeLorier et al.（1997, p.536）在医学元分析文献中最早警告："汇总结果纳入了个别研究的偏见，并体现新的偏见来源，主要是因为研究的选择和不可避免的异质性"（引自 O'Connor, 2020, p.147）。二级聚合中的偏见不仅继承自一级元分析的偏见，也在聚合决策（选择哪些元分析、如何加权、如何分类）中产生**新的偏见**（O'Connor, 2020, p.147）。

**Allerup（2015）——排名未报告置信区间与统计前提检查。** 二级综合若只发布 d 的点估计，而不报告置信区间、标准误或相邻排名之间的显著性检验，就无法判断相邻干预是否真的不同。PISA 排名至少会用横向置信区间标出国家均值估计的误差范围；Hattie 的列表则没有类似信息，因此 d=0.71 与 d=0.72 这样的相邻差异可能只是估计误差（Allerup, 2015, pp.47–48）。d 的解释还需要近似正态分布、相同标准差和可被理解为"均值平移"的分布结构；偏态分布、干预后离散度改变或 Cauchy 型厚尾分布都会削弱效应量的可解释性（Allerup, 2015, pp.45–49；参见 [[Effect Size#基本公式与构成逻辑]]）。

元-元分析中的单一边际效应量可能把第三变量误读为干预影响。TIMSS 2011 丹麦四年级数学中，教师学科专业资格的未控制效应量约为 0.15；加入学生社会经济背景作为协变量后，控制效应量降至 0.08 且不再显著（Allerup, 2015, pp.49–51）。这说明排名表不仅受一级元分析质量影响，也受每项研究是否采用边际分析或多变量模型影响。

**Wecker et al.（2016）——6 项方法论要求的系统性违背。** Wecker, Vogel & Hetmanek（2016）以固定效应模型为数学基准，推导了二级元分析必须满足的 6 项方法论要求（详见上方[[#6 项方法论要求]]），并证明 Hattie 的 *Visible Learning* 在所有六个分析步骤中均存在方法论不足（Wecker et al., 2016, pp.26–30）。关键发现：

- **SE/SD 混淆**：在个别一级元分析的主要研究中，标准误被错误地当作标准差使用——例如 Eisenstaedt 等人（1990）中控制组 SE=2.74 被当作 SD 处理，导致效应量从约 −0.80 变为 −8.29（Wecker et al., 2016, pp.26–27）
- **效应量测度混合使用不做转换**：Hattie 交替使用 Cohen's d、Hedges' g、Glass' Δ 和 Fisher's z，但二级汇总时直接合并而不做相互转换——"如果第一级的元分析使用不同的效应量测量，在第二级元分析中后续总结是有问题的"（Wecker et al., 2016, p.27）
- **声称固定效应模型但实际使用未加权平均**：正确加权后效应量从 0.59 变为 0.23，排名从 #26 跌至 #98（Wecker et al., 2016, pp.29–30）
- **误差传播**：一级中的偏差在二级汇总时作为"输入"，即使二级本身执行正确也无法纠正一级的偏差（Wecker et al., 2016, p.33）

详见 [[Argument_Wecker_2016_ZfE]]。

**Bergeron & Rivard（2017）——三种效应量公式的不可比性。** Bergeron & Rivard（2017, pp.241–245）构造受控数值示例，证明组间比较、前后比较和相关转换三种公式对同一组数据产生不可调和的矛盾排名——详见 [[Effect Size#三种效应量公式及其不可比性]]。在元-元分析层面，这意味着 Hattie 混合使用了回答不同问题、使用不同分母的效应量，而二级汇总未做任何校正（Bergeron & Rivard, 2017, p.241）。

**Johnson & Janzen（2023）——方法论不透明与读者无法验证。** Johnson & Janzen（2023）对 Hattie 的元-元分析进行了直接的透明度批判，其独特贡献在于**从读者视角**展示了方法论的不透明性如何使普通教育者无法验证其主张：

- **Homework 效应量的逐步重构**：Hattie 声称综合了 5 项元分析（161 项研究、100,000+ 学生）得出 d=0.29。Johnson & Janzen 通过手动搜索附录 A 找到了 5 个被隐藏的 Cohen's d 值（d=0.36, 0.21, 0.39, 0.21, 0.28），确认算术平均为 0.29——但指出 5、161、100,000 这些数字实际上"do not contribute to d=0.29, an average of unstated values"（Johnson & Janzen, 2023, p.25–26）
- **不透明与伪科学的关联**：伪科学工作的特征——"tends to both amplify its mathematical sophistication and obfuscate its nature"——而 VL 的 methodology section 篇幅极短却声称找到了教育的"圣杯"（Johnson & Janzen, 2023, p.26）
- **普通教育者无法验证**："The average K-12 educator would be unlikely to have the time, skill set, or access to challenge Hattie's claims"（Johnson & Janzen, 2023, p.26）
- **Glass & Smith (1979) 效应量提取不透明**：详见 [[Class Size#Johnson & Janzen (2023) 的五层拆解]]。VL 从 Glass & Smith 的最大规模班级规模元分析中提取的 d=0.09 并非 Glass & Smith 自己报告的值（Johnson & Janzen, 2023, p.32–33）

### 信息损失与数据库质量

**Snook et al.（2009）——"质量就是一切"。** Snook et al.（2009, p.94）在 VL 出版同年就指出：Hattie 声称不关心 800 项研究中包含的研究质量——"但是，质量就是一切"。任何未排除低质量或不当研究的元分析都是误导性的，如果导致不明智的政策发展则可能具有破坏性。

**Terhart（2011）——信息损失与失真。** Terhart（2011, p.436）识别了元-元分析最根本的局限——**通过反复累积，原始的详细经验信息系统性消失**。具体表现为：原始研究的情境细节被元分析消除；元分析的调节变量信息在二级聚合中进一步消失；不同质量的研究在各级聚合中被等同对待。

> "你能用来自不同项目、不同方法的研究结果做同样的事吗？……还是你累积的越多，在更低分析层次已被累积的东西越多，证据的稳健性就越降低？"（Terhart, 2011, p.436）

**Terhart（2011）——数据库质量异质性与纳入标准不透明。** 三个具体问题（Terhart, 2011, pp.428–429）：(1) **质量异质性**——纳入的元分析"可能有且确实有不同的针对个体研究的严格纳入标准"，数据库的纯粹规模令人印象深刻但质量非常异质；(2) **纳入标准不透明**——Hattie 未"向读者提供关于他在决定某研究是否纳入时使用的质量标准的准确信息"；(3) **时效性问题**——多数元分析来自 1980s–1990s，考虑原始研究平均约 5 年前发表，"原始数据库的大部分大概不是最新的"。

### 认识论困境与角色争议

**Terhart（2011）——稳定性与变异性的双重困境。** Terhart（2011, p.436）提出了元-元分析的根本困境：(1) **稳定性假说**——许多因素的结果已高度稳定，进一步研究只会渐近逼近已知结论，"继续这个过程到什么时候才有意义？"；(2) **变异性假说**——某些领域的发现已过时（如 Hattie 关于教师教育影响的元-元分析在 VL 出版时已被新的研究结果超越）。由于元-元分析同时支持两种假说，"很明显 Hattie 事实上没有找到圣杯"（Terhart, 2011, p.436）。

**Wiliam（2019）——元-元分析在教育政策中绝对没有任何角色。** [[Dylan Wiliam|Wiliam]]（2019, p.11）做出了 EBE 批判文献中对元-元分析最彻底的否定：

> "将多个元分析的结果通过效应量的某种加权合并——即所谓的元-元分析——在教育政策制定中绝对没有任何角色。"

Wiliam 同时提出了评估元分析是否值得严肃对待的 11 点检查清单（详见 [[Meta-analysis#评估清单]]），并以其核心论证——教育知识是局部且临时的（[[Goldman's Discrimination Theory of Knowledge]]）——说明元-元分析承诺的"累积性知识进步"在原则上不可能实现（Wiliam, 2019, pp.10–11）。

### 全语言案例：一个元-元分析如何从内部瓦解

O'Connor（2020）拆解了 Hattie 在 *[[Visible Learning]]* 中得出"[[Whole Language|全语言]]效应量 d=0.06"的全过程，为批评者关于"先验偏见驱动数据选择"的论点提供了系统性文本证据。详见 [[Argument_OConnor_2020_AJLL]]。

**起点：四个数字，一次简单平均**

VL 纳入的四项"全语言"元分析及其效应量：

| 元分析 | Hattie 使用的 d |
|--------|----------------|
| Stahl & Miller (1989) | 0.09 |
| Stahl, McKenna & Pagnucco (1994) | 0.15 |
| Gee (1995) | 0.65 |
| Jeynes & Littell (2000) | −0.65 |

Hattie 将它们相加除以 4 → d = 0.06，据此宣布全语言"对学习阅读的影响可忽略不计"——未对元分析的研究数量、质量或规模进行任何加权（O'Connor, 2020, p.145）。

**第一项元分析：研究的是另一回事。** Stahl & Miller（1989）的标题明确包含"Whole language **and language experience** approaches"。它包含 1960 年代早期和中期的研究——在全语言运动 1970 年代首次出现之前。Stahl 本人在五年后承认将语言经验法等同于全语言是"时代错误的"（anachronistic），并明确排除了纯粹涉及语言经验法的研究。Hattie 在 VL 中对此只字不提（O'Connor, 2020, pp.144–145）。

**第二项元分析：Jeynes & Littell 的 −0.65——极端异常值，不加审视。** Jeynes & Littell（2000）的 d=−0.65 是 VL 800+ 元分析中仅有的两个低于 −0.5 的效应量之一。Hattie 未做审查（O'Connor, 2020, p.146）。

*被掩盖的正面发现*：Jeynes & Littell 自己区分了四类全语言研究，其中被定义为"全语言热衷者会同意"的 2 项"纯粹"全语言研究效应量为 d=0.83。Hattie 只报告了四类汇总的总体负值（O'Connor, 2020, p.146）。

*Krashen 的重新计算*：Krashen（2002）逐项检查后发现多项效应量计算错误（O'Connor, 2020, p.147）：

| 研究 | Jeynes & Littell 的 d | Krashen 重算的 d |
|------|----------------------|-------------------|
| Hoffman (1976) | −0.23 | +0.68 |
| Lamb (1972) | −0.75 | +0.44 |
| Harris & Serwer (1966) | −0.51 | +0.18 |

Krashen 的结论与 Jeynes & Littell "几乎完全相反"。该批评发表于 2002 年，比 VL 早 7 年，Hattie 未提及。

*作者背景*：William H. Jeynes 是福音派牧师、God's Love Ministries 创始人，与共和党关系密切，曾进入 Trump 教育部长候选名单。Jeynes 的 −0.65 不仅是一个统计异常值——它嵌入了特定的政治议程（O'Connor, 2020, pp.147–148）。

**第三项元分析：Gee 的 +0.65——唯一被 Hattie 动手修改的。** Gee（1995）报告 d=+0.65。Hattie 以其中三项研究"包含系统语音和单词学习"为由将其删除，将效应量修正为零。但全语言理论家早已撰写了大量关于在全语言框架内教授语音技能的专著——在有意义的语境中教技能恰恰是全语言的核心实践（O'Connor, 2020, p.148）。

**关键的对比**：在 VL 的 800+ 元分析中，**仅此一项**——发现全语言有正面效果——被 Hattie 通过选择性删除研究修正了效应量。对报告极端负面效果的 Jeynes & Littell，他未做任何审查。这种不对称审查模式是 [[Cargo Cult Science| cargo cult science]] 在方法论层面的具体表现——只修正支持自己预设结论的证据，对支持相反结论的证据不加审视。

**Hattie 自己的话**："当前对证据本位的痴迷往往忽视了研究者用来决定什么要纳入（作为证据）、什么要排除、以及如何整理证据来讲述他们的故事的镜头。故事才是被认为有说服力的贡献——是我在这个证据上的镜头。"（Hattie, 2009, p.237，引自 O'Connor, 2020, p.142）O'Connor 指出这与元分析创始人 Gene Glass（1976, p.3）的初衷——提供"对研究叙述性讨论的严谨替代方案"——直接矛盾。

## 相关理论

- [[Evidence-Based Education|证据本位教育]]的认识论假设 — 元-元分析是该运动最具雄心的方法论工具，其局限也最鲜明地反映了 EBE 的根本问题（Wrigley & McCusker, 2019）
- [[Critical Realism|批判实在论]] — 从三层本体论角度揭示：元-元分析在"经验"层面的第三级聚合进一步远离了"实在"层面的因果机制（Wrigley & McCusker, 2019, pp.116–117）

## 使用此方法的研究

- [[Visible Learning]] — [[John Hattie|Hattie]] (2009) 的 800+ 元分析综合，该方法的标志性应用（Terhart, 2011）
- [[EEF Teaching and Learning Toolkit]] — 英国 EEF 以效应量排名 30+ 类教育干预的联盟表工具（Wrigley & McCusker, 2019）
- [[Argument_Wecker_2016_ZfE]] — 从固定效应模型数学基础对 Hattie VL 进行系统性的内部+外部方法论批判（Wecker et al., 2016）
- [[Argument_Simpson_2017_JEP]] — 论证效应量排名表是"对研究设计操纵开放程度的等级"而非教育有效性排名（Simpson, 2017）
- [[Argument_Simpson_2019_ERE]] — 以思想实验证明效应量是试验清晰度的测量，元-元分析是对无效指标的高级统计操作（Simpson, 2019）
- [[Argument_Wrigley_2019_ERE]] — 以 EEF Toolkit 体育参与案例追踪元-元分析的三级统计失真（Wrigley & McCusker, 2019）
- [[Argument_OConnor_2020_AJLL]] — 以 VL 全语言处理为案例的细读审查，揭示分类错误、不对称审查和选择性排除（O'Connor, 2020）

## 替代方案

- **Terhart（2011）暗示的方向**：(1) 更严格的质量控制和纳入标准透明度；(2) 承认元-元分析结果的根本临时性；(3) 同时关注可以使研究证据过时的新的、不同的发现（变异性假说）（Terhart, 2011, p.436）
- **Wecker et al.（2016, p.35）提出建立中央证据数据库**：以标准化格式收集实证研究的方法和结果（统一使用 Hedges' g），每个元分析发布完整的主要研究表——"通过提供标准化形式的'原始元分析数据'来促进像 Hattie 这样的项目"
- **[[Ray Pawson|Pawson]]（2006）提出实在论综合（Realist Synthesis）**：基于因果理论（"为什么有效、对谁有效、在什么条件下有效"）而非纯技术标准选择源研究，以揭示效应变异性的分散图景而非单一平均值为输出（Wrigley & McCusker, 2019, pp.119, 123）

## 来源

- [[Snook_2009_NZJES]]
- [[Terhart_2011_JCS]]
- [[Allerup_2015_Paideia]]
- [[Wecker_2016_ZfE]]
- [[Simpson_2017_JEP]]
- [[Simpson_2019_ERE]]
- [[OConnor_2020_AJLL]]
- [[Johnson_2023_CE]]

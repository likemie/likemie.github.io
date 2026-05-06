---
title: Argument_Bergeron_2017_MJE
type: argument
citation: "Bergeron, P.-J. & Rivard, L. (2017). How to engage in pseudoscience with real data: A criticism of John Hattie's arguments in Visible Learning from the perspective of a statistician. McGill Journal of Education, 52(1), 237-246."
tags: [Visible-Learning, effect-size, meta-analysis, pseudoscience, methodology-critique, statistics, subject/research-methodology]
related_concepts: ["[[Visible Learning]]", "[[Effect Size]]", "[[Meta-analysis]]"]
related_persons: ["[[John Hattie]]"]
related_methods: ["[[Meta-analysis]]"]
sources: ["sources/Bergeron_2017_MJE.md"]
status: draft
created: 2026-05-03
updated: 2026-05-03
---

## 研究问题

从统计学家的视角，系统审查 John Hattie 在 *Visible Learning* (2008) 中使用的方法论是否满足科学有效性的基本标准。核心问题：Hattie 的综合分析是真正的科学，还是用真实数据进行的伪科学？

## 理论框架

不依赖单一理论框架，而是以统计科学方法论的基本原则（Fisher 的科学咨询原则、Allison et al. 2016 的三大科学错误分类、Borenstein et al. 2009 的元分析标准）作为评估 Hattie 工作的规范基准。

## 研究方法

- **方法**：方法论批判（methodological critique）——从统计学家视角对已有元-元分析进行审计
- **分析对象**：Hattie (2008) *Visible Learning* 及其衍生作品中的方法论程序
- **分析维度**：计算错误、基线比较、效应量公式选择、相关与因果的混淆、聚合的任意性

## 核心论证

Bergeron & Rivard 的论证分为六个层次，逐层揭示 *Visible Learning* 从"圣杯"到"纸牌屋"的崩塌：

### 1. Hattie 的意图值得肯定，但不足以弥补错误

作者首先承认 Hattie 的基本意图——"用科学数据识别'什么在教育中效果最好'"——本身并不坏。Hattie 综合了 800+ 元分析、50,000+ 研究和数百万个体的规模"给人科学严谨性的印象"（Bergeron & Rivard, 2017, p.238）。但对统计学家而言，表象不足为据："当以专家的眼光深入审视 *Visible Learning* 时，我们发现的不是一座坚固的城堡，而是一座迅速崩塌的脆弱纸牌屋"（Bergeron & Rivard, 2017, p.238）。

### 2. Hattie 犯下了 Allison 等人识别的三大科学错误中的两个

Allison, Brown, George & Kaiser (2016) 在 *Nature* 中识别了科学中的三大主要错误。Hattie 的方法论同时违反其中两项（Bergeron & Rivard, 2017, p.239）：
- **元分析中的计算错误**：最明显的案例是 CLE（common language effects）计算，产生负概率或超过 100% 的概率——"对任何上过至少一门统计课的人来说，这是一个巨大的失误"（p.239）
- **不适当的基线比较**：Hattie 认为可以比较效应量因为 Cohen's d 是无单位的测量，但这忽略了一个根本问题——"每个效应量，尽管没有单位，都是一个相对测量，它提供了一个与某个集合、组或基线总体的比较，即使这个基线可能是隐含的"（p.241）

### 3. 效应量基线比较的任意性

这是 Bergeron & Rivard 最具原创性的方法论贡献。他们论证效应量的符号和量级取决于被任意选择的基线比较：

**班级规模的案例**：VL 中班级规模的效应量为正（d≈0.2，小班 > 大班）。但如果反转比较方向——比较大学校相对于小学校——效应量就会变成负数。此时 Hattie 的解释（"班级规模没有显著影响"）将完全不同，因为负面效应被视为"有害"（Bergeron & Rivard, 2017, p.241）。

**社会经济地位的案例**：SES 效应量为 d=0.59（富裕 > 贫穷）。但如果比较贫困学生与富裕学生，效应量变为 -0.59——"如果其它不变，这将是所有效应中最负面的"（p.241）。随后，如何帮助缓解社会不平等的影响就成为值得研究的课题——例如借鉴芬兰的经验（Reinikainen, 2012）。"因此，Hattie 对效应的解释完全不是客观的"（p.242）。

### 4. 三种效应量公式给出完全矛盾的排名

这是 Bergeron & Rivard 贡献的最具破坏力的方法论论证（pp.243–244）。他们构造了一个受控数值示例，证明三种在技术上均有效的效应量计算方法对同一数据产生不可调和的矛盾排名。

**示例设置**：四个独立组，初始成绩完全相同（正态分布，均值 75, SD 5），随机分配至三种新教学法和一种标准教学法。方法 i 平均增加 i 分，增加的标准差为 i。对照组无变化（增加 0, SD 0）。

**公式 (a)：实验组 vs 对照组（组间比较）** — d = (M_实验 − M_对照) / SD_pooled。分母是跨所有组的合并标准差，反映组间变异。因为四组初始等价且随机分配，组间差异归因于教学法。

**公式 (b)：前后比较（组内变化）** — d = (M_后 − M_前) / SD_变化。分母是每组自身成绩变化的标准差，消除的是组内噪声而非组间噪声。

**公式 (c)：相关→d 转换** — 先计算前后成绩的相关系数 r，再用 d = 2r/√(1−r²) 转换。这里的关键陷阱是：r 衡量的是前后成绩线性关系的强度，而非成绩增加的量。当变化标准差大时（成绩进步不一致），r 减弱；当变化标准差小时（成绩进步均匀），r 增强。对照组 SD=0 意味着 r=1.0，转换后 d→∞——尽管真实效果为零。

| 组别 | (a) 与对照组比较 | (b) 前后比较 | (c) 相关→d 转换 |
|------|-----------------|-------------|----------------|
| 对照 | 0.00 | N/A | 无穷大 |
| 方法1 | 0.14 | 1.00 | 10.00 |
| 方法2 | 0.27 | 1.00 | 5.00 |
| 方法3 | 0.39 | 1.00 | 3.33 |

三种排名不可调和的原因在于每种公式测量的是根本不同的东西：

- **公式(a)** 测量的是"这个教学法与标准教学法相比，差距有几个标准差的组间噪声？" → 排名 3>2>1>0，与真实效果一致
- **公式(b)** 测量的是"这个教学法自身引起了多大变化，相对于该变化自身的一致性？" → 排名 1=2=3，因为均值增加和变异性恰好同步增长（方法 3 增加 3 倍但 SD 也大 3 倍），d 值抹除了真实差异。根本原因："通过将平均增加除以标准差，我们丢失了一个维度"（p.244）
- **公式(c)** 测量的是"前后成绩的线性一致性有多强，转换后相当于多大的 d？" → 排名 0>3>2>1，因为"它不测量成绩的增加（教学法的效果），而是测量这种变化周围的噪声"（p.245）。成绩越不稳定（SD 越大），相关性越弱，d 越小

> "我们必须绝对确保在进行元分析或计算效应量平均值时使用正确的标尺和相同的视角。"（Bergeron & Rivard, 2017, p.243）

这一论证的致命性在于：**三种公式在技术上都是有效的**——各自有合理的数学基础。问题不在于哪种正确，而在于 Hattie 在 800+ 元分析的合成中不加区分地混合使用了它们。"如果同一个教学干预可以根据公式选择被排在第一、第二、第三或最后——取决于元分析员选择哪个公式——那么排名表反映的不是干预的有效性，而是分析员的公式选择。"

### 5. 聚合的任意性与混淆相关与因果

**聚合的任意性**："Hattie 混淆了两个不同的总体：(1) 影响学业成功的因素，和 (2) 对这些因素进行的研究"（p.241）。他用杂货店价格类比：如果按价格列举商店中的一切，会得出"海鲜产品对杂货账单影响最大因为鱼子酱价格极高"。但普通消费者很少购买鱼子酱，因此需要加权方法——Hattie 没有做任何加权。

**性别效应的案例**：Hattie 报告的性别效应为 d=0.12，偏向男孩。但如果这个数字代表任何现实，"这将意味着男孩在学校平均比女孩更成功一些。这在魁北克或大多数工业化国家都不是事实"（Legewie & DiPrete, 2012）（p.242）。

**相关与因果的混淆**：Hattie 使用的 r→d 转换公式在 r 接近 1 时"迅速爆炸"，且对弱相关也产生相对强的效应。r=0.196 即可达到 d=0.4 的"期望效应区"——但在简单线性回归中，r²=0.0385，即仅 3.85% 的变异被解释，96.15% 是未解释的随机噪音。"因此实际上非常弱的影响"（p.242）。

Hattie 用此公式获得了"创造力对学业成功的影响"（Kim, 2005）——实际上是 IQ 测试结果与创造力测试之间的相关。"自我报告成绩"（VL 中效应量最强的因素）同样是一组"报告成绩与实际成绩之间的相关"集合，完全没有测量使用自我报告成绩的组与未使用的组之间的学业成功增长（p.242）。

### 6. 结论：伪科学

> "总而言之，很明显 John Hattie 和他的团队既没有进行有效统计分析所需的知识，也没有所需的能力。任何人都不应该复制这种方法论，因为我们绝不能接受伪科学。这是非常不幸的，因为完全可以用数百个元分析的数据进行真正的科学。"（Bergeron & Rivard, 2017, p.245）

作者援引 R. A. Fisher 的名言作为解决方案："实验结束后再咨询统计学家往往只是请他进行尸检。他也许能说出实验死于什么原因"（Allison et al., 2016, p.28）。解决方案是在数据收集前、收集中、收集后——"尤其是在研究的每一步"——咨询统计学家（Bergeron & Rivard, 2017, p.245）。

## 主要发现

1. **CLE 计算错误**：Hattie 产生了负概率和超过 100% 的概率——任何一个上过统计课的人都不会犯的错误（p.239）
2. **基线比较的任意性**：效应量的符号和大小取决于隐含的基线选择，Hattie 对此"完全不知"（p.241）
3. **三种公式的矛盾结果**：同一数据使用三种有效公式得出不可调和的不同排名（pp.243-244）
4. **r→d 转换的危险**：r=0.196 即可达到 d=0.4，但仅解释 3.85% 的变异（p.242）
5. **相关与因果的混淆**：VL 中效应量最强的因素（自我报告成绩）实际上是一组相关而非干预效应（p.242）
6. **聚合的任意性**：将不同的健康问题（癌症、糖尿病、镰刀型贫血症、消化问题）合并为单一"疾病"效应（p.241）

## 关键引用

> "When taking the necessary in-depth look at Visible Learning with the eye of an expert, we find not a mighty castle but a fragile house of cards that quickly falls apart." (Bergeron & Rivard, 2017, p.238)

> "To believe Hattie is to have a blind spot in one's critical thinking when assessing scientific rigor. To promote his work is to unfortunately fall into the promotion of pseudoscience. Finally, to persist in defending Hattie after becoming aware of the serious critique of his methodology constitutes willful blindness." (Bergeron & Rivard, 2017, p.238)

> "Hattie's comparisons are arbitrary and he is completely unaware of it." (Bergeron & Rivard, 2017, p.241)

> "Basically, Hattie computes averages that do not make any sense." (Bergeron & Rivard, 2017, p.240)

> "It is clear that John Hattie and his team have neither the knowledge nor the competencies required to conduct valid statistical analyses. No one should replicate this methodology because we must never accept pseudoscience." (Bergeron & Rivard, 2017, p.245)

## 局限性与批评

- 作为论坛贡献（forum contribution）而非完整研究论文，论证简洁但缺乏对 VL 方法论错误的系统性目录——作者明确承认"我们可以花很长时间逐一剖析每个元分析"（p.245）
- 对解决方案的讨论局限于"咨询统计学家"，未深入探讨教育研究中统计素养的制度性缺乏问题
- 法文原版发表于 MJE 51(2)，英文版为翻译——可能在翻译过程中丢失部分技术细节
- 未系统讨论如何用"数百个元分析的数据进行真正的科学"——仅提出了方向但未展开方法

## 来源

- [[Bergeron_2017_MJE]]

# 模板：论证框架 Argument

## 文件命名规则

| 来源类型 | 命名格式 | 示例 |
|---------|---------|------|
| 期刊论文 | `Argument_作者姓_年份_期刊缩写.md` | `Argument_Thomas_2000_RER.md` |
| 论文集整体 | `Argument_Editor_Year_Publisher.md` | `Argument_Apple_2019_Routledge.md` |
| 论文集章节 | `Argument_作者姓_年份_关键词.md` | `Argument_Biesta_2019_purpose.md` |
| 专著整体 | `Argument_作者姓_年份_出版社.md` | `Argument_Vygotsky_1978_HUP.md` |
| 报告 | `Argument_机构_年份_Report.md` | `Argument_OECD_2012_Report.md` |

---

## Frontmatter

```yaml
---
title: Argument_Thomas_2000_RER
type: argument
citation: "Thomas, J. W. (2000). A review of research on project-based learning. Review of Educational Research."
tags: [project-based-learning, constructivism, level/k12]
related_concepts: ["[[项目式学习]]"]
related_theories: ["[[建构主义]]"]
related_methods: ["[[准实验研究]]"]
sources: ["sources/Thomas_2000_RER.md"]
part_of:                # 书籍章节才填，如 "[[Argument_Apple_2019_Routledge]]"；论文留空
status: draft | review | published
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

> **Frontmatter 格式规范：**
> - `tags` — 用方括号列表：`tags: [tag1, tag2, tag3]`
> - `related_*` 和 `sources` — 所有值必须加引号
> - wikilink 必须包在引号内，否则 Obsidian 无法解析 frontmatter

---

## 写入规则（每次写入前必须执行）

> ⚠️
> 1. 确定新内容属于哪个 `##` 章节
> 2. 分点 ≥ 8 条 → 按主题建 `###` 子主题，组内按时间排列
> 3. 分点 < 8 条 → 直接按时间顺序插入正确位置，禁止追加末尾
> 4. 写入前声明：「归属章节 > 子主题 > 插入位置」，再用 str_replace 写入

**论证拆解要求（强制执行）：**
- **逐步拆解，不跳跃** — 论证结构须完整还原每一个推论步骤，不得跳过中间环节直接给结论；读者应能看清从前提到结论的完整推理链
- **用易懂的语言** — 避免堆砌学术术语；每个步骤用一句清晰的中文说明其逻辑，术语首次出现须加括号解释
- **抽象主张必须附例子** — 凡涉及抽象论证步骤，须紧跟一个具体例子说明该步骤在实践中的含义，格式：
  > 例：[具体场景或数据，说明该论证步骤如何体现]
- **例子优先来自论文** — 使用论文本身提供的案例或数据，附页码；论文无例子时可用一句话的教育情境类比，但须注明「（编者类比）」

---

## 页面结构

```markdown
## 研究问题
论文试图回答什么问题。

---

## 理论框架
- [[建构主义]] — 如何运用

---

## 研究方法
- 方法：[[准实验研究]]
- 样本：描述
- 数据来源：描述

---

## 论证结构
1. 前提／观察
2. 论证步骤
3. 结论

---

## 主要发现
- 发现描述。（p.X）
<!-- 格式：有具体数字或效应量的关键数据用 info callout 高亮，示例：
> [!info] 核心数据
> 效应量 d = 0.40，覆盖 800 项研究（p.X）
-->

---

## 关键引用
> "引用内容"（p.X）
<!-- 格式：用 blockquote 引用原文，每个论证框架条目最多保留 1-2 条最关键引用 -->

---

## 局限性与批评
论文自身承认的局限，或他人批评。

---

## 来源
- [[Thomas_2000_RER]]
```

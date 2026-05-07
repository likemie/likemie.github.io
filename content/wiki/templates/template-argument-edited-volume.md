# 模板：论证框架 Argument — 论文集整体

此模板用于论文集的整体 Argument（`Argument_Editor_Year_Publisher.md`），代表前言所呈现的编者框架。
每章的 Argument 仍使用 `template-argument.md`。

---

## 文件命名

`Argument_编者姓(Ed.)_年份_出版社.md`
例：`Argument_Apple(Ed.)_2019_Routledge.md`

---

## Frontmatter

```yaml
---
title: Argument_Apple(Ed.)_2019_Routledge
type: argument
subtype: edited-volume
citation: "Apple, M. W. (Ed.). (2019). 书名. Routledge."
tags: [tag1, tag2, region/us]
related_concepts: ["[[概念名]]"]
related_theories: ["[[理论名]]"]
sources: ["sources/Apple(Ed.)_2019_Routledge.md"]
part_of:
status: draft | review | published
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

> **Frontmatter 格式规范：**
> - `subtype: edited-volume` 用于与普通论文 Argument 区分
> - `tags` — 用方括号列表，所有内容 tag 使用英文小写连字符
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
## 编者论点
前言中编者提出的核心问题或立场，附原文引用。
> "原文引用"（Editor, year, p.X）
<!-- 格式：核心论点后紧跟 blockquote 引用原文 -->

---

## 全书结构
编者对各章的分组逻辑与组织框架，说明全书如何回应编者论点。

---

## 理论框架
全书共用的理论视角或分析框架（如有），附来源。
- [[理论名]] — 一句话说明在全书中的角色

---

## 各章概览
每章处理完后用 str_replace 逐条追加：
- [[Argument_ChapterAuthor_Year_关键词]] — 该章核心贡献简述（可多句，涵盖主要论点与发现）
<!-- 格式：按章节顺序排列，不按时间或主题重排 -->

---

## 来源
- [[Author(Ed.)_Year_Publisher]]
```

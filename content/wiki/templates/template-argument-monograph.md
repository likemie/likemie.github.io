# 模板：论证框架 Argument — 专著整体

此模板用于专著的整体 Argument（`Argument_作者姓_年份_出版社.md`），在所有章节处理完成后统一建立。
各章提取的 wiki 条目正常写入 wiki/，本文件综合所有 chXX_章节名.md 的要点建立全书论证框架。

---

## 文件命名

`Argument_作者姓_年份_出版社.md`
例：`Argument_Vygotsky_1978_HUP.md`

---

## Frontmatter

```yaml
---
title: Argument_Vygotsky_1978_HUP
type: argument
subtype: monograph
citation: "Vygotsky, L. S. (1978). Mind in society. Harvard University Press."
tags: [tag1, tag2, region/russia]
related_concepts: ["[[概念名]]"]
related_theories: ["[[理论名]]"]
related_methods: ["[[研究方法名]]"]
sources: ["sources/Vygotsky_1978_HUP.md"]
part_of:
status: draft | review | published
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

> **Frontmatter 格式规范：**
> - `subtype: monograph` 用于与普通论文 Argument 及论文集 Argument 区分
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

---

## 页面结构

```markdown
## 研究问题
全书试图回答的核心问题，综合各章提炼。

---

## 理论框架
- [[理论名]] — 如何贯穿全书运用

---

## 研究方法
- 方法：[[研究方法名]]
- 样本：描述
- 数据来源：描述

---

## 论证结构
全书整体论证脉络，综合各章要点：
1. 前提／观察
2. 论证步骤
3. 结论

---

## 各章概览
按章节顺序排列，不按时间或主题重排：
- **第1章** 章节标题 — 本章核心贡献一句话
- **第2章** 章节标题 — 本章核心贡献一句话
<!-- 综合各 chXX_章节名.md 的内容填入 -->

---

## 主要发现
综合各章提炼的核心发现，附页码来源。
- 发现描述。（p.X）
<!-- 格式：有具体数字或效应量的关键数据用 info callout 高亮，示例：
> [!info] 核心数据
> 效应量 d = 0.40，覆盖 800 项研究（p.X）
-->

---

## 关键引用
> "引用内容"（p.X）
<!-- 格式：用 blockquote 引用原文，保留最能代表全书立场的 1-2 条 -->

---

## 局限性与批评
作者自身承认的局限，或他人对全书的批评。

---

## 来源
- [[作者姓_年份_出版社]]
```

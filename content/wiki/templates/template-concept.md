# 模板：概念 Concept

## Frontmatter

```yaml
---
title: 项目式学习
type: concept
tags: [project-based-learning, subject/curriculum, level/k12]
related_theories: ["[[建构主义]]", "[[situated-learning]]"]
related_persons: ["[[Dewey]]", "[[Kilpatrick]]"]
sources: ["sources/Thomas_2000_RER.md"]
confidence: low | medium | high
status: draft | review | published
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

> **Frontmatter 格式规范：**
> - `tags` — 用方括号列表：`tags: [tag1, tag2, tag3]`
> - `related_*` 和 `sources` — 所有值必须加引号：`related_theories: ["[[建构主义]]", "[[situated-learning]]"]`
> - wikilink 必须包在引号内，否则 Obsidian 无法解析 frontmatter
> - 单个值也需要引号和方括号：`related_concepts: ["[[项目式学习]]"]`

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
## 定义
核心定义，附原文引用。
> "原文引用"（Author, year, p.X）
<!-- 格式：定义后紧跟 blockquote 引用原文，引用块用 > 开头 -->

---

## 概念辨析
辨析容易混淆的概念，附来源。
- vs [[问题式学习]] — 区别说明

---

## 概念演变
概念的起源与发展脉络，关键节点附来源。
<!-- 格式：事件 < 8 条用普通列表；≥ 8 条改用 callout 分期，每个时期一个 callout，示例：
> [!note] 1920s–1950s 早期发展
> - 1920s [[Dewey]] 提出做中学理念（p.X）
> - 1950s [[Kilpatrick]] 发展为项目法（p.X）
-->

---

## 核心要素
构成要素逐条列出，每条附来源。

---

## 理论基础
- [[建构主义]] — 一句话说明关系

---

## 实证发现
有数据或明确结论支撑的发现，每条注明来源与适用条件：
- 发现描述，适用条件（学段、地区、样本）。（Author, year, p.X）
<!-- 格式：有具体数字或效应量的关键数据，用 info callout 单独高亮，示例：
> [!info] 核心数据
> 效应量 d = 0.40，样本量 N = 2000（Author, year, p.X）
-->

---

## 争议与批评
- 批评描述，附来源和立场。（Author, year, p.X）

---

## 相关案例／政策
- [[芬兰国家核心课程2016]]

---

## 来源
- [[Thomas_2000_RER]]
```

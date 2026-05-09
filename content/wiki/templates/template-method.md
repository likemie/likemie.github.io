# 模板：研究方法 Method

## Frontmatter

```yaml
---
title: 民族志
type: method
tags: [ethnography, paradigm/interpretivist]
related_theories: ["[[建构主义]]", "[[批判理论]]"]
sources: ["sources/Hammersley_1983_Routledge.md"]
confidence: low | medium | high
status: draft | review | published
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

> **Frontmatter 格式规范：**
> - `tags` — 用方括号列表：`tags: [tag1, tag2, tag3]`
> - `related_*` 和 `sources` — 所有值必须加引号
> - wikilink 必须包在引号内，否则 Obsidian 无法解析 frontmatter

**建条目的判断标准：**
论文提供该方法任意一项信息即可建条目（操作步骤、认识论立场、适用场景、局限性等）。
方法只被命名但无任何介绍 → 只在论证框架条目的「研究方法」一行记录，不单独建条目。

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
方法的核心定义，附来源。

---

## 认识论立场
属于哪个研究范式，为什么。

---

## 研究程序
如何执行，关键要素。

---

## 适用场景
适合回答什么类型的研究问题。

---

## 局限性
方法的主要限制，附来源。（Author, year, p.X）

---

## 相关理论
- [[建构主义]] — 一句话说明关系

---

## 使用此方法的研究
- [[Argument_Lave_1991]] — 一句话说明研究内容

---

## 来源
- [[Hammersley_1983_Routledge]]
```

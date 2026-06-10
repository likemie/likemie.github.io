# 模板：理论 Theory

## Frontmatter

```yaml
---
title: 建构主义
type: theory
tags: [constructivism, paradigm/constructivist]
related_concepts: ["[[项目式学习]]", "[[脚手架]]"]
related_persons: ["[[Vygotsky]]", "[[Piaget]]", "[[Bruner]]"]
related_methods: ["[[质性研究]]", "[[民族志]]"]
sources: ["sources/Vygotsky_1978_HUP.md"]
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
## 核心主张
理论的基本立场，附原文引用。
> "原文引用"（Author, year, p.X）
<!-- 格式：主张后紧跟 blockquote 引用原文 -->

---

## 核心命题
主要命题或子理论，逐条列出并附来源。

---

## 发展脉络
- 1920s [[Vygotsky]] 提出社会建构主义
- 1950s [[Piaget]] 发展认知建构主义
<!-- 格式：事件 < 8 条用普通列表；≥ 8 条改用 callout 分期，每个时期一个 callout，示例：
> [!note] 1920s–1940s 奠基期
> - 1920s [[Vygotsky]] 提出社会建构主义（p.X）
> - 1936s [[Piaget]] 发展认知建构主义（p.X）
-->

---

## 认识论立场
- 本体论与认识论立场：简述
- 常用研究方法：[[质性研究]]、[[民族志]]

---

## 争议与批评
- 批评描述，附来源和立场。（Author, year, p.X）

---

## 相关研究
链接到以此理论为框架的论证框架条目：
- [[Argument_Thomas_2000]] — 一句话说明如何使用此理论

---

## 应用领域
- [[项目式学习]] — 以建构主义为核心理论依据

---

## 来源
- [[Vygotsky_1978_HUP]]
```

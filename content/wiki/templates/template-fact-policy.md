# 模板：事实／政策 Fact — Policy

## Frontmatter

```yaml
---
title: 芬兰国家核心课程2016
type: fact
subtype: policy
tags: [project-based-learning, region/finland, level/k12]
related_concepts: ["[[项目式学习]]", "[[跨学科学习]]"]
related_theories: ["[[建构主义]]"]
sources: ["sources/Finnish_curriculum_2016_Report.md"]
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

**Facts 子文件夹判断规则：**
- 主要发生在某一国／地区 → 放该国文件夹，tag 标注其他相关国家
- 国际组织主导或全球性（PISA、UNESCO、世界银行等）→ 放 `global/`
- 涉及两三个特定国家的比较或联合政策 → 放 `multi/`
- 遇到新国家 → 按需新建子文件夹，文件夹名用小写英文（如 `uk/`、`japan/`）

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
## 背景
政策出台的社会、教育背景。

---

## 政策文本摘要
核心条款与目标，附原文引用。
> "原文引用"（文件名, year, p.X）
<!-- 格式：关键条款后紧跟 blockquote 引用原文 -->

---

## 时间线
- YYYY 政策提出／讨论
- YYYY 正式颁布
- YYYY 开始实施
- YYYY 修订或评估
<!-- 格式：事件 < 8 条用普通列表；≥ 8 条改用 callout 分期，每个阶段一个 callout，示例：
> [!note] 2014–2016 研制阶段
> - 2014 启动课程改革讨论（p.X）
> - 2016 正式颁布新课程纲要（p.X）
-->

---

## 实施情况
涉及哪些机构、学段、学科，如何落地。

---

## 效果与评价
有据可查的结果，附来源。（Author, year, p.X）
<!-- 格式：有具体数字的关键数据用 info callout 高亮，示例：
> [!info] 核心数据
> 实施后学生跨学科项目参与率从 12% 升至 67%（Author, year, p.X）
-->

---

## 争议与评论
- 支持或批评立场，附来源。（Author, year, p.X）

---

## 相关概念／理论
- [[项目式学习]]
- [[建构主义]]

---

## 来源
- [[Finnish_curriculum_2016_Report]]
```

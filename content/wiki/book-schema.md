# Book Schema

专著（Monograph）与论文集（Edited Volume）的提取流程。

> **文件位置：** `wiki/book-schema.md`
> **何时读取：** 用户在指令中标注「专著」或「(Ed.) 前言」时读取此文件

---

## 书籍类型判断

**论文集／编著（Edited Volume）**
- 用户标注「(Ed.) 前言」→ 新建论文集的标识，触发建立论文集文件夹，前言内容作为 `_overview.md` 主体
- 文件命名为 `Author(Ed.)_Year_Publisher` 格式 → 该章节归入对应论文集文件夹，根据文件内容判断章节标题和编号
- 不追踪未处理章节，按需处理即可

**专著（Monograph）**
- 用户标注「专著」→ 按专著跨 session 流程处理

---

## 文件夹结构

### 论文集
```
books/
  Author(Ed.)_Year_Publisher/     ← 论文集文件夹
    _overview.md                  ← 前言提取内容，列出已处理章节（永久保留）
    Ch3_ChapterAuthor_Year.pdf    ← 该章 PDF
    Ch7_ChapterAuthor_Year.pdf
```

论文集每章独立处理，各自有：
- `sources/Ch3_ChapterAuthor_Year.md` + `sources/Ch3_ChapterAuthor_Year.pdf` ← 该章 sources 记录
- `wiki/arguments/Argument_ChapterAuthor_Year_关键词.md` ← 该章论证框架

`_overview.md` 结构（与 sources/ 格式一致，放在 books/ 文件夹内）：
```markdown
---
citation: "编者 (Ed.). (Year). 书名. 出版社."
extracted_to: ["[[Argument_Editor_Year_Publisher]]", "[[Argument_ChapterAuthor_Year_关键词]]"]
processed_date: YYYY-MM-DD
---

# Author(Ed.)_Year_Publisher

![[前言PDF文件名.pdf]]

## 已处理章节
- [[Argument_ChapterAuthor_Year_关键词]] — 章节标题一句话
- [[Argument_ChapterAuthor2_Year_关键词]] — 章节标题一句话
```

每章 sources 记录（放入 sources/，格式同论文）：
```markdown
---
citation: "章节作者. (Year). 章节标题. In 编者 (Ed.), 书名 (pp. XX–XX). 出版社."
extracted_to: ["[[条目名]]", "[[Argument_ChapterAuthor_Year_关键词]]"]
processed_date: YYYY-MM-DD
part_of: "[[Author(Ed.)_Year_Publisher]]"
---

# ChapterAuthor_Year_关键词

![[ChapterAuthor_Year_关键词.pdf]]
```

### 专著
```
books/
  作者姓_年份_出版社/         ← 每本书一个文件夹
    BookName.pdf             ← 原书 PDF
    chapters/                ← 章节拆分文本（处理完成后删除）
      ch01_章节名.txt
      ch02_章节名.txt
    ch01_章节名.md           ← 每章提取摘要（综合后删除）
    ch02_章节名.md
```

处理完成后，整本书只建一个 sources 记录和一个 Argument：
```
sources/
  作者姓_年份_出版社.pdf     ← 原书 PDF
  作者姓_年份_出版社.md      ← 整本书 sources 记录（永久保留）

wiki/arguments/
  Argument_作者姓_年份_出版社.md  ← 整本书的论证框架（一个，代表全书）
```

**进度追踪用 git，不用 _progress.md：**
- 每章处理完后 commit：`git commit -m "书名 ch01 章节名"`
- Session 重开后用 `git log` 查看已处理章节
- chXX.md 列出本章提取摘要，也可辅助判断进度

---

## 进度追踪

专著通过 chXX.md 文件判断进度，无需额外追踪文件：
- 已处理的章节 → books/BOOKFOLDER/ 下有对应的 chXX_章节名.md
- 未处理的章节 → chapters/ 下有对应的 chXX_章节名.txt，但无对应 md
- Session 重开后扫描两个文件夹的差异即可判断进度

---

## 工作流

### 论文集工作流

**处理前言（用户标注「(Ed.) 前言」）：**
```
1. 读取 vault-schema.md 和 wiki/index.md
2. 用户已标注「(Ed.) 前言」→ 论文集模式，新建论文集文件夹
3. 在 books/ 新建文件夹：Author(Ed.)_Year_Publisher/
4. 按论文流程提取前言内容，写入对应 wiki/ 条目
5. 在 wiki/arguments/ 新建整本论文集的论证框架：
   Argument_Editor_Year_Publisher.md
   （前言代表整本论文集的整体论证框架）
6. 新建 books/Author(Ed.)_Year_Publisher/_overview.md：
   - 填入 citation、extracted_to（含整体 Argument 链接）、processed_date
   - 嵌入前言 PDF
   - 建立「已处理章节」列表（暂为空）
7. 在 sources/ 新建论文集整体 sources 记录：
   Author(Ed.)_Year_Publisher.md（链接到整体 Argument，后续章节处理完后追加章节 Argument）
8. 更新 wiki/index.md 的 Arguments > Books 分组：
   - [[Argument_Editor_Year_Publisher]] — 书名（论文集整体）
```

**处理后续章节（文件命名含 `Author(Ed.)_Year_Publisher`）：**
```
1. 读取 vault-schema.md 和 wiki/index.md
2. 从文件命名识别归属论文集 → 在 books/ 找到对应文件夹
3. 读取该论文集的 _overview.md 确认归属
4. 根据文件内容判断章节标题和编号
5. 按完整论文流程处理该章节（提取所有 wiki 条目）
6. 在 wiki/arguments/ 新建该章的论证框架条目：
   文件名：Argument_作者姓_年份_章节关键词.md
   frontmatter 加 part_of: "[[Author(Ed.)_Year_Publisher]]" 字段
7. 用 str_replace 更新 _overview.md 的「已处理章节」列表，加入 Argument 链接
8. 执行双向链接维护
```

### 专著工作流

### 第一次处理新书

```
1. 读取 vault-schema.md 和 wiki/index.md
2. 在 books/ 下新建文件夹：作者姓_年份_出版社/
3. 用 Python 读取目录结构并拆分所有章节为独立文本文件：
   python3 << 'PYEOF'
   import fitz, os
   doc = fitz.open('books/BOOKFOLDER/BookName.pdf')
   toc = doc.get_toc()
   # 建立章节页码范围
   chapters = []
   for i, (level, title, page) in enumerate(toc):
       if level == 1:  # 只取一级标题
           end = toc[i+1][2] if i+1 < len(toc) else len(doc)
           chapters.append((title, page-1, end-1))
   # 逐章提取并保存
   os.makedirs('books/BOOKFOLDER/chapters', exist_ok=True)
   for i, (title, start, end) in enumerate(chapters):
       text = ''
       for p in range(start, end):
           text += doc[p].get_text()
       fname = f'books/BOOKFOLDER/chapters/ch{i+1:02d}_{title[:30]}.txt'
       with open(fname, 'w') as f:
           f.write(text)
       print(f'saved: {fname}')
   PYEOF
4. 在 wiki/index.md 的 Arguments > Books 分组加入：
   📖 [[作者姓_年份_出版社]] — 书名（进行中，共 X 章）
5. 停下，询问用户：「已完成章节拆分，共 X 章，是否开始处理第一章？」
```

**注意：拆分完成后原始 PDF 不再读取，后续每次只读对应的 chXX.txt 文件。**

### 单章处理流程

```
1. 读取 vault-schema.md 和 wiki/index.md
2. 运行 `git log --oneline` 查看已处理章节，对照 chapters/ 找出下一个待处理章节，读取对应 chapters/chXX_章节名.txt
3. 基于 vault-schema.md 的提取规范扫描章节内容，列出可提取条目
   （包括概念、理论、事实／政策、人物、研究方法，严格按各类型判断标准筛选）
4. 完整执行 vault-schema.md 工作流步骤6的所有子步骤：
   - 对照 index.md 逐条判断已存在或新建
   - 已存在 → 检测重构需求 → 按主题+时间逻辑整合新内容，用 str_replace 插入正确位置
   - 不存在 → 按对应条目类型模板新建，直接写入 wiki/类型/ 正式文件夹
   - 每个条目写完后执行双向链接维护
   注意：chXX.md 是进度记录，不是 wiki 提取的替代；wiki 条目必须完整写入 wiki/ 对应文件夹
5. 新建 books/BOOKFOLDER/chXX_章节名.md，记录本章提取摘要（仅作进度追踪用）：
```markdown
---
chapter: "chXX — 章节标题"
extracted_to: ["[[条目名]]", "[[条目名]]"]
processed_date: YYYY-MM-DD
part_of: "[[作者姓_年份_出版社]]"
---

## 本章主题
简述本章核心议题。

## 关键引用
- 引用内容。（p.X）
```
注意：专著不按章节建 Argument，全书完成后统一建一个整体 Argument
7. 执行 vault-schema.md 的双向链接维护步骤
8. 停下，询问用户：「第 XX 章《章节名》处理完成，是否继续处理第 XX+1 章《章节名》？」
```

### 重新开始（session 重开后继续）

用户发指令后才开始，不需要 AI 主动询问。

```
1. 读取 vault-schema.md 和 wiki/index.md
2. 运行 git log --oneline 查看已处理章节
3. 对照 books/BOOKFOLDER/chapters/ 下的 txt 文件，找出尚未 commit 的章节
4. 告知用户：「下一章为第 XX 章《章节名》，开始处理。」
5. 执行单章处理流程
```

### 完成整本书

```
1. 扫描 books/BOOKFOLDER/chapters/ 与 books/BOOKFOLDER/ 下的 chXX.md，确认所有章节均已处理
2. 综合所有 chXX_章节名.md，生成整本书的 sources 记录和 Argument：

   sources 记录（sources/作者姓_年份_出版社.md）：
   - citation（APA）
   - extracted_to（所有提取条目的完整列表 + Argument 链接）
   - processed_date
   - ![[书名.pdf]] 嵌入 PDF

   Argument（wiki/arguments/Argument_作者姓_年份_出版社.md）：
   - 整合各章的研究问题、理论框架、核心论证、主要发现
   - 代表全书整体论证，不按章节拆分
3. 将概览 md 和 PDF 移入 sources/：
   mv books/BOOKFOLDER/BookName.pdf sources/作者姓_年份_出版社.pdf
   mv 概览.md sources/作者姓_年份_出版社.md
4. 删除 chapters/ 文件夹及所有 chXX.md：
   rm -rf books/BOOKFOLDER/chapters/
   rm books/BOOKFOLDER/ch*.md
5. 更新 wiki/index.md，将 📖 改为 ✅
```

---

## 注意事项

- **每次只处理一章**，处理完必须停下询问，不得连续处理
- **session 重开后**，必须先运行 `git log --oneline` 查看已处理章节，再继续
- **frontmatter 格式**：extracted_to 必须用 `["[[条目名]]", "[[条目名]]"]` 格式，否则 Obsidian 无法解析
- **章节文本过长**：若单章超过模型上下文限制，按小节拆分处理，每个小节处理完单独 commit

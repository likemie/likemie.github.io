# Schema：专著（Monograph）— PDF

**触发标识：** 用户标注「专著」

---

## 文件夹结构

```
books/
  作者姓_年份_出版社/
    BookName.pdf             ← 原书 PDF
    chapters/                ← 章节拆分文本（处理完成后可删除）
      ch01_章节名.txt
      ch02_章节名.txt
```

整合完成后建立 sources 记录：
```
sources/
  作者姓_年份_出版社.pdf     ← 原书 PDF
  作者姓_年份_出版社.md      ← sources 记录（永久保留）

wiki/arguments/
  Argument_作者姓_年份_出版社.md  ← 全书论证框架
```

---

## 进度追踪

不追踪章节处理进度，按需处理：
- 用户指定哪章就处理哪章，已处理的章节也可重新处理
- 已处理章节内容累积在 Argument 的「各章概览」里，可作参考

---

## 工作流

### 第一次处理新书

```
1. 读取 vault-schema.md
2. 在 books/ 下新建文件夹：作者姓_年份_出版社/
3. 用 Python 拆分章节：
   python3 << 'PYEOF'
   import fitz, os
   doc = fitz.open('books/BOOKFOLDER/BookName.pdf')
   toc = doc.get_toc()
   chapters = []
   for i, (level, title, page) in enumerate(toc):
       if level == 1:
           end = toc[i+1][2] if i+1 < len(toc) else len(doc)
           chapters.append((title, page-1, end-1))
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
4. 将章节列表展示给用户，停下等待用户指定章节：
   「以上是全书章节列表（共 X 章），请告知需要处理哪一章？」
5. 在 wiki/index.md 的 Arguments > Books 分组加入：
   📖 [[Argument_作者姓_年份_出版社]] — 书名
```

**注意：拆分完成后原始 PDF 不再读取，后续每次只读对应的 chXX.txt 文件。**

### 单章处理流程

```
1. 读取 vault-schema.md
2. 读取用户指定的 chapters/chXX_章节名.txt
3. 基于 vault-schema.md 提取规范扫描章节内容，列出可提取条目
4. 读取 wiki/index.md，将条目分为待更新和待新建两组，标注类型
5. 按 vault-schema.md 工作流步骤 8、9 执行：
   - 步骤 8：逐条读取已有条目，检查格式与重构需求，整合新内容
   - 步骤 9：按类型逐条读取模板新建条目，写入 wiki/类型/ 正式文件夹
6. 将本章内容追加到 Argument 的「各章概览」：
   - 若 Argument 尚不存在 → 读取 wiki/templates/template-argument-monograph.md，新建文件，只填入「各章概览」章节
   - 若 Argument 已存在 → 用 str_replace 追加本章内容到「各章概览」末尾
   - 格式自由，忠实记录该章论点、论据、关键引用，不套模板
7. 执行 vault-schema.md 工作流步骤 10（双向链接维护）
8. 停下，告知用户：「第 XX 章《章节名》处理完成。」
```

### 重新开始（session 重开后）

```
1. 读取 vault-schema.md
2. 列出 chapters/ 下所有章节，停下等待用户指定：
   「请告知需要处理哪一章？」
3. 用户指定后，执行单章处理流程
```

### 整合 Argument（用户发出整合指令后）

```
1. 读取 Argument 文件中已累积的「各章概览」内容
2. 读取 wiki/templates/template-argument-monograph.md
3. 按模板结构整合：
   - 从各章概览中提炼全书研究问题、理论框架、论证结构、主要发现、关键引用、局限性
   - 用 str_replace 在「各章概览」之前写入正式章节
   - 「各章概览」保留在最后，作为原始章节记录
4. 新建 sources 记录（sources/作者姓_年份_出版社.md）：
   - citation（APA）
   - extracted_to（所有提取条目的完整列表 + Argument 链接）
   - processed_date
   - ![[书名.pdf]] 嵌入 PDF
5. 更新 wiki/index.md，将 📖 改为 ✅
```

---

## 注意事项

- 每次只处理一章，处理完必须停下等待用户指令
- 章节文本过长时，按小节拆分处理
- frontmatter `extracted_to` 必须用 `["[[条目名]]", "[[条目名]]"]` 格式
- Argument 整合须等用户发出指令才执行

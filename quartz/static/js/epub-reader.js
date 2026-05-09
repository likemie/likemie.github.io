console.log("epub-reader.js 已加载")

function loadEpub(containerId, epubPath) {
  const viewer = document.getElementById(containerId)

  if (!viewer) {
    console.warn("找不到 EPUB 容器:", containerId)
    return
  }

  if (typeof ePub === "undefined") {
    console.warn("epub.js 没有加载成功")
    return
  }

  // 防止 Quartz 反复初始化，重复插入按钮
  if (viewer.dataset.epubLoaded === "true") {
    console.log("EPUB 已经加载过，跳过重复初始化")
    return
  }

  viewer.dataset.epubLoaded = "true"

  console.log("开始加载 EPUB:", epubPath)

  const book = ePub(epubPath)

  const rendition = book.renderTo(containerId, {
    width: "100%",
    height: 560,
    spread: "none",
    flow: "paginated",
    allowScriptedContent: true
  })

  rendition.display().then(function () {
    console.log("EPUB 显示成功")
  }).catch(function (err) {
    console.error("EPUB 显示失败:", err)
  })

  const nav = document.createElement("div")
  nav.style.cssText = "display:flex;justify-content:space-between;padding:8px 0;gap:12px;"

  const prevBtn = document.createElement("button")
  prevBtn.textContent = "← 上一页"
  prevBtn.style.cssText = "padding:6px 16px;cursor:pointer;"

  const nextBtn = document.createElement("button")
  nextBtn.textContent = "下一页 →"
  nextBtn.style.cssText = "padding:6px 16px;cursor:pointer;"

  prevBtn.addEventListener("click", function () {
    console.log("点击上一页")
    rendition.prev()
  })

  nextBtn.addEventListener("click", function () {
    console.log("点击下一页")
    rendition.next()
  })

  nav.appendChild(prevBtn)
  nav.appendChild(nextBtn)
  viewer.parentNode.insertBefore(nav, viewer.nextSibling)

  // 键盘左右键翻页
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      rendition.prev()
    }

    if (event.key === "ArrowRight") {
      rendition.next()
    }
  })

  // 保存到 DOM 上，方便调试
  viewer._book = book
  viewer._rendition = rendition
}

function initEpubPage() {
  loadEpub("epub-viewer", "/static/books/test/book.epub")
}

window.addEventListener("load", function () {
  setTimeout(initEpubPage, 500)
})

document.addEventListener("nav", function () {
  setTimeout(initEpubPage, 500)
})
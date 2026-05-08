function initEpubViewer() {
  var viewer = document.getElementById("epub-viewer");
  if (!viewer) return;
  var epubPath = viewer.getAttribute("data-epub");
  if (!epubPath) return;
  if (typeof ePub === "undefined") {
    setTimeout(initEpubViewer, 100);
    return;
  }
  loadEpub("epub-viewer", epubPath);
}
window.addEventListener("load", initEpubViewer);

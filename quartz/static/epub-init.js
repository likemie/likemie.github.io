window.addEventListener("load", function() {
  var viewer = document.getElementById("epub-viewer");
  if (viewer && typeof ePub !== "undefined") {
    var epubPath = viewer.getAttribute("data-epub");
    if (epubPath) loadEpub("epub-viewer", epubPath);
  }
});

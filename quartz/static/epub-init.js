document.addEventListener("DOMContentLoaded", function() {
  var viewer = document.getElementById("epub-viewer");
  if (viewer) {
    var epubPath = viewer.getAttribute("data-epub");
    if (epubPath) loadEpub("epub-viewer", epubPath);
  }
});

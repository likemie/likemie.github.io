function loadEpub(containerId, epubPath) {
  var book = ePub(epubPath);
  var rendition = book.renderTo(containerId, {
    width: "100%",
    height: 600,
    spread: "none"
  });
  rendition.display();
}

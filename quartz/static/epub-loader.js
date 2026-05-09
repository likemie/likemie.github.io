function loadEpub(containerId, epubPath) {
  var viewer = document.getElementById(containerId);
  var book = ePub(epubPath);
  var rendition = book.renderTo(containerId, {
    width: "100%",
    height: 560,
    spread: "none",
    allowScriptedContent: true
  });
  rendition.display();

  rendition.on("keyup", function(e) {
    if (e.keyCode == 37) rendition.prev();
    if (e.keyCode == 39) rendition.next();
  });

  var nav = document.createElement("div");
  nav.style.cssText = "display:flex;justify-content:space-between;padding:8px 0;";

  var prevBtn = document.createElement("button");
  prevBtn.textContent = "← 上一页";
  prevBtn.style.cssText = "padding:6px 16px;cursor:pointer;";
  prevBtn.addEventListener("click", function() { rendition.prev(); });

  var nextBtn = document.createElement("button");
  nextBtn.textContent = "下一页 →";
  nextBtn.style.cssText = "padding:6px 16px;cursor:pointer;";
  nextBtn.addEventListener("click", function() { rendition.next(); });

  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);
  viewer.parentNode.insertBefore(nav, viewer.nextSibling);
}

(function () {
  function setMessage(container, message) {
    container.innerHTML = "";
    const note = document.createElement("div");
    note.className = "epub-viewer-message";
    note.textContent = message;
    container.appendChild(note);
  }

  window.loadEpub = function loadEpub(containerId, epubPath) {
    const container =
      typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container || container.dataset.epubLoaded === epubPath) return;
    if (typeof window.ePub !== "function") {
      setMessage(container, "EPUB reader failed to load.");
      return;
    }

    container.dataset.epubLoaded = epubPath;
    container.innerHTML = "";
    container.classList.add("epub-viewer");

    const toolbar = document.createElement("div");
    toolbar.className = "epub-viewer-toolbar";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.textContent = "Previous";

    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "Next";

    const title = document.createElement("span");
    title.className = "epub-viewer-title";
    title.textContent = decodeURIComponent(epubPath.split("/").pop() || "EPUB");

    toolbar.append(prev, title, next);

    const stage = document.createElement("div");
    stage.className = "epub-viewer-stage";
    container.append(toolbar, stage);

    try {
      const book = window.ePub(epubPath);
      const rendition = book.renderTo(stage, {
        width: "100%",
        height: "100%",
        spread: "none",
      });

      prev.addEventListener("click", function () {
        rendition.prev();
      });
      next.addEventListener("click", function () {
        rendition.next();
      });

      rendition.display().catch(function (error) {
        console.error("Failed to display EPUB", error);
        setMessage(container, "EPUB failed to display.");
      });
    } catch (error) {
      console.error("Failed to load EPUB", error);
      setMessage(container, "EPUB failed to load.");
    }
  };
})();

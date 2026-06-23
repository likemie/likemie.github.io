(function () {
  function slugifyPathSegment(segment) {
    return decodeURIComponent(segment)
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/%/g, "-")
      .replace(/[^\p{L}\p{N}\-_~./]+/gu, "-")
      .replace(/-{2,}/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
  }

  function normalizeEpubPath(epubPath) {
    try {
      const url = new URL(epubPath, window.location.origin);
      if (url.origin !== window.location.origin) return url.href;
      const parts = url.pathname.split("/");
      const booksIndex = parts.indexOf("books");
      if (booksIndex >= 0 && parts[booksIndex + 1]) {
        parts[booksIndex + 1] = slugifyPathSegment(parts[booksIndex + 1]);
        url.pathname = parts.join("/");
        return url.pathname;
      }
    } catch (_error) {
      return epubPath;
    }
    return epubPath;
  }

  function initEpubViewers() {
    if (typeof window.loadEpub !== "function") return;
    for (const viewer of document.querySelectorAll("[data-epub]")) {
      const epubPath = normalizeEpubPath(viewer.dataset.epub || "");
      if (!epubPath) continue;
      viewer.dataset.epub = epubPath;
      window.loadEpub(viewer, epubPath);
    }
  }

  document.addEventListener("DOMContentLoaded", initEpubViewers);
  document.addEventListener("nav", initEpubViewers);
  document.addEventListener("render", initEpubViewers);
  window.addEventListener("load", initEpubViewers);
})();

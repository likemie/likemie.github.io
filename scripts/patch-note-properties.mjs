import fs from "node:fs"
import path from "node:path"
import { buildSync } from "esbuild"

const mermaidPlugin = ".quartz/plugins/obsidian-flavored-markdown"
const mermaidScript = `${mermaidPlugin}/src/scripts/mermaid.inline.ts`

const patches = [
  {
    file: mermaidScript,
    find: `let mermaidImport = undefined;`,
    replace: `let mermaidImport = undefined;
let nextDiagramId = 0;`,
  },
  {
    file: mermaidScript,
    find: `    textMapping.set(node, node.innerText);`,
    replace: `    textMapping.set(node, node.textContent ?? "");`,
  },
  {
    file: mermaidScript,
    find: `    // de-init any other diagrams
    for (const node of nodes) {
      node.removeAttribute("data-processed");
      const oldText = textMapping.get(node);
      if (oldText) {
        node.innerHTML = oldText;
      }
    }

`,
    replace: "",
  },
  {
    file: mermaidScript,
    find: `    await mermaid.run({ nodes });`,
    replace: `    // Let Mermaid measure in its own document-level container. The reading
    // node may be inside a collapsed callout, where SVG bounds are zero.
    for (const node of nodes) {
      if (!node.isConnected) continue;
      const id = "quartz-mermaid-" + ++nextDiagramId;
      try {
        const { svg, bindFunctions } = await mermaid.render(id, textMapping.get(node) ?? "");
        if (!node.isConnected) continue;
        node.innerHTML = svg;
        const diagram = node.querySelector("svg");
        const width = diagram?.viewBox.baseVal.width ?? 0;
        if (width > 0) diagram?.style.setProperty("--mermaid-natural-width", width + "px");
        bindFunctions?.(node);
      } catch (error) {
        document.getElementById("d" + id)?.remove();
        console.error("Could not render Mermaid diagram", error);
      }
    }`,
  },
  {
    file: mermaidScript,
    find: `      if (!content) return;
      removeAllChildren(content);

      // Clone the mermaid content
      const mermaidContent = codeBlock.querySelector("svg")!.cloneNode(true) as SVGElement;`,
    replace: `      const diagram = codeBlock.querySelector("svg");
      if (!content || !diagram) return;
      removeAllChildren(content);

      const mermaidContent = diagram.cloneNode(true) as SVGElement;`,
  },
  {
    file: ".quartz/plugins/note-properties/src/transformer.ts",
    find: `function getVisibleProperties(
  data: Record<string, unknown>,
  opts: NotePropertiesOptions,
): Record<string, unknown> {`,
    replace: `function hasVisiblePropertyValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.some((item) => hasVisiblePropertyValue(item));
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

function getVisibleProperties(
  data: Record<string, unknown>,
  opts: NotePropertiesOptions,
): Record<string, unknown> {`,
  },
  {
    file: ".quartz/plugins/note-properties/src/transformer.ts",
    find: `      if (!excluded.has(key)) {
        result[key] = value;
      }`,
    replace: `      if (!excluded.has(key) && hasVisiblePropertyValue(value)) {
        result[key] = value;
      }`,
  },
  {
    file: ".quartz/plugins/note-properties/src/transformer.ts",
    find: `    if (!excluded.has(key) && data[key] !== undefined) {
      result[key] = data[key];
    }`,
    replace: `    if (!excluded.has(key) && hasVisiblePropertyValue(data[key])) {
      result[key] = data[key];
    }`,
  },
  {
    file: ".quartz/plugins/note-properties/dist/index.js",
    find: `function getVisibleProperties(data, opts) {`,
    replace: `function hasVisiblePropertyValue(value2) {
  if (value2 === null || value2 === void 0) return false;
  if (typeof value2 === "string") return value2.trim().length > 0;
  if (Array.isArray(value2)) return value2.some((item) => hasVisiblePropertyValue(item));
  if (typeof value2 === "object") return Object.keys(value2).length > 0;
  return true;
}
function getVisibleProperties(data, opts) {`,
  },
  {
    file: ".quartz/plugins/note-properties/dist/index.js",
    find: `      if (!excluded.has(key)) {
        result2[key] = value2;
      }`,
    replace: `      if (!excluded.has(key) && hasVisiblePropertyValue(value2)) {
        result2[key] = value2;
      }`,
  },
  {
    file: ".quartz/plugins/note-properties/dist/index.js",
    find: `    if (!excluded.has(key) && data[key] !== void 0) {
      result[key] = data[key];
    }`,
    replace: `    if (!excluded.has(key) && hasVisiblePropertyValue(data[key])) {
      result[key] = data[key];
    }`,
  },
  {
    file: ".quartz/plugins/bases-page/src/components/views/cards.tsx",
    find: `          return (
            <a href={href} class="internal internal-link bases-card" data-slug={entry.slug}>`,
    replace: `          return (
            <div class="bases-card" data-slug={entry.slug}>`,
  },
  {
    file: ".quartz/plugins/bases-page/src/components/views/cards.tsx",
    find: `                <span class="bases-card-title">{entry.title}</span>`,
    alsoFind: [
      `                <a href={href} class="internal internal-link bases-card-title">
                  {entry.title}
                </a>`,
    ],
    replace: `                <a href={href} class="internal internal-link bases-card-title">
                  {String(resolveEntryPropertyValue("argument_display_title", entry) || entry.title)}
                </a>`,
  },
  {
    file: ".quartz/plugins/bases-page/src/components/views/cards.tsx",
    find: `                      <div class="bases-card-row">`,
    replace: `                      <div class="bases-card-row" data-column={column}>`,
  },
  {
    file: ".quartz/plugins/bases-page/src/components/views/cards.tsx",
    find: `            </a>
          );`,
    replace: `            </div>
          );`,
  },
  {
    file: ".quartz/plugins/bases-page/dist/chunk-4HXXKSJ4.js",
    find: `      return /* @__PURE__ */ u("a", { href, class: "internal internal-link bases-card", "data-slug": entry.slug, children: [`,
    replace: `      return /* @__PURE__ */ u("div", { class: "bases-card", "data-slug": entry.slug, children: [`,
  },
  {
    file: ".quartz/plugins/bases-page/dist/chunk-4HXXKSJ4.js",
    find: `          /* @__PURE__ */ u("span", { class: "bases-card-title", children: entry.title }),`,
    alsoFind: [
      `          /* @__PURE__ */ u("a", { href, class: "internal internal-link bases-card-title", children: entry.title }),`,
    ],
    replace: `          /* @__PURE__ */ u("a", { href, class: "internal internal-link bases-card-title", children: String(resolveEntryPropertyValue("argument_display_title", entry) || entry.title) }),`,
  },
  {
    file: ".quartz/plugins/bases-page/dist/chunk-4HXXKSJ4.js",
    find: `            return /* @__PURE__ */ u("div", { class: "bases-card-row", children: [`,
    replace: `            return /* @__PURE__ */ u("div", { class: "bases-card-row", "data-column": column, children: [`,
  },
  {
    file: ".quartz/plugins/darkmode/src/components/scripts/darkmode.inline.ts",
    find: `const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
const currentTheme = localStorage.getItem("theme") ?? userPref;
document.documentElement.setAttribute("saved-theme", currentTheme);`,
    replace: `const currentTheme = (localStorage.getItem("theme") as "light" | "dark" | null) ?? "dark";
document.documentElement.setAttribute("saved-theme", currentTheme);`,
  },
  {
    file: ".quartz/plugins/darkmode/src/components/scripts/darkmode.inline.ts",
    find: `    (document.documentElement.getAttribute("saved-theme") as "light" | "dark") ?? "light";`,
    replace: `    (document.documentElement.getAttribute("saved-theme") as "light" | "dark") ?? "dark";`,
  },
  {
    file: ".quartz/plugins/darkmode/src/components/scripts/darkmode.inline.ts",
    find: `
  const themeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light";
    document.documentElement.setAttribute("saved-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    syncBodyThemeClass(newTheme);
    emitThemeChangeEvent(newTheme);
  };
`,
    replace: ``,
  },
  {
    file: ".quartz/plugins/darkmode/src/components/scripts/darkmode.inline.ts",
    find: `
  // Listen for changes in prefers-color-scheme
  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  colorSchemeMediaQuery.addEventListener("change", themeChange);
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange));`,
    replace: ``,
  },
  {
    file: ".quartz/plugins/darkmode/dist/index.js",
    find: `var darkmode_inline_default = 'var r=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark",h=localStorage.getItem("theme")??r;document.documentElement.setAttribute("saved-theme",h);var m=t=>{document.body?.classList.remove("theme-dark","theme-light"),document.body?.classList.add(\`theme-\${t}\`)},c=t=>{let n=new CustomEvent("themechange",{detail:{theme:t}});document.dispatchEvent(n)},s=()=>{let t=document.documentElement.getAttribute("saved-theme")??"light";m(t);let n=()=>{let e=document.documentElement.getAttribute("saved-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("saved-theme",e),localStorage.setItem("theme",e),m(e),c(e)},o=e=>{let d=e.matches?"dark":"light";document.documentElement.setAttribute("saved-theme",d),localStorage.setItem("theme",d),m(d),c(d)};for(let e of document.getElementsByClassName("darkmode"))e.addEventListener("click",n),window.addCleanup(()=>e.removeEventListener("click",n));let a=window.matchMedia("(prefers-color-scheme: dark)");a.addEventListener("change",o),window.addCleanup(()=>a.removeEventListener("change",o))};document.addEventListener("nav",s);document.addEventListener("render",s);\\n';`,
    replace: `var darkmode_inline_default = 'var r=localStorage.getItem("theme")??"dark";document.documentElement.setAttribute("saved-theme",r);var c=t=>{document.body?.classList.remove("theme-dark","theme-light"),document.body?.classList.add(\`theme-\${t}\`)},m=t=>{let n=new CustomEvent("themechange",{detail:{theme:t}});document.dispatchEvent(n)},s=()=>{let t=document.documentElement.getAttribute("saved-theme")??"dark";c(t);let n=()=>{let e=document.documentElement.getAttribute("saved-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("saved-theme",e),localStorage.setItem("theme",e),c(e),m(e)};for(let e of document.getElementsByClassName("darkmode"))e.addEventListener("click",n),window.addCleanup(()=>e.removeEventListener("click",n))};document.addEventListener("nav",s);document.addEventListener("render",s);\\n';`,
  },
  {
    file: ".quartz/plugins/darkmode/dist/components/index.js",
    find: `var darkmode_inline_default = 'var r=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark",h=localStorage.getItem("theme")??r;document.documentElement.setAttribute("saved-theme",h);var m=t=>{document.body?.classList.remove("theme-dark","theme-light"),document.body?.classList.add(\`theme-\${t}\`)},c=t=>{let n=new CustomEvent("themechange",{detail:{theme:t}});document.dispatchEvent(n)},s=()=>{let t=document.documentElement.getAttribute("saved-theme")??"light";m(t);let n=()=>{let e=document.documentElement.getAttribute("saved-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("saved-theme",e),localStorage.setItem("theme",e),m(e),c(e)},o=e=>{let d=e.matches?"dark":"light";document.documentElement.setAttribute("saved-theme",d),localStorage.setItem("theme",d),m(d),c(d)};for(let e of document.getElementsByClassName("darkmode"))e.addEventListener("click",n),window.addCleanup(()=>e.removeEventListener("click",n));let a=window.matchMedia("(prefers-color-scheme: dark)");a.addEventListener("change",o),window.addCleanup(()=>a.removeEventListener("change",o))};document.addEventListener("nav",s);document.addEventListener("render",s);\\n';`,
    replace: `var darkmode_inline_default = 'var r=localStorage.getItem("theme")??"dark";document.documentElement.setAttribute("saved-theme",r);var c=t=>{document.body?.classList.remove("theme-dark","theme-light"),document.body?.classList.add(\`theme-\${t}\`)},m=t=>{let n=new CustomEvent("themechange",{detail:{theme:t}});document.dispatchEvent(n)},s=()=>{let t=document.documentElement.getAttribute("saved-theme")??"dark";c(t);let n=()=>{let e=document.documentElement.getAttribute("saved-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("saved-theme",e),localStorage.setItem("theme",e),c(e),m(e)};for(let e of document.getElementsByClassName("darkmode"))e.addEventListener("click",n),window.addCleanup(()=>e.removeEventListener("click",n))};document.addEventListener("nav",s);document.addEventListener("render",s);\\n';`,
  },
  {
    file: ".quartz/plugins/obsidian-flavored-markdown/src/transformer.ts",
    find: `                  class="callout-title"
                >
                  <div class="callout-icon"></div>`,
    replace: `                  class="callout-title"
                  data-callout-default-title="\${useDefaultTitle ? "true" : "false"}"
                >
                  <div class="callout-icon"></div>`,
  },
  {
    file: ".quartz/plugins/obsidian-flavored-markdown/dist/index.js",
    find: `                  class="callout-title"
                >
                  <div class="callout-icon"></div>`,
    replace: `                  class="callout-title"
                  data-callout-default-title="\${useDefaultTitle ? "true" : "false"}"
                >
                  <div class="callout-icon"></div>`,
  },
  // Obsidian parses numbered sub-claim titles as lists; Quartz otherwise keeps
  // "1. ..." in a paragraph, so the snippet's marker colour never applies.
  ...[
    ".quartz/plugins/obsidian-flavored-markdown/src/transformer.ts",
    ".quartz/plugins/obsidian-flavored-markdown/dist/index.js",
  ].map((file) => ({
    file,
    find: "const title = mdastToHtml(titleNode);",
    replace: `const numberedSubClaim = calloutType === "sub-claim" && titleContent.match(/^(\\d+)[.)]\\s+/);
                if (numberedSubClaim && titleNode.children[0]?.type === "text") {
                  titleNode.children[0].value = titleNode.children[0].value.slice(numberedSubClaim[0].length);
                }
                const title = mdastToHtml(numberedSubClaim ? {
                  type: "list", ordered: true, start: Number(numberedSubClaim[1]), spread: false,
                  children: [{ type: "listItem", spread: false, children: [titleNode] }],
                } : titleNode);`,
  })),
]

function resolvePatchFile(patch) {
  if (fs.existsSync(patch.file)) return patch.file

  const directory = path.dirname(patch.file)
  const filename = path.basename(patch.file)
  if (!filename.startsWith("chunk-") || !fs.existsSync(directory)) return patch.file

  const candidates = fs
    .readdirSync(directory)
    .filter((candidate) => candidate.startsWith("chunk-") && candidate.endsWith(".js"))
    .map((candidate) => path.join(directory, candidate))
    .filter((candidate) => {
      const contents = fs.readFileSync(candidate, "utf8")
      return [patch.find, ...(patch.alsoFind ?? []), patch.replace].some(
        (anchor) => anchor && contents.includes(anchor),
      )
    })

  if (candidates.length !== 1) return patch.file
  return candidates[0]
}

for (const patch of patches) {
  const patchFile = resolvePatchFile(patch)
  if (!fs.existsSync(patchFile)) {
    throw new Error(`Cannot patch missing file: ${patch.file}`)
  }

  const original = fs.readFileSync(patchFile, "utf8")
  if (patch.replace && original.includes(patch.replace)) continue
  const anchor = [patch.find, ...(patch.alsoFind ?? [])].find((candidate) =>
    original.includes(candidate),
  )
  if (!anchor) {
    if (patch.replace === "") continue
    throw new Error(`Patch anchor not found in ${patchFile}`)
  }

  fs.writeFileSync(patchFile, original.replace(anchor, patch.replace))
}

// Quartz loads the installed plugin's bundled entry point. Rebuild only the
// inline client script so the rest of the pinned plugin stays as shipped.
const mermaidBundle = buildSync({
  entryPoints: [mermaidScript],
  bundle: true,
  write: false,
  minify: true,
  platform: "browser",
  target: "es2022",
}).outputFiles[0].text
const mermaidDist = `${mermaidPlugin}/dist/index.js`
const originalMermaidDist = fs.readFileSync(mermaidDist, "utf8")
const mermaidInlineExport = /^var mermaid_inline_default = .*;$/m
if (!mermaidInlineExport.test(originalMermaidDist)) {
  throw new Error(`Mermaid client script not found in ${mermaidDist}`)
}
const patchedMermaidDist = originalMermaidDist.replace(
  mermaidInlineExport,
  () => `var mermaid_inline_default = ${JSON.stringify(mermaidBundle)};`,
)
if (patchedMermaidDist !== originalMermaidDist) {
  fs.writeFileSync(mermaidDist, patchedMermaidDist)
}

console.log("Patched Quartz plugins.")

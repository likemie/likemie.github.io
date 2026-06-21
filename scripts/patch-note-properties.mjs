import fs from "node:fs"

const patches = [
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
    replace: `                <a href={href} class="internal internal-link bases-card-title">
                  {entry.title}
                </a>`,
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
    replace: `          /* @__PURE__ */ u("a", { href, class: "internal internal-link bases-card-title", children: entry.title }),`,
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
]

for (const patch of patches) {
  if (!fs.existsSync(patch.file)) {
    throw new Error(`Cannot patch missing file: ${patch.file}`)
  }

  const original = fs.readFileSync(patch.file, "utf8")
  if (patch.replace && original.includes(patch.replace)) continue
  if (!original.includes(patch.find)) {
    throw new Error(`Patch anchor not found in ${patch.file}`)
  }

  fs.writeFileSync(patch.file, original.replace(patch.find, patch.replace))
}

console.log("Patched Quartz plugins.")

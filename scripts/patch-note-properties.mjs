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
]

for (const patch of patches) {
  if (!fs.existsSync(patch.file)) {
    throw new Error(`Cannot patch missing file: ${patch.file}`)
  }

  const original = fs.readFileSync(patch.file, "utf8")
  if (original.includes(patch.replace)) continue
  if (!original.includes(patch.find)) {
    throw new Error(`Patch anchor not found in ${patch.file}`)
  }

  fs.writeFileSync(patch.file, original.replace(patch.find, patch.replace))
}

console.log("Patched Quartz plugins.")

import { h } from "preact"

function asArray(value) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function cleanWikiLabel(value) {
  return String(value)
    .replace(/^\[\[/, "")
    .replace(/\]\]$/, "")
    .replace(/^\[|\]$/g, "")
    .replace(/\[\[|\]\]/g, "")
    .split("|")
    .pop()
    .trim()
}

function titleFor(fileData) {
  return fileData.frontmatter?.title ?? fileData.slug?.split("/").pop() ?? "Untitled"
}

function isArgumentPage(fileData) {
  const slug = fileData.slug ?? ""
  return fileData.frontmatter?.type === "argument" || slug.startsWith("wiki/arguments/")
}

function splitCitation(citation) {
  const text = String(citation ?? "")
  const year = text.match(/\((\d{4})\)/)?.[1]
  return { text, year }
}

function ChipList({ items, limit = 8 }) {
  const shown = items.slice(0, limit)
  if (shown.length === 0) return null
  return h(
    "div",
    { class: "argument-dossier-chips" },
    shown.map((item) => h("span", null, cleanWikiLabel(item))),
    items.length > limit && h("span", null, `+${items.length - limit}`),
  )
}

function ArgumentDossier() {
  const Component = ({ fileData, displayClass }) => {
    if (!isArgumentPage(fileData)) return null

    const fm = fileData.frontmatter ?? {}
    const citation = splitCitation(fm.citation)
    const concepts = asArray(fm.related_concepts)
    const persons = asArray(fm.related_persons)
    const facts = asArray(fm.related_facts)
    const sources = asArray(fm.sources)
    const tags = asArray(fm.tags)

    return h(
      "aside",
      { class: [displayClass, "argument-dossier"].filter(Boolean).join(" ") },
      h(
        "div",
        { class: "argument-dossier-main" },
        h("p", { class: "argument-dossier-kicker" }, "Argument Dossier"),
        h("h2", null, titleFor(fileData).replace(/^Argument_/, "")),
        citation.text && h("p", { class: "argument-dossier-citation" }, citation.text),
      ),
      h(
        "div",
        { class: "argument-dossier-facts" },
        citation.year && h("div", null, h("span", null, "年份"), h("strong", null, citation.year)),
        concepts.length > 0 &&
          h("div", null, h("span", null, "概念"), h("strong", null, concepts.length)),
        fm.status && h("div", null, h("span", null, "状态"), h("strong", null, fm.status)),
        sources.length > 0 && h("div", null, h("span", null, "来源"), h("strong", null, sources.length)),
      ),
      h(
        "div",
        { class: "argument-dossier-links" },
        concepts.length > 0 &&
          h("section", null, h("h3", null, "相关概念"), h(ChipList, { items: concepts })),
        persons.length > 0 &&
          h("section", null, h("h3", null, "相关人物"), h(ChipList, { items: persons, limit: 5 })),
        facts.length > 0 &&
          h("section", null, h("h3", null, "相关事实"), h(ChipList, { items: facts, limit: 5 })),
        tags.length > 0 && h("section", null, h("h3", null, "标签"), h(ChipList, { items: tags, limit: 6 })),
      ),
    )
  }

  Component.css = `
.argument-dossier {
  background:
    radial-gradient(circle at 14% 14%, color-mix(in srgb, var(--tertiary) 22%, transparent), transparent 34%),
    linear-gradient(135deg, color-mix(in srgb, var(--light) 96%, var(--secondary)), var(--light));
  border: 1px solid color-mix(in srgb, var(--secondary) 24%, var(--lightgray));
  border-radius: 8px;
  box-sizing: border-box;
  display: grid;
  gap: 1rem;
  margin: 0.35rem 0 1.25rem;
  overflow: hidden;
  padding: 1rem;
}

.argument-dossier,
.argument-dossier * {
  box-sizing: border-box;
  min-width: 0;
}

.argument-dossier-kicker {
  color: var(--secondary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin: 0 0 0.35rem;
  text-transform: uppercase;
}

.argument-dossier h2 {
  font-size: 1.35rem;
  line-height: 1.2;
  margin: 0;
}

.argument-dossier-citation {
  color: var(--darkgray);
  line-height: 1.55;
  margin: 0.55rem 0 0;
}

.argument-dossier-facts {
  display: grid;
  gap: 0.55rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.argument-dossier-facts div {
  background: color-mix(in srgb, var(--light) 76%, transparent);
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  display: grid;
  gap: 0.25rem;
  padding: 0.7rem;
}

.argument-dossier-facts span,
.argument-dossier-links h3 {
  color: var(--darkgray);
  font-size: 0.82rem;
  margin: 0;
}

.argument-dossier-facts strong {
  color: var(--dark);
  line-height: 1.2;
}

.argument-dossier-links {
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.argument-dossier-links section {
  display: grid;
  gap: 0.45rem;
}

.argument-dossier-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.argument-dossier-chips span {
  border: 1px solid color-mix(in srgb, var(--secondary) 24%, var(--lightgray));
  border-radius: 999px;
  color: var(--secondary);
  font-size: 0.86rem;
  line-height: 1;
  padding: 0.4rem 0.55rem;
}

@media all and (max-width: 720px) {
  .argument-dossier-facts,
  .argument-dossier-links {
    grid-template-columns: 1fr;
  }
}
`

  return Component
}

export { ArgumentDossier }

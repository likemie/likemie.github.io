const conceptSlugPrefix = "wiki/concepts/"
let conceptIndexPromise: Promise<Record<string, any>> | undefined

function getConceptIndexUrl() {
  const basepath = document.body.dataset.basepath ?? ""
  return `${basepath}/static/contentIndex.json`
}

function getConceptUrl(slug: string) {
  const basepath = document.body.dataset.basepath ?? ""
  return `${basepath}/${slug}`
}

function loadConceptIndex() {
  conceptIndexPromise ??= fetch(getConceptIndexUrl()).then((response) => response.json())
  return conceptIndexPromise
}

function isConceptSlug(slug: string | undefined) {
  return Boolean(slug?.startsWith(conceptSlugPrefix) && !slug.endsWith("/index"))
}

function pickRandom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)]
}

function findRoamAnchor() {
  return (
    document.querySelector(".markdown-preview-view h1") ??
    document.querySelector("article h1") ??
    document.querySelector(".page-header h1.article-title") ??
    document.querySelector("h1.article-title")
  )
}

function makeButton(targets: any[]) {
  const roam = document.createElement("div")
  roam.className = "concept-roam"

  const copy = document.createElement("div")
  copy.className = "concept-roam-copy"

  const kicker = document.createElement("div")
  kicker.className = "concept-roam-kicker"
  kicker.textContent = "概念漫游"

  const meta = document.createElement("div")
  meta.className = "concept-roam-meta"
  meta.textContent = `从 ${targets.length} 个相邻概念中随机跳一步，看看这条线索会把你带到哪里。`

  const button = document.createElement("button")
  button.type = "button"
  button.className = "concept-roam-button"
  button.textContent = "随机相关概念 ->"

  button.addEventListener("click", () => {
    const target = pickRandom(targets)
    window.spaNavigate?.(new URL(getConceptUrl(target.slug), window.location.origin), false)
  })

  copy.append(kicker, meta)
  roam.append(copy, button)
  return roam
}

async function setupConceptRoam() {
  document.querySelector(".concept-roam")?.remove()

  const slug = document.body.dataset.slug
  if (!slug || !isConceptSlug(slug)) return

  const index = await loadConceptIndex()
  const current = index[slug]
  if (!current) return

  const targets = (Array.isArray(current.links) ? current.links : [])
    .filter((link: string) => isConceptSlug(link) && index[link])
    .map((link: string) => index[link])
    .sort((a: any, b: any) => String(a.title).localeCompare(String(b.title)))

  if (targets.length === 0) return

  const title = findRoamAnchor()
  title?.insertAdjacentElement("afterend", makeButton(targets))
}

document.addEventListener("nav", setupConceptRoam)

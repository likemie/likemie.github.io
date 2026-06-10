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

function makeButton(targets: any[]) {
  const roam = document.createElement("div")
  roam.className = "concept-roam"

  const button = document.createElement("button")
  button.type = "button"
  button.className = "concept-explore-button ghost concept-roam-button"
  button.textContent = "随机相关概念"

  const meta = document.createElement("span")
  meta.className = "concept-roam-meta"
  meta.textContent = `从 ${targets.length} 个相邻概念中跳一步`

  button.addEventListener("click", () => {
    const target = pickRandom(targets)
    window.spaNavigate?.(new URL(getConceptUrl(target.slug), window.location.origin), false)
  })

  roam.append(button, meta)
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

  const title = document.querySelector(
    ".page-header h1.article-title, article > h1, h1.article-title",
  )
  title?.insertAdjacentElement("afterend", makeButton(targets))
}

document.addEventListener("nav", setupConceptRoam)

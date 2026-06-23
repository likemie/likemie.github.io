const ASSET_EXT_RE = /\.(pdf|epub)(?:[?#].*)?$/i

function propToString(value) {
  if (Array.isArray(value)) return value.join(" ")
  if (value === undefined || value === null) return ""
  return String(value)
}

function isRemoteUrl(url) {
  return /^https?:\/\//i.test(url) || /^\/\//.test(url)
}

function isLocalBookAsset(url) {
  const cleaned = propToString(url).trim()
  return cleaned !== "" && ASSET_EXT_RE.test(cleaned) && !isRemoteUrl(cleaned)
}

function dataEpubValue(properties) {
  return properties?.dataEpub ?? properties?.["data-epub"]
}

function shouldRemoveElement(node) {
  if (!node || node.type !== "element") return false

  const properties = node.properties ?? {}
  const src = properties.src
  const href = properties.href
  const dataEpub = dataEpubValue(properties)

  if (["iframe", "embed", "object"].includes(node.tagName) && isLocalBookAsset(src)) {
    return true
  }

  if (node.tagName === "div" && isLocalBookAsset(dataEpub)) {
    return true
  }

  if (node.tagName === "a" && isLocalBookAsset(href)) {
    return true
  }

  return false
}

function isBlankText(node) {
  return node?.type === "text" && propToString(node.value).trim() === ""
}

function isEmptyParagraph(node) {
  return (
    node?.type === "element" &&
    node.tagName === "p" &&
    Array.isArray(node.children) &&
    node.children.every(isBlankText)
  )
}

function removeLocalAssets(node) {
  if (!node || !Array.isArray(node.children)) return

  const kept = []
  for (const child of node.children) {
    if (shouldRemoveElement(child)) {
      continue
    }

    removeLocalAssets(child)
    if (!isEmptyParagraph(child)) {
      kept.push(child)
    }
  }

  node.children = kept
}

export default function RemoveLocalAssetEmbeds() {
  return {
    name: "RemoveLocalAssetEmbeds",
    htmlPlugins() {
      return [
        () => (tree) => {
          removeLocalAssets(tree)
        },
      ]
    },
  }
}

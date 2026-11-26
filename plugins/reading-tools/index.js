import { visit } from "unist-util-visit"

export default function ReadingToolLinks() {
  return {
    name: "ReadingToolLinks",
    htmlPlugins() {
      return [
        () => (tree, file) => {
          // Capture the note body after link resolution and before rendering embeds.
          const slugs = new Set()
          visit(tree, "element", (node) => {
            if (node.tagName !== "a") return
            const slug = node.properties?.["data-slug"] ?? node.properties?.dataSlug
            if (typeof slug === "string" && slug !== file.data.slug) slugs.add(slug)
          })
          if (slugs.size) file.data.readingToolLinks = [...slugs]
        },
      ]
    },
  }
}

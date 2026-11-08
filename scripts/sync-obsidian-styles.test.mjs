import assert from "node:assert/strict"
import { test } from "node:test"
import { adaptObsidianCss } from "./sync-obsidian-styles.mjs"

test("body theme selectors follow the Quartz html theme without raising specificity", () => {
  const css = adaptObsidianCss("html body.theme-dark .callout { color: white }")
  assert.equal(
    css,
    'html body:is([saved-theme="dark"], body:where([saved-theme="dark"] *)) .callout { color: white }',
  )
  assert.ok(!css.includes("body[saved-theme="))
})

test("ancestor themes, root tokens and zero-specificity theme scopes remain supported", () => {
  const css = adaptObsidianCss(
    ".theme-dark, .theme-dark body { --ink: white } .callout:where(.theme-dark *) { color: white }",
  )
  assert.ok(css.includes(':is([saved-theme="dark"], body:where([saved-theme="dark"] *)) body'))
  assert.ok(css.includes(':where(:is([saved-theme="dark"], body:where([saved-theme="dark"] *)) *)'))
})

test("light selectors work for explicit light and the default theme", () => {
  assert.equal(
    adaptObsidianCss("body.theme-light {}"),
    'body:is(:root:where(:not([saved-theme="dark"])), body:where(:root:not([saved-theme="dark"]) *)) {}',
  )
})

test("inline link colours, hover and focus use Quartz classes", () => {
  assert.equal(
    adaptObsidianCss(
      "a.internal-link:hover, a.external-link:focus-visible { color: inherit !important }",
    ),
    "a.internal:hover, a.external:focus-visible { color: inherit !important }",
  )
  assert.equal(adaptObsidianCss(".internal-link-extra {}"), ".internal-link-extra {}")
})

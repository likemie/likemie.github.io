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

import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { generateObsidianStyles } from "./sync-obsidian-styles.mjs"

test("enabled companion snippets are synced in Obsidian order; disabled snippets are excluded", async () => {
  const vault = await mkdtemp(join(tmpdir(), "callout-sync-"))
  try {
    await mkdir(join(vault, ".obsidian/snippets"), { recursive: true })
    await writeFile(
      join(vault, ".obsidian/appearance.json"),
      JSON.stringify({
        enabledCssSnippets: ["argument-callouts", "type-scale", "figure", "unrelated"],
      }),
    )
    for (const name of ["argument-callouts", "type-scale", "figure", "method-manual"]) {
      await writeFile(
        join(vault, `.obsidian/snippets/${name}.css`),
        `/* ${name} */ body.theme-dark { --test-${name}: 1; }`,
      )
    }
    const css = await generateObsidianStyles(vault)
    assert.ok(
      css.indexOf("Snippet: argument-callouts.css") < css.indexOf("Snippet: type-scale.css"),
    )
    assert.ok(css.indexOf("Snippet: type-scale.css") < css.indexOf("Snippet: figure.css"))
    assert.ok(css.includes("--test-type-scale"))
    assert.ok(!css.includes("body.theme-dark"))
    assert.ok(!css.includes("method-manual"))
    await rm(join(vault, ".obsidian/snippets/type-scale.css"))
    await assert.rejects(generateObsidianStyles(vault), /ENOENT/)
  } finally {
    await rm(vault, { recursive: true, force: true })
  }
})

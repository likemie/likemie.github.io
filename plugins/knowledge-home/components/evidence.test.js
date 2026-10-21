import assert from "node:assert/strict"
import test from "node:test"
import { render } from "preact-render-to-string"
import { evidenceTopicData, renderEvidenceTopicPage } from "./evidence.js"

const page = (title, slug, links = []) => ({ frontmatter: { title }, slug, links })

test("evidence scope follows organization evidence in both directions", () => {
  const agency = page("Kunnskapssenter for utdanning", "wiki/facts/norway/knowledge-centre", [
    "wiki/arguments/outgoing",
  ])
  const outgoing = page("Outgoing", "wiki/arguments/outgoing")
  const incoming = page("Incoming", "wiki/arguments/incoming", [agency.slug])
  const unrelated = page("Unrelated", "wiki/arguments/unrelated", ["wiki/facts/global/OECD"])
  const oecd = page("OECD", "wiki/facts/global/OECD", [unrelated.slug])
  const scope = evidenceTopicData([agency, outgoing, incoming, unrelated, oecd]).scope
  assert(scope.includes(outgoing))
  assert(scope.includes(incoming))
  assert(!scope.includes(unrelated))
})

test("removed sections stay removed and random pools are independently addressed", () => {
  const html = render(
    renderEvidenceTopicPage({
      pages: [
        page("Evidence-Based Education", "wiki/concepts/education"),
        page("EPPI-Centre", "wiki/facts/uk/eppi"),
      ],
    }),
  )
  assert(html.includes('data-evidence-pool="institutions"'))
  assert(html.includes('data-evidence-pool="discover"'))
  assert(html.includes('data-evidence-refresh="institutions"'))
  assert(html.includes('data-evidence-refresh="discover"'))
  for (const removed of ["机构登记表", "争议与反思", "使用的机制"]) assert(!html.includes(removed))
  assert(!html.includes("undefined"))
})

test("missing wiki entries do not create broken entry links", () => {
  const html = render(renderEvidenceTopicPage({ pages: [] }))
  assert(!html.includes('href="/undefined"'))
  assert(!html.includes('href="/wiki/'))
})

test("research chapters use native disclosures and include concise reviews", () => {
  const html = render(renderEvidenceTopicPage({ pages: [] }))
  assert.equal((html.match(/data-evidence-chapter=/g) ?? []).length, 3)
  assert.equal((html.match(/class="ev-method-review"/g) ?? []).length, 3)
  assert(!html.includes('class="ev-bench-rail"'))
  assert(!html.includes('data-evidence-tabs="methods"'))
})

test("use concepts stay inside stages and services stay inside institutions", () => {
  const titles = [
    "Research-Practice Partnership",
    "Quality Use of Research Evidence Framework",
    "Implementation Fidelity",
    "Research Utilization Models",
    "Knowledge Mediation",
    "Educational Brokerage Agency",
    "Forschungsmonitor Schule",
  ]
  const html = render(
    renderEvidenceTopicPage({ pages: titles.map((title, i) => page(title, `wiki/test/${i}`)) }),
  )
  const transfer = html.slice(
    html.indexOf('class="ev-section ev-transfer"'),
    html.indexOf('class="ev-section ev-cases"'),
  )
  const cases = html.slice(
    html.indexOf('class="ev-section ev-cases"'),
    html.indexOf('class="ev-section ev-international"'),
  )
  assert(!transfer.includes("学校研究监测平台"))
  assert(cases.includes("学校研究监测平台"))
  assert(!transfer.includes('class="ev-use-grid"'))
  assert.equal((transfer.match(/data-evidence-panel="stage-/g) ?? []).length, 6)
  for (const [index] of titles.slice(0, -1).entries())
    assert(transfer.includes(`href="/wiki/test/${index}"`))
})

test("each research chapter separates two fixed entries from its random pool", () => {
  const titles = [
    "Randomised Controlled Trials",
    "Quasi-Experimental Designs",
    "Regression Discontinuity Design",
    "Cluster Randomized Trials",
    "Single-Case Design",
    "Implementation and Process Evaluation",
    "Systematic Review",
    "Meta-analysis",
    "Meta-meta-analysis",
    "Research Synthesis",
    "Thematic Synthesis",
    "PRISMA",
    "Effect Size",
    "Campbellian Validity Framework",
    "EEF Padlock Security Rating",
    "Weight of Evidence Framework",
    "AMSTAR",
    "Mixed Methods Appraisal Tool",
  ]
  const html = render(
    renderEvidenceTopicPage({ pages: titles.map((title, i) => page(title, `wiki/method/${i}`)) }),
  )
  const chapters = html.split("data-evidence-chapter=").slice(1)
  assert.equal(chapters.length, 3)
  for (const chapter of chapters) {
    const readings = chapter.slice(
      chapter.indexOf('class="ev-method-readings ev-method-fixed"'),
      chapter.indexOf("</details>"),
    )
    assert.equal((readings.match(/<li/g) ?? []).length, 6)
    assert.equal((readings.match(/data-evidence-item=/g) ?? []).length, 4)
    assert(readings.includes('data-evidence-limit="4"'))
    const fixed = readings.slice(0, readings.indexOf("</ol>"))
    assert.equal((fixed.match(/<li/g) ?? []).length, 2)
    assert(!fixed.includes("data-evidence-item"))
  }
})

test("international graph distinguishes partners from funding and OECD concepts", () => {
  const titles = [
    "Evidence for Education Network",
    "Education Endowment Foundation",
    "Netherlands Initiative for Education Research",
    "SUMMA",
    "Evidence for Learning",
    "Building a Global Evidence Ecosystem for Teaching",
    "BHP Foundation",
    "EEF Teaching and Learning Toolkit",
    "OECD",
    "PISA",
    "Teaching and Learning International Survey",
    "Programme for the International Assessment of Adult Competencies",
    "International Indicators of Education Systems",
    "OECD AHELO Project",
    "Strengthening the Impact of Education Research Project",
    "Education at a Glance",
    "Centre for Educational Research and Innovation",
    "Governing by Numbers",
    "Policy Brokerage",
  ]
  const html = render(
    renderEvidenceTopicPage({
      pages: titles.map((title, i) => page(title, `wiki/organization/${i}`)),
    }),
  )
  assert.equal((html.match(/data-evidence-graph=/g) ?? []).length, 2)
  assert.equal((html.match(/data-graph-node=/g) ?? []).length, 19)
  assert.equal((html.match(/data-from=/g) ?? []).length, 17)
  assert(html.includes('data-from="bhp" data-to="project"'))
  assert(!html.includes('data-from="een" data-to="bhp"'))
  assert(html.includes('data-from="ines" data-to="eag"'))
  assert(html.includes('data-from="ceri" data-to="impact"'))
  assert(html.includes('is-context is-lens" data-from="oecd" data-to="numbers"'))
  assert(!html.includes('class="ev-oecd-project"'))
  assert(html.includes("数字治理"))
  assert(!html.includes("网络与知识服务"))
  assert(!html.includes("ev-institution-services"))
})

test("concept illustration exposes four native links and skips absent targets", () => {
  const titles = [
    "Research Synthesis",
    "Professional Judgment",
    "Local Knowledge in Evidence-Based Policy",
    "Evidence-Informed Decision-Making",
  ]
  const html = render(
    renderEvidenceTopicPage({
      pages: [
        page("Evidence-Based Education", "wiki/education"),
        ...titles.map((title, i) => page(title, `wiki/lens/${i}`)),
      ],
    }),
  )
  assert.equal((html.match(/class="internal ev-lens-link"/g) ?? []).length, 4)
  const drawing = html.slice(
    html.indexOf('class="ev-evidence-drawing'),
    html.indexOf("</svg>", html.indexOf('class="ev-evidence-drawing')),
  )
  for (let i = 0; i < 4; i++) assert(drawing.includes(`href="/wiki/lens/${i}"`))
  assert(drawing.includes('role="group"'))
  const empty = render(
    renderEvidenceTopicPage({ pages: [page("Evidence-Based Education", "wiki/education")] }),
  )
  assert(!empty.includes('ev-lens-link"'))
})

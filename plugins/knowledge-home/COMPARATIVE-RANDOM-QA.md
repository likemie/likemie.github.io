# Comparative discovery: complete candidate pools

The comparative page retains its existing scope: concepts in the comparative
education directory, entries linking to those concepts, and curated page entries.
Each of the four discovery groups now emits every matching candidate. The former
eight-entry build window is removed. Counts correspond to the actual entries
available to the browser.

On first entry and Quartz navigation, each non-empty group draws from its full
pool. Refresh draws uniformly from the other candidates when a group has multiple
entries, avoiding immediate repeats. A single-entry group stays visible. Candidate
membership is computed during each build; newly published relevant vault entries
therefore join automatically through the existing vault validation and Pages build
workflow. This does not fetch unpublished local notes or require manual title lists.

Validation:

- Eleven component tests pass. The regression test retains all 24 supplied concept
  candidates, follows relevant incoming links and includes a newly added related
  institution after rebuilding, while excluding an unrelated institution.
- The component preview builds 581 Markdown inputs into 2,827 files successfully.
- Real-browser checks confirm candidate counts equal rendered pool sizes across all
  four groups; initial draws can select the last candidate. The nine-entry context
  fixture can reach all nine candidates through the refresh button, with exactly
  one entry visible and no immediate repeats.
- Prettier and git whitespace checks pass. This is a data/interaction change with
  no layout or visual-style changes.
- No vault entries or writing exceptions were changed or newly approved.

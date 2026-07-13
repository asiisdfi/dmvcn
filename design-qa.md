# Design QA

## Comparison Target

- Primary source visual truth: `/Users/ozhb/.codex/generated_images/019f279d-641a-7a50-b438-90e139528c57/exec-71e2b866-8c42-4f7c-b138-507506e6253d.png`
- Finder interaction source: `/Users/ozhb/.codex/generated_images/019f279d-641a-7a50-b438-90e139528c57/exec-5475f283-86cc-4b8b-a2f9-231be64e4c2c.png`
- Implementation screenshot: `/Users/ozhb/Documents/Codex/2026-07-03/you/dmv-cn/.artifacts/design-qa/home-preview-state-selected-open-v1.png`
- Local implementation: `http://127.0.0.1:4322/`
- Viewport: 1440 x 1024 browser viewport; captured content area is 1425 x 1013 because of browser scrollbars.
- State: desktop, light theme, homepage, California selected, state picker open.

## Evidence

- Full-view comparison: `/Users/ozhb/Documents/Codex/2026-07-03/you/dmv-cn/.artifacts/design-qa/full-view-comparison-v2.png`
- Focused finder comparison: `/Users/ozhb/Documents/Codex/2026-07-03/you/dmv-cn/.artifacts/design-qa/finder-focused-comparison-v2.png`
- Mobile homepage: `/Users/ozhb/Documents/Codex/2026-07-03/you/dmv-cn/.artifacts/design-qa/home-mobile-v1.png`
- Mobile state picker: `/Users/ozhb/Documents/Codex/2026-07-03/you/dmv-cn/.artifacts/design-qa/home-mobile-state-open-v1.png`
- Mobile state article: `/Users/ozhb/Documents/Codex/2026-07-03/you/dmv-cn/.artifacts/design-qa/state-mobile-v1.png`
- Mobile comparison content: `/Users/ozhb/Documents/Codex/2026-07-03/you/dmv-cn/.artifacts/design-qa/comparison-mobile-v2.png`
- Desktop state article: `/Users/ozhb/Documents/Codex/2026-07-03/you/dmv-cn/.artifacts/design-qa/state-desktop-v1.png`
- Desktop directory filter: `/Users/ozhb/Documents/Codex/2026-07-03/you/dmv-cn/.artifacts/design-qa/directory-filter-open-v1.png`

## Findings

No actionable P0, P1, or P2 differences remain.

- Typography: the system Chinese sans stack, compact UI weights, zero letter spacing, and article line heights preserve the source hierarchy. Long Chinese/English mixed titles wrap without clipping at desktop and mobile widths.
- Spacing and layout: the implementation retains the source's compact header, scenario-first rows, restrained right guidance column, visible dividers, and low-radius controls. The finder is an intentional blend with the second source: an attached desktop popover is faster for a two-step form than the primary source's page-wide side drawer.
- Colors and tokens: white and soft neutral surfaces, dark green actions, rust-red scenario markers, blue links, and amber notices match the multi-color editorial direction without gradients or decorative blobs.
- Image and asset fidelity: the source contains no required photographic asset. Visible interface icons use one Lucide stroke family; no emoji, placeholder imagery, CSS illustration, or handcrafted SVG substitute is present.
- Copy and content: labels are task-led and standalone. Source-count scorecards and generic AI-style feature cards were removed; update dates, official-source links, disclaimers, and action labels remain explicit.
- Responsiveness and accessibility: 375 px checks show no horizontal overflow. Mobile navigation is full width, the picker becomes a bottom sheet, comparison rows stack, all custom selectors retain labels/listbox semantics, and keyboard selection works.

## Primary Interactions Tested

- State picker search narrowed `Massachusetts` to one option.
- Search plus Enter selected Massachusetts and closed the picker.
- Massachusetts plus REAL ID routed to `/states/massachusetts/real-id/`.
- Directory status filter changed 50 visible rows to 19 for `已提供备用入口`.
- Directory search for `Massachusetts` returned one visible row.
- Mobile navigation opened and closed; state picker opened as a scrollable bottom sheet.
- Hidden native selects remain available for form state and directory scripts but render with `display: none`.
- Browser console warnings/errors checked on the production preview: none.

## Comparison History

### Pass 1: blocked

- [P2] The first homepage pass omitted a direct REAL ID scenario and grouped state choices in an inconsistent order.
- [P2] Search filtering did not support direct Enter selection.
- [P2] The mobile navigation inherited desktop end alignment and collapsed into a narrow right column.

Fixes made:

- Added the six explicit human scenarios, including REAL ID, first license, replacement, move, vehicle, and suspension.
- Sorted states into stable A-F, G-M, N-R, and S-W groups and added common-state shortcuts.
- Added Enter-to-select-first-match behavior to `CustomSelect.astro`.
- Reset the mobile navigation to a full-width, single-column layout.

Post-fix evidence:

- `/Users/ozhb/Documents/Codex/2026-07-03/you/dmv-cn/.artifacts/design-qa/home-preview-desktop-v1.png`
- `/Users/ozhb/Documents/Codex/2026-07-03/you/dmv-cn/.artifacts/design-qa/home-mobile-nav-open-v4.png`
- Keyboard result: selected value `massachusetts`, visible label `马萨诸塞州 MA`, `aria-expanded=false`.

### Pass 2: passed

- Re-captured the implementation with the same selected state as both visual sources.
- Full-view and focused comparisons show matching hierarchy, density, palette, scenario ordering, finder affordance, selected state, and guidance structure.
- Desktop, mobile, article, directory, keyboard, filtering, routing, overflow, and console checks all pass.

## Follow-up Polish

- [P3] The desktop picker is intentionally attached to the field rather than using the primary source's right-side drawer. This matches the finder-specific source and keeps the two-step task visually connected.

final result: passed

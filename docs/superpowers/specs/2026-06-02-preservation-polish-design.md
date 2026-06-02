# Preservation Polish Design

## Goal

Polish the existing dark portfolio without redesigning its identity. Improve section rhythm, headline wrapping, dark-mode readability, and consistency across the full page while preserving the current hero, editorial project stack, glass surfaces, and calm premium tone.

## Visual Direction

Keep the existing near-black dark mode, restrained warm accent, Chillax typography, project imagery, and subtle glass treatment. The page should feel more deliberate through alignment, spacing, typography, and contrast rather than new decorative effects.

The hero remains the only area with atmospheric light. All following sections use a clean dark background.

## Section Dividers

Add one neutral, low-contrast horizontal divider to the beginning of each major content section after the hero:

- About
- Projects
- Services
- Process
- Contact

Use the same border token and horizontal content alignment for every divider. Avoid gradients and glow. The footer retains its existing top divider to close the page.

## Typography

Keep the existing type family and hierarchy. Limit major section titles to a maximum of two visual lines at supported widths.

- Projects keeps its concise title.
- Services keeps its meaning but uses a shorter title: `Design e front-end integrados.`
- Process keeps its meaning but uses a shorter title: `Do briefing à entrega.`
- Contact keeps `Iniciar projeto`.

Tune title width and responsive font sizing so desktop, tablet, and mobile remain balanced without overflow.

## Dark Mode

Preserve the existing near-black background and warm-neutral accent. Improve readability with small token-level adjustments only where browser verification shows weak contrast.

Use glass surfaces selectively:

- Editorial project information panels
- Service cards
- Process cards
- Contact form

Avoid adding glass to plain text sections, dividers, or the footer. Keep borders subtle but visible on dark surfaces. Do not add section-owned lights, glow, wide shadows, or decorative gradients.

## Section Review

### Hero

Preserve layout, copy, light treatment, navigation shell, and CTA hierarchy. Check only spacing, focus states, and mobile fit.

### About

Keep the word-by-word reveal and existing copy. Replace its one-off visual separation with the shared section-divider pattern.

### Projects

Preserve editorial sticky cards and preview dialog. Review image treatment, panel readability, hover and focus states, and spacing between the heading and card stack.

### Services

Preserve sticky glass cards. Shorten the title, improve two-line wrapping, and ensure card contrast remains quiet but readable.

### Process

Preserve ordered sticky glass cards. Shorten the title, improve two-line wrapping, and retain a compact rhythm distinct from services.

### Contact

Preserve channels and form structure. Check helper-text contrast, field spacing, mobile touch targets, submit feedback, and glass restraint.

### Footer

Preserve the simple footer and its neutral top divider.

## Accessibility And Responsive Behavior

- Preserve visible keyboard focus states.
- Preserve semantic headings, labels, helper text, dialog accessibility, and form status feedback.
- Preserve `prefers-reduced-motion: reduce` fallback so sticky stacks become normal lists.
- Verify no horizontal overflow at desktop, tablet, and mobile widths.
- Keep touch targets at least `44px`.

## Implementation Boundaries

Primary files:

- `src/App.tsx` for shorter section-title copy and section classes where needed.
- `src/index.css` for shared dividers, title wrapping, contrast refinements, responsive adjustments, and removal of obsolete one-off styles.

Do not add dependencies, change the information architecture, redesign the hero, or replace existing project imagery.

## Verification

- Run the Vite production build.
- Run whitespace validation.
- Inspect the full page at desktop, tablet, and mobile widths.
- Confirm major titles use at most two lines.
- Confirm every major section after the hero begins with the same neutral divider.
- Confirm no section-owned light or glow appears outside the hero.
- Confirm sticky cards and reduced-motion fallback remain functional.
- Confirm project preview opens and closes correctly.
- Confirm contact controls remain readable and keyboard accessible.

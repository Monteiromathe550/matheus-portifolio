# Stacked Glass Sections Design

## Goal

Refine the portfolio with a continuous ambient-light background, subtle glass surfaces, improved contact-form spacing, and stacked sticky scroll interactions in the projects, services, and process sections.

## Visual Direction

The page background owns the lighting. Soft ambient light fields sit behind the interface and continue across the relevant sections. Cards do not contain their own painted glow. Their translucent surfaces reveal the background light naturally.

Glass surfaces remain restrained: dark translucent fill, moderate backdrop blur, a fine low-contrast border, and enough opacity to preserve text legibility. The effect should add depth without turning the page into decorative glassmorphism.

## Projects Section

Replace the current three-column project grid with a vertical editorial presentation inspired by the provided reference. Each project becomes a large, wide sticky card with a dominant image and a compact glass information panel.

As the visitor scrolls, each project card remains sticky briefly while the next project rises over it. Cards use a small top offset progression so the stack remains legible. The section should feel image-led and spacious rather than like a generic card grid.

Each project keeps its existing preview-dialog action and project metadata. The full card remains keyboard accessible.

## Services Section

Keep the existing intro copy and service content. Present the three service cards as a sticky vertical stack. Each card uses the shared glass treatment and a controlled top offset progression.

The service stack should be quieter than the projects section: less vertical travel, more compact cards, and restrained overlap. The section supports the portfolio narrative instead of competing with the work.

## Process Section

Keep the four ordered process steps and their sequence numbers. Present them as a compact sticky stack using the shared glass treatment.

The process stack has the shortest sticky rhythm of the three sections. Each successive card rises over the previous step while preserving readable labels and descriptions. The ordered nature of the content remains immediately clear.

## Contact Form

Increase breathing room between the form heading, field groups, option groups, helper text, and submit row. Ensure adjacent elements no longer feel attached to each other.

Apply the same restrained glass surface to the form container. Keep input contrast strong and preserve visible focus, invalid, submitting, and success states. Radio choices should retain comfortable touch targets and clear separation on mobile.

## Responsive Behavior

Desktop and tablet retain the stacked sticky interaction. Mobile keeps a reduced version with smaller top offsets and lighter overlap so cards remain readable on short viewports.

For `prefers-reduced-motion: reduce`, remove the sticky overlap choreography and render the sections as normal vertical lists. Content order and access to actions remain unchanged.

## Implementation Boundaries

Use CSS `position: sticky` for the core interaction. Avoid scroll listeners or animation libraries unless visual verification shows a specific need. Keep the existing React content structures and preview dialog behavior where possible.

The primary files are:

- `src/App.tsx` for project-card markup adjustments and stack metadata.
- `src/index.css` for ambient background layers, glass tokens, sticky layouts, form spacing, responsive behavior, and reduced-motion fallback.

## Verification

- Build the Vite project successfully.
- Check projects, services, process, and contact visually on desktop and mobile.
- Confirm sticky stacks overlap in the intended order.
- Confirm the page background, rather than individual cards, owns the visible light.
- Confirm project cards and contact controls remain keyboard accessible.
- Confirm reduced-motion mode renders readable normal lists without sticky overlap.

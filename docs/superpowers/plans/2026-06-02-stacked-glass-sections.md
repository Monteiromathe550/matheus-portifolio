# Stacked Glass Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep a clean dark page background outside the hero, add restrained glass surfaces, and create stacked sticky scroll interactions for projects, services, and process while improving contact-form spacing.

**Architecture:** Keep the existing React component boundaries and introduce one small `stackStyle()` helper for CSS custom properties. Implement the interaction with CSS `position: sticky`, shared glass tokens, and responsive overrides. Verify behavior with a production build and browser checks because the project has no automated UI test harness.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4, CSS custom properties, Codex in-app Browser

---

## File Structure

- Modify: `src/App.tsx`
  - Add reusable stack metadata.
  - Convert the project grid markup to editorial sticky cards.
  - Opt service and process cards into the shared stack behavior.
- Modify: `src/index.css`
  - Add the glass tokens used by stacked surfaces.
  - Keep the page background clean and dark outside the hero.
  - Define sticky stack layouts and responsive variants.
  - Remove element-owned light gradients from process and contact surfaces.
  - Increase contact-form spacing and add the reduced-motion fallback.

### Task 1: Establish Baseline And Shared Stack Metadata

**Files:**
- Modify: `src/App.tsx:88-90`
- Modify: `src/App.tsx:435-466`
- Modify: `src/App.tsx:600-609`
- Modify: `src/App.tsx:628-643`
- Modify: `src/App.tsx:802`

- [ ] **Step 1: Run the baseline build**

Run: `npm run build`

Expected: exit code `0`.

- [ ] **Step 2: Start the local site and inspect the baseline**

Run: `npm run dev`

Open: `http://127.0.0.1:5173`

Expected baseline:

- Projects render as a three-column grid on desktop.
- Services and process render as normal lists.
- Contact form groups feel visually compressed.

- [ ] **Step 3: Add shared stack metadata**

Add this helper beside `revealStyle()`:

```tsx
function stackStyle(index: number, desktopStep: number, mobileStep: number) {
  return {
    "--reveal-index": String(index),
    "--stack-index": String(index),
    "--stack-offset": `${index * desktopStep}rem`,
    "--stack-offset-mobile": `${index * mobileStep}rem`,
  } as CSSProperties
}
```

Update the page wrapper:

```tsx
<div className="portfolio-page min-h-screen overflow-x-clip bg-background text-primary">
```

Update the projects list and card:

```tsx
<div className="projects-grid">
  {projects.map((project, index) => (
    <button
      type="button"
      key={project.title}
      className="project-card stack-card group text-left"
      onClick={() => setActive(project)}
      aria-label={`Abrir preview do projeto ${project.title}`}
      data-reveal="card"
      style={stackStyle(index, 0.9, 0.55)}
    >
      <div className="project-media relative overflow-hidden">
```

Update service cards:

```tsx
<article key={title} className="reference-card service-card stack-card" data-reveal="card" style={stackStyle(index, 0.8, 0.48)}>
```

Update process cards:

```tsx
className="reference-card process-step stack-card"
style={stackStyle(Number(number) - 1, 0.65, 0.42)}
```

- [ ] **Step 4: Run the build**

Run: `npm run build`

Expected: exit code `0`.

### Task 2: Keep A Clean Dark Background And Add Glass Tokens

**Files:**
- Modify: `src/index.css:28-68`
- Modify: `src/index.css:403-421`
- Modify: `src/index.css:923-941`

- [ ] **Step 1: Add shared glass tokens**

Add these tokens inside `:root`:

```css
--glass-surface: oklch(0.12 0.008 95 / 0.62);
--glass-surface-strong: oklch(0.095 0.007 95 / 0.78);
--glass-border: oklch(0.955 0.012 88 / 0.18);
--glass-blur: 18px;
```

- [ ] **Step 2: Keep the page background clean outside the hero**

Add:

```css
.portfolio-page {
  background: var(--background);
}
```

- [ ] **Step 3: Remove element-owned lighting**

Replace `.contact-shell::before` and `.process-shell::before` with:

```css
.contact-shell::before,
.process-shell::before {
  display: none;
}
```

- [ ] **Step 4: Run the build**

Run: `npm run build`

Expected: exit code `0`.

### Task 3: Build Editorial Sticky Projects

**Files:**
- Modify: `src/index.css:822-908`
- Modify: `src/index.css:1775-1843`

- [ ] **Step 1: Define the desktop project stack**

Add or replace the relevant project rules:

```css
.projects-grid {
  display: grid;
  gap: clamp(1.25rem, 3vw, 2rem);
}

.stack-card {
  --stack-index: 0;
  --stack-offset: 0rem;
  --stack-offset-mobile: 0rem;
}

.project-card {
  position: sticky;
  top: calc(7.25rem + var(--stack-offset));
  z-index: calc(10 + var(--stack-index));
  display: block;
  overflow: hidden;
  min-height: clamp(28rem, 62vw, 44rem);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  background: var(--glass-surface-strong);
  backdrop-filter: blur(var(--glass-blur));
}

.project-media {
  width: 100%;
  min-height: clamp(28rem, 62vw, 44rem);
}

.project-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-card-body {
  position: absolute;
  left: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  width: min(31rem, calc(100% - 2rem));
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  background: var(--glass-surface);
  backdrop-filter: blur(var(--glass-blur));
}
```

- [ ] **Step 2: Add the compact mobile project stack**

Inside `@media (max-width: 640px)` replace the old split-card project rules with:

```css
.projects-grid {
  gap: 0.9rem;
}

.project-card {
  top: calc(6.4rem + var(--stack-offset-mobile));
  min-height: 27rem;
}

.project-media {
  min-height: 27rem;
}

.project-card-body {
  left: 0.8rem;
  bottom: 0.8rem;
  width: calc(100% - 1.6rem);
  padding: 1rem;
}

.project-tags {
  display: flex;
}
```

- [ ] **Step 3: Verify project interaction in the browser**

Open: `http://127.0.0.1:5173/#projetos`

Expected:

- Each project image is wide and dominant.
- The information panel reads as restrained glass.
- Scrolling causes the next project to rise over the previous one.
- Clicking any project still opens the existing preview dialog.

### Task 4: Stack Services And Process Cards

**Files:**
- Modify: `src/index.css:910-1242`
- Modify: `src/index.css:1862-1965`

- [ ] **Step 1: Add shared glass styling**

Apply:

```css
.service-card,
.process-step {
  position: sticky;
  z-index: calc(10 + var(--stack-index));
  border: 1px solid var(--glass-border);
  background: var(--glass-surface);
  backdrop-filter: blur(var(--glass-blur));
}

.service-card {
  top: calc(7.75rem + var(--stack-offset));
}

.process-step {
  top: calc(7.5rem + var(--stack-offset));
}
```

Keep the existing service and process typography. Remove hover rules that paint opaque card backgrounds; retain only subtle border and transform changes.

- [ ] **Step 2: Add mobile offsets**

Inside `@media (max-width: 640px)` add:

```css
.service-card {
  top: calc(6.35rem + var(--stack-offset-mobile));
}

.process-step {
  top: calc(6.2rem + var(--stack-offset-mobile));
}
```

- [ ] **Step 3: Verify the secondary stacks**

Open:

- `http://127.0.0.1:5173/#servicos`
- `http://127.0.0.1:5173/#processo`

Expected:

- Services overlap with a quieter rhythm than projects.
- Process overlaps with the most compact rhythm.
- Text remains readable while cards overlap.

### Task 5: Refine Contact Form Glass And Spacing

**Files:**
- Modify: `src/index.css:572-628`
- Modify: `src/index.css:1245-1301`
- Modify: `src/index.css:2009-2050`

- [ ] **Step 1: Replace the form-owned gradient with shared glass**

Update:

```css
.contact-form {
  position: relative;
  display: grid;
  gap: clamp(1.7rem, 3vw, 2.15rem);
  align-self: start;
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  background: var(--glass-surface);
  padding: clamp(1.3rem, 3vw, 2.15rem);
  backdrop-filter: blur(var(--glass-blur));
}

.contact-form-heading {
  display: grid;
  gap: 1.45rem;
  padding-bottom: 0.2rem;
}

.contact-field-grid {
  display: grid;
  gap: clamp(1.4rem, 3vw, 2rem);
}

.contact-field {
  display: grid;
  gap: 0.78rem;
}

.contact-choice-group {
  display: grid;
  gap: 0.9rem;
}
```

- [ ] **Step 2: Preserve input and choice contrast**

Confirm that inputs, helper text, radio labels, invalid states, and focus states remain readable over the shared glass. Adjust only opacity values where browser inspection shows weak contrast.

- [ ] **Step 3: Verify contact form**

Open: `http://127.0.0.1:5173/#contato`

Expected:

- Heading, fields, radio groups, helper text, and submit row have visible separation.
- Form background stays neutral without owning a gradient.
- Focus rings remain visible with keyboard navigation.

### Task 6: Add Reduced Motion Fallback And Complete Verification

**Files:**
- Modify: `src/index.css:1648-1727`

- [ ] **Step 1: Disable overlap choreography for reduced motion**

Add inside `@media (prefers-reduced-motion: reduce)`:

```css
.stack-card {
  position: relative !important;
  top: auto !important;
}
```

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: exit code `0`.

- [ ] **Step 3: Run whitespace validation**

Run: `git diff --check`

Expected: no output and exit code `0`.

- [ ] **Step 4: Verify desktop and mobile in the browser**

Open: `http://127.0.0.1:5173`

Check desktop width around `1440px` and mobile width around `390px`.

Expected:

- Background remains clean and dark outside the cards.
- Projects, services, and process stack in order.
- Glass stays subtle and readable.
- Mobile overlap is lighter than desktop overlap.
- Project preview remains usable.
- Contact form fields no longer feel attached.

- [ ] **Step 5: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce`.

Expected:

- Projects, services, and process render as normal lists.
- No sticky overlap remains.
- All content and actions remain accessible.

- [ ] **Step 6: Review changed files**

Run: `git status --short`

Expected changed files:

```text
 M src/App.tsx
 M src/index.css
?? docs/superpowers/plans/2026-06-02-stacked-glass-sections.md
```

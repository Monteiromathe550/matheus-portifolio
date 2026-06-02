# Preservation Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the existing dark portfolio with consistent neutral section dividers, two-line major headings, and restrained dark-mode refinements while preserving the current identity and stacked-card interactions.

**Architecture:** Keep the current React structure and implement the polish with focused copy changes plus CSS overrides. Reuse the existing border, text, glass, spacing, and reduced-motion tokens. Verify with a production build and browser inspection at desktop, tablet, and mobile widths because the project has no automated visual test harness.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4, CSS custom properties, Codex in-app Browser

---

## File Structure

- Modify: `src/App.tsx`
  - Shorten services and process headings.
  - Add one shared section-divider class to each major section after the hero.
- Modify: `src/index.css`
  - Define a neutral shared divider.
  - Tune two-line heading width and responsive sizing.
  - Refine project panel and dark-mode text readability without adding decoration.
  - Remove obsolete one-off about-divider styling.

### Task 1: Add Shared Section Rhythm And Shorter Titles

**Files:**
- Modify: `src/App.tsx:587-805`
- Modify: `src/index.css:789-796`

- [ ] **Step 1: Run the baseline build**

Run: `npm run build`

Expected: exit code `0`.

- [ ] **Step 2: Add the shared divider class**

Add `section-divider` to the major content sections after the hero:

```tsx
<section id="sobre" className="about-section section-divider mx-auto max-w-[1440px] px-6 py-20 md:px-20" ...>
<section id="projetos" className="projects-section section-divider mx-auto max-w-[1440px] px-6 py-24 md:px-20" ...>
<section id="servicos" className="services-section section-divider mx-auto max-w-[1440px] px-6 py-24 md:px-20" ...>
<section id="processo" className="process-section section-divider mx-auto max-w-[1440px] px-6 py-24 md:px-20" ...>
<section id="contato" className="contact-section section-divider mx-auto max-w-[1440px] px-6 py-24 md:px-20" ...>
```

- [ ] **Step 3: Shorten long section titles**

Replace:

```tsx
<h2 id="services-title" className="reference-title">Design e front-end integrados.</h2>
<h2 id="process-title" className="reference-title">Do briefing à entrega.</h2>
```

- [ ] **Step 4: Define the neutral divider**

Replace obsolete `.about-panel::before` and `.about-panel::after` rules with:

```css
.section-divider {
  border-top: 1px solid var(--border);
}
```

- [ ] **Step 5: Run the build**

Run: `npm run build`

Expected: exit code `0`.

### Task 2: Limit Headings To Two Lines

**Files:**
- Modify: `src/index.css:1086-1114`
- Modify: `src/index.css:1950-1965`

- [ ] **Step 1: Tune the shared heading measure**

Update:

```css
.reference-copy {
  max-width: 42rem;
}

.reference-title {
  max-width: 18ch;
  font-size: clamp(2.2rem, 4.2vw, 3.5rem);
  line-height: 1.08;
}
```

- [ ] **Step 2: Tune mobile heading sizing**

Inside `@media (max-width: 640px)` update:

```css
.projects-section h2,
.services-section h2,
.process-section h2,
.contact-section h2 {
  font-size: clamp(2rem, 9vw, 2.55rem);
  line-height: 1.08;
}

.services-section h2,
.process-section h2 {
  max-width: 15ch;
  font-size: clamp(1.95rem, 8.8vw, 2.35rem);
}
```

- [ ] **Step 3: Verify heading wrapping in browser**

Open:

- `http://127.0.0.1:5174/#servicos`
- `http://127.0.0.1:5174/#processo`

Check desktop width around `1280px`, tablet around `768px`, and mobile around `390px`.

Expected: each major heading renders in at most two lines without overflow.

### Task 3: Refine Dark-Mode Readability

**Files:**
- Modify: `src/index.css:48-51`
- Modify: `src/index.css:1641-1741`
- Modify: `src/index.css:1245-1271`

- [ ] **Step 1: Improve subtle surface separation**

Use:

```css
--glass-surface: oklch(0.14 0.008 95 / 0.7);
--glass-surface-strong: oklch(0.105 0.007 95 / 0.84);
--glass-border: oklch(0.955 0.012 88 / 0.2);
```

- [ ] **Step 2: Improve project-panel readability**

Add:

```css
.project-card-body {
  background: var(--glass-surface);
}

.project-card-body p {
  color: color-mix(in oklch, var(--muted-foreground) 92%, var(--primary));
}
```

- [ ] **Step 3: Preserve helper-text contrast**

Keep `.contact-field-help` at:

```css
.contact-field-help {
  color: color-mix(in oklch, var(--muted-foreground) 86%, var(--primary));
}
```

If browser inspection shows weak contrast, increase the first percentage to `78%` so more `var(--primary)` is mixed in.

- [ ] **Step 4: Verify dark-mode restraint**

Open:

- `http://127.0.0.1:5174/#projetos`
- `http://127.0.0.1:5174/#servicos`
- `http://127.0.0.1:5174/#processo`
- `http://127.0.0.1:5174/#contato`

Expected:

- Borders remain subtle but readable.
- Glass is visible only on cards and form.
- No light, glow, gradient text, or wide card shadow is added.
- Body and helper text remain comfortable to read.

### Task 4: Complete Browser Verification And Publish

**Files:**
- Verify: `src/App.tsx`
- Verify: `src/index.css`
- Verify: `docs/superpowers/plans/2026-06-02-preservation-polish.md`

- [ ] **Step 1: Run the production build**

Run: `npm run build`

Expected: exit code `0`.

- [ ] **Step 2: Run whitespace validation**

Run: `git diff --check`

Expected: no output and exit code `0`.

- [ ] **Step 3: Verify browser behavior**

Open: `http://127.0.0.1:5174`

Check desktop, tablet, and mobile widths.

Expected:

- All major sections after hero begin with a neutral divider.
- Major titles remain at most two lines.
- Hero remains unchanged.
- Sticky cards remain configured for normal motion.
- Reduced-motion mode renders readable normal lists.
- No horizontal overflow appears.
- Contact form remains readable with touch-friendly controls.
- Project preview opens and closes correctly.

- [ ] **Step 4: Commit the completed work**

Run:

```powershell
git add -- src/App.tsx src/index.css docs/superpowers/plans/2026-06-02-stacked-glass-sections.md docs/superpowers/plans/2026-06-02-preservation-polish.md
git commit -m "polish: refine portfolio section rhythm"
```

Expected: commit succeeds.

- [ ] **Step 5: Push the current branch**

Run:

```powershell
git push origin main
```

Expected: push succeeds.

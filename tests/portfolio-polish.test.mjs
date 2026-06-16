import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"

const app = readFileSync("src/App.tsx", "utf8")
const css = readFileSync("src/index.css", "utf8")
const design = readFileSync("DESIGN.md", "utf8")

test("contact form reduces visible choice load and makes budget optional", () => {
  assert.match(app, /const projectTypeOptions = \[[^\]]{1,160}\]/s)
  const projectTypeDeclaration = app.match(/const projectTypeOptions = \[([\s\S]*?)\]/)?.[1] ?? ""
  const projectTypeCount = (projectTypeDeclaration.match(/"/g) ?? []).length / 2

  assert.ok(projectTypeCount <= 4, "project type options should stay within the four-choice cognitive load limit")
  assert.match(app, /Ainda n(?:ã|a)o sei/, "budget should include a low-pressure unsure option")
  assert.doesNotMatch(app, /name="budget"[\s\S]{0,160}required/, "budget should not be required")
})

test("hash navigation has a dedicated compact landing treatment", () => {
  assert.match(css, /:target\s*\.section-heading-main/s, "targeted sections should tighten heading rhythm after hash navigation")
  assert.match(css, /scroll-margin-top:\s*88px/, "desktop section target offset should account for the sticky nav without over-spacing")
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*scroll-margin-top:\s*86px/, "mobile target offset should be tuned separately")
})

test("projects section exposes visual proof immediately", () => {
  assert.match(css, /projects-section\[data-focus-section="work-proof"\]/, "projects should carry a specific proof-oriented section hook")
  assert.match(css, /agency-projects[\s\S]*margin-top:\s*clamp\(1\.1rem/, "project cards should sit close to the heading")
})

test("design documentation names Chillax as the implemented brand typeface", () => {
  assert.match(design, /Chillax/, "DESIGN.md should document the current brand typeface")
  assert.doesNotMatch(design, /Unbounded deve aparecer|Onest deve sustentar/, "DESIGN.md should not describe the old type system as current")
})

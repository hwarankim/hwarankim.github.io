# hwarankim.github.io

Personal portfolio site for Hwaran Kim. Next.js (App Router) exported as a
static site and served from GitHub Pages.

**Audience:** recruiters and hiring companies, professional contacts and
mentors, professors, colleagues, students and mentees, plus friends and
family. Linked from LinkedIn.

**Purpose:** land marketing and event roles now; support grad / law school
applications later.

**Tone boundary:** professional throughout. Personality is wanted, but
nothing overly personal or informal.

## Stack

- Next.js 16 (App Router, `.jsx`), React 19, no TypeScript
- `next.config.mjs`: `output: 'export'`, `trailingSlash: true`,
  `images: { unoptimized: true }` — static export, so **no server features**:
  no API routes, no server actions, no `next/image` optimization, no
  middleware, no runtime data fetching
- Plain CSS in `app/globals.css`. No Tailwind, no CSS-in-JS, no UI library.
- Deploy: `.github/workflows/deploy.yml` on push
- `npm run dev` to develop, `npm run build` to export, `npm start` to serve
  the build, `npm run previews` to regenerate preview screenshots

## Structure

```
app/layout.jsx        fonts, metadata, Reveal + FolderTransition
app/page.jsx          home (the desktop)
app/about-me/         app/academics/  app/work-experience/  app/extra/
app/globals.css       every design token + all page styles (one file)
components/           Desktop, Folder, FolderStack, FolderTransition,
                      MenuBar, DeskThings, CourseDeck, Coupon, Reveal
lib/site.js           name, role, intro, summary, links, folder list,
                      image credits — all visitor-facing copy lives here
lib/work.js           work experience data
public/               images, textures, resume.pdf
```

Content changes go in `lib/`, not in JSX. Keep it that way.

## Design direction

The site is built as a physical object: Hwaran's own desktop. The home page
is a desk of draggable folders; each subpage is that folder opened flat, its
tab carrying the page name; the footer is the folder's back. Paper, kraft and
ink, printed rather than screen-native.

This direction was set deliberately; see `.taste-skill/notes.md` and
`direction.json` for how it was arrived at.

**Conventional structure, distinctive expression.** These are separate
decisions and should be treated separately.

*Structure stays conventional.* Recruiters skim, often on a phone, often for
under a minute. Information architecture should be boring and obvious: clear
page names, a predictable way back, experience in reverse chronological
order, dates and titles where the eye expects them, the resume easy to find.
Never make a visitor work out how to navigate. If a visual idea costs
findability, findability wins - say so.

*Expression does not stay conventional.* Within that clear structure, the
desk-and-folders treatment, the paper textures and the print-like
typesetting are the point. This site competes against portfolios that all
resolve to the same template, so sameness is a real cost, not a safe
default.

**When to push back.** Default to building a clear, well-structured
foundation; proposing a sound conventional layout is fine and needs no
warning. The push-back runs the other way: when Hwaran asks for something
distinctive or unusual, build that - do not water it down toward a safer
template, and do not substitute a conventional pattern for the one she
asked for. If her idea genuinely harms clarity or accessibility, name the
specific problem and offer a version that keeps her idea and fixes it,
rather than retreating to the generic version.

Avoid: stock-photo filler, generic SaaS-landing layouts, purple-gradient-on-
white AI defaults, outlined rectangles standing in for real object edges.

## Colors — tokens only

One light theme, Espresso & Periwinkle. Every value lives in `:root` in
`app/globals.css`. **Never hard-code a hex anywhere else, and do not add a
new color without being asked.**

```
--ground      #F1EAE0   page ground
--kraft       #D5BCAD   --kraft-2  #E3D3C8   folder stock
--paper-2     #EADFD5   --loose-paper #FAF7F2   --paper-lit #FFFEF9
--ink         #3D4D5C   body text
--accent      #7B4F33   espresso; primary buttons, focus ring
--accent-press #66412A
--tint        #9FB4D0   periwinkle
--wash        #DCE4EE
--field-ink   #4E5F70
--tone-0..3             per-page shade assignments
```

## Typography

Loaded from Google Fonts in `app/layout.jsx`.

- `--font` — Work Sans (400, 500). Body and UI.
- `--font-display` — Prata. **Titles only, never body**: it ships one weight
  (400) and no italic.
- Sizes come from the `--step-*` clamp scale. Do not introduce new sizes.
- Headings are weight 500. There is no bold.

Work Sans + Prata is a deliberate, current choice, not a leftover.
`.taste-skill/direction.json` still names Hanken Grotesk from an earlier
direction pass; that file is out of date on this point. The CSS is the
source of truth. Do not "restore" Hanken Grotesk or suggest switching the
typeface unless Hwaran asks.

## Rules

- Mobile-first. Most visitors arrive by tapping a link on a phone; check
  phone, tablet and desktop widths before calling anything done.
- Accessibility is not optional: semantic HTML, keyboard-operable (the
  draggable folders must still open on click and Enter), visible focus,
  WCAG AA contrast, real alt text on every image.
- Respect `prefers-reduced-motion` — see the Motion section of globals.css.
- Every image in `public/images` is an open-collection picture with its
  license recorded in `credits.json` and `lib/site.js`. Any new image needs
  the same credit entry. Never add an image that can't be credited.
- Pictures show the world around Hwaran's work — never other people's work
  presented as hers.
- Consistency across the five pages matters more than any single page being
  impressive.
- Match the existing code and CSS style rather than introducing a new
  pattern. `globals.css` is organized in commented sections — add to the
  right one.

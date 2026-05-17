# Tim Meyers — Portfolio (Direction H · "Reel")

Production implementation of the **Reel** direction from the Claude Design
handoff bundle — a dark, editorial single-page portfolio with a cinematic
horizontal-scroll project reel.

This is a faithful recreation of the final design the user landed on after
many rounds of iteration, rebuilt as a real Vite + React app (the prototype was
a single Babel-in-browser HTML file).

## Stack

- **Vite + React 19** — fast dev server, optimized production build
- No CSS framework — styles match the prototype exactly (inline styles +
  one global stylesheet for base/reveal/responsive rules)
- Fonts: **Schibsted Grotesk** (display/body) + **Geist Mono** (labels), via
  Google Fonts

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## What's implemented

Single long-scroll page, in order:

1. **Fixed status bar** — `TIM/MEYERS`, live Paris clock, "open for work"
2. **Hero** — 3D parallax title (layers shift with the cursor), cursor-follow
   soft glow, magnetic CTA ("Roll the reel" smooth-scrolls to the reel)
3. **Currently** — the bello.art positioning section with a generative cover
4. **Reel** — the wow moment: a pinned section where projects pan horizontally
   as you scroll vertically, with a live `01 / 08` counter and progress bar.
   On mobile (<=768px) this becomes a normal vertical stack (no scroll-jacking).
5. **CV** — six experience rows with hover-shift
6. **Contact** — giant `tim@bello.art`, links
7. **Footer**

Plus:

- **Project deep-dive modal** — click "Read more" on any project for a
  full scrollable article with a media gallery. Each gallery slot is a
  `MediaItem` supporting `image`, `video`, or generative `placeholder`. To drop
  in real media, add a `gallery: [...]` array to a project in `src/data.js`.
- **Tweaks panel** — floating, draggable palette picker (bottom-right).
  Four themes; default is **black + signal red**, matching the final design.
- Reveal-on-scroll, generative grain covers, full mobile responsiveness.

## Structure

| File | Responsibility |
|---|---|
| `src/data.js` | Palettes, projects, experience, grain texture |
| `src/primitives.jsx` | CursorGlow, Reveal, Cover, ParallaxTitle, Magnet, Clock, useIsMobile |
| `src/Reel.jsx` | Horizontal-scroll reel + mobile fallback + slides |
| `src/ProjectModal.jsx` | Deep-dive article modal with media gallery |
| `src/TweaksPanel.jsx` | Floating palette picker |
| `src/App.jsx` | Page composition |
| `src/index.css` | Base styles, reveal animation, responsive rules |

## Notes / next steps

- The project covers are **generative gradient placeholders** (as in the
  prototype). Real imagery slots in via the `gallery` array per project, and a
  portrait can replace the Currently-section cover when available.
- LinkedIn / GitHub footer links are placeholders (`#`) pending real URLs.
- The CV rows are non-navigating (`href="#"`, prevented) — styled as
  interactive but there are no detail pages for experience yet.

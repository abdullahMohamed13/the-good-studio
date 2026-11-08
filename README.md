# The Good Studio

The Good Studio is an independent creative studio making thoughtful digital experiences for phenomenal humans. This portfolio introduces the studio, its services, selected work, process, client feedback, and ways to get in touch.

![Animated preview of The Good Studio website](src/assets/video-preview.gif)

## What’s inside

- **Studio overview:** a bold editorial homepage with services and a guided look at the studio’s process.
- **The Good Mark:** a live 3D asterisk sculpture in the hero, rendered with Three.js and React Three Fiber.
- **Selected work:** a responsive portfolio gallery featuring image and video projects.
- **Client stories:** testimonials and a contact callout for prospective collaborators.
- **Contact page:** a dedicated inquiry form, alongside shared site navigation and footer.
- **Visual identity:** warm paper tones, deep and leafy greens, coral accents, and expressive typography.

## Built with

React, TypeScript, Tailwind CSS, GSAP, Three.js, and React Three Fiber.

The 3D scene is lazy-loaded, pauses when off-screen, falls back to a CSS mark on smaller screens, and respects `prefers-reduced-motion`.

## Design system

| Area | Details |
| --- | --- |
| **Palette** | Warm paper `#f4f0e3` · deep green `#102f23` · leafy green `#317959` · coral `#ee6845` |
| **Type** | DM Sans — display & body · DM Mono — labels · Playfair Display italic — editorial accents |
| **Motion** | Staggered hero entrance, scroll reveals, magnetic contact CTA, hover states, and a thin scroll-progress rail. Disabled or simplified under `prefers-reduced-motion`. |
| **3D** | “The Good Mark” — a sculptural asterisk in deep green with coral tips, an orbiting ring, and drifting dust, with gentle pointer parallax. |

## Project structure

| Path | Purpose |
| --- | --- |
| `src/data/` | Editable studio content, services, testimonials, and portfolio media |
| `src/sections/` | Homepage and contact page sections |
| `src/components/` | Shared navigation and interactive UI components |
| `src/styles/` | Global styles and brand tokens |
| `functions/` | Cloudflare Worker functions for server-side behavior |
| `public/` | Local static assets |

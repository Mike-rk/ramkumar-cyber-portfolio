# Ramkumar M — Cybersecurity Portfolio

A responsive, production-ready cybersecurity portfolio built around Ramkumar's real VAPT work, technical stack, lab activity, and experience. It includes an accessible three-attempt security guessing game.

**Live site:** [mike-rk.github.io/ramkumar-cyber-portfolio](https://mike-rk.github.io/ramkumar-cyber-portfolio/)

## Features

- Recruiter-focused hero, projects, technical arsenal, experience, education, and contact sections
- Professional portrait, specialization, target-role positioning, and a clear "what I bring" employer-value section
- Sanitized public evidence brief derived from a confidential nine-finding VAPT assessment
- Medium security write-ups alongside GitHub projects
- Public TryHackMe and Hack The Box activity profiles with direct recruiter links
- Viewable Cisco, Google/Coursera, Simplilearn, and ShadowFox certificate proofs
- Scroll-triggered section reveals, staggered card motion, hero parallax, and reading progress feedback
- Four rotating cybersecurity challenges with case-insensitive answer matching
- Three-attempt limit, per-attempt feedback, automatic answer reveal, and restart flow
- Responsive layout for desktop, tablet, and mobile
- Keyboard-friendly controls, live screen-reader feedback, visible focus states, and reduced-motion support
- Secure front-end patterns: bounded input length, no HTML injection, no secrets, and safe external links
- Downloadable PDF résumé and direct LinkedIn/GitHub links

## Technologies

- React 19 + TypeScript
- Next.js-compatible Vinext runtime
- CSS with responsive media queries and motion preferences
- Cloudflare Workers deployment target via OpenAI Sites
- GitHub Pages static deployment through GitHub Actions

## Local setup

Requirements: Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open the local URL shown by the development server.

To create the GitHub Pages build locally:

```bash
npm run build:pages
```

The deployment workflow publishes `dist-pages` whenever `main` is updated.

## Production checks

```bash
npm run lint
npm run build
npm run validate:artifact
```

The application is static and does not require environment variables, a database, or an external API.

## Key files

- `app/page.tsx` — portfolio sections and content
- `app/CyberChallenge.tsx` — three-attempt guessing game logic
- `app/globals.css` — visual system and responsive behavior
- `app/layout.tsx` — metadata and global font setup
- `github-pages/main.tsx` — GitHub Pages browser entry point
- `.github/workflows/deploy-pages.yml` — automated Pages deployment

## Customize

Update the arrays at the top of `app/page.tsx` to change projects or skills. Add or edit challenge objects in `app/CyberChallenge.tsx`; each challenge supports multiple accepted answer forms.

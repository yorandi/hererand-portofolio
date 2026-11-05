# HERERAND

Randi Fauzi’s interactive software development and data exploration portfolio. Built on the existing Next.js 15 / React 19 app with TypeScript, Tailwind CSS v4, Lucide, and Framer Motion.

## Local development

Use Node.js 22 LTS and npm in a terminal with Node on its PATH.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. In WSL, use a Linux Node installation or run npm from a native Windows terminal; mixing the Windows npm shim with a shell that has no `node` will fail.

## Validate and preview

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

Preview serves the actual static `out/` export at http://127.0.0.1:4173. `npm start` is an alias for this preview, not `next start` (which does not support static export).

Browser regression tests run against that export:

```sh
npx playwright install chromium
npm run test:e2e
```

To use an already installed browser without downloading Chromium, set `PLAYWRIGHT_CHANNEL=msedge` or `PLAYWRIGHT_CHANNEL=chrome` in your shell before running the tests. Tests cover both expertise routes, direct loads and refresh, back/forward history, theme persistence, keyboard navigation, reduced motion, mobile menus, and overflow at 320–1024px.

## Structure

- `src/app/layout.tsx`: metadata, pre-paint theme initialization, persistent portfolio stage.
- `src/app/page.tsx`, `src/app/web-developer/page.tsx`, `src/app/data-engineer/page.tsx`: static route entrypoints and page metadata.
- `src/components/PortfolioApp.tsx`: navigation, selector, shared-layout heroes, route transitions, focus handling. The stage stays mounted across App Router navigation so card-to-hero animations are continuous. Each route still exports its own rendered content, not an empty client-only page.
- `src/components/PortfolioSections.tsx`: reusable project, skill, certificate, experience/learning, and contact components.
- `src/components/ThemeToggle.tsx`: persistent theme selection, system preference tracking, storage-failure fallback.
- `src/data/portfolio.ts`: shared types, identity, social links, and supplied experience.
- `src/data/web-developer.ts`, `src/data/data-engineer.ts`: independent expertise content.
- `src/app/globals.css`: complete responsive dark and light design system.
- `tests/portfolio.spec.ts`: desktop/mobile browser checks.
- `scripts/preview.mjs`: local static file server; not deployed as a backend.

## Information to complete

Existing photo, email, GitHub, LinkedIn, work history, and the tracker demo URL are preserved. Confirm these are current before publishing.

1. Add a CV file under `public/`, then set `profile.cv` in `src/data/portfolio.ts` to its public path (for example `/cv.pdf`). Until then, the download control is visibly unavailable.
2. Add actual repository URLs to each project’s optional `github` field. The personal GitHub profile is not substituted for a project repository.
3. Add screenshots under `public/images/`, then set project `image` paths. Current illustrations are explicitly labelled screenshot placeholders, not fabricated application screenshots or research results.
4. Add optional public `demo` URLs when available. Only the supplied tracker demo is linked; it has not been independently authenticated as a current deployment.
5. Supply certificate images, credential URLs, and completion dates. Mark a certificate `verified: true` only after checking its evidence; it appears in the credential gallery only when a credential link is also present. Known completed courses remain in a separate learning list while evidence is pending. The DataCamp GitHub Foundations course is not presented as official GitHub certification.
6. Add data-related course records when titles and evidence are available. No data certifications have been invented.
7. Update PlantOps and the future ETL project only as implementation progresses. Planned scope is explicitly distinguished from completed features. Palm-vein work remains labelled research, with no production security or performance claims.

## Cloudflare Pages deployment

This is a static Next.js export, with `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true` in `next.config.ts`. There are no server actions, portfolio API routes, runtime secrets, or backend dependencies.

1. Connect the repository to Cloudflare Pages.
2. Select **Next.js (Static HTML Export)** if available, or **None**. Do not use a Workers/SSR adapter.
3. Set the build command to `npm run build` and output directory to `out`.
4. Set `NODE_VERSION` to `22` and choose the directory containing `package.json` as the build root.
5. Deploy, then check `/`, `/web-developer/`, and `/data-engineer/` directly and on refresh.

The expertise routes export their own `index.html` files so refreshes do not depend on SPA fallback rewrites. Keep the exported `404.html` so Cloudflare handles unknown URLs correctly. No custom catch-all redirect is required.

The theme bootstrap is an intentional inline script in the document head to avoid a flash of the wrong theme. If you add a Content Security Policy, allow that exact script via a hash rather than disabling it or broadly permitting arbitrary inline scripts.

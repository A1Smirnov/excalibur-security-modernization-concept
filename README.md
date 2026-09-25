# Excalibur Security — independent redesign concept

A mobile-first, English-language portfolio demonstration inspired by https://www.excalibur-security.com/. This is not the official website and is not affiliated with or endorsed by the company.

## Run with Docker

Install Docker Desktop and start its Linux container engine, then from this directory:

```sh
docker compose up --build
```

Open http://localhost:8080. Stop with `docker compose down`.

The first build requires internet access to fetch base images and npm dependencies. The built site needs no external API, database, CDN, or font service. The runtime is an unprivileged Nginx container. The port is bound only to localhost.

To hand off a prebuilt image for offline use:

```sh
docker build -t excalibur-concept:1.0 .
docker save -o excalibur-concept.tar excalibur-concept:1.0
```

The recipient runs:

```sh
docker load -i excalibur-concept.tar
docker run --rm -p 127.0.0.1:8080:8080 excalibur-concept:1.0
```

Build the image for the recipient's CPU architecture when it differs from yours.

## Local development

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:4321. `npm run build` runs Astro/TypeScript checks and generates the static site. `npm run preview` serves the result locally.

## Decisions

- Astro generates static HTML; React is used only for the consultation form.
- TypeScript service data drives the homepage, four service pages, and form options.
- Graphite, warm white, and burgundy establish a restrained visual identity. The sword/shield mark and architectural SVG are original concept artwork, not official company assets.
- Inter is bundled locally through Fontsource; its upstream license ships with the package. There are no remote fonts, analytics, embeds, stock photos, or runtime API requests.
- Navigation works without JavaScript. With JavaScript disabled, the form stays disabled and explains why.
- The React form validates required fields and email format, then displays an explicit demo confirmation. It makes no network request and does not persist entered values.
- The concept uses service categories and geographic context found on the original homepage, viewed September 24, 2026. New explanatory copy and service details are illustrative proposals, not verified operational commitments. Licenses, insurance, years of experience, testimonials, and client logos were intentionally not reproduced.
- All pages include `noindex, nofollow`; robots.txt blocks crawling. Nginx also supplies an X-Robots-Tag header. These signals do not make a publicly hosted site private.

## Editing

- `src/data/services.ts`: service content and consultation options.
- `src/styles/global.css`: responsive layout, colors, typography, focus and reduced-motion styles.
- `src/pages/index.astro`: homepage sections.
- `src/components/ConsultationForm.tsx`: demo interaction.
- `public/architecture.svg`: self-contained illustration.

## Browser checks

```sh
npx playwright install chromium
npx playwright test
```

Tests exercise mobile navigation, overflow at multiple viewport widths, service links, validation, the demo confirmation, and absence of form network requests. Docker runtime verification must be performed on a host with an accessible Docker engine before distributing a container image.

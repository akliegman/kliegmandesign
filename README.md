# adamkliegman.com

The portfolio of Adam Kliegman, a software engineer who builds design systems, frontend
architecture, and AI product surfaces. The site presents its case studies the way a design
system presents its documentation, and it documents its own design system at
[`/system`](https://www.adamkliegman.com/system).

## Stack

| Layer | Choice |
| --- | --- |
| Client | React 19, TypeScript (strict), Vite, React Router |
| UI | shadcn/ui on Radix primitives, Tailwind CSS 4, lucide icons, Geist and Geist Mono |
| Quality | Biome for linting and formatting, Vitest with Testing Library and vitest-axe |
| Server | Express on Node 22, serving the built client |
| Hosting | Heroku behind Cloudflare |

```
client/                 the site
  src/
    components/         site components; ui/ holds the shadcn/ui primitives
    content/            typed content: case studies, profile, legal copy
    lib/                theme, motion, visit analytics, color and token helpers
    pages/              one component per route
    styles/globals.css  the theme layer: every token and custom utility
    assets/work/        screenshots, with their sizes in dimensions.json
  scripts/              maintenance scripts
server/                 Express server, which serves client/build
  visits/               visit analytics: collector, Postgres queue, Slack notifications
```

## Getting started

Requires Node 22.22 or later and npm 10.

The client runs on its own; it doesn't call the server.

```sh
cd client
npm ci
npm run dev          # http://localhost:5173
```

### Client scripts

Run from `client/`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck, then build to `client/build` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Biome lint and format check |
| `npm run lint:fix` | Apply Biome's safe fixes and formatting |
| `npm run typecheck` | TypeScript with no emit |
| `npm test` | Vitest, once |

CI runs the client's lint, typecheck, tests, and build, and the server's tests against Postgres, on
every pull request to `main`.

### Running the full app

To run the site the way it runs in production, build the client and start the server from the
repository root. Copy [`.env.example`](.env.example) to `.env` and fill in the Postgres
connection; the server still serves the site without a database.

```sh
npm ci
(cd client && npm ci && npm run build)
npm start            # http://localhost:3001
```

## Visit analytics

`server/visits` records visits and posts them to a private Slack channel: a notice when a visit
starts, then a threaded summary once the visitor has been inactive for 30 minutes.

- **Collected:** page views with estimated visible time, résumé and contact-link clicks, IP
  address, Cloudflare's location estimate, network name and ASN, browser, OS and device class,
  referring host, and `utm_` parameters. An explicit allowlist rejects everything else.
- **Client IP:** Heroku appends the connecting address to `X-Forwarded-For`, so only the last
  entry is trusted. `CF-Connecting-IP` is used only when that address is a Cloudflare edge.
- **Network data:** the public-domain [iptoasn.com](https://iptoasn.com) dataset, downloaded at
  boot and daily and looked up in memory. No visitor address leaves the server for enrichment.
- **Consent:** in the EEA, UK, and Switzerland (by Cloudflare's country header), and when the
  country is unknown, nothing is recorded until the visitor allows it. Global Privacy Control and
  Do Not Track turn collection off everywhere. The server enforces this as well as the client.
- **Filtering:** crawler, previewer, monitor, and automation user agents; foreign origins;
  `VISITS_IGNORE_NETWORKS`; and single-page visits from cloud networks.
- **Delivery:** jobs live in Postgres and are claimed with `FOR UPDATE SKIP LOCKED`, so they
  survive restarts. Failures retry at 1, 5, 15, and 60 minutes, then stop. A per-network cooldown
  and an hourly cap keep Slack quiet. Logs carry job ids and outcome codes, never visitor data.
- **Retention:** full IPs are cleared after `VISITS_IP_RETENTION_DAYS` (7) and visits deleted
  after `VISITS_RETENTION_DAYS` (30), by an hourly sweep.

The privacy policy in `client/src/content/legal.ts` describes all of this; keep them in sync.

### Setup

1. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps) in your own workspace,
   add the `chat:write` bot scope, install it, and invite the bot to a private channel.
2. In Cloudflare, enable the **Add visitor location headers** managed transform (under Rules)
   for city and region; without it, location is country only.
3. Set the config and deploy:

```sh
heroku config:set VISITS_ENABLED=true VISITS_SLACK_BOT_TOKEN=xoxb-... VISITS_SLACK_CHANNEL_ID=C...
```

### Tests

Run from the repository root. `npm test` compiles the server and runs its unit tests;
`npm run test:visits` also runs the end-to-end tests against a local Postgres database (created
with `createdb kliegmandesign_visits_test`) and prints each notification. With
`VISITS_TEST_SLACK_BOT_TOKEN` and `VISITS_TEST_SLACK_CHANNEL_ID` set, those notifications are also
posted to that Slack channel, marked `[test]`.

## The design system

Everything visual comes from one place, `client/src/styles/globals.css`.

- **Color** uses shadcn/ui's semantic roles (`background`, `foreground`, `primary`, `muted`,
  `accent`, `border`, `input`, `ring`, and so on), authored in oklch. Each role holds its light and
  dark value in a single `light-dark()` declaration, and the theme toggle pins `color-scheme` with
  a class on the root element. Components use role utilities such as `bg-card` and
  `text-muted-foreground`, never raw colors.
- **Typography** is a set of named roles (`type-display`, `type-title`, `type-heading`,
  `type-subheading`, `type-lede`, `type-eyebrow`) so pages don't compose size, weight, and tracking
  by hand.
- **Motion** has three durations and two easing curves as tokens. Under
  `prefers-reduced-motion: reduce` they collapse to zero, and a site-wide pause control stops the
  ambient animations.
- **shadcn/ui components** live in `src/components/ui` and are changed at the source where the
  site needs different defaults, such as button heights and focus treatment. Variants exist only
  for differences the site actually uses.

`/system` reads the theme file at build time, so the documented values are the shipped values. A
unit test checks every foreground and background pair the site renders against its WCAG minimum in
both themes.

## Content

Case studies are typed objects in `client/src/content/work.ts`. Each has a cover, sections, and
figures, and an image is either a finished screenshot or a pending placeholder:

```ts
cover: screenshot("demyst-ds-colors", "The Demyst color library in Storybook"),
figures: [{ media: pending("The document editor with its action row") }],
```

To add a screenshot, export it at two widths and record its size:

```sh
cd client
scripts/add-screenshot.sh ~/Desktop/capture.png my-screen
```

Then reference it as `screenshot("my-screen", "Alt text that describes the image")`. Pass
`{ dark: "my-screen-dark" }` for a matching dark capture, which the site swaps in with its own
theme, or `{ specimen: true }` for an isolated component shown at its natural size.

## Accessibility

The site targets WCAG 2.2 AA. It has landmarks and a skip link, visible focus on every control,
focus moved to the new page's heading after navigation, and dialogs and the mobile menu that trap
and return focus. Contrast is tested in both themes, and reduced-motion preferences are respected
everywhere. Component tests run axe, and the pages were also checked by keyboard, in the
accessibility tree, and at widths from 320px up.

## Deployment

The site deploys to Heroku. `heroku-postbuild` installs the client's dependencies and builds it,
and `npm start` compiles and starts the Express server, which serves `client/build` and falls back
to `index.html` for client-side routes.

```sh
heroku login
git push heroku main
```

## License

MIT. See [LICENSE.txt](LICENSE.txt).

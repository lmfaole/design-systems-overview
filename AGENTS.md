# Agent Instructions

Regler for AI-agenter og automatiserte assistenter som jobber i dette repoet.

## Kjerneprinsipper (alltid)

- Bygg progressivt: fungere uten "triks" først; forbedre deretter.
- Tilgjengelighet er obligatorisk (semantisk HTML, riktig ARIA, tastatur, skjermleser).
- Foretrekk moderne CSS og native Web APIs framfor egendefinerte workarounds.

## Repo-oppsett (kort)

- App-ruter: `src/app/jokul/*`
- Komponentdocs: `src/app/jokul/_component-docs/docs/`
- Tokens: `src/app/jokul/_token/`
- Monstre: `src/app/jokul/_pattern/` + ruter `src/app/jokul/monster/*` (numeriske id-er i URL: `/jokul/monster/1`)

Type-spesifikke regler skal ligge som JSDoc ved typene (ikke i denne fila):
- `src/app/jokul/_component-docs/docs/types/component.ts`
- `src/app/jokul/_component-docs/docs/types/prop.ts`
- `src/app/jokul/_component-docs/docs/types/example.ts`
- `src/app/jokul/_component-docs/docs/types/migration.ts`

## Jøkul-komponenter (bruk)

- Importer alltid fra `@fremtind/jokul/<component>`.
- Ikke gjett props: verifiser i type defs:
  `node_modules/@fremtind/jokul/build/es/components/<component>/types.d.ts`
- Når du bruker en ny prop, komponent eller token, må den dokumenteres.

## Styling (hard rules)

- Ikke overstyr Jøkul-komponenters utseende (ikke bruk `style`/`className` for visuell endring).
- Ikke skriv CSS som targeter `.jkl-*` (unntak: `src/styles/patches/*` for midlertidige upstream-feil i Jøkul, og da skal det finnes et GitHub-issue).
- Bruk wrappers for layout og Jøkul tokens (`var(--jkl-*)`) for spacing/posisjonering på egne elementer.
- Bruk Jøkul `Flex` for flex-layouts; unngå `display: flex/grid` i CSS/inline bare for enkel sentrering der `<Flex>` dekker behovet.
- Aldri endre fonten for stilårsaker (font-weight, letter-spacing, text-transform og lignende).

## Unntak fra Jøkul

- Dersom noe i Jøkul gjør at ting krasjer: lag en patch og et issue (beskrevet nedenfor). Husk å sjekk nøye at det er Jøkul som gjør det.

## Kommandoer (lokalt/CI)

- Typecheck: `npm run typecheck`
- Dev: `npm run dev`
- Build: `npm run build`
- Test (inkl. a11y): `npm test`
- A11y direkte: `npm run test:a11y` (bruker `.pa11yci.json`, starter `next start` på `:3001`)
- Cloudflare Pages build: `npm run pages:build`

Merk: A11y-testene bruker Puppeteer/Chrome for Testing og kan installere browser via `npm run a11y:install`.

## Deploy (Cloudflare Pages)

- GitHub Actions deploy på push til `main`: `.github/workflows/deploy-cloudflare-pages.yml`
- Krever secrets i GitHub:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`
- Wrangler: `wrangler.toml` (build output: `.vercel/output/static`)

## GitHub-issues (påkrevd ved workarounds, ulogisk kode, dårlig ytelse, manglende dokumentasjon, med mer...)

Hvis du lager en workaround for Jøkul-problemer (bug, manglende eller utilstrekkelig default styling, API/a11y/SSR/ytelse/docs), opprett issue på norsk.
Dette gjelder selv om workarounden ikke trenger å targete `.jkl-*` (f.eks. når du må legge på ekstra spacing i prose-lister):

```sh
gh issue create \
  --repo lmfaole/lmfaole \
  --title "Jøkul-<type>: <Komponent> – <Kort beskrivelse>" \
  --body-file /tmp/issue.md
```

Gyldige `<type>`:
`Jøkul-bug | Jøkul-API | Jøkul-a11y | Jøkul-SSR | Jøkul-ytelse | Jøkul-docs`

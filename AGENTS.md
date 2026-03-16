# Agent Instructions

## Kjerneprinsipper (regler)

- Skal bygge progressivt: funger uten "triks" først; forbedre deretter.
- Skal alltid ivareta tilgjengelighet (semantisk HTML, riktig ARIA, tastatur, skjermleser).
- Skal foretrekke moderne CSS og native Web APIs framfor egendefinerte workarounds.

## Repo-oppsett (regler)

- App-ruter: `src/app/jokul/*`
- Komponentdocs: `src/app/jokul/_component-docs/docs/`
- Tokens: `src/app/jokul/_token/`
- Monstre: `src/app/jokul/_pattern/` + ruter `src/app/jokul/monster/*` (numeriske id-er i URL: `/jokul/monster/1`)

Type-spesifikke regler skal ligge som JSDoc ved typene (ikke i denne fila):
- `src/app/jokul/_component-docs/docs/types/component.ts`
- `src/app/jokul/_component-docs/docs/types/prop.ts`
- `src/app/jokul/_component-docs/docs/types/example.ts`
- `src/app/jokul/_component-docs/docs/types/migration.ts`

## Jøkul-komponenter (regler)

- Skal importere fra `@fremtind/jokul/<component>`.
- Skal ikke gjette props: verifiser i type defs:
  `node_modules/@fremtind/jokul/build/es/components/<component>/types.d.ts`
- Skal dokumentere ny prop, komponent eller token ved bruk.

## Styling (regler)

- Skal ikke overstyre Jøkul-komponenters utseende (ikke bruk `style`/`className` for visuell endring).
- Skal ikke skrive CSS som targeter `.jkl-*` (unntak: `src/styles/patches/*` for midlertidige upstream-feil i Jøkul, og da skal det finnes et GitHub-issue).
- Skal bruke wrappers for layout og Jøkul tokens (`var(--jkl-*)`) for spacing/posisjonering på egne elementer.
- Skal bruke Jøkul `Flex` for flex-layouts; unngå `display: flex/grid` i CSS/inline bare for enkel sentrering der `<Flex>` dekker behovet.
- Skal aldri endre fonten for stilårsaker (font-weight, letter-spacing, text-transform og lignende).

## Kommandoer (regler)

- Typecheck: `npm run typecheck`
- Dev: `npm run dev`
- Build: `npm run build`
- Test (inkl. a11y): `npm test`
- A11y direkte: `npm run test:a11y` (bruker `.pa11yci.json`, starter `next start` på `:3001`)
- Cloudflare Pages build: `npm run pages:build`

Merk: A11y-testene bruker Puppeteer/Chrome for Testing og kan installere browser via `npm run a11y:install`.

## Komponentdocs (regler)

- Skal alltid definere `migrations` for `status: "deprecated"` (valideres i dev).

## Ved feil eller mangler i Jøkul

- Skal opprette issue på norsk hvis du lager workaround for Jøkul-problemer (bug, manglende eller utilstrekkelig default styling, API/a11y/SSR/ytelse/docs).
- Skal også opprette issue når dokumentasjonen til Jøkul er utydelig eller mangler viktig praksis.
- Dette gjelder selv om workarounden ikke trenger å targete `.jkl-*` (f.eks. når du må legge på ekstra spacing i prose-lister):

```sh
gh issue create \
  --repo lmfaole/lmfaole \
  --title "Jøkul-<type>: <Komponent> – <Kort beskrivelse>" \
  --body-file /tmp/issue.md
```

Gyldige `<type>`:
`Jøkul-bug | Jøkul-API | Jøkul-a11y | Jøkul-SSR | Jøkul-ytelse | Jøkul-docs`

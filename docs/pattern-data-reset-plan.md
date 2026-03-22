# Plan for ny mønsterdata

## Mål

Starte mønsterdelen på nytt uten å rive ned integrasjonene rundt den. `src/data/mønster` skal igjen bli én tydelig kilde for mønsterinnhold, mens søk, sitemap, breadcrumbs og designsystemkoblinger genereres fra samme datasett.

## Prinsipper

1. Ha ett kanonisk mønsterobjekt per side.
2. Generer avledede datasett i stedet for å duplisere metadata manuelt.
3. La koblinger til designsystemdata være deklarative og maskinlesbare.
4. Hold mønsterdata små og konkrete: én situasjon per side.

## Foreslått modell

Hvert mønster bør minimum ha:

- `id`: stabil intern nøkkel
- `slug`: offentlig URL
- `title`
- `description`
- `category`
- `status`: `draft` eller `published`
- `references`: liste over koblinger til designsystemdata

Hver `reference` bør peke til eksisterende lokale docs med:

- `systemSlug`
- `sectionSlug`
- `assetSlug`
- `relation`: for eksempel `uses`, `recommends` eller `alternative`
- `notes`: kort begrunnelse som kan vises i UI

## Koblinger som skal genereres

Fra mønsterdatasettet skal vi generere:

1. Ruter og sitemap
   `src/pages/ds/mønster/[slug].astro` og `src/site/sitemap.ts` skal bare lese publiserte mønstre.
2. Søk
   `src/data/ds/search` skal bygge dokumenter direkte fra mønsterobjektene, ikke fra en separat statisk liste.
3. Breadcrumbs
   `src/components/site-breadcrumb-items.ts` skal fortsatt slå opp tittel fra mønsterdatasettet.
4. Designsystem-relasjoner
   mønsterreferanser skal kunne oversettes til `relationships` eller backlink-lister på komponent- og tokensider.

## Faser

1. Definer et minimalt skjema i `src/data/mønster`.
2. Lag 1-2 nye mønstre som pilot med ekte `references`.
3. Bygg en adapter som mapper `references` til designsystemlenker/backlinks.
4. Generer søkedokumenter fra mønstrene.
5. Generer sitemap-paths bare fra publiserte mønstre.
6. Utvid med flere mønstre først når pilotkoblingene fungerer.

## Første implementasjon

Begynn med én liten pilot:

- ett mønster for ventetilstand
- én kobling til `jokul/skeleton-loader`
- én kobling til `jokul/loader`

Det er nok til å verifisere hele flyten mellom mønsterdata, designsystemdata, søk og navigasjon før resten av innholdet legges tilbake.

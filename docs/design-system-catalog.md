# Design system catalog

Dette er målbilde og prosjektstruktur for å installere og dokumentere designsystemer som Aksel og Jøkul på en måte som skalerer.

## Mål

- Behandle installasjon som førsteklasses dokumentasjon, ikke som en fotnote.
- Dokumentere flere asset-typer enn bare komponenter.
- Holde systemspesifikk informasjon i små filer, slik at ett designsystem ikke ender som én stor datafil.
- Gjøre det mulig å starte med planlagte seksjoner før alle ruter finnes.

## Katalogstruktur

```text
src/data/design-systems/
  index.ts
  helpers.ts
  types.ts
  systems/
    aksel/
      catalog.ts
      install.ts
      index.ts
    jokul/
      catalog.ts
      install.ts
      index.ts
    designsystemet/
      catalog.ts
      install.ts
      index.ts
```

- `types.ts`: delt schema for installasjonsguider, asset-seksjoner, pakker og lokal dokumentasjonsplan.
- `helpers.ts`: små selektorer og labels for oversiktssider.
- `systems/<slug>/catalog.ts`: hvilke asset-områder systemet består av.
- `systems/<slug>/install.ts`: installasjonsguider og oppstartsoppsett.
- `systems/<slug>/index.ts`: samler metadata, pakker, lokale planruter og katalog.

## Fremtidig rutestruktur

Når et designsystem går fra `planned` til `documented`, bør rutene organiseres konsekvent:

```text
src/pages/ds/<system>/
  index.astro
  installasjon/
    index.astro
    [guide].astro
  [seksjon]/
    index.astro
    [slug].astro
```

Eksempler:

- `/ds/aksel/installasjon/react`
- `/ds/aksel/komponenter/button`
- `/ds/jokul/formattere/format-valuta`
- `/ds/jokul/mixins/breakpoints`

## Seksjoner vi må støtte

Schemaet er laget for å dekke:

- komponenter
- formattere
- hooks
- mixins
- designtokens
- ikoner
- utilities
- tema/styling
- mønstre
- maler
- tooling

Ikke alle designsystemer trenger alle seksjoner, men modellen må tåle dem uten spesialtilfeller.

## Skaleringsregler

1. Legg nye systemspecifikke detaljer i `systems/<slug>/`.
2. Legg nye asset-typer i `types.ts` og label-hjelperen, ikke som fritekst i hvert system.
3. Hold installasjonsguider og asset-katalog separert.
4. Bruk `status` per guide og seksjon slik at vi kan planlegge før sidene finnes.
5. Bygg senere sider direkte fra katalogen, i stedet for å vedlikeholde egen navigasjon manuelt.

## Neste steg

1. Opprett `/ds/aksel` og `/ds/jokul` med en enkel oversiktsside hver.
2. Bygg en delt routemodell for `installasjon`, `komponenter`, `formattere`, `hooks` og `mixins`.
3. La søkeindeksen hente inn lokale systemruter fra design-system-katalogen.
4. Innfør egne sidekomponenter for asset-lister og installasjonsguider når de første rutene finnes.

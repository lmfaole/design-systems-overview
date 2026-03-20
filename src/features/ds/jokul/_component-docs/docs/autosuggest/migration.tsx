import type { Migration } from "../types";

export const migrations: Migration[] = [
    {
        title: "leadText",
        description: "Omdøpt til helpLabel for konsistent navngiving med andre skjemakomponenter.",
        deprecates: { name: "leadText" },
        replacedBy: [{ name: "helpLabel" }],
        before: `<Autosuggest
    label="Hjemsted"
    leadText="Begynn å skrive for å se forslag"
    allItems={cities}
    onChange={setValue}
/>`,
        after: `<Autosuggest
    label="Hjemsted"
    helpLabel="Begynn å skrive for å se forslag"
    allItems={cities}
    onChange={setValue}
/>`,
    },
    {
        title: "noHitsMessage",
        description: "Erstattet med noHits-objektet for å gi bedre kontroll over innhold og tekst i ingen-treff-tilstanden.",
        deprecates: { name: "noHitsMessage" },
        replacedBy: [{ name: "noHits" }],
        before: `<Autosuggest
    label="Hjemsted"
    noHitsMessage={<span>Ingen treff</span>}
    allItems={cities}
    onChange={setValue}
/>`,
        after: `<Autosuggest
    label="Hjemsted"
    noHits={{ items: [], text: "Ingen byer funnet – prøv et annet søk" }}
    allItems={cities}
    onChange={setValue}
/>`,
    },
];

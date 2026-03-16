import type { ComponentDoc } from "../types";
import { props } from "./props";
import { SearchPreview } from "./preview";

const doc: ComponentDoc = {
    id: "search",
    name: "Search Input",
    package: "@fremtind/jokul/search",
    category: "Skjema",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "SearchInput er et søkeinputfelt med søkeikon og valgfri label.",
        long: "SearchInput er et søkeinputfelt med søkeikon og valgfri label.",
    },
    relationships: {
        related: [{ id: "text-input", description: "Search utvider TextInput med en dedikert søkerolle og en valgfri innsendingsknapp." }, { id: "autosuggest", description: "Kombiner Search med Autosuggest for å vise direkteforslag mens brukeren skriver et søk." }],
        subcomponents: [
            { id: "search-button", description: "Frittstående søkeknapp som pares med Search-inputfeltet." },
        ],
    },
    preview: <SearchPreview />,

    props,
};

export default doc;

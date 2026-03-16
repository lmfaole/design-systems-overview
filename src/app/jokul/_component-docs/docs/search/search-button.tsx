import type { ComponentDoc } from "../types";
import { SearchButtonPreview } from "./preview";

const doc: ComponentDoc = {
    id: "search-button",
    name: "Search.Button",
    package: "@fremtind/jokul/search",
    category: "Skjema",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Frittstående søkeknapp som pares med Search-inputfeltet i et skjema.",
        long: "Frittstående søkeknapp som pares med Search-inputfeltet i et skjema. Rendrer en ghost-knapp med søketekst.",
    },
    preview: <SearchButtonPreview />,
    props: [
        { name: "label", type: "string", required: false, source: "custom", status: "stable", default: '"Søk"', description: "Tekst i knappen." },
        { name: "type", type: '"button" | "submit" | "reset"', required: false, source: "native", status: "stable", default: '"button"', description: "HTML-type-attributtet." },
        { name: "onClick", type: "React.MouseEventHandler<HTMLButtonElement>", required: false, source: "react", status: "stable", description: "Klikk-handler." },
    ],
};

export default doc;

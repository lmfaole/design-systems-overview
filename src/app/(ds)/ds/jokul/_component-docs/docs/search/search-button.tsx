import type { ComponentDoc } from "../types";
import { SearchButtonPreview } from "./preview";
import { SearchButtonExample } from "./search-button-example";

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
    example: (props) => <SearchButtonExample {...props} />,
    exampleControlsConfig: {
        include: ["label", "type", "disabled"],
        order: ["label", "type", "disabled"],
        overrides: {
            label: { defaultValue: "Søk" },
            type: { kind: "select", options: ["button", "submit", "reset"], defaultValue: "button" },
            disabled: { kind: "boolean", defaultValue: false },
        },
    },
    props: [
        { name: "label", type: "string", required: false, source: "custom", status: "stable", default: '"Søk"', description: "Tekst i knappen." },
        { name: "type", type: '"button" | "submit" | "reset"', required: false, source: "native", status: "stable", default: '"button"', description: "HTML-type-attributtet." },
        { name: "onClick", type: "React.MouseEventHandler<HTMLButtonElement>", required: false, source: "react", status: "stable", description: "Klikk-handler." },
        { name: "disabled", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Deaktiverer knappen." },
    ],
};

export default doc;

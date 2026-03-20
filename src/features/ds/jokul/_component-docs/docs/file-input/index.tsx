import type { ComponentDoc } from "../types";
import { props } from "./props";
import { FileInputPreview } from "./preview";
import { FileInputExample } from "./example";

const doc: ComponentDoc = {
    id: "file-input",
    name: "File Input",
    package: "@fremtind/jokul/file-input",
    category: "Skjema",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "FileInput er et skjemaelement for å laste opp filer.",
        long: "FileInput er et skjemaelement for å laste opp filer. Den støtter dra-og-slipp, filtype- og størrelsesbegrensning, og viser opplastingsstatus.",
    },
    relationships: {
        related: [
            { id: "text-input", description: "Bruk TextInput for enkeltlinjers tekst; FileInput håndterer filopplasting med dra-og-slipp og opplastingsstatus." },
        ],
    },
    preview: <FileInputPreview />,
    example: (props) => <FileInputExample {...props} />,
    exampleControlsConfig: {
        include: ["legend", "accept", "maxSizeBytes", "multiple", "variant", "helpLabel", "errorLabel"],
        order: ["legend", "accept", "maxSizeBytes", "multiple", "variant", "helpLabel", "errorLabel"],
        overrides: {
            legend: { defaultValue: "Last opp dokumenter" },
            accept: { defaultValue: "image/*,.pdf" },
            maxSizeBytes: { kind: "number", defaultValue: 5000000, min: 0 },
            multiple: { kind: "boolean", defaultValue: true },
            variant: { kind: "select", options: ["flexible", "small"], defaultValue: "flexible" },
            helpLabel: {
                defaultValue: "PDF eller bilde, maks 5 MB.",
                visibleWhen: { name: "errorLabel", operator: "notEquals", value: "Opplastingen feilet" },
            },
            errorLabel: { placeholder: "Feilmelding" },
        },
    },

    props,
};

export default doc;

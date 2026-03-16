import type { ComponentDoc } from "../types";
import { props } from "./props";
import { FileInputPreview } from "./preview";

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

    props,
};

export default doc;

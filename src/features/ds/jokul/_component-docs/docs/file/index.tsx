import type {ComponentDoc} from "../types";
import {props} from "./props";
import {FilePreview} from "./preview";

const doc: ComponentDoc = {
    id: "file",
    name: "File",
    package: "@fremtind/jokul/file",
    category: "Visning",
    status: "stable",
    complexity: {use: "easy", maintenance: "easy"},
    showOnOverview: false,
    description: {
        short: "Viser en opplastet fil med navn, størrelse og status.",
        long: "File viser metadata for en enkelt opplastet fil, med støtte for visningsvariant, feilmelding, innlastingsstatus og fjerning. Komponenten brukes ofte sammen med FileInput, men kan også brukes alene når du allerede håndterer opplasting og validering selv.",
    },
    relationships: {
        related: [
            {
                id: "file-input",
                description: "FileInput bruker File til å vise hver enkelt opplastet fil med status og fjerning."
            },
            {
                id: "image",
                description: "Bruk Image for vanlige bilder i innhold; File er laget for filopplastingslister og metadata."
            },
        ],
    },
    preview: <FilePreview/>,
    props,
};

export default doc;

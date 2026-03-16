import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ChipPreview } from "./preview";

const doc: ComponentDoc = {
    id: "chip",
    name: "Chip",
    package: "@fremtind/jokul/chip",
    category: "Handling",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Brukes for interaktive filtre og tagger som brukeren kan velge.",
        long: "Chip brukes for interaktive filtre og tagger som brukeren kan velge og velge bort.",
    },
    relationships: {
        related: [{ id: "tag", description: "Bruk Tag for skrivebeskyttede kategorietiketter; Chip er for interaktive filtreringshandlinger." }],
    },

    preview: <ChipPreview />,
    props,
};

export default doc;

import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ChipPreview } from "./preview";
import { ChipExample } from "./example";

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
    example: (props) => <ChipExample {...props} />,
    exampleControlsConfig: {
        include: ["label", "variant", "selected", "disabled"],
        order: ["label", "variant", "selected", "disabled"],
        overrides: {
            label: { kind: "text", defaultValue: "Nyhet" },
            selected: { kind: "boolean", defaultValue: false, visibleWhen: { name: "variant", value: "filter" } },
        },
    },
    props,
};

export default doc;

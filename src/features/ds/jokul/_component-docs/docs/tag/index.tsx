import type { ComponentDoc } from "../types";
import { props } from "./props";
import { TagExample } from "./example";
import { TagPreview } from "./preview";

const doc: ComponentDoc = {
    id: "tag",
    name: "Tag",
    package: "@fremtind/jokul/tag",
    category: "Visning",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Brukes til å vise kategorier statuser og etiketter.",
        long: "Tag brukes til å vise kategorier, statuser og etiketter. De er kun visuelle elementer — ikke bruk Tag som knapper eller lenker. For klikkbare filtre, bruk Chip-komponenten i stedet.",
    },
    relationships: {
        related: [{ id: "message", description: "Tag kan legges inn i Message for å merke tilbakemeldingskategorien med et fargekodet merke." }],
    },

    preview: <TagPreview />,
    example: (props) => <TagExample {...props} />,
    props,
};

export default doc;

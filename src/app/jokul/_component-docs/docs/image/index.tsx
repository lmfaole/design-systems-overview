import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ImagePreview } from "./preview";

const doc: ComponentDoc = {
    id: "image",
    name: "Image",
    package: "@fremtind/jokul/image",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "Tilgjengelig bildekomponent som sikrer korrekt bruk av alt-tekst.",
        long: "Image er en tilgjengelig bildekomponent som sikrer korrekt bruk av alt-tekst. Den måler containerens bredde for å sette riktig sizes-attributt, og viser en plassholder mens bildet lastes. Komponenten krever at foreldreelementet har definert bredde og høyde.",
    },

    preview: <ImagePreview />,
    props,
};

export default doc;

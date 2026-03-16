import type { ComponentDoc } from "../types";
import { props } from "./props";
import { CardImagePreview } from "./preview";

const doc: ComponentDoc = {
    id: "card-image",
    name: "Card Image",
    package: "@fremtind/jokul/card",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "CardImage er en bildekomponent laget for bruk inne i Card.",
        long: "CardImage er en bildekomponent laget for bruk inne i Card. Den håndterer negativ margin automatisk slik at bildet bløder kant-i-kant i kortet, uavhengig av Card sin padding-innstilling. Du slipper å beregne negative marginer manuelt.",
    },
    relationships: {
        alternatives: [{ id: "card", description: "Bruk Card når det ikke er behov for et herobilder og innholdet i seg selv er det primære visuelle." }],
    },

    preview: <CardImagePreview />,
    props,
};

export default doc;

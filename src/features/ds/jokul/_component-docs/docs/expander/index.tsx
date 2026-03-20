import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ExpanderPreview } from "./preview";

const doc: ComponentDoc = {
    id: "expander",
    name: "Expander",
    package: "@fremtind/jokul/expander",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "Klikkbar knapp som brukes som trigger for ExpandablePanel.",
        long: "Expander er en klikkbar knapp som brukes som trigger for ExpandablePanel. Den kan også brukes frittstående som en styrt toggle der du håndterer åpen-tilstand selv.",
    },

    relationships: {
        alternatives: [{ id: "expandable-panel", description: "Bruk ExpandablePanel når det sammenleggbare innholdet trenger en visuelt distinkt innrammet beholder." }],
    },

    preview: <ExpanderPreview />,
    props,
};

export default doc;

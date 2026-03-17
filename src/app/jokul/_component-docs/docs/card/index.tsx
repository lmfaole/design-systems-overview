import type { ComponentDoc } from "../types";
import { props } from "./props";
import { CardPreview } from "./preview";
import { CardExample } from "./example";

const doc: ComponentDoc = {
    id: "card",
    name: "Card",
    package: "@fremtind/jokul/card",
    category: "Visning",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Overflate-komponent som grupperer relatert innhold i et visuelt avgrenset område.",
        long: "Card er en overflate-komponent som grupperer relatert innhold i et visuelt avgrenset område. Den gir bakgrunn, ramme og padding via padding-proppen. Card gjør ikke antagelser om innhold — det er opp til deg å strukturere innholdet med Flex, overskrifter og andre komponenter.",
    },
    relationships: {
        subcomponents: [{ id: "card-image", description: "Legg til CardImage øverst i kortet for et fremtredende herobilde." }],
        related: [{ id: "flex", description: "Wrapper Card-elementer i Flex for å kontrollere mellomrom og justering i et kortgitter." }],
    },
    preview: <CardPreview />,
    example: (props) => <CardExample {...props} />,
    exampleControlsConfig: {
        include: ["padding", "variant", "clickable"],
        order: ["variant", "padding", "clickable"],
    },

    props,
};

export default doc;

import type { ComponentDoc } from "../types";
import { props } from "./props";
import { DescriptionListPreview } from "./preview";

const doc: ComponentDoc = {
    id: "description-list",
    name: "Description List",
    package: "@fremtind/jokul/description-list",
    category: "Visning",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "DescriptionList viser nøkkel-verdi-par som en HTML description list (dl/dt/dd).",
        long: "DescriptionList viser nøkkel-verdi-par strukturert som en HTML description list (dl/dt/dd).",
    },
    preview: <DescriptionListPreview />,
    example: (props) => <DescriptionListPreview {...props} />,
    relationships: {
        subcomponents: [
            { id: "description-term", description: "Nøkkelen (dt) i et nøkkel-verdi-par." },
            { id: "description-detail", description: "Verdien (dd) i et nøkkel-verdi-par." },
        ],
    },
    props,
};

export default doc;

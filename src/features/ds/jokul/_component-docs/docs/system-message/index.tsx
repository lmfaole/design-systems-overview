import type { ComponentDoc } from "../types";
import { props } from "./props";
import { migrations } from "./migration";
import { SystemMessagePreview } from "./preview";
import { SystemMessageExample } from "./example";

const doc: ComponentDoc = {
    id: "system-message",
    name: "System Message",
    package: "@fremtind/jokul/system-message",
    category: "Tilbakemelding",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "SystemMessage brukes til å kommunisere viktig informasjon til brukeren på sidenivå.",
        long: "SystemMessage brukes til å kommunisere viktig informasjon til brukeren på sidenivå. Finnes i variantene info, success, warning og error. Kan gjøres avvisbar med dismissAction.",
    },
    relationships: {
        alternatives: [{ id: "message", description: "Bruk Message for vedvarende innebygd tilbakemelding innenfor en sideseksjon fremfor et banner i full bredde." }, { id: "toast", description: "Bruk Toast for korte selvlukkende varsler som vises i kanten av skjermen." }],
    },

    preview: <SystemMessagePreview />,
    example: (props) => <SystemMessageExample {...props} />,
    exampleControlsConfig: {
        include: ["variant", "dismissed", "maxContentWidth", "paddingLeft", "role"],
        order: ["variant", "dismissed", "maxContentWidth", "paddingLeft", "role"],
        overrides: {
            variant: { kind: "select", options: ["info", "success", "warning", "error"], defaultValue: "info" },
            maxContentWidth: { placeholder: "f.eks. 56rem" },
            paddingLeft: { placeholder: "f.eks. 4rem" },
            role: { placeholder: "f.eks. alert" },
        },
    },
    props,
    migrations,
};

export default doc;

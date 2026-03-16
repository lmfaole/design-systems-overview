import type { ComponentDoc } from "../types";
import { props } from "./props";
import { RadioPanelPreview } from "./preview";

const doc: ComponentDoc = {
    id: "radio-panel",
    name: "Radio Panel",
    package: "@fremtind/jokul/radio-panel",
    category: "Skjema",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "RadioPanel er et panelbasert envalgsalternativ.",
        long: "RadioPanel er et panelbasert envalgsalternativ.",
    },
    relationships: {
        alternatives: [{ id: "radio-button", description: "Bruk RadioButton for kompakte vertikale lister der et kortlignende valgområde ikke er nødvendig." }],
        related: [{ id: "checkbox-panel", description: "CheckboxPanel følger samme kortmønster, men tillater flere samtidige valg." }],
    },

    preview: <RadioPanelPreview />,
    props,
};

export default doc;

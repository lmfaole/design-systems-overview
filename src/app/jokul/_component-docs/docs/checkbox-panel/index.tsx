import type { ComponentDoc } from "../types";
import { props } from "./props";
import { CheckboxPanelPreview } from "./preview";

const doc: ComponentDoc = {
    id: "checkbox-panel",
    name: "Checkbox Panel",
    package: "@fremtind/jokul/checkbox-panel",
    category: "Skjema",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "CheckboxPanel er en utvidet avkrysningsboks med et synlig paneldesign.",
        long: "CheckboxPanel er en utvidet avkrysningsboks med et synlig paneldesign.",
    },
    relationships: {
        alternatives: [{ id: "checkbox", description: "Bruk Checkbox for kompakte innebygde valg der et kortlignende klikkområde ikke er nødvendig." }],
        related: [{ id: "radio-panel", description: "RadioPanel følger samme kortmønster, men begrenser valget til ett alternativ om gangen." }],
    },

    preview: <CheckboxPanelPreview />,
    props,
};

export default doc;

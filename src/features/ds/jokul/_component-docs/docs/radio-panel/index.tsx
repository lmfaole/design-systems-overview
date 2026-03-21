import type { ComponentDoc } from "../types";
import { props } from "./props";
import { RadioPanelPreview } from "./preview";
import { RadioPanelExample } from "./example";

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
    example: (props) => <RadioPanelExample {...props} />,
    exampleControlsConfig: {
        include: ["label", "description", "amount", "name", "value", "checked", "defaultChecked", "disabled"],
        order: ["label", "description", "amount", "name", "value", "checked", "defaultChecked", "disabled"],
        overrides: {
            label: { defaultValue: "Standard" },
            description: { defaultValue: "Dekker de vanligste behovene." },
            amount: { defaultValue: "kr 1 200 / mnd" },
            name: { kind: "text", defaultValue: "package" },
            value: { kind: "text", defaultValue: "standard" },
            checked: {
                kind: "select",
                options: [
                    { label: "Automatisk", value: null },
                    { label: "På", value: true },
                    { label: "Av", value: false },
                ],
                defaultValue: null,
            },
            defaultChecked: { kind: "boolean", defaultValue: true },
            disabled: { kind: "boolean", defaultValue: false },
        },
    },
    props,
};

export default doc;

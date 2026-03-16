import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ToggleSwitchPreview } from "./preview";

const doc: ComponentDoc = {
    id: "toggle-switch",
    name: "Toggle Switch",
    package: "@fremtind/jokul/toggle-switch",
    category: "Handling",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "ToggleSwitch er et binært vippebryter-element for innstillinger som skal tre i kraft umiddelbart.",
        long: "ToggleSwitch er et binært vippebryter-element for innstillinger som skal tre i kraft umiddelbart. Forskjellen fra en checkbox er viktig: en checkbox er en del av et skjema som sendes inn, mens ToggleSwitch utløser en umiddelbar handling. Bruk ToggleSwitch for innstillinger som «Slå på varsler», og checkbox for «Godta vilkårene».",
    },
    relationships: {
        related: [
            { id: "checkbox", description: "Bruk Checkbox for valg som inngår i et skjema som sendes inn — ToggleSwitch er for umiddelbare innstillinger." },
            { id: "button", description: "Bruk Button for engangshendelser som krever et separat innsendingstrinn i stedet for en umiddelbar veksling." },
        ],
    },

    preview: <ToggleSwitchPreview />,
    props,
};

export default doc;

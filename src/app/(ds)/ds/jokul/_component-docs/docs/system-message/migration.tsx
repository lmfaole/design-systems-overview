import { SystemMessage } from "@fremtind/jokul/system-message";
import type { Migration } from "../types";

export const migrations: Migration[] = [
    {
        title: "InfoSystemMessage",
        description: "De fire navngitte variantkomponentene ble slått sammen til én komponent med variant-prop for å redusere API-overflaten.",
        deprecates: { name: "InfoSystemMessage" },
        replacedBy: [{ name: "SystemMessage" }, { name: "variant" }],
        before: `import { InfoSystemMessage } from "@fremtind/jokul/system-message";

<InfoSystemMessage>Systemet vedlikeholdes lørdag kl. 22–24.</InfoSystemMessage>`,
        after: `import { SystemMessage } from "@fremtind/jokul/system-message";

<SystemMessage variant="info">Systemet vedlikeholdes lørdag kl. 22–24.</SystemMessage>`,
    },
    {
        title: "SuccessSystemMessage",
        description: "De fire navngitte variantkomponentene ble slått sammen til én komponent med variant-prop for å redusere API-overflaten.",
        deprecates: { name: "SuccessSystemMessage" },
        replacedBy: [{ name: "SystemMessage" }, { name: "variant" }],
        before: `import { SuccessSystemMessage } from "@fremtind/jokul/system-message";

<SuccessSystemMessage>Registreringen var vellykket.</SuccessSystemMessage>`,
        after: `import { SystemMessage } from "@fremtind/jokul/system-message";

<SystemMessage variant="success">Registreringen var vellykket.</SystemMessage>`,
    },
    {
        title: "WarningSystemMessage",
        description: "De fire navngitte variantkomponentene ble slått sammen til én komponent med variant-prop for å redusere API-overflaten.",
        deprecates: { name: "WarningSystemMessage" },
        replacedBy: [{ name: "SystemMessage" }, { name: "variant" }],
        before: `import { WarningSystemMessage } from "@fremtind/jokul/system-message";

<WarningSystemMessage>Høy trafikk kan forsinke behandling.</WarningSystemMessage>`,
        after: `import { SystemMessage } from "@fremtind/jokul/system-message";

<SystemMessage variant="warning">Høy trafikk kan forsinke behandling.</SystemMessage>`,
    },
    {
        title: "ErrorSystemMessage",
        description: "De fire navngitte variantkomponentene ble slått sammen til én komponent med variant-prop for å redusere API-overflaten.",
        deprecates: { name: "ErrorSystemMessage" },
        replacedBy: [{ name: "SystemMessage" }, { name: "variant" }],
        before: `import { ErrorSystemMessage } from "@fremtind/jokul/system-message";

<ErrorSystemMessage>Noe gikk galt. Prøv igjen.</ErrorSystemMessage>`,
        after: `import { SystemMessage } from "@fremtind/jokul/system-message";

<SystemMessage variant="error">Noe gikk galt. Prøv igjen.</SystemMessage>`,
    },
];

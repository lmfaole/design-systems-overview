import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ToastPreview } from "./preview";

const doc: ComponentDoc = {
    id: "toast",
    name: "Toast",
    package: "@fremtind/jokul/toast",
    category: "Overlegg",
    status: "stable",
    complexity: {
        use: "hard",
        maintenance: "hard",
        notes: {
            use: "Krever riktig timing, aria-live og plassering for ikke å forstyrre.",
            maintenance: "Avhenger av provider, kølogikk og automatisk fjerning.",
        },
    },
    description: {
        short: "Midlertidig varslingskomponent som vises til brukeren etter en handling.",
        long: "Toast er en midlertidig varslingskomponent som vises til brukeren etter en handling. Den forsvinner automatisk etter en stund og kan inneholde en handling.",
    },
    relationships: {
        requires: [
            { id: "toast-provider", description: "Må være omsluttet av ToastProvider for at useToast() skal fungere." },
        ],
        alternatives: [{ id: "message", description: "Bruk Message for vedvarende innebygd tilbakemelding som forblir synlig i sideoppsettet." }, { id: "system-message", description: "Bruk SystemMessage for beskjeder på sidenivå som krever eksplisitt brukerbekreftelse." }],
    },

    preview: <ToastPreview />,
    props,
};

export default doc;

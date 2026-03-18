import type { ComponentDoc } from "../types";
import { props } from "./props";
import { MessagePreview } from "./preview";

const doc: ComponentDoc = {
    id: "message",
    name: "Message",
    package: "@fremtind/jokul/message",
    category: "Tilbakemelding",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Viser kontekstuell informasjon, advarsler, suksessmeldinger og feilmeldinger til brukeren.",
        long: "Message viser kontekstuell informasjon, advarsler, suksessmeldinger og feilmeldinger til brukeren. Komponenten er tilgjengelig ut av boksen med riktig rolle og aria-attributter for alle varianter. Bruk riktig variant for å kommunisere alvorlighetsgraden av meldingen.",
    },
    relationships: {
        alternatives: [{ id: "system-message", description: "Bruk SystemMessage for bannere på sidenivå som må avvises eller handles på." }, { id: "toast", description: "Bruk Toast for kortvarige, selvlukkende varsler utløst av brukerhandlinger." }],
        related: [
            { id: "form-error-message", description: "Oppsummerer skjemafeil i en liste etter forsøk på innsending." },
            { id: "tag", description: "Tag kan brukes sammen med Message for å kategorisere eller merke typen tilbakemelding inline." },
        ],
    },

    preview: <MessagePreview />,
    props,
};

export default doc;

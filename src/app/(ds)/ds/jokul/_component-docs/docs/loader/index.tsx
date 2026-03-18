import type { ComponentDoc } from "../types";
import { props } from "./props";
import { LoaderPreview } from "./preview";

const doc: ComponentDoc = {
    id: "loader",
    name: "Loader",
    package: "@fremtind/jokul/loader",
    category: "Tilbakemelding",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Viser en spinner-animasjon mens data hentes eller en operasjon pågår.",
        long: "Loader viser en spinner-animasjon mens data hentes eller en operasjon pågår. Gi alltid textDescription for skjermlesere.",
    },
    relationships: {
        alternatives: [{ id: "skeleton", description: "Bruk Skeleton-plassholdere når formen på innholdet som lastes er kjent på forhånd." }],
        related: [{ id: "button", description: "Erstatt Button-etiketten med Loader mens en asynkron handling pågår for å vise innebygd ladetilstand." }, { id: "feedback", description: "Kombiner Loader med Feedback-mønstre for å kommunisere fremdrift på tvers av en hel side eller seksjon." }],
    },
    preview: <LoaderPreview />,

    props,
};

export default doc;

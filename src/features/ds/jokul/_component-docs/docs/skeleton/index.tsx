import type { ComponentDoc } from "../types";
import { props } from "./props";
import { SkeletonPreview } from "./preview";

const doc: ComponentDoc = {
    id: "skeleton",
    name: "Skeleton",
    package: "@fremtind/jokul/loader",
    category: "Tilbakemelding",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "Komponenter bygger opp et innholdsskjelett som matcher layouten til det.",
        long: "Skeleton-komponenter bygger opp et innholdsskjelett som matcher layouten til det virkelige innholdet, og gir brukeren en visuell indikasjon på at innhold er på vei.",
    },
    relationships: {
        alternatives: [{ id: "loader", description: "Bruk Loader som et snurreoverlegg når den nøyaktige innholdsformen ikke kan forutsies på forhånd." }],
        related: [{ id: "feedback", description: "Kombiner med Feedback-mønstre for å kommunisere ladetilstand på tvers av en hel sideseksjon." }],
        subcomponents: [
            { id: "skeleton-element", description: "Freeform rektangulær eller sirkulær plassholder med tilpassbar størrelse." },
            { id: "skeleton-input", description: "Plassholder som matcher bredde og høyde på et TextInput-felt." },
            { id: "skeleton-button", description: "Plassholder som matcher bredde og høyde på en Button." },
            { id: "skeleton-text-area", description: "Plassholder som matcher bredde og høyde på et TextArea-felt." },
            { id: "skeleton-checkbox-group", description: "Plassholder for en gruppe avkrysningsbokser." },
            { id: "skeleton-radio-button-group", description: "Plassholder for en gruppe radioknapper." },
        ],
    },
    preview: <SkeletonPreview />,

    props,
};

export default doc;

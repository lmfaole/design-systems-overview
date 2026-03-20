import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ModalPreview } from "./preview";

const doc: ComponentDoc = {
    id: "modal",
    name: "Modal",
    package: "@fremtind/jokul/modal",
    category: "Overlegg",
    status: "stable",
    complexity: {
        use: "hard",
        maintenance: "hard",
        notes: {
            use: "Krever fokusfelle, riktig tastaturnavigasjon og tydelig handling ved lukking.",
            maintenance: "Avhenger av overlay-infrastruktur, fokusstyring og portaler på tvers av rammeverk.",
        },
    },
    description: {
        short: "Dialogboks som vises over resten av innholdet.",
        long: "Modal er en dialogboks som vises over resten av innholdet. Den brukes til å be om bekreftelse, vise viktig informasjon eller samle inn data uten å navigere bort fra siden.",
    },

    preview: <ModalPreview />,
    props,
};

export default doc;
